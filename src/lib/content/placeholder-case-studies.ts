/**
 * Case study list data, used for cards, listings, and page metadata.
 *
 * TailorFit, Ghost Lifestyle, and Fracture render through their own
 * custom components (src/components/case-study/) with recreated UI
 * mockups. '47 Brand renders through PlaceholderCaseStudy and is
 * explicitly flagged as unverified: pulled from public material, not
 * yet checked against what Kieran actually did.
 *
 * This file exists so the site renders fully before Sanity is connected.
 * Once NEXT_PUBLIC_SANITY_PROJECT_ID is set, real content written in
 * Studio (/studio) takes over automatically, see case-studies.ts.
 */
import type { CaseStudy } from "./types";

function block(text: string, style: "normal" | "h2" | "blockquote" = "normal") {
  return {
    _type: "block" as const,
    _key: crypto.randomUUID(),
    style,
    children: [{ _type: "span" as const, _key: crypto.randomUUID(), text, marks: [] }],
    markDefs: [],
  };
}

export const placeholderCaseStudies: CaseStudy[] = [
  {
    _id: "tailorfit",
    title: "TailorFit: what I built while trying to get hired myself",
    slug: "tailorfit",
    summary:
      "An AI resume tailoring and job application tracker I built solo, starting as a personal workflow to stop reusing the same generic resume for every application.",
    role: "Founder, product, and sole engineer",
    year: "2026",
    client: "Personal project",
    tech: ["React", "Supabase", "Netlify Functions", "Claude API", "Stripe"],
    featured: true,
    order: 0,
    liveUrl: "https://tailorfit.io",
    repoUrl: undefined,
    coverImage: { asset: { _ref: "", _type: "reference" }, alt: "TailorFit application tracker" },
    logo: "/logos/tailorfit.png",
    metrics: [],
    isPlaceholder: false,
    body: [block("See the full write-up on this page.")],
  },
  {
    _id: "ghost-lifestyle",
    title: "Ghost Lifestyle: fixing a loyalty program that couldn't keep up with launch day",
    slug: "ghost-lifestyle",
    summary:
      "Ghost's loyalty program kept falling over during raffles. Rebuilt the data layer, closed a fraud gap, and gave the team tools to run drops themselves.",
    role: "Senior full-stack engineer",
    year: "2024",
    client: "Ghost Lifestyle, via Sparky",
    tech: ["PostgreSQL", "Cloud Functions", "Pub/Sub", "Shopify Plus"],
    featured: true,
    order: 1,
    liveUrl: "https://ghostlifestyle.com",
    repoUrl: undefined,
    coverImage: { asset: { _ref: "", _type: "reference" }, alt: "Ghost Lifestyle loyalty dashboard" },
    logo: "/logos/ghost-lifestyle.png",
    metrics: [],
    isPlaceholder: false,
    body: [block("See the full write-up on this page.")],
  },
  {
    _id: "fracture",
    title: "Fracture: a QR code that has to work forever",
    slug: "fracture",
    summary:
      "Fracture prints photos onto glass, permanently. Built the customizer and the landing page system behind a QR code that can never break.",
    role: "Senior full-stack engineer",
    year: "2024",
    client: "Fracture, via Sparky",
    tech: ["Shopify (Headless)", "Cloudinary", "Custom Landing Pages"],
    featured: true,
    order: 2,
    liveUrl: "https://fractureme.com",
    repoUrl: undefined,
    coverImage: { asset: { _ref: "", _type: "reference" }, alt: "Fracture StoryGlass customizer" },
    logo: "/logos/fracture.png",
    metrics: [],
    isPlaceholder: false,
    body: [block("See the full write-up on this page.")],
  },
  {
    _id: "47-brand",
    title: "'47 Brand: a storefront built to move as fast as a drop",
    slug: "47-brand",
    summary:
      "Licensed sports apparel at real volume, on a storefront built for speed first.",
    role: "TBD",
    year: "2023",
    client: "'47 Brand, via Sparky",
    tech: ["Shopify Plus", "Custom Theme"],
    featured: false,
    order: 3,
    liveUrl: "https://www.47brand.com",
    repoUrl: undefined,
    coverImage: { asset: { _ref: "", _type: "reference" }, alt: "'47 Brand storefront" },
    logo: "/logos/47-brand.png",
    metrics: [],
    isPlaceholder: true,
    body: [block("Still being written up. See the note on this page.")],
  },
];
