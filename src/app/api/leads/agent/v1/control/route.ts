import { type NextRequest } from "next/server";
import { setAgentControl } from "@/lib/lead-agent-service";
import { agentDenied, agentFailure, agentJson } from "@/lib/lead-agent-http";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const denied = agentDenied(request);
  if (denied) return denied;
  const body = await request.json().catch(() => null);
  if (body?.mode !== "paused" && body?.mode !== "running") return agentJson({ error: "Kies paused of running." }, 400);
  if (body.mode === "running" && request.headers.get("x-leads-confirm-resume") !== "confirmed") {
    return agentJson({ error: "Bevestig het hervatten afzonderlijk." }, 403);
  }
  try { return agentJson(await setAgentControl(body.mode)); }
  catch (error) { return agentFailure(error); }
}
