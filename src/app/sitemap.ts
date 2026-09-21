import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content/case-studies";
import { SITE_URL } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studies = await getCaseStudies();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/showcase`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${SITE_URL}/work/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
