import { NextRequest, NextResponse } from "next/server";
import { LeadControlError, leadPool } from "@/lib/lead-control";

export const runtime = "nodejs";

function fail(error: unknown) {
  if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
  return NextResponse.json({ error: "De leadlijst is tijdelijk niet beschikbaar." }, { status: 503 });
}

export async function GET(request: NextRequest) {
  try {
    const shortlistOnly = request.nextUrl.searchParams.get("status") === "shortlisted";
    const result = await leadPool().query(`SELECT c.id::text, c.source_site_url, c.site_title, c.technical_score, c.opportunity_score,
      c.size_class, c.status, c.audit, c.deep_audit, c.first_seen_at, c.last_seen_at,
      (SELECT j.status FROM lead_deep_jobs j WHERE j.candidate_id = c.id ORDER BY j.id DESC LIMIT 1) AS deep_job_status
      FROM lead_candidates c WHERE c.status = 'shortlisted' OR ($1 = false AND c.status <> 'dismissed')
      ORDER BY CASE WHEN c.status = 'shortlisted' THEN 0 ELSE 1 END, c.opportunity_score DESC, c.last_seen_at DESC LIMIT 200`, [shortlistOnly]);
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
