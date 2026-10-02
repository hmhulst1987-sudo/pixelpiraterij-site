import { type NextRequest } from "next/server";
import { agentSearchEstimate } from "@/lib/lead-agent-service";
import { parseAgentSearchInput } from "@/lib/lead-agent-shared";
import { agentDenied, agentFailure, agentJson } from "@/lib/lead-agent-http";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const denied = agentDenied(request);
  if (denied) return denied;
  const input = parseAgentSearchInput(await request.json().catch(() => null));
  if (!input) return agentJson({ error: "Ongeldige plaats, straal of maximum kandidaten." }, 400);
  try { return agentJson(await agentSearchEstimate(input)); }
  catch (error) { return agentFailure(error); }
}
