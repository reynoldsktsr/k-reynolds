import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { siteSettingsQuery } from "./queries";
import { placeholderSiteSettings } from "./placeholder-site-settings";
import type { SiteSettings } from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) {
    return placeholderSiteSettings;
  }

  try {
    const result = await client.fetch<SiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60, tags: ["siteSettings"] } },
    );

    return result ?? placeholderSiteSettings;
  } catch (error) {
    console.warn("Sanity fetch for site settings failed, using placeholder content:", error);
    return placeholderSiteSettings;
  }
}
