import { NextRequest, NextResponse } from "next/server";
import { LeadControlError, leadPool } from "@/lib/lead-control";
import { normalizeDutchPhone } from "@/lib/lead-phone";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const candidateId = String(body?.candidateId || "");
  const phone = typeof body?.phone === "string" ? normalizeDutchPhone(body.phone) : null;
  const action = body?.action;
  if (!/^[1-9]\d*$/.test(candidateId) || !phone || !["save", "suppress"].includes(action)) {
    return NextResponse.json({ error: "Controleer kandidaat, telefoonnummer en actie." }, { status: 400 });
  }

  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    const candidate = await client.query<{ source_site_url: string }>("SELECT source_site_url FROM lead_candidates WHERE id = $1", [candidateId]);
    if (!candidate.rows[0]) throw new LeadControlError("Kandidaat niet gevonden.", 404);
    if (action === "suppress") {
      const reason = String(body.reason || "").trim();
      if (reason.length < 3 || reason.length > 500) throw new LeadControlError("Vul een reden voor de telefoonuitsluiting in.", 400);
      await client.query(`INSERT INTO lead_phone_suppression (phone, reason) VALUES ($1, $2)
        ON CONFLICT (phone) DO UPDATE SET reason = EXCLUDED.reason`, [phone, reason]);
    } else {
      const legalForm = String(body.legalForm || "unknown");
      const evidence = String(body.consentEvidence || "").trim();
      const phoneSourceUrl = String(body.phoneSourceUrl || "").trim();
      if (!["unknown", "natural_person", "legal_entity"].includes(legalForm) || evidence.length > 2000 || phoneSourceUrl.length > 500) {
        throw new LeadControlError("Controleer rechtsvorm, toestemmingsbewijs en bron.", 400);
      }
      let source: URL;
      try { source = new URL(phoneSourceUrl); }
      catch { throw new LeadControlError("Gebruik een URL van de oorspronkelijke bedrijfswebsite als telefoonbron.", 400); }
      const original = new URL(candidate.rows[0].source_site_url);
      if (!["http:", "https:"].includes(source.protocol) || source.hostname !== original.hostname || source.username || source.password) {
        throw new LeadControlError("De telefoonbron moet de oorspronkelijke bedrijfswebsite zijn.", 400);
      }
      await client.query(`INSERT INTO lead_call_reviews (candidate_id, phone, legal_form, phone_source_url, consent_evidence)
        VALUES ($1, $2, $3, $4, $5) ON CONFLICT (candidate_id) DO UPDATE SET phone = EXCLUDED.phone,
        legal_form = EXCLUDED.legal_form, phone_source_url = EXCLUDED.phone_source_url,
        consent_evidence = EXCLUDED.consent_evidence, reviewed_at = now()`, [candidateId, phone, legalForm, source.href, evidence || null]);
    }
    await client.query("COMMIT");
    return NextResponse.json({ ok: true });
  } catch (error) {
    await client.query("ROLLBACK");
    if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: "De belcontrole is tijdelijk niet beschikbaar." }, { status: 503 });
  } finally { client.release(); }
}
