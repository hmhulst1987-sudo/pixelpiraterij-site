import { fetchCostCents } from "@/lib/openprovider";

export const offeredExtensions = ["nl", "com", "eu", "online", "be", "de"] as const;
export type OfferedExtension = (typeof offeredExtensions)[number];

const defaultMarkupCents = 450;
const defaultVatPercent = 21;
const priceCacheMs = 6 * 60 * 60 * 1000;

/** Cost prices measured on 22 Aug 2026. Only used when the live lookup fails. */
const fallbackCostCents: Record<string, number> = {
  nl: 438,
  com: 939,
  eu: 460,
  online: 2486,
  be: 550,
  de: 368,
};

type CacheEntry = { costCents: number; fetchedAt: number };
const priceCache = new Map<string, CacheEntry>();

export function markupCents(): number {
  const raw = Number.parseInt(process.env.OPENPROVIDER_MARKUP_CENTS ?? "", 10);
  return Number.isFinite(raw) && raw >= 0 ? raw : defaultMarkupCents;
}

export function vatPercent(): number {
  const raw = Number.parseFloat(process.env.DOMAIN_VAT_PERCENT ?? "");
  return Number.isFinite(raw) && raw >= 0 ? raw : defaultVatPercent;
}

/** Rounds up to the nearest charm price (…,95). */
function charmCents(cents: number): number {
  const whole = Math.floor(cents / 100);
  return cents % 100 <= 95 ? whole * 100 + 95 : (whole + 1) * 100 + 95;
}

/**
 * Cost plus markup, then rounded on the gross amount — the customer compares
 * the price including VAT, so that is the one that has to land on a round figure.
 */
export function sellPrice(costCents: number): { netCents: number; grossCents: number } {
  const multiplier = 1 + vatPercent() / 100;
  const gross = charmCents(Math.ceil((costCents + markupCents()) * multiplier));
  return { netCents: Math.round(gross / multiplier), grossCents: gross };
}

export type ExtensionPrice = {
  extension: string;
  /** Yearly price excluding VAT, in cents. Never the cost price. */
  netCents: number;
  grossCents: number;
  /** True when the live lookup failed and a stored cost price was used. */
  provisional: boolean;
};

export async function getExtensionPrice(extension: string): Promise<ExtensionPrice | null> {
  const key = extension.toLowerCase();
  const cached = priceCache.get(key);

  if (cached && Date.now() - cached.fetchedAt < priceCacheMs) {
    return { extension: key, ...sellPrice(cached.costCents), provisional: false };
  }

  try {
    const costCents = await fetchCostCents(key);
    if (costCents !== null) {
      priceCache.set(key, { costCents, fetchedAt: Date.now() });
      return { extension: key, ...sellPrice(costCents), provisional: false };
    }
  } catch {
    // Fall through to the stored cost price below.
  }

  const fallback = fallbackCostCents[key];
  if (fallback === undefined) return null;

  return { extension: key, ...sellPrice(fallback), provisional: true };
}

export function formatEuro(cents: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
}
