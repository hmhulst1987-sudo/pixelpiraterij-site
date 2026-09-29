import { NextRequest, NextResponse } from "next/server";
import { LeadControlError, leadControlSnapshot, setLeadControl } from "@/lib/lead-control";
import { usageKinds, type LeadLimits, type LeadMode } from "@/lib/lead-control-shared";

export const runtime = "nodejs";

function failure(error: unknown) {
  if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
  return NextResponse.json({ error: "De lead-controle is tijdelijk niet beschikbaar." }, { status: 503 });
}

export async function GET() {
  try {
    return NextResponse.json(await leadControlSnapshot(), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return failure(error); }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { mode?: unknown; limits?: unknown };
    if (body.mode !== "paused" && body.mode !== "running") return NextResponse.json({ error: "Kies Start of Pauze." }, { status: 400 });
    if (body.limits !== undefined && (!body.limits || typeof body.limits !== "object" || Array.isArray(body.limits))) {
      return NextResponse.json({ error: "Ongeldige limieten." }, { status: 400 });
    }
    const limits = body.limits as Partial<LeadLimits> | undefined;
    if (limits && Object.keys(limits).some((key) => !usageKinds.includes(key as (typeof usageKinds)[number]))) {
      return NextResponse.json({ error: "Onbekende limiet." }, { status: 400 });
    }
    if (body.mode === "running" && !process.env.GOOGLE_PLACES_API_KEY) {
      return NextResponse.json({ error: "Stel eerst de server-sleutel voor Google Places in." }, { status: 503 });
    }
    const state = await setLeadControl(body.mode as LeadMode, limits);
    return NextResponse.json(state, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return failure(error); }
}
