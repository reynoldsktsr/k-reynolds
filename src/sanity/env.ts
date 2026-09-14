export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * True once a real Sanity project has been connected. Until then, the app
 * falls back to the placeholder content in `src/lib/content/`.
 */
export const isSanityConfigured = projectId.length > 0;
