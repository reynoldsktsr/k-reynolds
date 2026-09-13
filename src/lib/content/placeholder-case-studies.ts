/**
 * SAMPLE CONTENT — not real projects.
 *
 * This file exists so the site renders fully before Sanity is connected.
 * Once NEXT_PUBLIC_SANITY_PROJECT_ID is set and real case studies are
 * written in Studio (/studio), everything here is ignored automatically —
 * see `src/lib/content/case-studies.ts`. Replace or delete this file
 * once real content exists.
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
    _id: "placeholder-aurora",
    title: "Aurora — a motion-first analytics dashboard",
    slug: "aurora-analytics-dashboard",
    summary:
      "A data-dense dashboard that stays legible in motion: charts morph between views instead of cutting, and the whole thing still hits a sub-second load.",
    role: "Lead Front-End Engineer",
    year: "2024",
    client: "Sample project",
    tech: ["React", "Framer Motion", "React Three Fiber", "D3", "Vite"],
    featured: true,
    order: 1,
    liveUrl: undefined,
    repoUrl: undefined,
    coverImage: { asset: { _ref: "", _type: "reference" }, alt: "Aurora dashboard" },
    metrics: [
      { label: "Time to interactive", value: "0.9s" },
      { label: "Chart re-render", value: "under 16ms" },
      { label: "Bundle size", value: "-38%" },
    ],
    isPlaceholder: true,
    body: [
      block(
        "This is placeholder copy standing in for a real case study. Swap it out in Sanity Studio once your project details are ready.",
      ),
      block("The problem", "h2"),
      block(
        "The existing dashboard redrew charts on every filter change, which read as flicker rather than feedback. The brief was to make state changes feel continuous without slowing anything down.",
      ),
      block("The approach", "h2"),
      block(
        "Chart transitions were driven by shared layout animations so axes and shapes tween between states instead of swapping instantly. Heavier scenes were split into their own render loop so the rest of the UI stayed responsive during interaction.",
      ),
      block(
        "Motion only ships where it earns its keep — big state changes get a tween, small ones stay instant, and everything respects reduced-motion preferences.",
        "blockquote",
      ),
    ],
  },
  {
    _id: "placeholder-fintech",
    title: "Ledger — fintech onboarding redesign",
    slug: "ledger-onboarding-redesign",
    summary:
      "Rebuilt a five-step signup flow as a single scroll-driven sequence, cutting drop-off by making progress feel physical instead of abstract.",
    role: "Front-End Engineer",
    year: "2023",
    client: "Sample project",
    tech: ["Next.js", "GSAP", "Radix UI", "Tailwind CSS"],
    featured: true,
    order: 2,
    liveUrl: undefined,
    repoUrl: undefined,
    coverImage: { asset: { _ref: "", _type: "reference" }, alt: "Ledger onboarding flow" },
    metrics: [
      { label: "Drop-off", value: "-27%" },
      { label: "Steps completed", value: "+19%" },
      { label: "Lighthouse a11y", value: "100" },
    ],
    isPlaceholder: true,
    body: [
      block(
        "Placeholder copy — replace with the real story once this case study is written.",
      ),
      block("The problem", "h2"),
      block(
        "Users lost their place between onboarding steps and couldn't tell how much was left, so a large share abandoned midway.",
      ),
      block("The approach", "h2"),
      block(
        "Each step became a scroll-pinned scene with its own entrance and exit choreography, tied to scroll position rather than fixed timers. A persistent progress indicator animated continuously instead of jumping between fixed states.",
      ),
    ],
  },
  {
    _id: "placeholder-nimbus",
    title: "Nimbus — a component system built for motion",
    slug: "nimbus-design-system",
    summary:
      "A design system where animation is a first-class prop, not an afterthought bolted on by individual teams.",
    role: "Design Systems Engineer",
    year: "2023",
    client: "Sample project",
    tech: ["React", "Framer Motion", "Storybook", "TypeScript"],
    featured: true,
    order: 3,
    liveUrl: undefined,
    repoUrl: undefined,
    coverImage: { asset: { _ref: "", _type: "reference" }, alt: "Nimbus component system" },
    metrics: [
      { label: "Components shipped", value: "64" },
      { label: "Teams adopted", value: "6" },
      { label: "Motion bugs reported", value: "-80%" },
    ],
    isPlaceholder: true,
    body: [
      block("Placeholder copy — replace with the real story once this case study is written."),
      block("The problem", "h2"),
      block(
        "Every team hand-rolled their own transitions, so timing and easing drifted apart across the product until nothing felt like it belonged to the same app.",
      ),
      block("The approach", "h2"),
      block(
        "Motion tokens (duration, easing, distance) were defined once alongside color and spacing tokens, then wired into a small set of primitives — reveal, stagger, and presence — that every component composed from.",
      ),
    ],
  },
  {
    _id: "placeholder-atlas",
    title: "Atlas — an interactive map for field data",
    slug: "atlas-field-data-explorer",
    summary:
      "A map-first tool for exploring thousands of field records without the browser choking, built around virtualized rendering and buttery pan and zoom.",
    role: "Front-End Engineer",
    year: "2022",
    client: "Sample project",
    tech: ["React", "MapLibre GL", "WebGL", "Lenis"],
    featured: false,
    order: 4,
    liveUrl: undefined,
    repoUrl: undefined,
    coverImage: { asset: { _ref: "", _type: "reference" }, alt: "Atlas map explorer" },
    metrics: [
      { label: "Records rendered", value: "40,000+" },
      { label: "Frame rate", value: "60fps" },
    ],
    isPlaceholder: true,
    body: [
      block("Placeholder copy — replace with the real story once this case study is written."),
      block("The problem", "h2"),
      block(
        "Rendering every marker directly brought the map to a crawl once a dataset passed a few thousand points.",
      ),
      block("The approach", "h2"),
      block(
        "Markers were clustered and rendered to a WebGL layer instead of individual DOM nodes, with detail views loading lazily only once a cluster was opened.",
      ),
    ],
  },
];
