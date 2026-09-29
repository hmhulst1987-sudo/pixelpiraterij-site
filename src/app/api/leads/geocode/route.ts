import { NextRequest, NextResponse } from "next/server";
import { finishLeadUsage, LeadControlError, reserveLeadUsage } from "@/lib/lead-control";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return NextResponse.json({ error: "Google Maps is nog niet geconfigureerd." }, { status: 503 });
  const { location } = await request.json();
  const address = `${String(location || "").trim().slice(0, 120)}, Nederland`;
  if (address.length < 12) return NextResponse.json({ error: "Vul een plaats in." }, { status: 400 });

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("region", "nl");
  url.searchParams.set("language", "nl");
  url.searchParams.set("key", key);
  let id: string;
  try { id = await reserveLeadUsage("geocode", 1, false); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "De meter is niet beschikbaar." }, { status: error instanceof LeadControlError ? error.status : 503 }); }
  let status: number | undefined;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    status = response.status;
    const data = await response.json();
    const point = data.results?.[0]?.geometry?.location;
    if (!response.ok || data.status !== "OK" || !point) {
      return NextResponse.json({ error: data.error_message || "Deze plaats kon niet worden gevonden." }, { status: 422 });
    }
    return NextResponse.json({ center: { lat: point.lat, lng: point.lng }, formattedAddress: data.results[0].formatted_address });
  } catch {
    return NextResponse.json({ error: "Google Maps kon deze plaats niet ophalen." }, { status: 502 });
  } finally {
    await finishLeadUsage(id, status !== undefined && status < 400, status);
  }
}
