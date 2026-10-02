import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from "jose";

export type AccessConfig = { teamDomain: string; audience: string; email: string };

const keySets = new Map<string, JWTVerifyGetKey>();

function accessConfig(): AccessConfig | null {
  const teamDomain = process.env.LEADS_CF_TEAM_DOMAIN?.trim();
  const audience = process.env.LEADS_CF_AUD?.trim();
  const email = process.env.LEADS_CF_EMAIL?.trim().toLowerCase();
  if (!teamDomain || !audience || !email) return null;
  if (!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(teamDomain)) return null;
  return { teamDomain, audience, email };
}

export async function readAccessAssertion(assertion: string | null, config: AccessConfig, keySet: JWTVerifyGetKey) {
  if (!assertion) return null;
  try {
    const { payload } = await jwtVerify(assertion, keySet, {
      issuer: config.teamDomain,
      audience: config.audience,
      algorithms: ["RS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function verifyAccessAssertion(assertion: string | null, config: AccessConfig, keySet: JWTVerifyGetKey) {
  const payload = await readAccessAssertion(assertion, config, keySet);
  return payload?.type === "app" && typeof payload.email === "string" && payload.email.toLowerCase() === config.email;
}

async function configuredAssertion(assertion: string | null) {
  const config = accessConfig();
  if (!config) return null;
  let keySet = keySets.get(config.teamDomain);
  if (!keySet) {
    keySet = createRemoteJWKSet(new URL(`${config.teamDomain}/cdn-cgi/access/certs`));
    keySets.set(config.teamDomain, keySet);
  }
  return readAccessAssertion(assertion, config, keySet);
}

export async function verifyLeadCloudflareAccess(assertion: string | null) {
  const config = accessConfig();
  const payload = await configuredAssertion(assertion);
  return !!config && payload?.type === "app" && typeof payload.email === "string" && payload.email.toLowerCase() === config.email;
}

export async function verifyLeadAgentCloudflareAccess(assertion: string | null) {
  const payload = await configuredAssertion(assertion);
  return !!payload && (payload.type === "app" || payload.type === "service-token");
}
