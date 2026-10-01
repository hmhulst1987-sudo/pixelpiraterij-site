import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createLeadSession, LEAD_SESSION_COOKIE } from "@/lib/lead-session";
import { isSameLeadOrigin } from "@/lib/lead-origin";

export const runtime = "nodejs";

function sameSecret(actual: string, expected: string) {
  return timingSafeEqual(createHash("sha256").update(actual).digest(), createHash("sha256").update(expected).digest());
}

export async function POST(request: NextRequest) {
  if (process.env.LEADS_AUTH_MODE === "cloudflare") return new NextResponse("Niet beschikbaar", { status: 404 });
  const protocol = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol;
  if (!isSameLeadOrigin(request.headers.get("origin"), request.headers.get("host"), protocol)) return new NextResponse("Ongeldige herkomst", { status: 403 });
  let body: { user?: unknown; password?: unknown };
  try { body = await request.json(); } catch { return new NextResponse("Ongeldige aanvraag", { status: 400 }); }
  const expectedUser = process.env.LEADS_ADMIN_USER;
  const expectedPassword = process.env.LEADS_ADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword || typeof body.user !== "string" || typeof body.password !== "string" || body.user.length > 100 || body.password.length > 256 || !sameSecret(body.user, expectedUser) || !sameSecret(body.password, expectedPassword)) {
    return NextResponse.json({ error: "Gebruikersnaam of wachtwoord klopt niet." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(LEAD_SESSION_COOKIE, await createLeadSession(expectedUser, expectedPassword), {
    httpOnly: true,
    sameSite: "strict",
    secure: !["127.0.0.1", "localhost"].includes(request.nextUrl.hostname),
    path: "/",
    maxAge: 12 * 60 * 60,
  });
  return response;
}
