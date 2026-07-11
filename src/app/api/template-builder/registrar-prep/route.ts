import { NextResponse } from "next/server";

import { evaluateRegistrarPreparation } from "@/lib/template-route-registrar";
import { parseWorkspace, type TemplateRouteWorkspace } from "@/lib/template-route-phase-two";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { workspace?: TemplateRouteWorkspace; locale?: "nl" | "en" };
    const locale = body.locale === "en" ? "en" : "nl";

    if (!body.workspace) {
      return NextResponse.json(
        {
          success: false,
          status: "blocked",
          summary: locale === "nl" ? "Workspace ontbreekt." : "Workspace is missing.",
          warnings: [],
          nextStep: locale === "nl" ? "Stuur eerst een geldige workspace mee." : "Send a valid workspace first.",
          provider: "openprovider",
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
          status: "blocked",
          summary: locale === "nl" ? "Workspace kon niet worden gelezen." : "Workspace could not be parsed.",
          warnings: [],
          nextStep: locale === "nl" ? "Controleer de opgeslagen projectstate." : "Check the stored project state.",
          provider: "openprovider",
          fieldStatus: [],
          payloadPreview: {},
        },
        { status: 400 },
      );
    }

    const preparation = evaluateRegistrarPreparation(parsed);

    return NextResponse.json({
      success: preparation.status !== "blocked",
      ...preparation,
      preparedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        status: "blocked",
        summary: "Registrar preparation failed.",
        warnings: [],
        nextStep: "Try again with a valid workspace payload.",
        provider: "openprovider",
        fieldStatus: [],
        payloadPreview: {},
      },
      { status: 400 },
    );
  }
}
