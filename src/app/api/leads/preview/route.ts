import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const serviceUrl = process.env.PREVIEW_SERVICE_URL;
  const token = process.env.PREVIEW_SERVICE_TOKEN;
  const publicBase = process.env.PREVIEW_PUBLIC_BASE_URL;
  if (!serviceUrl || !token || !publicBase) return NextResponse.json({ error: "De private previewservice is nog niet geconfigureerd." }, { status: 503 });

  try {
    const draft = await request.json() as Record<string, unknown>;
    if (draft.verified !== true) return NextResponse.json({ error: "Controleer de bedrijfsgegevens eerst bij de oorspronkelijke website." }, { status: 422 });
    const business = Object.fromEntries(["name", "city", "service", "tagline", "description", "phone", "email"]
      .map((key) => [key, typeof draft[key] === "string" ? String(draft[key]).trim() : ""]));
    if (!business.name || !business.service || (!business.phone && !business.email)) {
      return NextResponse.json({ error: "Naam, dienst en een geverifieerd telefoonnummer of e-mailadres zijn verplicht." }, { status: 422 });
    }
    const endpoint = new URL("/api/previews", serviceUrl);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ template: "service-editorial", ...business }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    const result = await response.json() as { path?: string; error?: string };
    if (!response.ok || !result.path || !/^\/preview\/[a-z0-9-]{1,90}\/$/.test(result.path)) {
      return NextResponse.json({ error: result.error || "De preview kon niet worden gemaakt." }, { status: response.ok ? 502 : response.status });
    }
    const base = new URL(publicBase);
    if (base.protocol !== "https:" && base.hostname !== "localhost") throw new Error("De publieke preview-URL moet HTTPS gebruiken.");
    return NextResponse.json({ url: new URL(result.path, base).href });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "De preview kon niet worden gemaakt." }, { status: 502 });
  }
}
