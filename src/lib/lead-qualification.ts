export type BusinessSize = "small-medium" | "unknown" | "likely-large";

export type LeadQualification = {
  size: BusinessSize;
  sizeReason: string;
  opportunityScore: number;
  scoreReason: string;
};

const LARGE_BUSINESS_SIGNALS = [
  /\b(?:meer dan|ruim|over)\s+(?:1[0-9]|[2-9][0-9]|[1-9][0-9]{2,})\s+(?:vestigingen|winkels|locaties|filialen)\b/i,
  /\b(?:landelijke|internationale)\s+(?:keten|franchiseorganisatie)\b/i,
  /\b(?:beursgenoteerd|multinational|investor relations)\b/i,
];

const SMALL_BUSINESS_SIGNALS = [
  /\b(?:zelfstandig ondernemer|eenmanszaak|klein team|familiebedrijf|lokaal familiebedrijf)\b/i,
  /\b(?:one local shop|independent business|family[- ]run business|small team)\b/i,
];

const CHAIN_NAMES = /^(?:albert heijn|jumbo|lidl|aldi|action|hema|kruidvat|etos|gamma|praxis|karwei|mediamarkt|mcdonald'?s|burger king|starbucks|subway)(?:\b|\s|[-–])/i;

export function classifyBusinessSize(text: string, name = ""): { size: BusinessSize; reason: string } {
  if (CHAIN_NAMES.test(name.trim())) {
    return { size: "likely-large", reason: "De naam lijkt op een landelijke keten; een lokale franchisenemer kan hiervan afwijken." };
  }
  if (LARGE_BUSINESS_SIGNALS.some((pattern) => pattern.test(text))) {
    return { size: "likely-large", reason: "De website noemt meerdere vestigingen of kenmerken van een grote keten." };
  }
  if (SMALL_BUSINESS_SIGNALS.some((pattern) => pattern.test(text))) {
    return { size: "small-medium", reason: "De website beschrijft zichzelf als zelfstandig, lokaal of kleinschalig." };
  }
  return { size: "unknown", reason: "Bedrijfsgrootte is niet betrouwbaar uit de website af te leiden." };
}

export function qualifyLead(qualityScore: number | null, businessText: string, name = ""): LeadQualification {
  const { size, reason } = classifyBusinessSize(businessText, name);
  const opportunityScore = size === "likely-large"
    ? 0
    : Math.max(0, Math.min(100, Math.round((qualityScore === null ? 45 : 100 - qualityScore) * 0.75 + (size === "small-medium" ? 25 : 10))));
  return {
    size,
    sizeReason: reason,
    opportunityScore,
    scoreReason: qualityScore === null
      ? "Geen website vermeld: kansscore is voorlopig en vraagt verificatie."
      : "Kansscore combineert technische verbeterpunten met een voorzichtige MKB-indicatie; geen oordeel over omzet of personeelsaantal.",
  };
}

export function selectContentLinks(html: string, pageUrl: string, limit = 3): string[] {
  const base = new URL(pageUrl);
  const links = new Map<string, number>();
  const pattern = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi;
  for (const match of html.matchAll(pattern)) {
    try {
      const href = match[1].replaceAll("&amp;", "&");
      const url = new URL(href, base);
      url.hash = "";
      url.search = "";
      if (!(["http:", "https:"].includes(url.protocol)) || url.hostname !== base.hostname || url.pathname === base.pathname) continue;
      if (/\.(?:pdf|jpe?g|png|webp|gif|svg|zip|mp4|css|js)$/i.test(url.pathname)) continue;
      if (/\b(?:privacy|cookie|voorwaarden|terms|login|account|cart|checkout|nieuws|blog|vacature|jobs)\b/i.test(url.pathname)) continue;
      const weight = /\b(?:contact|over-ons|about|diensten|services|aanbod|portfolio|projecten|werk|menu|prijzen|vestigingen|locaties|locations)\b/i.test(url.pathname) ? 2 : 1;
      links.set(url.href, Math.max(weight, links.get(url.href) || 0));
    } catch {
      // Ignore malformed links from external sites.
    }
  }
  return [...links].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([url]) => url);
}
