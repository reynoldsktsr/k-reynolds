# Kieran Reynolds — Portfolio

A Next.js portfolio built around motion: case studies for front-end projects,
written and edited in Sanity, with animation as the main design language
rather than an afterthought.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** for styling
- **Sanity** as a headless CMS, embedded directly at `/studio` — no separate
  Sanity project folder or deploy step
- **Framer Motion** for scroll reveals, page transitions, shared-element nav
  underline, and the magnetic-button hover effect
- **Lenis** for smooth scrolling
- Dynamic **Open Graph images** generated per case study (`next/og`), plus a
  generated sitemap and robots file for SEO

## Current state: placeholder content

**The case studies on this site right now are sample content, not real
projects.** They live in `src/lib/content/placeholder-*.ts` and are clearly
labeled as placeholders in the code and in the "Sample cover" badge shown in
place of a real image. The site was scaffolded before Sanity was connected,
so it needed something to render — this is that something.

Once Sanity is connected (see below) and real case studies exist in the
dataset, the placeholder content stops being used automatically. There's
nothing to switch off by hand: `src/lib/content/case-studies.ts` and
`site-settings.ts` check whether Sanity is configured and reachable, and only
fall back to the placeholder file when it isn't — see `isSanityConfigured` in
`src/sanity/env.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without any Sanity
environment variables set, the site renders fully using the placeholder case
studies described above.

## Connecting Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (or
   run `npx sanity@latest init` from this folder and choose "create new
   project" — it will detect the existing schema in `src/sanity`).
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Restart the dev server, then open `/studio` in the browser. You'll be
   asked to log in with your Sanity account and grant this project access.
4. In Studio, fill in **Site Settings** (name, role, tagline, bio, email,
   social links) — there's one singleton document for this — then add
   **Case Study** documents for your real projects.

The Studio is embedded in the Next.js app itself (`src/app/studio`), so it
deploys with the rest of the site — there's no separate Sanity hosting step.
Before a project ID is set, `/studio` shows a short message instead of
crashing.

### Writing a case study

Each case study has: title/slug, a one-to-two sentence summary, a cover
image, role, client/context, year, a tags-style list of tools and
technologies, optional metrics (label + value — values like `-38%` or `0.9s`
animate in on scroll via `StatCounter`), optional live/repo URLs, and a
long-form body written in Sanity's rich text editor. Headings, blockquotes,
links, and inline images are all styled and animate in as you scroll.

## Project structure

```
src/app/(site)/         marketing site — home, /work, /work/[slug], /about, /contact
src/app/studio/         embedded Sanity Studio at /studio (its own root layout)
src/app/sitemap.ts       generated sitemap.xml
src/app/robots.ts        generated robots.txt
src/components/         animation components (reveal, magnetic button, marquee,
                         nav, footer, case study card/grid, stat counter, etc.)
src/lib/content/         data layer: types, GROQ queries, Sanity + placeholder
                         fallback, placeholder content
src/sanity/              Sanity client, image URL builder, schema, Studio structure
sanity.config.ts         Studio config (schema, plugins) — imported by the /studio route
```

Two things worth knowing about the App Router setup here:

- **`(site)` route group**: the marketing pages live under `src/app/(site)`
  so they can have their own root layout (fonts, nav, footer, smooth
  scrolling) separate from the Studio's root layout at `src/app/studio`,
  which needs to be a bare, unstyled shell. Next.js supports multiple root
  layouts this way.
- **`template.tsx`**: `src/app/(site)/template.tsx` re-mounts on every
  navigation (unlike `layout.tsx`, which persists), which is what drives the
  page-entrance transition.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build (also type-checks and generates all
  static case study pages + their OG images)
- `npm run start` — run the production build locally
- `npm run lint` — ESLint

## Deployment

Deploys like any Next.js app (e.g. Vercel: import the repo, no extra config
needed). Set the same environment variables from `.env.example` in your
hosting provider, plus `NEXT_PUBLIC_SITE_URL` to your real domain — it's used
in metadata, the sitemap, and Open Graph URLs.

## What's not wired up yet

- **Contact**: the `/contact` page links straight to a mailto address and
  social links — there's no contact form, so nothing to hook up to a backend.
  If you want a real form later, something like a serverless function or a
  service such as Formspree would be a reasonable, low-effort addition.
- **Images**: case studies without a real Sanity image fall back to a
  generated gradient placeholder rather than a broken image icon
  (`src/components/cover-media.tsx`). Add a cover image in Studio and it's
  used automatically.
