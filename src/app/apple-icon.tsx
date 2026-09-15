import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f2eff7",
          fontFamily: "monospace",
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 96, color: "#1c1626" }}>
          k
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 96,
              marginLeft: 6,
              background: "#6d3ea6",
              color: "#f2eff7",
              borderRadius: 10,
            }}
          >
            r
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
