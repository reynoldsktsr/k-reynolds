import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ShowcaseGrid } from "@/components/showcase-grid";
import { showcaseItems } from "@/lib/content/showcase-items";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Smaller builds and experiments, tech demos and one-off tools, lighter than a full case study.",
  alternates: { canonical: "/showcase" },
};

export default function ShowcasePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Showcase
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl balance">
          Tech demos
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted balance">
          Smaller builds that don&apos;t need a full case study: experiments,
          one-off tools, things I built because I was curious.
        </p>
      </Reveal>

      <div className="mt-16">
        <ShowcaseGrid items={showcaseItems} />
      </div>
    </section>
  );
}
