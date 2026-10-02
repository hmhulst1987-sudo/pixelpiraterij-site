import { createHash, timingSafeEqual } from "node:crypto";

export const AGENT_MAX_CANDIDATES = 20;
export const AGENT_MAX_RADIUS_M = 30_000;
export const AGENT_PLACES_REQUESTS = 5;

export type AgentSearchInput = {
  label: string;
  latitude: number;
  longitude: number;
  radius: number;
  maxCandidates: number;
};

export function parseAgentSearchInput(value: unknown): AgentSearchInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const label = typeof input.label === "string" ? input.label.trim() : "";
  if (label.length < 1 || label.length > 120) return null;
  if (typeof input.latitude !== "number" || !Number.isFinite(input.latitude) || Math.abs(input.latitude) > 90) return null;
  if (typeof input.longitude !== "number" || !Number.isFinite(input.longitude) || Math.abs(input.longitude) > 180) return null;
  if (!Number.isSafeInteger(input.radius) || Number(input.radius) < 500 || Number(input.radius) > AGENT_MAX_RADIUS_M) return null;
  if (!Number.isSafeInteger(input.maxCandidates) || Number(input.maxCandidates) < 1 || Number(input.maxCandidates) > AGENT_MAX_CANDIDATES) return null;
  return {
    label,
    latitude: input.latitude,
    longitude: input.longitude,
    radius: Number(input.radius),
    maxCandidates: Number(input.maxCandidates),
  };
}

export function validRequestKey(value: string | null): value is string {
  return !!value && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function agentPayloadDigest(input: AgentSearchInput) {
  return createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

export function validAgentBearer(header: string | null, configuredToken = process.env.LEADS_AGENT_TOKEN) {
  if (!configuredToken || configuredToken.length < 32 || !header?.startsWith("Bearer ")) return false;
  const supplied = header.slice(7);
  const expectedDigest = createHash("sha256").update(configuredToken).digest();
  const suppliedDigest = createHash("sha256").update(supplied).digest();
  return timingSafeEqual(expectedDigest, suppliedDigest);
}
