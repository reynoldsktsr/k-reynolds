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
          background: "linear-gradient(135deg, #16161a 0%, #2a2a30 100%)",
          color: "#fafaf9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#ff6a4c" }}>
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
        <div style={{ display: "flex", fontSize: 26, color: "#96969c" }}>
          {[study?.role, study?.year].filter(Boolean).join(" · ")}
        </div>
      </div>
    ),
    { ...size },
  );
}
