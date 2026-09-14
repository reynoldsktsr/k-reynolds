import { ImageResponse } from "next/og";
import { getCaseStudies, getCaseStudy } from "@/lib/content/case-studies";

export const alt = "Case study cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);

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
        <div style={{ display: "flex", fontSize: 28, color: "#d98bab" }}>
          Case study
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          {study?.title ?? "Untitled project"}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#bcaed4" }}>
          {[study?.role, study?.year].filter(Boolean).join(" · ")}
        </div>
      </div>
    ),
    { ...size },
  );
}
