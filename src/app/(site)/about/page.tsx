import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { CaseStudyBody } from "@/components/case-study-body";
import { getSiteSettings } from "@/lib/content/site-settings";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack engineer helping small and local businesses get an online presence that actually works. Where I've worked, what I've built, and what I actually know.",
  alternates: { canonical: "/about" },
};

type Role = {
  company: string;
  title: string;
  dates: string;
  points: string[];
};

const roles: Role[] = [
  {
    company: "Sparky",
    title: "Senior Full-Stack Engineer / Tech Lead",
    dates: "Nov 2022 to Jul 2026",
    points: [
      "Worked directly with product managers and clients to turn business asks into real technical plans.",
      "Pushed for better engineering habits across the team, code reviews, automated tests, actual documentation. Sped up the workflow by roughly 25 percent.",
      "Rebuilt the agency's internal delivery tool from a fragile one person Ruby app into something the whole team could maintain, in Node and TypeScript. Cut the busywork by about half.",
      "Got the team onto Google Cloud and laid the groundwork for offering our internal tools outside the agency.",
      "Built an AI feature using Claude that turns messy client requests into something actually actionable.",
      "Rebuilt a client's loyalty platform end to end. Moved it off MongoDB onto Postgres, closed a fraud gap, and rebuilt the infrastructure so it could survive a big product launch.",
      "Mentored a fellow engineer on architecture and business logic.",
    ],
  },
  {
    company: "VaynerCommerce (formerly LucidFusion)",
    title: "Tech Lead",
    dates: "Feb 2019 to Nov 2022",
    points: [
      "Led engineering across Node, TypeScript, React, Vue, and Angular for a mix of clients.",
      "Cleaned up agile workflows for Shopify projects and got CI/CD actually automated.",
      "Built custom middleware connecting different systems with GraphQL and REST.",
      "Built microservices on Google Cloud, using GKE, Cloud SQL, and Identity Platform.",
      "Shipped full projects across ecommerce, real estate, and entertainment, including enterprise Shopify clients like Volcom and Hydrow.",
    ],
  },
  {
    company: "Seek Capital",
    title: "Software Engineer",
    dates: "Jun 2018 to Feb 2019",
    points: [
      "Moved a product off its old setup and onto AWS.",
      "Built internal progressive web apps focused on conversion.",
    ],
  },
  {
    company: "TVGla",
    title: "Freelance Developer",
    dates: "Oct 2017 to Oct 2018",
    points: [
      "Led Angular and Vue architecture for retainer client work.",
      "Researched new UX and development approaches to speed up the team.",
    ],
  },
  {
    company: "LEVATY",
    title: "Developer",
    dates: "2016 to 2017",
    points: [
      "Worked on big data analytics tools with some genuinely advanced visualizations.",
      "Built the interfaces for complex systems, frontend first.",
    ],
  },
  {
    company: "Space150 (formerly ONE+K)",
    title: "Developer",
    dates: "2015 to 2016",
    points: [
      "Built websites and landing pages for entertainment and gaming clients, including Disney Imagineering, Warner Bros., and Deep Silver.",
    ],
  },
];

const skillGroups = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Ruby", "SQL", "MongoDB", "HTML", "CSS"],
  },
  {
    label: "Frameworks",
    items: ["Node.js", "React", "Remix", "Vue.js", "Angular"],
  },
  {
    label: "Cloud",
    items: ["Google Cloud Platform", "AWS", "Firebase", "Vercel", "Netlify"],
  },
  {
    label: "DevOps and testing",
    items: ["Docker", "Kubernetes", "GitHub Actions", "Vitest", "CI/CD"],
  },
  {
    label: "AI tools I actually use",
    items: ["Claude Code", "Anthropic API", "Cursor"],
  },
];

const clients = [
  "47Brand", "Curateur", "Ghost Lifestyle", "Enjoy Life Foods", "Fracture",
  "Great Garden Plants", "Green Digs", "HEYDUDE", "Hydrow", "Legends",
  "Magnolia Bakery", "UTZ Snacks", "Windsor", "Wink Scrubs", "Venus", "Volcom",
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          About
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl balance">
          {settings.role}
        </h1>
      </Reveal>

      <div className="mt-12">
        <CaseStudyBody value={settings.bio} />
      </div>

      <Reveal className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 text-sm sm:grid-cols-3">
        {settings.location && (
          <div>
            <p className="text-muted">Location</p>
            <p className="mt-1 font-medium">{settings.location}</p>
          </div>
        )}
        {settings.availability && (
          <div>
            <p className="text-muted">Availability</p>
            <p className="mt-1 font-medium">{settings.availability}</p>
          </div>
        )}
        {settings.email && (
          <div>
            <p className="text-muted">Email</p>
            <a href={`mailto:${settings.email}`} className="mt-1 block font-medium hover:text-accent">
              {settings.email}
            </a>
          </div>
        )}
      </Reveal>

      <Reveal delay={0.05} className="mt-20 border-t border-border pt-10">
        <h2 className="font-display text-2xl">Where I&apos;ve worked</h2>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
          The boring-but-important part, for whoever needs it in this format.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 flex flex-col gap-12" stagger={0.06}>
        {roles.map((role) => (
          <RevealItem key={role.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-3">
              <h3 className="font-display text-xl">{role.company}</h3>
              <span className="font-mono text-xs text-faint">{role.dates}</span>
            </div>
            <p className="mt-2 mb-4 font-mono text-sm text-accent">{role.title}</p>
            <ul className="flex flex-col gap-2.5">
              {role.points.map((point) => (
                <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-faint" />
                  {point}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-xl">Education</h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          University of Southern California. B.A. in Media Arts and
          Practice, minor in Web Technologies and Applications (Viterbi).
          2012 to 2016. Not a computer science degree, which is roughly
          where the self-taught part starts.
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-xl">Skills and tools</h2>
        <div className="mt-5 flex flex-col gap-4">
          {skillGroups.map((group) => (
            <div key={group.label} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="w-full font-mono text-xs uppercase tracking-wider text-faint sm:w-40 sm:shrink-0">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-xl">Brands I&apos;ve built for</h2>
        <p className="mt-3 mb-5 text-[0.95rem] leading-relaxed text-muted">
          Across agency work, mostly Shopify. Not all of these have case
          studies written up yet.
        </p>
        <div className="flex flex-wrap gap-2">
          {clients.map((client) => (
            <span
              key={client}
              className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
            >
              {client}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
