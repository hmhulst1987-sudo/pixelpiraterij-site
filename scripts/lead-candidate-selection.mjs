const chainNames = /^(?:albert heijn|jumbo|lidl|aldi|action|hema|kruidvat|etos|gamma|praxis|karwei|mediamarkt|mcdonald'?s|burger king|starbucks|subway|kippie|domino'?s)(?:\b|\s|-)/i;
const chainHosts = new Set(["dominos.nl", "ok.nl"]);
const profileHosts = new Set([
  "facebook.com", "instagram.com", "linkedin.com", "linktr.ee", "tiktok.com", "wa.me", "x.com",
]);

function websiteHost(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (profileHosts.has(host) || host.endsWith(".facebook.com") || host.endsWith(".instagram.com")) return null;
    return host;
  } catch {
    return null;
  }
}

export function selectAuditCandidates(places, maxCandidates) {
  if (!Array.isArray(places) || !Number.isSafeInteger(maxCandidates) || maxCandidates < 1) return [];
  const seenPlaces = new Set();
  const seenHosts = new Set();
  const buckets = new Map();
  for (const place of places) {
    if (!place || typeof place.id !== "string" || !place.id || seenPlaces.has(place.id)) continue;
    const host = websiteHost(place.websiteUri);
    if (!host || seenHosts.has(host) || chainHosts.has(host) || chainNames.test(place.displayName?.text || "")) continue;
    seenPlaces.add(place.id);
    seenHosts.add(host);
    const type = place.primaryType || "other";
    if (!buckets.has(type)) buckets.set(type, []);
    buckets.get(type).push(place);
  }

  const selected = [];
  while (selected.length < maxCandidates) {
    let added = false;
    for (const bucket of buckets.values()) {
      const candidate = bucket.shift();
      if (!candidate) continue;
      selected.push(candidate);
      added = true;
      if (selected.length === maxCandidates) break;
    }
    if (!added) break;
  }
  return selected;
}
