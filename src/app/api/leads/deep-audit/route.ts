import { NextRequest, NextResponse } from "next/server";
import { deepAuditWebsite } from "@/lib/firecrawl-lead-audit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return NextResponse.json({ error: "Firecrawl is nog niet ingesteld." }, { status: 503 });
  try {
    const body = await request.json();
    if (typeof body.website !== "string" || body.website.length > 500 || (body.contactPage !== undefined && (typeof body.contactPage !== "string" || body.contactPage.length > 500))) {
      return NextResponse.json({ error: "Ongeldige website of contactpagina." }, { status: 400 });
    }
    const audit = await deepAuditWebsite(body.website, body.contactPage, key);
    return NextResponse.json({ audit }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Verdieping mislukt." }, { status: 422 });
  }
}
