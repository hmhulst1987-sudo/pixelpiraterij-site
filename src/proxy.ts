import { NextResponse, type NextRequest } from "next/server";
import { LEAD_SESSION_COOKIE, verifyLeadSession } from "@/lib/lead-session";
import { isSameLeadOrigin } from "@/lib/lead-origin";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const workerPath = ["/api/leads/nearby", "/api/leads/audit", "/api/leads/deep-audit"].includes(request.nextUrl.pathname);
  const workerToken = process.env.LEADS_WORKER_TOKEN;
  if (workerPath && workerToken && request.headers.get("authorization") === `Bearer ${workerToken}`) return NextResponse.next();
  if (path.startsWith("/studio/leads") && path !== "/studio/leads/login" || path.startsWith("/api/leads/") && path !== "/api/leads/session") {
    const expectedUser = process.env.LEADS_ADMIN_USER;
    const expectedPassword = process.env.LEADS_ADMIN_PASSWORD;
    const authorization = request.headers.get("authorization");
    let basicValid = false;
    if (expectedUser && expectedPassword && authorization?.startsWith("Basic ")) {
      try { basicValid = atob(authorization.slice(6)) === `${expectedUser}:${expectedPassword}`; } catch { /* Invalid Basic header. */ }
    }
    const sessionValid = expectedUser && expectedPassword && await verifyLeadSession(request.cookies.get(LEAD_SESSION_COOKIE)?.value, expectedUser, expectedPassword);
    if (!basicValid && !sessionValid) {
      if (path.startsWith("/studio/leads") && request.headers.get("accept")?.includes("text/html")) {
        const login = new URL("/studio/leads/login", request.url);
        login.searchParams.set("next", `${path}${request.nextUrl.search}`);
        return NextResponse.redirect(login);
      }
      return new NextResponse("Aanmelden vereist", { status: 401, headers: { "Cache-Control": "no-store" } });
    }
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
      const origin = request.headers.get("origin");
      const protocol = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol;
      if (origin && !isSameLeadOrigin(origin, request.headers.get("host"), protocol)) return new NextResponse("Ongeldige herkomst", { status: 403 });
    }
  }
  const response = NextResponse.next();
  const canonical = new URL(request.nextUrl.pathname, "https://pixelpiraterij.nl");
  response.headers.set("Link", `<${canonical.href}>; rel="canonical"`);
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|opengraph-image|twitter-image).*)"] };
