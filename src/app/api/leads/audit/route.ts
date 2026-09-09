import { NextRequest, NextResponse } from "next/server";
import { auditWebsite } from "@/lib/website-audit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { website } = await request.json();
    return NextResponse.json({ audit: await auditWebsite(String(website || "").slice(0, 500)) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Scannen mislukt." }, { status: 422 });
  }
}
