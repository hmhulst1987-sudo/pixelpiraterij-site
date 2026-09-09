import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return NextResponse.json({ error: "GOOGLE_PLACES_API_KEY is nog niet ingesteld." }, { status: 503 });
  const { sector, location } = await request.json();
  const textQuery = `${String(sector || "").trim()} in ${String(location || "").trim()}`.slice(0, 200);
  if (textQuery.length < 6) return NextResponse.json({ error: "Vul een branche en plaats in." }, { status: 400 });
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key, "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.websiteUri,places.primaryType" },
    body: JSON.stringify({ textQuery, languageCode: "nl", regionCode: "NL", pageSize: 20 }),
    signal: AbortSignal.timeout(12000),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
