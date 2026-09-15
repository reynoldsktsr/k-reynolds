/**
 * Site-wide settings. Lives here until Sanity is connected
 * (NEXT_PUBLIC_SANITY_PROJECT_ID), then Studio takes over.
 */
import type { SiteSettings } from "./types";

export const placeholderSiteSettings: SiteSettings = {
  name: "Kieran Reynolds",
  role: "Full-Stack Engineer",
  tagline:
    "I help small and local businesses get an online presence without the big agency price tag.",
  email: "kieran@k-reynolds.com",
  location: "Remote",
  availability: "Open to new projects",
  social: [
    { platform: "GitHub", url: "https://github.com/reynoldsktsr" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/reynoldskieran" },
  ],
  bio: [
    {
      _type: "block",
      _key: "bio-1",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "bio-1-span",
          marks: [],
          text: "I've spent the last several years building Shopify stores and custom apps for brands you've probably bought something from. These days I want to bring that same care to smaller businesses: the local shop, the new brand, the person who just needs a site that actually works.",
        },
      ],
    },
    {
      _type: "block",
      _key: "bio-2",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "bio-2-span",
          marks: [],
          text: "No computer science degree here. I studied media arts, taught myself the rest, and learned most of what matters by fixing things that were already on fire. I'm comfortable across the whole stack, the parts people see and the unglamorous parts holding everything up underneath.",
        },
      ],
    },
  ],
};
