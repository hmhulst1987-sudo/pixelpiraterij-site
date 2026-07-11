import { NextResponse } from "next/server";

import { evaluateDomainCandidate } from "@/lib/template-route-phase-two";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { domain?: unknown; locale?: unknown };
    const domain = typeof body.domain === "string" ? body.domain : "";
    const locale = body.locale === "en" ? "en" : "nl";
    const evaluation = evaluateDomainCandidate(domain, locale);

    return NextResponse.json({
      success: evaluation.status !== "invalid",
      ...evaluation,
      checkedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        normalizedDomain: "",
        status: "invalid",
        message: "The domain intake payload could not be read.",
        registrarStep: "Try again with only the desired domain name.",
        tld: null,
        checkedAt: new Date().toISOString(),
      },
      { status: 400 },
    );
  }
}
