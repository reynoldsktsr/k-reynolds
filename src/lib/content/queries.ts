import { groq } from "next-sanity";

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    role,
    client,
    year,
    tech,
    featured,
    order,
    liveUrl,
    repoUrl,
    coverImage,
    metrics,
    body
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    role,
    client,
    year,
    tech,
    featured,
    order,
    liveUrl,
    repoUrl,
    coverImage,
    metrics,
    body
  }
`;

export const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    name,
    role,
    tagline,
    bio,
    email,
    location,
    availability,
    social
  }
`;
