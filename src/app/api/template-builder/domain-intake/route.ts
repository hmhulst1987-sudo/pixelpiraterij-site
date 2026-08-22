import { NextResponse } from "next/server";

import { evaluateDomainCandidate } from "@/lib/template-route-phase-two";
import { checkAvailability, isOpenproviderConfigured } from "@/lib/openprovider";
import { formatEuro, getExtensionPrice } from "@/lib/domain-pricing";

export const runtime = "nodejs";

/**
 * Format screening alone cannot tell a customer anything useful, so a
 * well-formed name is also checked against the registry. When that lookup is
 * unavailable the format verdict still stands.
 */
async function withAvailability(
  evaluation: Awaited<ReturnType<typeof evaluateDomainCandidate>>,
  locale: "nl" | "en",
) {
  if (evaluation.status !== "ready_for_lookup" || !evaluation.tld || !isOpenproviderConfigured()) {
    return evaluation;
  }

  const name = evaluation.normalizedDomain.slice(0, -(evaluation.tld.length + 1));
  if (!name) return evaluation;

  try {
    const [result] = await checkAvailability([{ name, extension: evaluation.tld }]);

    if (result?.status === "taken") {
      return {
        ...evaluation,
        status: "taken" as const,
        message:
          locale === "nl"
            ? `${evaluation.normalizedDomain} is al bezet.`
            : `${evaluation.normalizedDomain} is already taken.`,
        registrarStep:
          locale === "nl"
            ? "Kies een andere naam of een andere extensie."
            : "Pick another name or another extension.",
      };
    }

    if (result?.status === "free") {
      const price = await getExtensionPrice(evaluation.tld);
      const amount = price ? formatEuro(price.grossCents) : null;

      return {
        ...evaluation,
        message:
          locale === "nl"
            ? `${evaluation.normalizedDomain} is vrij${amount ? ` — ${amount} per jaar` : ""}.`
            : `${evaluation.normalizedDomain} is available${amount ? ` — ${amount} per year` : ""}.`,
        registrarStep:
          locale === "nl"
            ? "Deze naam wordt vastgelegd zodra je pakket rond is."
            : "This name gets registered once your package is settled.",
      };
    }
  } catch {
    // Registry unreachable: keep the format verdict rather than blocking.
  }

  return evaluation;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { domain?: unknown; locale?: unknown };
    const domain = typeof body.domain === "string" ? body.domain : "";
    const locale = body.locale === "en" ? "en" : "nl";
    const evaluation = await withAvailability(evaluateDomainCandidate(domain, locale), locale);

    return NextResponse.json({
      success: evaluation.status !== "invalid" && evaluation.status !== "taken",
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
