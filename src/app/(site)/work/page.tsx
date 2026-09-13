import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/case-study-grid";
import { Reveal } from "@/components/reveal";
import { getCaseStudies } from "@/lib/content/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies on interaction design, motion systems, and front-end performance.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const studies = await getCaseStudies();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal>
        <h1 className="font-display text-5xl sm:text-6xl">Work</h1>
        <p className="mt-4 max-w-xl text-lg text-muted balance">
          A handful of projects where the interaction was as important as the
          feature — how things move, respond, and feel under your cursor.
        </p>
      </Reveal>

      <div className="mt-16">
        <CaseStudyGrid studies={studies} />
      </div>
    </section>
  );
}
