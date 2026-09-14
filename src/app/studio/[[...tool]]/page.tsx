/**
 * Embedded Sanity Studio, served at /studio.
 * https://www.sanity.io/docs/getting-started-with-sanity-and-nextjs#embed-the-studio
 */
import { NextStudio } from "next-sanity/studio";
import { isSanityConfigured } from "@/sanity/env";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
            Studio isn&apos;t connected yet
          </h1>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET</code>) in your environment,
            then reload this page. See the README for setup steps.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
