import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string; path?: string[] }> };

export async function GET(_request: NextRequest, context: Context) {
  const serviceUrl = process.env.PREVIEW_SERVICE_URL;
  const token = process.env.PREVIEW_SERVICE_TOKEN;
  if (!serviceUrl || !token) return new NextResponse("Previewservice niet beschikbaar", { status: 503 });

  const { id, path = [] } = await context.params;
  if (!/^[a-z0-9-]{1,90}$/.test(id) || path.some((segment) => !/^[a-zA-Z0-9._-]+$/.test(segment) || segment === ".." || segment === ".")) {
    return new NextResponse("Ongeldige preview", { status: 404 });
  }

  try {
    const assetPath = `/preview/${id}/${path.map(encodeURIComponent).join("/")}`;
    const response = await fetch(new URL(assetPath, serviceUrl), {
      headers: { Authorization: `Bearer ${token}` }, redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    if (response.status === 404 || response.status === 410) return new NextResponse("Preview niet gevonden of verlopen", { status: response.status });
    if (!response.ok || Number(response.headers.get("content-length") || 0) > 10_000_000) return new NextResponse("Preview kon niet worden geladen", { status: 502 });
    const content = await response.arrayBuffer();
    if (content.byteLength > 10_000_000) return new NextResponse("Previewbestand te groot", { status: 502 });
    return new NextResponse(content, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/octet-stream",
        "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow",
        "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer",
        "Content-Security-Policy": response.headers.get("content-security-policy") || "default-src 'none'",
      },
    });
  } catch {
    return new NextResponse("Previewservice niet bereikbaar", { status: 502 });
  }
}
