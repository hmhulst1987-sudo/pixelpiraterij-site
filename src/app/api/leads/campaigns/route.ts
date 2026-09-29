import { NextRequest, NextResponse } from "next/server";
import { LeadControlError, leadPool } from "@/lib/lead-control";

export const runtime = "nodejs";

function fail(error: unknown) {
  if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
  return NextResponse.json({ error: "Campagnes zijn tijdelijk niet beschikbaar." }, { status: 503 });
}

export async function GET() {
  try {
    const [campaigns, runs] = await Promise.all([
      leadPool().query("SELECT id::text, label, latitude, longitude, radius_m, interval_minutes, max_candidates, enabled, next_run_at FROM lead_campaigns ORDER BY id DESC LIMIT 50"),
      leadPool().query(`SELECT r.id::text, r.campaign_id::text, r.status, r.places_found, r.websites_scanned, r.deep_scanned,
        r.error, r.started_at, r.finished_at, COALESCE(u.places, 0)::int AS places_requests,
        COALESCE(u.firecrawl, 0)::int AS firecrawl_requests
        FROM lead_runs r LEFT JOIN (
          SELECT run_id, SUM(units) FILTER (WHERE kind = 'places') AS places,
            SUM(units) FILTER (WHERE kind = 'firecrawl') AS firecrawl
          FROM lead_usage WHERE run_id IS NOT NULL GROUP BY run_id
        ) u ON u.run_id = r.id ORDER BY r.id DESC LIMIT 20`),
    ]);
    return NextResponse.json({ campaigns: campaigns.rows, runs: runs.rows }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return fail(error); }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const label = String(body.label || "").trim();
    const latitude = Number(body.latitude);
    const longitude = Number(body.longitude);
    const radius = Number(body.radius);
    const intervalHours = Number(body.intervalHours);
    const maxCandidates = Number(body.maxCandidates);
    if (label.length < 1 || label.length > 120 || !Number.isFinite(latitude) || Math.abs(latitude) > 90 || !Number.isFinite(longitude) || Math.abs(longitude) > 180 || !Number.isSafeInteger(radius) || radius < 500 || radius > 50000 || !Number.isSafeInteger(intervalHours) || intervalHours < 1 || intervalHours > 720 || !Number.isSafeInteger(maxCandidates) || maxCandidates < 1 || maxCandidates > 100) {
      return NextResponse.json({ error: "Controleer plaats, straal, interval en maximum kandidaten." }, { status: 400 });
    }
    const result = await leadPool().query("INSERT INTO lead_campaigns (label, latitude, longitude, radius_m, interval_minutes, max_candidates) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id::text", [label, latitude, longitude, radius, intervalHours * 60, maxCandidates]);
    return NextResponse.json({ id: result.rows[0].id }, { status: 201 });
  } catch (error) { return fail(error); }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    if (!/^[1-9]\d*$/.test(String(body.id || "")) || typeof body.enabled !== "boolean") return NextResponse.json({ error: "Ongeldige campagne of status." }, { status: 400 });
    const result = await leadPool().query("UPDATE lead_campaigns SET enabled = $2, updated_at = now() WHERE id = $1 RETURNING id::text", [body.id, body.enabled]);
    if (!result.rowCount) return NextResponse.json({ error: "Campagne niet gevonden." }, { status: 404 });
    return NextResponse.json({ id: result.rows[0].id, enabled: body.enabled });
  } catch (error) { return fail(error); }
}
