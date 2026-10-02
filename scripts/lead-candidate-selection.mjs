const chainNames = /^(?:albert heijn|jumbo|lidl|aldi|action|hema|kruidvat|etos|gamma|praxis|karwei|mediamarkt|mcdonald'?s|burger king|starbucks|subway|kippie|domino'?s|de beren|hanos|intratuin|shell|new york pizza|happy italy|van haren|bram ladage|lucardi|multivlaai|photo-me|de haan tankstations)(?:\b|\s|-)/i;
const chainHosts = new Set(["dominos.nl", "ok.nl", "beren.nl", "hanos.nl", "intratuin.nl", "nldirecmapi.com", "nlmapnew.com", "omniform1.com", "ivof.com", "tankstation.nl"]);
const profileHosts = new Set([
  "facebook.com", "instagram.com", "linkedin.com", "linktr.ee", "tiktok.com", "wa.me", "x.com", "salonized.com",
]);

export function websiteHost(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if ([...profileHosts].some((profile) => host === profile || host.endsWith(`.${profile}`))) return null;
    return host;
  } catch {
    return null;
  }
}

export function selectAuditCandidates(places, maxCandidates, existingPlaceIds = new Set(), existingHosts = new Set()) {
  if (!Array.isArray(places) || !Number.isSafeInteger(maxCandidates) || maxCandidates < 1) return [];
  const seenPlaces = new Set();
  const seenHosts = new Set();
  const buckets = new Map();
  for (const place of places) {
    if (!place || typeof place.id !== "string" || !place.id || seenPlaces.has(place.id) || existingPlaceIds.has(place.id)) continue;
    const host = websiteHost(place.websiteUri);
    if (!host || seenHosts.has(host) || existingHosts.has(host) || chainHosts.has(host) || chainNames.test(place.displayName?.text || "")) continue;
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
