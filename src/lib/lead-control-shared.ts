export const usageKinds = ["search_runs", "places", "firecrawl", "geocode", "previews", "ai"] as const;
export type UsageKind = (typeof usageKinds)[number];
export type LeadMode = "paused" | "running";
export type LeadLimits = Record<UsageKind, number>;
export type LeadUsage = Record<UsageKind, number>;

// Gross list rates from Google Maps Platform global pricing, checked 2026-09-29.
// Free SKU caps and usage by other projects on the billing account are unknown here.
export function estimatedGrossMapsUsd(places: number, geocode: number) {
  return Number((places * 0.035 + geocode * 0.005).toFixed(2));
}
