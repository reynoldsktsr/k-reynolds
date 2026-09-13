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
