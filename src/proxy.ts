import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const canonical = new URL(request.nextUrl.pathname, "https://pixelpiraterij.nl");
  response.headers.set("Link", `<${canonical.href}>; rel="canonical"`);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|twitter-image).*)"],
};
