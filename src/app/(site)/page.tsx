import { Hero } from "@/components/hero";
import { WorkCarousel } from "@/components/work-carousel";
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

      <section className="relative z-10 -mt-16 rounded-t-[28px] bg-surface pb-2 pt-14 shadow-[0_-20px_50px_-30px_rgba(28,22,38,0.12)] sm:-mt-20 sm:pt-16">
        <div className="mx-auto max-w-5xl px-6 pb-16 sm:pb-20">
          <Reveal className="mb-12 flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl sm:text-4xl">Selected work</h2>
            <Link
              href="/work"
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              View all →
            </Link>
          </Reveal>

          <WorkCarousel studies={featured} />
        </div>
      </section>

      <Reveal className="relative z-20 mx-6 -mt-8 mb-10 rounded-[28px] bg-surface-2 px-6 py-14 sm:mx-auto sm:max-w-5xl sm:px-12 sm:py-16">
        <div className="grid items-center gap-10 sm:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="mb-4 max-w-[12ch] font-display text-2xl leading-tight sm:text-3xl">
              Built by one person, start to finish.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              No account managers, no handoffs between teams. I scope it,
              build it, and ship it, so you&apos;re always talking to the
              person actually writing the code.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent"
            >
              More about me →
            </Link>
          </div>
          <div
            className="relative aspect-square overflow-hidden rounded-[20px] bg-surface"
            style={{
              backgroundImage:
                "radial-gradient(var(--edge) 1.6px, transparent 1.6px)",
              backgroundSize: "18px 18px",
            }}
          >
            <div className="absolute inset-[18%] flex items-center justify-center rounded-2xl bg-accent">
              <span className="font-mono text-4xl font-semibold text-surface sm:text-5xl">
                kr
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
