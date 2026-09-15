import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { caseStudiesQuery, caseStudyBySlugQuery } from "./queries";
import { placeholderCaseStudies } from "./placeholder-case-studies";
import type { CaseStudy } from "./types";

const REVALIDATE_SECONDS = 60;

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSanityConfigured) {
    return placeholderCaseStudies;
  }

  try {
    const results = await client.fetch<CaseStudy[]>(
      caseStudiesQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["caseStudy"] } },
    );

    return results.length > 0 ? results : placeholderCaseStudies;
  } catch (error) {
    console.warn("Sanity fetch for case studies failed, using placeholder content:", error);
    return placeholderCaseStudies;
  }
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  const all = await getCaseStudies();
  return all.filter((study) => study.featured);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!isSanityConfigured) {
    return placeholderCaseStudies.find((study) => study.slug === slug) ?? null;
  }

  try {
    const result = await client.fetch<CaseStudy | null>(
      caseStudyBySlugQuery,
      { slug },
      { next: { revalidate: REVALIDATE_SECONDS, tags: [`caseStudy:${slug}`] } },
    );

    if (result) return result;
  } catch (error) {
    console.warn(`Sanity fetch for case study "${slug}" failed, using placeholder content:`, error);
  }

  return placeholderCaseStudies.find((study) => study.slug === slug) ?? null;
}
