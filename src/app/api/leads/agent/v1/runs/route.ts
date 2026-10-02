import { type NextRequest } from "next/server";
import { createAgentOneShot, listAgentRuns } from "@/lib/lead-agent-service";
import { parseAgentSearchInput, validRequestKey } from "@/lib/lead-agent-shared";
import { agentDenied, agentFailure, agentJson } from "@/lib/lead-agent-http";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const denied = agentDenied(request);
  if (denied) return denied;
  try { return agentJson(await listAgentRuns()); }
  catch (error) { return agentFailure(error); }
}

export async function POST(request: NextRequest) {
  const denied = agentDenied(request);
  if (denied) return denied;
  if (request.headers.get("x-leads-confirm-search") !== "confirmed") return agentJson({ error: "Bevestig deze betaalde zoekronde afzonderlijk." }, 403);
  const requestKey = request.headers.get("idempotency-key");
  if (!validRequestKey(requestKey)) return agentJson({ error: "Een UUID idempotency-key is vereist." }, 400);
  const input = parseAgentSearchInput(await request.json().catch(() => null));
  if (!input) return agentJson({ error: "Ongeldige plaats, straal of maximum kandidaten." }, 400);
  try {
    const result = await createAgentOneShot(input, requestKey);
    return agentJson({ ...result, state: "queued", idempotencyKey: requestKey }, result.repeated ? 200 : 201);
  } catch (error) { return agentFailure(error); }
}
