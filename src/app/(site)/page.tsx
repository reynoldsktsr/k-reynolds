import { Hero } from "@/components/hero";
import { CaseStudyGrid } from "@/components/case-study-grid";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { getFeaturedCaseStudies } from "@/lib/content/case-studies";
import { getSiteSettings } from "@/lib/content/site-settings";
import Link from "next/link";

export default async function HomePage() {
  const [settings, featured] = await Promise.all([
    getSiteSettings(),
    getFeaturedCaseStudies(),
  ]);

  const tech = Array.from(new Set(featured.flatMap((study) => study.tech)));

  return (
    <>
      <Hero tagline={settings.tagline} />

      {tech.length > 0 && (
        <section className="border-y border-border py-10">
          <Marquee items={tech} />
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <Reveal className="mb-14 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl sm:text-4xl">Selected work</h2>
          <Link
            href="/work"
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            View all →
          </Link>
        </Reveal>

        <CaseStudyGrid studies={featured} />
      </section>
    </>
  );
}
