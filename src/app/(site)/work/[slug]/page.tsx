import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { getCaseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { CoverMedia } from "@/components/cover-media";
import { CaseStudyBody } from "@/components/case-study-body";
import { StatCounter } from "@/components/stat-counter";
import { Reveal } from "@/components/reveal";
import { SITE_URL } from "@/lib/site-config";
import { GhostLifestyleCaseStudy } from "@/components/case-study/ghost-lifestyle";
import { FractureCaseStudy } from "@/components/case-study/fracture";
import { TailorFitCaseStudy } from "@/components/case-study/tailorfit";
import { PlaceholderCaseStudy } from "@/components/case-study/placeholder-case-study";

const customCaseStudies: Record<string, () => React.JSX.Element> = {
  "ghost-lifestyle": GhostLifestyleCaseStudy,
  fracture: FractureCaseStudy,
  tailorfit: TailorFitCaseStudy,
};

const roughCaseStudies: Record<
  string,
  { title: string; lede: string; client: string; stat: string }
> = {
  heydude: {
    title: "HEYDUDE: getting a newly-acquired brand up to speed",
    lede: "Right after Crocs bought HEYDUDE, the brand needed a storefront that could handle its new scale. The team built a fully custom Shopify theme to replace the templated setup it was running on.",
    client: "HEYDUDE",
    stat: "Roughly 3x faster page loads, reported",
  },
  "47-brand": {
    title: "'47 Brand: a storefront built to move as fast as a drop",
    lede: "Licensed sports apparel sells in bursts. This storefront needed to keep up with product drops without falling over, so the team built a fully custom Shopify theme with speed as the whole point.",
    client: "'47 Brand",
    stat: "Roughly 3x faster page loads, reported",
  },
  legends: {
    title: "Legends: shipping a custom storefront before the holidays hit",
    lede: "Built and launched just ahead of a holiday deadline, which is usually when 'custom' and 'on time' don't end up in the same sentence.",
    client: "Legends",
    stat: "About a 2.75x lift in site speed, reported",
  },
  orthofeet: {
    title: "Orthofeet: modernizing a storefront that outgrew its old setup",
    lede: "A global orthopedic footwear brand moving off a dated storefront onto a modern Shopify Plus setup built to grow with the catalog.",
    client: "Orthofeet",
    stat: "Results not yet confirmed",
  },
};

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      url: `${SITE_URL}/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);

  if (!study) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: study.title,
    description: study.summary,
    author: { "@type": "Person", name: "Kieran Reynolds" },
    url: `${SITE_URL}/work/${study.slug}`,
  };

  const CustomCaseStudy = customCaseStudies[slug];
  const rough = roughCaseStudies[slug];

  if (CustomCaseStudy || rough) {
    return (
      <article className="mx-auto max-w-4xl px-6 pb-32 pt-20 sm:pt-28">
        <Script
          id={`ld-case-study-${study.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        <Reveal className="mb-10">
          <Link href="/work" className="text-sm text-muted hover:text-foreground">
            ← Work
          </Link>
        </Reveal>
        {CustomCaseStudy ? <CustomCaseStudy /> : <PlaceholderCaseStudy {...rough} />}
      </article>
    );
  }

  return (
    <article>
      <Script
        id={`ld-case-study-${study.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <header className="mx-auto max-w-5xl px-6 pt-20 pb-10 sm:pt-28">
        <Reveal>
          <Link href="/work" className="text-sm text-muted hover:text-foreground">
            ← Work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 font-display text-4xl sm:text-6xl balance">
            {study.title}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-muted balance">
            {study.summary}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8 text-sm">
            {study.role && (
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="mt-1 font-medium">{study.role}</dd>
              </div>
            )}
            {study.client && (
              <div>
                <dt className="text-muted">Client</dt>
                <dd className="mt-1 font-medium">{study.client}</dd>
              </div>
            )}
            {study.year && (
              <div>
                <dt className="text-muted">Year</dt>
                <dd className="mt-1 font-medium">{study.year}</dd>
              </div>
            )}
            {study.tech.length > 0 && (
              <div>
                <dt className="text-muted">Stack</dt>
                <dd className="mt-1 max-w-xs font-medium">
                  {study.tech.join(", ")}
                </dd>
              </div>
            )}
          </dl>
        </Reveal>
      </header>

      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
          <CoverMedia
            image={study.coverImage}
            logo={study.logo}
            seed={study.slug}
            priority
            className="h-full w-full"
          />
        </div>
      </Reveal>

      {study.metrics.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-2 gap-8 border-y border-border py-10 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <Reveal key={metric.label}>
                <p className="font-display text-4xl">
                  <StatCounter value={metric.value} />
                </p>
                <p className="mt-1 text-sm text-muted">{metric.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-5xl px-6 pb-32">
        <CaseStudyBody value={study.body} />

        <div className="mt-16 flex flex-wrap gap-4 border-t border-border pt-8">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              View live
            </a>
          )}
          {study.repoUrl && (
            <a
              href={study.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-foreground"
            >
              View code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
