import dns from "node:dns/promises";
import net from "node:net";

export type WebsiteAudit = {
  url: string;
  finalUrl: string;
  status: number;
  score: number;
  responseMs: number;
  signals: { label: string; ok: boolean; detail: string }[];
  priorities: string[];
};

function isPrivateIp(ip: string) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  }
  const value = ip.toLowerCase();
  return value === "::1" || value === "::" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe8") || value.startsWith("fe9") || value.startsWith("fea") || value.startsWith("feb");
}

async function safeUrl(input: string) {
  const value = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("Gebruik een openbare http(s)-website.");
  const addresses = await dns.lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateIp(address))) throw new Error("Dit adres kan niet veilig worden gescand.");
  return url;
}

export async function auditWebsite(input: string): Promise<WebsiteAudit> {
  let current = await safeUrl(input);
  const started = Date.now();
  let response: Response | undefined;
  for (let redirects = 0; redirects < 4; redirects += 1) {
    response = await fetch(current, { redirect: "manual", headers: { "User-Agent": "PixelPiraterij-Websitecheck/1.0" }, signal: AbortSignal.timeout(12000) });
    if (![301, 302, 303, 307, 308].includes(response.status)) break;
    const location = response.headers.get("location");
    if (!location) break;
    current = await safeUrl(new URL(location, current).href);
  }
  if (!response) throw new Error("De website gaf geen antwoord.");
  const body = (await response.text()).slice(0, 1_000_000);
  const html = body.toLowerCase();
  const year = new Date().getFullYear();
  const tests: Array<[string, boolean, string]> = [
    ["Beveiligde verbinding", current.protocol === "https:", current.protocol === "https:" ? "HTTPS is actief." : "De pagina gebruikt geen HTTPS."],
    ["Mobiele basis", /name=["']viewport["']/.test(html), /name=["']viewport["']/.test(html) ? "Een viewport is ingesteld." : "Geen mobiele viewport gevonden."],
    ["Zoekresultaat", /<title[^>]*>[^<]{8,}<\/title>/.test(html) && /name=["']description["']/.test(html), "Titel en meta-omschrijving gecontroleerd."],
    ["Merkherkenning", /rel=["'][^"']*(icon|apple-touch-icon)/.test(html), "Favicon of app-icoon gecontroleerd."],
    ["Moderne opbouw", !/(<frameset|<frame\s|<marquee|\.swf|application\/x-shockwave-flash)/.test(html), "Geen klassieke verouderde techniek aangetroffen."],
    ["Duidelijke actie", /(contact|offerte|afspraak|bel ons|reserver|bestel|aanvraag)/.test(html), "Contact- of conversiesignaal gecontroleerd."],
    ["Recente actualiteit", [year, year - 1, year - 2].some((value) => html.includes(String(value))), "Een jaaraanduiding uit de laatste drie jaar gecontroleerd."],
  ];
  const signals = tests.map(([label, ok, detail]) => ({ label, ok, detail }));
  const responseMs = Date.now() - started;
  const speedOk = responseMs < 2500;
  signals.push({ label: "Reactiesnelheid", ok: speedOk, detail: `${responseMs} ms voor de eerste HTML-reactie.` });
  signals.push({ label: "Bereikbaarheid", ok: response.ok, detail: `HTTP-status ${response.status}.` });
  const score = Math.round((signals.filter((item) => item.ok).length / signals.length) * 100);
  const priorities = signals.filter((item) => !item.ok).slice(0, 4).map((item) => item.label);
  return { url: input, finalUrl: current.href, status: response.status, score, responseMs, signals, priorities };
}
