import { NextRequest, NextResponse } from "next/server";
import { auditWebsite } from "@/lib/website-audit";
import { LeadControlError, leadControlSnapshot } from "@/lib/lead-control";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("authorization")?.startsWith("Bearer ")) {
      const control = await leadControlSnapshot();
      if (control.mode !== "running") throw new LeadControlError("De lead-worker staat gepauzeerd.", 423);
    }
    const { website, businessName } = await request.json();
    return NextResponse.json({ audit: await auditWebsite(String(website || "").slice(0, 500), String(businessName || "").slice(0, 160)) });
  } catch (error) {
    if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Scannen mislukt." }, { status: 422 });
  }
}
