import { NextRequest, NextResponse } from "next/server";
import { LeadControlError, leadPool } from "@/lib/lead-control";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function failure(error: unknown) {
  if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
  return NextResponse.json({ error: "Outreach is tijdelijk niet beschikbaar." }, { status: 503 });
}

function validId(value: unknown) {
  return /^[1-9]\d*$/.test(String(value || "")) ? String(value) : null;
}

export async function GET() {
  try {
    const result = await leadPool().query(`SELECT o.id::text, o.candidate_id::text, o.recipient_email, o.subject, o.body,
      o.source_url, o.legal_basis, o.legal_evidence, o.status, o.revision, o.approved_at, o.attempted_at, o.sent_at,
      o.provider_message_id, o.last_error, c.site_title, c.opportunity_score
      FROM lead_outreach o JOIN lead_candidates c ON c.id = o.candidate_id
      ORDER BY o.created_at DESC LIMIT 100`);
    return NextResponse.json({ drafts: result.rows, sendEnabled: process.env.LEADS_OUTREACH_ENABLED === "true" }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return failure(error); }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const id = validId(body?.id);
  if (!id || !["edit", "approve", "cancel"].includes(body?.action) || !Number.isSafeInteger(body?.expectedRevision) || body.expectedRevision < 0) {
    return NextResponse.json({ error: "Ongeldige outreach-actie." }, { status: 400 });
  }

  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    const result = await client.query<{
      recipient_email: string | null; subject: string; body: string; legal_basis: string;
      legal_evidence: string | null; status: string; revision: number;
    }>("SELECT recipient_email, subject, body, legal_basis, legal_evidence, status, revision FROM lead_outreach WHERE id = $1 FOR UPDATE", [id]);
    const draft = result.rows[0];
    if (!draft) throw new LeadControlError("Concept niet gevonden.", 404);
    if (draft.revision !== body.expectedRevision) throw new LeadControlError("Het concept is elders gewijzigd. Herlaad de pagina en controleer de tekst opnieuw.", 409);
    if (!["draft", "approved"].includes(draft.status)) throw new LeadControlError("Dit bericht is niet meer bewerkbaar. Controleer eerst de verzendstatus.", 409);

    if (body.action === "edit") {
      const recipient = String(body.recipientEmail || "").trim().toLowerCase();
      const subject = String(body.subject || "").trim();
      const message = String(body.message || "").trim();
      const legalBasis = String(body.legalBasis || "none");
      const legalEvidence = String(body.legalEvidence || "").trim();
      if ((recipient && (recipient.length > 254 || !emailPattern.test(recipient))) || subject.length < 5 || subject.length > 150 || message.length < 20 || message.length > 5000 || !/afmelden/i.test(message) || !["none", "consent", "existing_customer"].includes(legalBasis) || legalEvidence.length > 2000) {
        throw new LeadControlError("Controleer ontvanger, onderwerp, tekst en contactgrond.", 400);
      }
      await client.query(`UPDATE lead_outreach SET recipient_email = $2, subject = $3, body = $4,
        legal_basis = $5, legal_evidence = $6, status = 'draft', approved_at = NULL, revision = revision + 1, updated_at = now()
        WHERE id = $1`, [id, recipient || null, subject, message, legalBasis, legalEvidence || null]);
    } else if (body.action === "approve") {
      if (draft.status !== "draft") throw new LeadControlError("Dit bericht is al goedgekeurd.", 409);
      if (!draft.recipient_email || !emailPattern.test(draft.recipient_email) || !["consent", "existing_customer"].includes(draft.legal_basis) || !draft.legal_evidence || draft.legal_evidence.trim().length < 20) {
        throw new LeadControlError("Vul eerst de ontvanger en een gedocumenteerde geldige contactgrond in.", 422);
      }
      if (!/afmelden/i.test(draft.body)) throw new LeadControlError("Voeg eerst een duidelijke afmeldmogelijkheid toe aan het bericht.", 422);
      const suppressed = await client.query("SELECT 1 FROM lead_contact_suppression WHERE email = $1", [draft.recipient_email]);
      if (suppressed.rowCount) throw new LeadControlError("Deze ontvanger staat op de uitsluitlijst.", 423);
      await client.query("UPDATE lead_outreach SET status = 'approved', approval_version = approval_version + 1, revision = revision + 1, approved_at = now(), updated_at = now() WHERE id = $1", [id]);
    } else {
      await client.query("UPDATE lead_outreach SET status = 'cancelled', approved_at = NULL, revision = revision + 1, updated_at = now() WHERE id = $1", [id]);
    }
    await client.query("COMMIT");
    return NextResponse.json({ ok: true });
  } catch (error) {
    await client.query("ROLLBACK");
    return failure(error);
  } finally { client.release(); }
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  const reason = String(body?.reason || "").trim();
  if (!emailPattern.test(email) || email.length > 254 || reason.length < 3 || reason.length > 500) {
    return NextResponse.json({ error: "Geef een geldig e-mailadres en reden voor uitsluiting op." }, { status: 400 });
  }
  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    await client.query(`INSERT INTO lead_contact_suppression (email, reason) VALUES ($1, $2)
      ON CONFLICT (email) DO UPDATE SET reason = EXCLUDED.reason`, [email, reason]);
    await client.query(`UPDATE lead_outreach SET status = 'cancelled', approved_at = NULL, revision = revision + 1, updated_at = now()
      WHERE recipient_email = $1 AND status IN ('draft', 'approved')`, [email]);
    await client.query("COMMIT");
    return NextResponse.json({ ok: true });
  } catch (error) {
    await client.query("ROLLBACK");
    return failure(error);
  } finally { client.release(); }
}
