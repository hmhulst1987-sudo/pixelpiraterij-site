import { NextResponse, type NextRequest } from "next/server";
import { LeadControlError } from "./lead-control";
import { validAgentBearer } from "./lead-agent-shared";

export function agentDenied(request: NextRequest) {
  if (validAgentBearer(request.headers.get("authorization"))) return null;
  return NextResponse.json({ error: "Agent-token vereist." }, { status: 401, headers: { "Cache-Control": "no-store" } });
}

export function agentFailure(error: unknown) {
  if (error instanceof LeadControlError) return NextResponse.json({ error: error.message }, { status: error.status, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json({ error: "De agent-API is tijdelijk niet beschikbaar." }, { status: 503, headers: { "Cache-Control": "no-store" } });
}

export function agentJson(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
