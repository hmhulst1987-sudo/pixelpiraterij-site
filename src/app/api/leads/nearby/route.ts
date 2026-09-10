import { NextRequest, NextResponse } from "next/server";

type GooglePlace = {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  websiteUri?: string;
  primaryType?: string;
  location?: { latitude: number; longitude: number };
};

const SEARCH_GROUPS = [
  ["restaurant", "cafe", "bakery", "bar"],
  ["clothing_store", "shoe_store", "furniture_store", "florist", "jewelry_store", "book_store"],
  ["hair_care", "beauty_salon", "spa", "laundry", "car_repair", "real_estate_agency", "travel_agency"],
  ["lawyer", "accounting", "dentist", "doctor", "physiotherapist"],
  ["gym", "lodging", "pet_store", "veterinary_care", "home_goods_store"],
];

export async function POST(request: NextRequest) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return NextResponse.json({ error: "GOOGLE_PLACES_API_KEY is nog niet ingesteld." }, { status: 503 });

  const body = await request.json();
  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);
  const radius = Math.min(50_000, Math.max(500, Number(body.radius) || 20_000));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    return NextResponse.json({ error: "Kies eerst een geldig punt op de kaart." }, { status: 400 });
  }

  const settled = await Promise.allSettled(SEARCH_GROUPS.map(async (includedTypes) => {
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
        rankPreference: "POPULARITY",
        languageCode: "nl",
        regionCode: "NL",
        locationRestriction: { circle: { center: { latitude, longitude }, radius } },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "Nearby Search is mislukt.");
    return (data.places || []) as GooglePlace[];
  }));

  const places = new Map<string, GooglePlace>();
  for (const result of settled) {
    if (result.status === "fulfilled") {
      for (const place of result.value) places.set(place.id, place);
    }
  }
  const failures = settled.filter((result) => result.status === "rejected").length;
  if (places.size === 0 && failures) {
    return NextResponse.json({ error: "Google Places gaf voor deze zoekcirkel geen bruikbare resultaten." }, { status: 502 });
  }
  return NextResponse.json({ places: [...places.values()], requestCount: SEARCH_GROUPS.length, failures });
}
