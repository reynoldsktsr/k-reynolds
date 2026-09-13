/**
 * SAMPLE CONTENT — replace via Sanity Studio (/studio → Site Settings)
 * once NEXT_PUBLIC_SANITY_PROJECT_ID is configured.
 */
import type { SiteSettings } from "./types";

export const placeholderSiteSettings: SiteSettings = {
  name: "Kieran Reynolds",
  role: "Front-End Engineer",
  tagline:
    "Front-end engineer specializing in motion, interaction design, and the details most teams skip.",
  email: "kieran@k-reynolds.com",
  location: "Remote",
  availability: "Open to new projects",
  social: [
    { platform: "GitHub", url: "https://github.com/reynoldsktsr" },
    { platform: "LinkedIn", url: "https://www.linkedin.com" },
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
          text: "This is placeholder bio copy. Replace it in Sanity Studio with a real introduction — what you work on, how you think about front-end engineering, and what kind of projects you're looking for.",
        },
      ],
    },
  ],
};
