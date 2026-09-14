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
          background: "#100a19",
          fontFamily: "monospace",
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, color: "#f1ecf8" }}>
          k
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 40,
              marginLeft: 2,
              background: "#a97ee0",
              color: "#100a19",
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
