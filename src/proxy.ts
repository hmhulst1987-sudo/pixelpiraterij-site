import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const workerPath = ["/api/leads/nearby", "/api/leads/audit", "/api/leads/deep-audit"].includes(request.nextUrl.pathname);
  const workerToken = process.env.LEADS_WORKER_TOKEN;
  if (workerPath && workerToken && request.headers.get("authorization") === `Bearer ${workerToken}`) return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/studio/leads") || request.nextUrl.pathname.startsWith("/api/leads/discover") || request.nextUrl.pathname.startsWith("/api/leads/geocode") || request.nextUrl.pathname.startsWith("/api/leads/nearby") || request.nextUrl.pathname.startsWith("/api/leads/audit") || request.nextUrl.pathname.startsWith("/api/leads/deep-audit") || request.nextUrl.pathname.startsWith("/api/leads/preview") || request.nextUrl.pathname.startsWith("/api/leads/control") || request.nextUrl.pathname.startsWith("/api/leads/campaigns") || request.nextUrl.pathname.startsWith("/api/leads/candidates") || request.nextUrl.pathname.startsWith("/api/leads/outreach")) {
    const expectedUser = process.env.LEADS_ADMIN_USER;
    const expectedPassword = process.env.LEADS_ADMIN_PASSWORD;
    const authorization = request.headers.get("authorization");
    if (!expectedUser || !expectedPassword || !authorization?.startsWith("Basic ")) return new NextResponse("Aanmelden vereist", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="PixelPiraterij Sales Studio"' } });
    const decoded = atob(authorization.slice(6));
    if (decoded !== `${expectedUser}:${expectedPassword}`) return new NextResponse("Geen toegang", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="PixelPiraterij Sales Studio"' } });
  }
  const response = NextResponse.next();
  const canonical = new URL(request.nextUrl.pathname, "https://pixelpiraterij.nl");
  response.headers.set("Link", `<${canonical.href}>; rel="canonical"`);
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|opengraph-image|twitter-image).*)"] };
