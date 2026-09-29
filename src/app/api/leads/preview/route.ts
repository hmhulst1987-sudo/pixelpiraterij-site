import { NextRequest, NextResponse } from "next/server";
import { finishLeadUsage, LeadControlError, reserveLeadUsage } from "@/lib/lead-control";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const serviceUrl = process.env.PREVIEW_SERVICE_URL;
  const token = process.env.PREVIEW_SERVICE_TOKEN;
  if (!serviceUrl || !token) return NextResponse.json({ error: "De private previewservice is nog niet geconfigureerd." }, { status: 503 });

  try {
    const draft = await request.json() as Record<string, unknown>;
    if (draft.verified !== true) return NextResponse.json({ error: "Controleer de bedrijfsgegevens eerst bij de oorspronkelijke website." }, { status: 422 });
    const business = Object.fromEntries(["name", "city", "service", "tagline", "description", "phone", "email"]
      .map((key) => [key, typeof draft[key] === "string" ? String(draft[key]).trim() : ""]));
    if (!business.name || !business.service || (!business.phone && !business.email)) {
      return NextResponse.json({ error: "Naam, dienst en een geverifieerd telefoonnummer of e-mailadres zijn verplicht." }, { status: 422 });
    }
    const usageId = await reserveLeadUsage("previews", 1, false);
    const endpoint = new URL("/api/previews", serviceUrl);
    let status: number | undefined;
    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ template: "service-editorial", ...business }),
        signal: AbortSignal.timeout(15_000),
        cache: "no-store",
      });
      status = response.status;
    } finally {
      await finishLeadUsage(usageId, status !== undefined && status < 400, status);
    }
    const result = await response.json() as { path?: string; error?: string };
    if (!response.ok || !result.path || !/^\/preview\/[a-z0-9-]{1,90}\/$/.test(result.path)) {
      return NextResponse.json({ error: result.error || "De preview kon niet worden gemaakt." }, { status: response.ok ? 502 : response.status });
    }
    return NextResponse.json({ url: `/studio/leads/previews${result.path.slice("/preview".length)}` });
  } catch (error) {
    if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: error instanceof Error ? error.message : "De preview kon niet worden gemaakt." }, { status: 502 });
  }
}
