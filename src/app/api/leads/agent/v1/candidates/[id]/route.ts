import { type NextRequest } from "next/server";
import { shortlistAgentCandidate } from "@/lib/lead-agent-service";
import { agentDenied, agentFailure, agentJson } from "@/lib/lead-agent-http";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = agentDenied(request);
  if (denied) return denied;
  if (request.headers.get("x-leads-confirm-shortlist") !== "confirmed") return agentJson({ error: "Bevestig deze shortlistactie afzonderlijk." }, 403);
  const { id } = await params;
  if (!/^[1-9]\d{0,17}$/.test(id)) return agentJson({ error: "Ongeldig kandidaatnummer." }, 400);
  try { return agentJson(await shortlistAgentCandidate(id)); }
  catch (error) { return agentFailure(error); }
}
