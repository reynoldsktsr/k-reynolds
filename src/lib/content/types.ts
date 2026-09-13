import type { PortableTextBlock } from "@portabletext/react";

export type SanityImageRef = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  alt?: string;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudy = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  role: string;
  year: string;
  client?: string;
  tech: string[];
  featured: boolean;
  order: number;
  liveUrl?: string;
  repoUrl?: string;
  coverImage: SanityImageRef;
  metrics: CaseStudyMetric[];
  body: PortableTextBlock[];
  isPlaceholder?: boolean;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type SiteSettings = {
  name: string;
  role: string;
  tagline: string;
  bio: PortableTextBlock[];
  email?: string;
  location?: string;
  availability?: string;
  social: SocialLink[];
};
