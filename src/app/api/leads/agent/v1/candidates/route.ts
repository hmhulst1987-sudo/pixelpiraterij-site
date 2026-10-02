import { type NextRequest } from "next/server";
import { listAgentCandidates } from "@/lib/lead-agent-service";
import { agentDenied, agentFailure, agentJson } from "@/lib/lead-agent-http";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const denied = agentDenied(request);
  if (denied) return denied;
  const status = request.nextUrl.searchParams.get("status") === "shortlisted" ? "shortlisted" : "all";
  const limit = Number(request.nextUrl.searchParams.get("limit") || 30);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) return agentJson({ error: "Limiet moet tussen 1 en 100 liggen." }, 400);
  const runId = request.nextUrl.searchParams.get("runId") || undefined;
  if (runId && !/^[1-9]\d{0,17}$/.test(runId)) return agentJson({ error: "Ongeldig runId." }, 400);
  try { return agentJson(await listAgentCandidates(status, limit, runId)); }
  catch (error) { return agentFailure(error); }
}
