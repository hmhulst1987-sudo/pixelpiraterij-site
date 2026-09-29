import { NextRequest, NextResponse } from "next/server";
import { deepAuditWebsite } from "@/lib/firecrawl-lead-audit";
import { finishLeadUsage, LeadControlError, leadControlSnapshot, reserveLeadUsage } from "@/lib/lead-control";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return NextResponse.json({ error: "Firecrawl is nog niet ingesteld." }, { status: 503 });
  try {
    const automatic = request.headers.get("authorization")?.startsWith("Bearer ") === true;
    if (automatic) {
      const control = await leadControlSnapshot();
      if (control.mode !== "running") throw new LeadControlError("De lead-worker staat gepauzeerd.", 423);
    }
    const body = await request.json();
    if (typeof body.website !== "string" || body.website.length > 500 || (body.contactPage !== undefined && (typeof body.contactPage !== "string" || body.contactPage.length > 500))) {
      return NextResponse.json({ error: "Ongeldige website of contactpagina." }, { status: 400 });
    }
    const runId = body.runId === undefined ? undefined : String(body.runId);
    let requestsAttempted = 0;
    const blockState: { current: LeadControlError | null } = { current: null };
    const meteredFetch: typeof fetch = async (input, init) => {
      let id: string;
      try { id = await reserveLeadUsage("firecrawl", 1, automatic, runId); }
      catch (error) {
        if (error instanceof LeadControlError) blockState.current = error;
        throw error;
      }
      requestsAttempted += 1;
      let status: number | undefined;
      try {
        const response = await fetch(input, init);
        status = response.status;
        return response;
      } finally {
        await finishLeadUsage(id, status !== undefined && status < 400, status);
      }
    };
    const audit = await deepAuditWebsite(body.website, body.contactPage, key, meteredFetch);
    audit.requestsAttempted = requestsAttempted;
    return NextResponse.json({ audit, limitReached: blockState.current?.message || null, controlStatus: blockState.current?.status || null }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Verdieping mislukt." }, { status: 422 });
  }
}
