import { NextRequest, NextResponse } from "next/server";
import { LeadControlError, leadPool } from "@/lib/lead-control";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (request.headers.get("x-lead-manual-send") !== "confirmed") {
    return NextResponse.json({ error: "Afzonderlijke handmatige verzendbevestiging ontbreekt." }, { status: 403 });
  }
  if (process.env.LEADS_OUTREACH_ENABLED !== "true" || !process.env.RESEND_API_KEY || !process.env.LEADS_OUTREACH_FROM) {
    return NextResponse.json({ error: "Verzenden staat uit totdat afzender en juridische controle zijn ingesteld." }, { status: 503 });
  }
  const body = await request.json().catch(() => null);
  const id = String(body?.id || "");
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(body?.expectedRevision) || body.expectedRevision < 0) return NextResponse.json({ error: "Ongeldig bericht of versie." }, { status: 400 });

  let mail: { recipient_email: string; subject: string; body: string; approval_version: number };
  let claimed = false;
  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    const row = await client.query<typeof mail & { status: string; legal_basis: string; legal_evidence: string | null; revision: number }>(
      "SELECT recipient_email, subject, body, approval_version, status, legal_basis, legal_evidence, revision FROM lead_outreach WHERE id = $1 FOR UPDATE", [id]
    );
    const draft = row.rows[0];
    if (!draft) throw new LeadControlError("Bericht niet gevonden.", 404);
    if (draft.revision !== body.expectedRevision) throw new LeadControlError("De goedgekeurde tekst is gewijzigd. Herlaad en controleer opnieuw.", 409);
    if (draft.status !== "approved") throw new LeadControlError("Dit bericht is niet afzonderlijk goedgekeurd of is al verzonden.", 409);
    if (!draft.recipient_email || !["consent", "existing_customer"].includes(draft.legal_basis) || !draft.legal_evidence || draft.legal_evidence.trim().length < 20) {
      throw new LeadControlError("Vastgelegde contactgrond ontbreekt.", 422);
    }
    if (!/afmelden/i.test(draft.body)) throw new LeadControlError("Een duidelijke afmeldmogelijkheid ontbreekt.", 422);
    const suppressed = await client.query("SELECT 1 FROM lead_contact_suppression WHERE email = $1", [draft.recipient_email]);
    if (suppressed.rowCount) throw new LeadControlError("Deze ontvanger staat op de uitsluitlijst.", 423);
    await client.query("UPDATE lead_outreach SET status = 'sending', attempted_at = now(), updated_at = now() WHERE id = $1", [id]);
    await client.query("COMMIT");
    claimed = true;
    mail = draft;
  } catch (error) {
    if (!claimed) await client.query("ROLLBACK");
    if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: "Verzendcontrole is tijdelijk niet beschikbaar." }, { status: 503 });
  } finally { client.release(); }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `pixel-lead-${id}-v${mail.approval_version}`,
      },
      body: JSON.stringify({
        from: process.env.LEADS_OUTREACH_FROM,
        to: [mail.recipient_email], subject: mail.subject, text: mail.body,
        headers: { "List-Unsubscribe": "<mailto:info@pixelpiraterij.nl?subject=Afmelden%20PixelPiraterij>" },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json().catch(() => null) as { id?: string } | null;
    if (!response.ok || !result?.id) throw new Error(`Resend HTTP ${response.status}; delivery state must be checked manually.`);
    await leadPool().query("UPDATE lead_outreach SET status = 'sent', provider_message_id = $2, sent_at = now(), updated_at = now() WHERE id = $1 AND status = 'sending'", [id, result.id]);
    return NextResponse.json({ sent: true, providerMessageId: result.id });
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 500) : "Onbekende verzendstatus";
    await leadPool().query("UPDATE lead_outreach SET status = 'failed_unknown', last_error = $2, updated_at = now() WHERE id = $1 AND status = 'sending'", [id, message]).catch(() => undefined);
    return NextResponse.json({ error: "Verzendstatus onzeker. Controleer Resend voordat je iets opnieuw probeert; er wordt niet automatisch opnieuw verzonden." }, { status: 502 });
  }
}
