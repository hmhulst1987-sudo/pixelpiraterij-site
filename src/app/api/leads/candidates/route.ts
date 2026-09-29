import { NextRequest, NextResponse } from "next/server";
import { LeadControlError, leadPool } from "@/lib/lead-control";

export const runtime = "nodejs";

function fail(error: unknown) {
  if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
  return NextResponse.json({ error: "De leadlijst is tijdelijk niet beschikbaar." }, { status: 503 });
}

export async function GET() {
  try {
    const result = await leadPool().query("SELECT id::text, source_site_url, site_title, technical_score, opportunity_score, size_class, status, audit, deep_audit, first_seen_at, last_seen_at FROM lead_candidates WHERE status <> 'dismissed' ORDER BY opportunity_score DESC, last_seen_at DESC LIMIT 100");
    return NextResponse.json({ candidates: result.rows }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return fail(error); }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    if (!/^[1-9]\d*$/.test(String(body.id || "")) || !["new", "reviewing", "dismissed", "shortlisted"].includes(body.status)) return NextResponse.json({ error: "Ongeldige leadstatus." }, { status: 400 });
    const result = await leadPool().query("UPDATE lead_candidates SET status = $2 WHERE id = $1 RETURNING id::text", [body.id, body.status]);
    if (!result.rowCount) return NextResponse.json({ error: "Lead niet gevonden." }, { status: 404 });
    return NextResponse.json({ id: result.rows[0].id, status: body.status });
  } catch (error) { return fail(error); }
}
