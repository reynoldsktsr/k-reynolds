import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, color: "#1c1626" }}>
          k
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 40,
              marginLeft: 2,
              background: "#6d3ea6",
              color: "#f2eff7",
              borderRadius: 4,
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
