import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "PixelPiraterij social preview";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "radial-gradient(circle at top left, rgba(216,91,61,0.25), transparent 30%), radial-gradient(circle at top right, rgba(236,181,96,0.18), transparent 28%), linear-gradient(180deg, #f7efe3 0%, #efe2d2 100%)",
          color: "#171d27",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: 28,
            border: "1px solid rgba(23,29,39,0.08)",
            display: "flex",
            background: "rgba(255,255,255,0.42)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: 28,
                background: "#1d2732",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f6eee4",
                fontSize: 40,
                fontWeight: 800,
                boxShadow: "0 18px 48px rgba(29,39,50,0.18)",
              }}
            >
              PP
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#7d6044" }}>
                Websites / Hosting / Maatwerk
              </div>
              <div style={{ fontSize: 34, fontWeight: 800 }}>PixelPiraterij</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 860 }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, fontWeight: 900 }}>
              <div style={{ display: "flex" }}>Websites en systemen</div>
              <div style={{ display: "flex" }}>die niet generiek voelen.</div>
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.4, color: "#435066" }}>
              Onderscheidende websites, managed hosting en maatwerk-routes voor merken die meer nodig hebben
              dan een standaard leverancier.
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                borderRadius: 999,
                background: "#d85b3d",
                color: "#fff7f2",
                padding: "14px 22px",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              pixelpiraterij.nl
            </div>
            <div style={{ fontSize: 22, color: "#6d788c" }}>Studio-first, warm, scherp en schaalbaar.</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
