/**
 * Smaller builds and experiments, lighter than a full case study.
 * Empty for now: real entries land here once they're ready, each one
 * showing up on /showcase automatically.
 */
export type ShowcaseItem = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
  status: "live" | "in-progress";
};

export const showcaseItems: ShowcaseItem[] = [];
