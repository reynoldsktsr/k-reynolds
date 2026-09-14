import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/content/site-settings";

export const alt = "Kieran Reynolds, Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const settings = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(155deg, #2f2148 0%, #180f24 60%, #100a19 100%)",
          color: "#f1ecf8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#d98bab" }}>
          {settings.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {settings.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#bcaed4" }}>
          {settings.role}
        </div>
      </div>
    ),
    { ...size },
  );
}
