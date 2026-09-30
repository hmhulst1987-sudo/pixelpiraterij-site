import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { finishPreviewRequest, LeadControlError, reservePreviewRequest } from "@/lib/lead-control";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const serviceUrl = process.env.PREVIEW_SERVICE_URL;
  const token = process.env.PREVIEW_SERVICE_TOKEN;
  if (!serviceUrl || !token) return NextResponse.json({ error: "De private previewservice is nog niet geconfigureerd." }, { status: 503 });

  try {
    const draft = await request.json() as Record<string, unknown>;
    if (typeof draft.idempotencyKey !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(draft.idempotencyKey)) {
      return NextResponse.json({ error: "Ongeldige conceptaanvraag. Open het conceptformulier opnieuw." }, { status: 400 });
    }
    if (draft.verified !== true) return NextResponse.json({ error: "Controleer de bedrijfsgegevens eerst bij de oorspronkelijke website." }, { status: 422 });
    const template = draft.template ?? "service-editorial";
    if (template !== "service-editorial" && template !== "garden-atelier" && template !== "harbor-light" && template !== "estate-editorial") {
      return NextResponse.json({ error: "Kies een beschikbare concepttemplate." }, { status: 422 });
    }
    const business = Object.fromEntries(["name", "city", "service", "tagline", "description", "phone", "email"]
      .map((key) => [key, typeof draft[key] === "string" ? String(draft[key]).trim() : ""]));
    if (!business.name || !business.service || (!business.phone && !business.email)) {
      return NextResponse.json({ error: "Naam, dienst en een geverifieerd telefoonnummer of e-mailadres zijn verplicht." }, { status: 422 });
    }
    const payload = JSON.stringify({ template, ...business });
    const candidateId = String(draft.candidateId || "");
    const sourceUrl = typeof draft.sourceUrl === "string" ? draft.sourceUrl : "";
    const digest = createHash("sha256").update(JSON.stringify({ payload, candidateId, sourceUrl })).digest("hex");
    const reservation = await reservePreviewRequest(draft.idempotencyKey, digest, candidateId, sourceUrl);
    if (reservation.previewPath) {
      return NextResponse.json({ url: `/studio/leads/previews${reservation.previewPath.slice("/preview".length)}` });
    }
    const endpoint = new URL("/api/previews", serviceUrl);
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Idempotency-Key": draft.idempotencyKey },
        body: payload,
        signal: AbortSignal.timeout(15_000),
        cache: "no-store",
      });
    const result = await response.json() as { path?: string; error?: string };
    const validPath = response.ok && result.path && /^\/preview\/[a-z0-9-]{1,90}\/$/.test(result.path) ? result.path : null;
    const finalPath = await finishPreviewRequest(draft.idempotencyKey, reservation.usageId, validPath, response.status);
    if (!finalPath) {
      return NextResponse.json({ error: result.error || "De preview kon niet worden gemaakt." }, { status: response.ok ? 502 : response.status });
    }
    return NextResponse.json({ url: `/studio/leads/previews${finalPath.slice("/preview".length)}` });
  } catch (error) {
    if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: error instanceof Error ? error.message : "De preview kon niet worden gemaakt." }, { status: 502 });
  }
}
