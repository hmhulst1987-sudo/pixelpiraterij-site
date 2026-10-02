import { type NextRequest } from "next/server";
import { agentStatus } from "@/lib/lead-agent-service";
import { agentDenied, agentFailure, agentJson } from "@/lib/lead-agent-http";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const denied = agentDenied(request);
  if (denied) return denied;
  try { return agentJson(await agentStatus()); }
  catch (error) { return agentFailure(error); }
}
