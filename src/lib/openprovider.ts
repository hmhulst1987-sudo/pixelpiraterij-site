const endpoint = "https://api.openprovider.eu/";
const requestTimeoutMs = 12000;

export type OpenproviderErrorKind = "not_configured" | "transport" | "api";

export class OpenproviderError extends Error {
  constructor(
    readonly kind: OpenproviderErrorKind,
    readonly code: number | null,
    message: string,
  ) {
    super(message);
    this.name = "OpenproviderError";
  }
}

export type DomainParts = { name: string; extension: string };
export type AvailabilityStatus = "free" | "taken" | "unknown";

export type AvailabilityResult = {
  domain: string;
  name: string;
  extension: string;
  status: AvailabilityStatus;
  reason: string;
};

export function isOpenproviderConfigured(): boolean {
  return Boolean(process.env.OPENPROVIDER_USERNAME && process.env.OPENPROVIDER_HASH);
}

function credentials(): { username: string; hash: string } {
  const username = process.env.OPENPROVIDER_USERNAME;
  const hash = process.env.OPENPROVIDER_HASH;
  if (!username || !hash) {
    throw new OpenproviderError("not_configured", null, "Openprovider credentials are not set on this server.");
  }
  return { username, hash };
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, digits: string) => String.fromCodePoint(Number.parseInt(digits, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

type XmlElement = { name: string; text: string; children: XmlElement[] };

function parseXml(source: string): XmlElement {
  const body = source.replace(/<\?[\s\S]*?\?>/g, "").replace(/<!--[\s\S]*?-->/g, "");
  const document: XmlElement = { name: "#document", text: "", children: [] };
  const stack: XmlElement[] = [document];
  const tagPattern = /<\s*(\/?)\s*([A-Za-z_][\w.:-]*)[^>]*?(\/?)\s*>/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tagPattern.exec(body)) !== null) {
    const [full, closing, name, selfClosing] = match;
    const between = body.slice(cursor, match.index);
    cursor = match.index + full.length;

    const current = stack[stack.length - 1];
    if (between.trim()) current.text += decodeEntities(between);

    if (closing) {
      if (stack.length > 1) stack.pop();
      continue;
    }

    const element: XmlElement = { name, text: "", children: [] };
    current.children.push(element);
    if (!selfClosing) stack.push(element);
  }

  return document;
}

function firstDescendant(node: XmlElement, name: string): XmlElement | undefined {
  for (const child of node.children) {
    if (child.name === name) return child;
    const nested = firstDescendant(child, name);
    if (nested) return nested;
  }
  return undefined;
}

function allDescendants(node: XmlElement, name: string): XmlElement[] {
  const found: XmlElement[] = [];
  for (const child of node.children) {
    if (child.name === name) found.push(child);
    found.push(...allDescendants(child, name));
  }
  return found;
}

function textOf(node: XmlElement | undefined, name: string): string {
  const child = node?.children.find((item) => item.name === name);
  return child ? child.text.trim() : "";
}

async function call(requestName: string, inner: string): Promise<XmlElement> {
  const { username, hash } = credentials();
  const payload =
    `<?xml version="1.0" encoding="UTF-8"?><openXML><credentials>` +
    `<username>${escapeXml(username)}</username><hash>${escapeXml(hash)}</hash>` +
    `</credentials><${requestName}>${inner}</${requestName}></openXML>`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/xml; charset=UTF-8" },
      body: payload,
      cache: "no-store",
      signal: AbortSignal.timeout(requestTimeoutMs),
    });
  } catch (failure) {
    const reason = failure instanceof Error ? `${failure.name}: ${failure.message}` : String(failure);
    const cause = failure instanceof Error && failure.cause instanceof Error ? ` (${failure.cause.message})` : "";
    throw new OpenproviderError("transport", null, `Openprovider could not be reached — ${reason}${cause}`);
  }

  if (!response.ok) {
    throw new OpenproviderError("transport", null, `Openprovider returned HTTP ${response.status}.`);
  }

  const document = parseXml(await response.text());
  const reply = firstDescendant(document, "reply") ?? document;
  const code = Number.parseInt(textOf(reply, "code"), 10);

  if (!Number.isFinite(code)) {
    throw new OpenproviderError("api", null, "Openprovider returned an unreadable response.");
  }
  if (code !== 0) {
    throw new OpenproviderError("api", code, textOf(reply, "desc") || `Openprovider error ${code}.`);
  }

  return firstDescendant(reply, "data") ?? reply;
}

export async function checkAvailability(candidates: DomainParts[]): Promise<AvailabilityResult[]> {
  if (candidates.length === 0) return [];

  const items = candidates
    .map(
      (candidate) =>
        `<item><name>${escapeXml(candidate.name)}</name><extension>${escapeXml(candidate.extension)}</extension></item>`,
    )
    .join("");

  const data = await call("checkDomainRequest", `<domains><array>${items}</array></domains>`);
  const results = allDescendants(data, "item");

  return candidates.map((candidate, index) => {
    const domain = `${candidate.name}.${candidate.extension}`;
    const entry =
      results.find((item) => textOf(item, "domain").toLowerCase() === domain) ?? results[index];
    const raw = textOf(entry, "status").toLowerCase();

    return {
      domain,
      name: candidate.name,
      extension: candidate.extension,
      status: raw === "free" ? "free" : raw === "active" || raw === "in quarantine" ? "taken" : "unknown",
      reason: textOf(entry, "reason"),
    };
  });
}

export type Registrant = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  houseNumberSuffix: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
};

const dialCodes: Record<string, string> = {
  NL: "+31",
  BE: "+32",
  DE: "+49",
  FR: "+33",
  GB: "+44",
  ES: "+34",
  IT: "+39",
  AT: "+43",
  LU: "+352",
};

/**
 * Openprovider wants the phone in three parts and rejects an empty area code
 * (error 133). Taking the first national digit as the area code is accepted for
 * NL, BE, DE and FR alike, so we do not need a per-country numbering plan.
 */
export function splitPhone(
  phone: string,
  country: string,
): { countryCode: string; areaCode: string; subscriberNumber: string } {
  const digits = phone.replace(/[^\d+]/g, "");
  let countryCode = dialCodes[country.toUpperCase()] ?? "+31";
  let national = digits;

  if (digits.startsWith("+")) {
    const known = Object.values(dialCodes)
      .sort((a, b) => b.length - a.length)
      .find((code) => digits.startsWith(code));

    countryCode = known ?? digits.slice(0, 3);
    national = digits.slice(countryCode.length);
  }

  national = national.replace(/^0+/, "");

  return { countryCode, areaCode: national.slice(0, 1), subscriberNumber: national.slice(1) };
}

/** Splits "Kerkstraat 12 b" into street, number and suffix. */
export function splitAddressLine(line: string): { street: string; houseNumber: string; suffix: string } {
  const match = line.trim().match(/^(.*?)[\s,]+(\d+)\s*([a-zA-Z0-9-]*)$/);
  if (!match) return { street: line.trim(), houseNumber: "", suffix: "" };
  return { street: match[1].trim(), houseNumber: match[2], suffix: match[3].trim() };
}

function tag(name: string, value: string): string {
  return value ? `<${name}>${escapeXml(value)}</${name}>` : "";
}

export async function createCustomer(registrant: Registrant): Promise<string> {
  const phone = splitPhone(registrant.phone, registrant.country);

  const inner =
    tag("companyName", registrant.companyName) +
    `<name>${tag("firstName", registrant.firstName)}${tag("lastName", registrant.lastName)}</name>` +
    `<address>` +
    tag("street", registrant.street) +
    tag("number", registrant.houseNumber) +
    tag("suffix", registrant.houseNumberSuffix) +
    tag("zipcode", registrant.postalCode) +
    tag("city", registrant.city) +
    tag("state", registrant.state) +
    tag("country", registrant.country.toUpperCase()) +
    `</address>` +
    `<phone>${tag("countryCode", phone.countryCode)}${tag("areaCode", phone.areaCode)}` +
    `${tag("subscriberNumber", phone.subscriberNumber)}</phone>` +
    tag("email", registrant.email);

  const data = await call("createCustomerRequest", inner);
  const handle = textOf(data, "handle") || firstDescendant(data, "handle")?.text.trim() || "";

  if (!handle) throw new OpenproviderError("api", null, "Openprovider returned no customer handle.");
  return handle;
}

/** Guards against a retried webhook registering the same domain twice. */
export async function isInAccount(name: string, extension: string): Promise<boolean> {
  const data = await call(
    "searchDomainRequest",
    `${tag("domainNamePattern", name)}${tag("extension", extension)}<limit>10</limit>`,
  );

  return allDescendants(data, "domain").some((entry) => {
    const entryName = textOf(entry, "name").toLowerCase();
    const entryExtension = textOf(entry, "extension").toLowerCase();
    return entryName === name.toLowerCase() && entryExtension === extension.toLowerCase();
  });
}

export type RegistrationResult = { domain: string; handle: string };

export async function registerDomain(options: {
  name: string;
  extension: string;
  handle: string;
  years: number;
  nameservers: string[];
}): Promise<RegistrationResult> {
  const nameservers = options.nameservers.filter(Boolean);
  const nameserverBlock = nameservers.length
    ? `<nameServers><array>${nameservers
        .map((host) => `<item>${tag("name", host)}</item>`)
        .join("")}</array></nameServers>`
    : "";

  const inner =
    `<domain>${tag("name", options.name)}${tag("extension", options.extension)}</domain>` +
    `<period>${Math.max(1, Math.trunc(options.years))}</period>` +
    tag("ownerHandle", options.handle) +
    tag("adminHandle", options.handle) +
    tag("techHandle", options.handle) +
    nameserverBlock +
    `<autorenew>on</autorenew>`;

  await call("createDomainRequest", inner);
  return { domain: `${options.name}.${options.extension}`, handle: options.handle };
}

export async function fetchCostCents(extension: string): Promise<number | null> {
  // The price endpoint rejects a bare extension, so it gets a throwaway name.
  const data = await call(
    "retrievePriceDomainRequest",
    `<domain><name>pixelpiraterij</name><extension>${escapeXml(extension)}</extension></domain>` +
      `<operation>create</operation>`,
  );

  const reseller = firstDescendant(data, "reseller");
  const raw = textOf(reseller, "price") || textOf(data, "price");
  const value = Number.parseFloat(raw);

  return Number.isFinite(value) ? Math.round(value * 100) : null;
}
