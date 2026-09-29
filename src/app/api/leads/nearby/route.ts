import { NextRequest, NextResponse } from "next/server";
import { finishLeadUsage, LeadControlError, reserveLeadUsage } from "@/lib/lead-control";

export const runtime = "nodejs";

type GooglePlace = {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  websiteUri?: string;
  primaryType?: string;
  location?: { latitude: number; longitude: number };
};

const SEARCH_GROUPS = [
  ["bakery", "cafe", "restaurant", "florist"],
  ["hair_care", "beauty_salon", "spa", "laundry"],
  ["car_repair", "furniture_store", "home_goods_store", "pet_store"],
  ["lodging", "travel_agency", "real_estate_agency"],
  ["gym", "book_store", "jewelry_store", "shoe_store"],
];

export async function POST(request: NextRequest) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return NextResponse.json({ error: "GOOGLE_PLACES_API_KEY is nog niet ingesteld." }, { status: 503 });
  const automatic = request.headers.get("authorization")?.startsWith("Bearer ") === true;

  const body = await request.json();
  const runId = body.runId === undefined ? undefined : String(body.runId);
  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);
  const radius = Math.min(50_000, Math.max(500, Number(body.radius) || 20_000));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    return NextResponse.json({ error: "Kies eerst een geldig punt op de kaart." }, { status: 400 });
  }

  let usageId: string;
  try { usageId = await reserveLeadUsage("search_runs", 1, automatic, runId); }
  catch (error) { return controlFailure(error); }

  const tasks: Promise<GooglePlace[]>[] = [];
  let limitError: LeadControlError | null = null;
  for (const includedTypes of SEARCH_GROUPS) {
    let requestId: string;
    try { requestId = await reserveLeadUsage("places", 1, automatic, runId); }
    catch (error) {
      if (error instanceof LeadControlError) { limitError = error; break; }
      throw error;
    }
    tasks.push((async () => {
      let status: number | undefined;
      try {
        const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": key,
            "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.websiteUri,places.primaryType,places.location",
          },
          body: JSON.stringify({
            includedTypes,
            maxResultCount: 20,
            rankPreference: "DISTANCE",
            languageCode: "nl",
            regionCode: "NL",
            locationRestriction: { circle: { center: { latitude, longitude }, radius } },
          }),
          signal: AbortSignal.timeout(15_000),
        });
        status = response.status;
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error?.message || "Nearby Search is mislukt.");
        return (data.places || []) as GooglePlace[];
      } finally {
        await finishLeadUsage(requestId, status !== undefined && status < 400, status);
      }
    })());
  }

  const settled = await Promise.allSettled(tasks);

  const places = new Map<string, GooglePlace>();
  for (const result of settled) {
    if (result.status === "fulfilled") {
      for (const place of result.value) places.set(place.id, place);
    }
  }
  const failures = settled.filter((result) => result.status === "rejected").length;
  await finishLeadUsage(usageId, places.size > 0 || (!failures && !limitError));
  if (places.size === 0 && limitError) return controlFailure(limitError);
  if (places.size === 0 && failures) {
    return NextResponse.json({ error: "Google Places gaf voor deze zoekcirkel geen bruikbare resultaten." }, { status: 502 });
  }
  return NextResponse.json({ places: [...places.values()], requestCount: tasks.length, failures, limitReached: limitError?.message });
}

function controlFailure(error: unknown) {
  if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
  return NextResponse.json({ error: "De verbruiksbewaking is niet beschikbaar." }, { status: 503 });
}
