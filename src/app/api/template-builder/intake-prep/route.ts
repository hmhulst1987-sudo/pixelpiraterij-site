import { NextResponse } from "next/server";

import { evaluateIntakePreparation, parseWorkspace, type TemplateRouteWorkspace } from "@/lib/template-route-phase-two";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { workspace?: TemplateRouteWorkspace; locale?: "nl" | "en" };
    const locale = body.locale === "en" ? "en" : "nl";

    if (!body.workspace) {
      return NextResponse.json(
        {
          success: false,
          status: "needs_review",
          summary: locale === "nl" ? "Workspace ontbreekt." : "Workspace is missing.",
          nextStep: locale === "nl" ? "Stuur eerst een geldige workspace mee." : "Send a valid workspace first.",
          talkingPoints: [],
          warnings: [],
          fieldStatus: [],
          payloadPreview: {},
        },
        { status: 400 },
      );
    }

    const parsed = parseWorkspace(JSON.stringify(body.workspace), locale);

    if (!parsed) {
      return NextResponse.json(
        {
          success: false,
          status: "needs_review",
          summary: locale === "nl" ? "Workspace kon niet worden gelezen." : "Workspace could not be parsed.",
          nextStep: locale === "nl" ? "Controleer de opgeslagen projectstate." : "Check the stored project state.",
          talkingPoints: [],
          warnings: [],
          fieldStatus: [],
          payloadPreview: {},
        },
        { status: 400 },
      );
    }

    const preparation = evaluateIntakePreparation(parsed);

    return NextResponse.json({
      success: preparation.status === "ready",
      ...preparation,
      preparedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        status: "needs_review",
        summary: "Intake preparation failed.",
        nextStep: "Try again with a valid workspace payload.",
        talkingPoints: [],
        warnings: [],
        fieldStatus: [],
        payloadPreview: {},
      },
      { status: 400 },
    );
  }
}
