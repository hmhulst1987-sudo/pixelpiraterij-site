import { NextResponse } from "next/server";
import { checkAvailability, isOpenproviderConfigured, OpenproviderError } from "@/lib/openprovider";
import { getExtensionPrice, offeredExtensions } from "@/lib/domain-pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const windowMs = 60_000;
const maxPerWindow = 20;
const visits = new Map<string, number[]>();

function clientKey(request: Request): string {
  const headers = request.headers;
  const forwarded = headers.get("cf-connecting-ip") ?? headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0].trim() || "unknown";
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (visits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  recent.push(now);
  visits.set(key, recent);

  if (visits.size > 5000) {
    for (const [entry, stamps] of visits) {
      if (stamps.every((stamp) => now - stamp >= windowMs)) visits.delete(entry);
    }
  }

  return recent.length > maxPerWindow;
}

/** Strips protocol, www and any extension, leaving the bare label. */
function parseQuery(input: string): { label: string; requested: string | null } {
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/[^a-z0-9.-]/g, "")
    .replace(/^-+|-+$/g, "");

  const labels = normalized.split(".").filter(Boolean);
  if (labels.length === 0) return { label: "", requested: null };
  if (labels.length === 1) return { label: labels[0], requested: null };

  return { label: labels.slice(0, -1).join("."), requested: labels.at(-1) ?? null };
}

function isUsableLabel(label: string): boolean {
  return (
    label.length >= 2 &&
    label.length <= 63 &&
    /^[a-z0-9-]+$/.test(label) &&
    !label.startsWith("-") &&
    !label.endsWith("-")
  );
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ error: "Te veel zoekopdrachten achter elkaar. Probeer het zo opnieuw." }, { status: 429 });
  }

  const body: unknown = await request.json().catch(() => null);
  const query = typeof body === "object" && body !== null && "query" in body ? String(body.query ?? "") : "";
  const { label, requested } = parseQuery(query);

  if (!isUsableLabel(label)) {
    return NextResponse.json(
      { error: "Vul een naam in van minstens twee tekens, zonder spaties of leestekens." },
      { status: 400 },
    );
  }

  if (!isOpenproviderConfigured()) {
    return NextResponse.json({ error: "De domeinzoeker wordt nog geactiveerd." }, { status: 503 });
  }

  const extensions = [
    ...(requested && (offeredExtensions as readonly string[]).includes(requested) ? [requested] : []),
    ...offeredExtensions.filter((extension) => extension !== requested),
  ];

  try {
    const availability = await checkAvailability(
      extensions.map((extension) => ({ name: label, extension })),
    );
    const prices = await Promise.all(extensions.map((extension) => getExtensionPrice(extension)));

    return NextResponse.json({
      label,
      requested,
      checkedAt: new Date().toISOString(),
      results: availability.map((result, index) => {
        const price = prices[index];
        return {
          domain: result.domain,
          extension: result.extension,
          status: result.status,
          netCents: price?.netCents ?? null,
          grossCents: price?.grossCents ?? null,
          provisional: price?.provisional ?? false,
        };
      }),
    });
  } catch (error) {
    if (error instanceof OpenproviderError && error.kind === "not_configured") {
      return NextResponse.json({ error: "De domeinzoeker wordt nog geactiveerd." }, { status: 503 });
    }

    console.error("domain search failed", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "De domeincheck is even niet bereikbaar. Probeer het zo opnieuw." },
      { status: 502 },
    );
  }
}
