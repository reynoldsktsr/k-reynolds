import { Hero } from "@/components/hero";
import { CaseStudyGrid } from "@/components/case-study-grid";
import { Reveal } from "@/components/reveal";
import { getFeaturedCaseStudies } from "@/lib/content/case-studies";
import { getSiteSettings } from "@/lib/content/site-settings";
import Link from "next/link";

export default async function HomePage() {
  const [settings, featured] = await Promise.all([
    getSiteSettings(),
    getFeaturedCaseStudies(),
  ]);

  return (
    <>
      <Hero tagline={settings.tagline} />

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
