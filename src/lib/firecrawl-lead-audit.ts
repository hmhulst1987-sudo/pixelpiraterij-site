import { safeUrl } from "./website-audit";
import { contentFindings } from "./firecrawl-findings";

type ScrapeData = {
  markdown?: string;
  screenshot?: string;
  metadata?: { title?: string; statusCode?: number; sourceURL?: string };
};

let nextFirecrawlSlot = 0;
let scrapeQueue = Promise.resolve();

async function waitForFreeTierSlot() {
  const turn = scrapeQueue.then(async () => {
    const delay = Math.max(0, nextFirecrawlSlot - Date.now());
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    nextFirecrawlSlot = Date.now() + 6500;
  });
  scrapeQueue = turn.catch(() => undefined);
  await turn;
}

export type DeepAudit = {
  website: string;
  requestsAttempted: number;
  desktopScreenshot: string | null;
  mobileScreenshot: string | null;
  pages: { url: string; status: number; title: string }[];
  findings: string[];
  warnings: string[];
};

function screenshotUrl(value: unknown) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

async function scrape(url: string, key: string, mobile: boolean, formats: string[], fetcher: typeof fetch): Promise<ScrapeData> {
  await waitForFreeTierSlot();
  const response = await fetcher("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, formats, mobile, location: { country: "NL", languages: ["nl"] }, skipTlsVerification: false, timeout: 30000 }),
    signal: AbortSignal.timeout(35000),
    cache: "no-store",
  });
  const body = await response.json() as { success?: boolean; data?: ScrapeData; error?: string };
  if (!response.ok || !body.success || !body.data) {
    throw new Error(response.status === 401 ? "Firecrawl-sleutel is ongeldig." : response.status === 402 ? "Firecrawl-credits zijn op." : response.status === 429 ? "Firecrawl-verzoeklimiet bereikt." : `Firecrawl kon deze pagina niet ophalen (HTTP ${response.status}).`);
  }
  return body.data;
}

export async function deepAuditWebsite(website: string, contactPage: string | undefined, key: string, fetcher: typeof fetch = fetch): Promise<DeepAudit> {
  const home = await safeUrl(website);
  const contact = contactPage ? await safeUrl(contactPage) : null;
  if (contact && (contact.hostname !== home.hostname || contact.href === home.href)) {
    throw new Error("De contactpagina moet op hetzelfde domein staan.");
  }
  const result: DeepAudit = { website: home.href, requestsAttempted: 1, desktopScreenshot: null, mobileScreenshot: null, pages: [], findings: [], warnings: [] };
  let desktop: ScrapeData;
  try {
    desktop = await scrape(home.href, key, false, ["markdown", "screenshot"], fetcher);
  } catch (error) {
    result.warnings.push(error instanceof Error ? error.message : "Firecrawl-scan mislukt.");
    return result;
  }
  result.desktopScreenshot = screenshotUrl(desktop.screenshot);
  result.pages.push({ url: home.href, status: desktop.metadata?.statusCode || 0, title: desktop.metadata?.title?.slice(0, 120) || "Homepage" });
  if (result.pages[0].status >= 400) result.warnings.push(`Homepage gaf HTTP ${result.pages[0].status}; inhoud niet betrouwbaar.`);
  if (!result.pages[0].status) result.warnings.push("De HTTP-status van de homepage ontbreekt; controleer de bron handmatig.");

  const tasks = [scrape(home.href, key, true, ["screenshot"], fetcher)];
  if (contact) tasks.push(scrape(contact.href, key, false, ["markdown"], fetcher));
  result.requestsAttempted += tasks.length;
  const settled = await Promise.allSettled(tasks);
  if (settled[0].status === "fulfilled") result.mobileScreenshot = screenshotUrl(settled[0].value.screenshot);
  else result.warnings.push("Mobiele screenshot is niet gelukt.");
  if (!result.desktopScreenshot) result.warnings.push("Desktop-screenshot ontbreekt.");
  if (!result.mobileScreenshot) result.warnings.push("Mobiele weergave moet nog handmatig worden gecontroleerd.");

  let contactMarkdown = "";
  if (contact && settled[1]?.status === "fulfilled") {
    const page = settled[1].value;
    result.pages.push({ url: contact.href, status: page.metadata?.statusCode || 0, title: page.metadata?.title?.slice(0, 120) || "Contactpagina" });
    if (result.pages[1].status >= 400) result.warnings.push(`Contactpagina gaf HTTP ${result.pages[1].status}.`);
    else if (!result.pages[1].status) result.warnings.push("De HTTP-status van de contactpagina ontbreekt.");
    else contactMarkdown = page.markdown || "";
  } else if (contact) {
    result.warnings.push("Contactpagina kon niet worden gecontroleerd.");
  } else {
    result.warnings.push("Geen contactpagina in de eerste website-audit gevonden.");
  }
  if (result.pages[0].status >= 200 && result.pages[0].status < 400) result.findings = contentFindings((desktop.markdown || "").slice(0, 20000), contactMarkdown.slice(0, 10000));
  return result;
}
