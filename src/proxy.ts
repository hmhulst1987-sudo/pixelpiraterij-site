import { NextResponse, type NextRequest } from "next/server";
import { LEAD_SESSION_COOKIE, verifyLeadSession } from "@/lib/lead-session";
import { isSameLeadOrigin } from "@/lib/lead-origin";
import { verifyLeadCloudflareAccess } from "@/lib/cloudflare-lead-access";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const workerPath = ["/api/leads/nearby", "/api/leads/audit", "/api/leads/deep-audit"].includes(request.nextUrl.pathname);
  const workerToken = process.env.LEADS_WORKER_TOKEN;
  if (workerPath && workerToken && request.headers.get("authorization") === `Bearer ${workerToken}`) return NextResponse.next();
  const cloudflareMode = process.env.LEADS_AUTH_MODE === "cloudflare";
  if (cloudflareMode && path === "/api/leads/session") return new NextResponse("Niet beschikbaar", { status: 404 });
  const studioPath = path.startsWith("/studio/leads");
  const leadsApiPath = path.startsWith("/api/leads/");
  if ((studioPath && (cloudflareMode || path !== "/studio/leads/login")) || (leadsApiPath && path !== "/api/leads/session")) {
    if (cloudflareMode) {
      const allowed = await verifyLeadCloudflareAccess(request.headers.get("cf-access-jwt-assertion"));
      if (!allowed) return new NextResponse("Cloudflare Access vereist", { status: 403, headers: { "Cache-Control": "no-store" } });
      if (path === "/studio/leads/login") return NextResponse.redirect(new URL("/studio/leads", request.url));
    } else {
      const expectedUser = process.env.LEADS_ADMIN_USER;
      const expectedPassword = process.env.LEADS_ADMIN_PASSWORD;
      const authorization = request.headers.get("authorization");
      let basicValid = false;
      if (expectedUser && expectedPassword && authorization?.startsWith("Basic ")) {
        try { basicValid = atob(authorization.slice(6)) === `${expectedUser}:${expectedPassword}`; } catch { /* Invalid Basic header. */ }
      }
      const sessionValid = expectedUser && expectedPassword && await verifyLeadSession(request.cookies.get(LEAD_SESSION_COOKIE)?.value, expectedUser, expectedPassword);
      if (!basicValid && !sessionValid) {
        if (studioPath && request.headers.get("accept")?.includes("text/html")) {
          const login = new URL("/studio/leads/login", request.url);
          login.searchParams.set("next", `${path}${request.nextUrl.search}`);
          return NextResponse.redirect(login);
        }
        return new NextResponse("Aanmelden vereist", { status: 401, headers: { "Cache-Control": "no-store" } });
      }
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
