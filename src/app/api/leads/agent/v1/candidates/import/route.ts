import { type NextRequest } from "next/server";
import { agentDenied, agentFailure, agentJson } from "@/lib/lead-agent-http";
import { importManualLead, parseManualLeadInput } from "@/lib/lead-manual-import";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const denied = agentDenied(request);
  if (denied) return denied;
  if (request.headers.get("x-leads-confirm-import") !== "confirmed") return agentJson({ error: "Bevestig handmatige import afzonderlijk." }, 403);
  const input = parseManualLeadInput(await request.json().catch(() => null));
  if (!input) return agentJson({ error: "Website, bedrijfsnaam, publieke bron-URL en beoordelingsnotitie zijn vereist." }, 400);
  try {
    const result = await importManualLead(input);
    return agentJson(result, result.status === "new" ? 201 : 200);
  } catch (error) { return agentFailure(error); }
}
