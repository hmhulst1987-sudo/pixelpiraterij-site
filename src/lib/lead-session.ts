export const LEAD_SESSION_COOKIE = "pp_leads_session";
const SESSION_SECONDS = 12 * 60 * 60;

async function sessionKey(password: string) {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

function message(user: string, expires: number) {
  return new TextEncoder().encode(`lead-studio:v1:${user}:${expires}`);
}

export async function createLeadSession(user: string, password: string, now = Date.now()) {
  const expires = Math.floor(now / 1000) + SESSION_SECONDS;
  const signature = await crypto.subtle.sign("HMAC", await sessionKey(password), message(user, expires));
  return `${expires}.${Buffer.from(signature).toString("base64url")}`;
}

export async function verifyLeadSession(value: string | undefined, user: string, password: string, now = Date.now()) {
  if (!value || !user || !password) return false;
  const match = /^(\d{10})\.([A-Za-z0-9_-]{43})$/.exec(value);
  if (!match) return false;
  const expires = Number(match[1]);
  const current = Math.floor(now / 1000);
  if (expires <= current || expires > current + SESSION_SECONDS) return false;
  return crypto.subtle.verify("HMAC", await sessionKey(password), Buffer.from(match[2], "base64url"), message(user, expires));
}
