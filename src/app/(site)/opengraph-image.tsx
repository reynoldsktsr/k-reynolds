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
          background: "#f2eff7",
          color: "#1c1626",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#4f2c80" }}>
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
        <div style={{ display: "flex", fontSize: 28, color: "#675e78" }}>
          {settings.role}
        </div>
      </div>
    ),
    { ...size },
  );
}
