import dns from "node:dns/promises";
import net from "node:net";
import { Agent, fetch as pinnedFetch } from "undici";
import { qualifyLead, selectContentLinks, type LeadQualification } from "./lead-qualification";

export type WebsiteAudit = {
  url: string;
  finalUrl: string;
  status: number;
  score: number;
  responseMs: number;
  signals: { label: string; ok: boolean; detail: string }[];
  priorities: string[];
  pagesChecked: { url: string; status: number; title: string }[];
  qualification: LeadQualification;
};

function isPrivateIp(ip: string) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127)
      || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31)
      || (a === 192 && (b === 168 || b === 0)) || (a === 198 && (b === 18 || b === 19 || b === 51))
      || (a === 203 && b === 0) || (a === 192 && b === 0) || (a === 169 && b === 254);
  }
  const value = ip.toLowerCase();
  const first = Number.parseInt(value.split(":")[0], 16);
  return !Number.isFinite(first) || first < 0x2000 || first > 0x3fff
    || value.startsWith("2001:db8:") || value.startsWith("::ffff:");
}

type AddressLookup = (hostname: string, options: { all: true }) => Promise<Array<{ address: string; family: number }>>;

export async function publicAddress(url: URL, lookup: AddressLookup = dns.lookup) {
  const addresses = await lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateIp(address))) {
    throw new Error("Dit adres kan niet veilig worden gescand.");
  }
  return addresses[0];
}

export async function safeUrl(input: string) {
  const value = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password
    || (url.port && !["80", "443"].includes(url.port)) || /\.(?:local|internal|localhost)$/i.test(url.hostname)) {
    throw new Error("Gebruik een openbare http(s)-website.");
  }
  await publicAddress(url);
  return url;
}

async function readLimitedBody(response: Awaited<ReturnType<typeof pinnedFetch>>, limit: number) {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  while (bytes < limit) {
    const { done, value } = await reader.read();
    if (done) break;
    const accepted = value.subarray(0, limit - bytes);
    bytes += accepted.byteLength;
    text += decoder.decode(accepted, { stream: true });
    if (accepted.byteLength < value.byteLength) {
      await reader.cancel();
      break;
    }
  }
  if (bytes >= limit) await reader.cancel();
  return text + decoder.decode();
}

async function fetchPage(input: string, expectedHost?: string, beforeRequest?: () => Promise<void>) {
  await beforeRequest?.();
  let current = await safeUrl(input);
  if (expectedHost && current.hostname !== expectedHost) throw new Error("De link gaat naar een ander domein.");
  const started = Date.now();
  for (let redirects = 0; redirects < 4; redirects += 1) {
    await beforeRequest?.();
    const pinned = await publicAddress(current);
    const agent = new Agent({ connect: { lookup: (_host, options, callback) => {
      if (typeof options === "object" && options.all) {
        const allCallback = callback as unknown as (error: null, addresses: Array<{ address: string; family: number }>) => void;
        allCallback(null, [pinned]);
      } else {
        callback(null, pinned.address, pinned.family);
      }
    } } });
    let response: Awaited<ReturnType<typeof pinnedFetch>>;
    try {
      response = await pinnedFetch(current.href, {
        dispatcher: agent,
        redirect: "manual",
        headers: { "User-Agent": "PixelPiraterij-Websitecheck/1.0", Accept: "text/html" },
        signal: AbortSignal.timeout(7000),
      });
      const location = response.headers.get("location");
      if ([301, 302, 303, 307, 308].includes(response.status) && location) {
        await response.body?.cancel();
        current = await safeUrl(new URL(location, current).href);
        if (expectedHost && current.hostname !== expectedHost) throw new Error("De pagina verwijst naar een ander domein.");
        continue;
      }
      const responseMs = Date.now() - started;
      const type = response.headers.get("content-type") || "";
      if (type && !type.includes("text/html")) await response.body?.cancel();
      const html = type.includes("text/html") || type === "" ? await readLimitedBody(response, 750_000) : "";
      return { url: current.href, status: response.status, ok: response.ok, responseMs, html };
    } finally {
      await agent.close();
    }
  }
  throw new Error("Te veel doorverwijzingen.");
}

function textContent(html: string) {
  return html.replace(/<(?:script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\s*(?:script|style|noscript|svg)\s*>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&(?:nbsp|amp|quot|apos|#\d+);/gi, " ").replace(/\s+/g, " ").trim();
}

function pageTitle(html: string) {
  return /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1]?.trim().slice(0, 120) || "Geen paginatitel";
}

export async function auditWebsite(input: string, businessName = "", beforeRequest?: () => Promise<void>): Promise<WebsiteAudit> {
  const home = await fetchPage(input, undefined, beforeRequest);
  const links = home.ok ? selectContentLinks(home.html, home.url, 3) : [];
  const internal = await Promise.allSettled(links.map((url) => fetchPage(url, new URL(home.url).hostname, beforeRequest)));
  await beforeRequest?.();
  const pages = [home, ...internal.filter((result): result is PromiseFulfilledResult<typeof home> => result.status === "fulfilled")
    .map((result) => result.value)];
  const successfulPages = pages.filter((page) => page.ok && page.html.length > 250);
  const allHtml = successfulPages.map((page) => page.html).join("\n").toLowerCase();
  const allText = successfulPages.map((page) => textContent(page.html)).join(" ");
  const titleOk = /<title[^>]*>[^<]{8,}<\/title>/i.test(home.html);
  const descriptionOk = /<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']{20,}/i.test(home.html)
    || /<meta\b[^>]*content=["'][^"']{20,}["'][^>]*name=["']description["']/i.test(home.html);
  const viewportOk = /<meta\b[^>]*name=["']viewport["']/i.test(home.html);
  const faviconOk = /<link\b[^>]*rel=["'][^"']*(?:icon|apple-touch-icon)/i.test(home.html);
  const contactOk = /(?:mailto:|tel:|\bcontact\b|\bneem contact op\b)/i.test(allHtml);
  const ctaOk = /(?:offerte|afspraak|reserveer|boek nu|aanvraag|bestel|vraag aan|contact opnemen)/i.test(allText);
  const modernOk = !/(<frameset|<frame\s|<marquee|\.swf|application\/x-shockwave-flash)/i.test(allHtml);
  const depthOk = links.length === 0 || successfulPages.length >= 2;
  const speedOk = home.responseMs < 2500;
  const tests: Array<[string, boolean, string, number]> = [
    ["Bereikbaarheid", home.ok, `HTTP-status ${home.status}.`, 2],
    ["Beveiligde verbinding", new URL(home.url).protocol === "https:", "HTTPS gecontroleerd.", 1],
    ["Mobiele viewport", viewportOk, viewportOk ? "Viewport aanwezig; dit bewijst nog geen goede mobiele layout." : "Geen mobiele viewport gevonden.", 1],
    ["Zoekresultaat", titleOk && descriptionOk, "Paginatitel en meta-omschrijving gecontroleerd.", 1],
    ["Merkherkenning", faviconOk, "Favicon of app-icoon gecontroleerd.", 1],
    ["Moderne opbouw", modernOk, "Geen klassieke verouderde techniek gevonden.", 1],
    ["Duidelijke actie", ctaOk, "Actietekst op de gecontroleerde pagina's bekeken.", 1],
    ["Contactmogelijkheid", contactOk, "Contactlink, telefoon of e-mail gecontroleerd.", 1],
    ["Inhoudelijke pagina's", depthOk, links.length === 0 ? "Geen geschikte binnenpagina's gevonden; dit kan een geldige one-page-site zijn." : `${successfulPages.length} inhoudelijke pagina('s) gevonden; maximaal vier bekeken.`, links.length === 0 ? 0 : 2],
    ["Antwoordtijd", speedOk, `${home.responseMs} ms tot de HTML-respons; geen volledige render- of Core Web Vitals-meting.`, 1],
  ];
  const totalWeight = tests.reduce((sum, test) => sum + test[3], 0);
  const score = Math.round(tests.reduce((sum, test) => sum + (test[1] ? test[3] : 0), 0) / totalWeight * 100);
  const signals = tests.map(([label, ok, detail]) => ({ label, ok, detail }));
  const priorities = signals.filter((item) => !item.ok).slice(0, 4).map((item) => item.label);
  return {
    url: input,
    finalUrl: home.url,
    status: home.status,
    score,
    responseMs: home.responseMs,
    signals,
    priorities,
    pagesChecked: pages.map((page) => ({ url: page.url, status: page.status, title: pageTitle(page.html) })),
    qualification: qualifyLead(score, allText, businessName),
  };
}
