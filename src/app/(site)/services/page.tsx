import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { MagneticAnchor } from "@/components/magnetic-button";
import { getSiteSettings } from "@/lib/content/site-settings";
import { clients } from "@/lib/content/clients";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Freelance Shopify Plus and full-stack engineering for founders and small teams: custom apps, headless storefronts, internal automation, and AI-assisted features.",
  alternates: { canonical: "/services" },
};

const offerings = [
  {
    title: "Shopify Plus & headless storefronts",
    description:
      "Custom apps, checkout customization, and migrations off a theme you've outgrown. This is where most of my hours have gone for the last few years.",
  },
  {
    title: "Internal tools & automation",
    description:
      "The unglamorous stuff that eats a week of someone's time every month: webhook-driven data pipelines, admin dashboards, rules engines like the one I built to auto-correct bad product data for '47 Brand.",
  },
  {
    title: "AI-assisted features",
    description:
      "Practical uses of the Claude or OpenAI APIs wired into a real product and a real workflow, not a chatbot bolted on for the sake of having one.",
  },
  {
    title: "Full-stack web apps",
    description:
      "From the marketing site down to the database, when what you need is one engineer who can own the whole thing instead of a hand-off between three specialists.",
  },
];

const process = [
  {
    step: "1",
    title: "A quick call",
    description: "Tell me what's broken or what you're trying to build. No deck, just a conversation.",
  },
  {
    step: "2",
    title: "Scope & estimate",
    description: "A written breakdown of what I'd build and roughly how long it takes, before anything's billed.",
  },
  {
    step: "3",
    title: "Build in the open",
    description: "Regular updates and working software early, so you're never waiting on a surprise at the end.",
  },
  {
    step: "4",
    title: "Ship & hand off",
    description: "Deployed, documented, and yours. I stick around for fixes if something comes up after launch.",
  },
];

const goodFit = [
  "A Shopify Plus store that's outgrown its theme",
  "A small business or new brand that needs a site that actually works, not a template",
  "A manual process or messy data pipeline that's quietly eating someone's week",
  "A founder who wants one engineer to own frontend to backend",
  "A team that needs extra hands for a defined stretch of work",
];

export default async function ServicesPage() {
  const settings = await getSiteSettings();

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Services
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl balance">
          I build the parts of your stack that actually need an engineer.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted balance">
          Custom Shopify apps, headless storefronts, internal tools that
          untangle messy data, and the AI-assisted features everyone&apos;s
          asking for. I work directly with founders and small teams, not
          through an agency layer.
        </p>
      </Reveal>

      {settings.email && (
        <Reveal delay={0.1} className="mt-10">
          <MagneticAnchor
            href={`mailto:${settings.email}`}
            className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Get in touch
          </MagneticAnchor>
        </Reveal>
      )}

      <Reveal delay={0.15} className="mt-20 border-t border-border pt-10">
        <h2 className="font-display text-2xl">What I build</h2>
      </Reveal>

      <RevealGroup className="mt-8 flex flex-col gap-8" stagger={0.06}>
        {offerings.map((offer) => (
          <RevealItem key={offer.title}>
            <h3 className="font-display text-lg">{offer.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
              {offer.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-2xl">How it works</h2>
      </Reveal>

      <RevealGroup className="mt-8 grid gap-8 sm:grid-cols-2" stagger={0.06}>
        {process.map((item) => (
          <RevealItem key={item.step} className="flex gap-4">
            <span className="font-mono text-sm text-faint">{item.step}</span>
            <div>
              <h3 className="font-display text-base">{item.title}</h3>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-xl">Who I work with</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {goodFit.map((point) => (
            <li key={point} className="flex gap-3 text-[0.9rem] leading-relaxed text-muted">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-green" />
              {point}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-xl">Rates & availability</h2>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
          Project-based for a defined scope, or a monthly retainer for
          ongoing work. Rates depend on scope, we can talk specifics on a
          call.
          {settings.availability && ` Currently: ${settings.availability.toLowerCase()}.`}
        </p>
      </Reveal>

      <Reveal className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-xl">Brands I&apos;ve built for</h2>
        <div className="mt-5 flex flex-wrap gap-2">
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

      {settings.email && (
        <Reveal className="mt-16 border-t border-border pt-10">
          <h2 className="font-display text-xl">Ready to start?</h2>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            Send me a note about what you&apos;re building or what&apos;s
            broken. I usually reply within a couple of days.
          </p>
          <MagneticAnchor
            href={`mailto:${settings.email}`}
            className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            {settings.email}
          </MagneticAnchor>
        </Reveal>
      )}
    </section>
  );
}
