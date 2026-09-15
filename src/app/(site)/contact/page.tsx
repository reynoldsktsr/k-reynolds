import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { MagneticAnchor } from "@/components/magnetic-button";
import { ContactForm } from "@/components/contact-form";
import { getSiteSettings } from "@/lib/content/site-settings";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about a project.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Contact
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl balance">
          Let&apos;s talk about your project.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted balance">
          The fastest way to reach me is email. I usually reply within a
          couple of days.
        </p>
      </Reveal>

      {settings.email && (
        <Reveal delay={0.1} className="mt-10">
          <MagneticAnchor
            href={`mailto:${settings.email}`}
            className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            {settings.email}
          </MagneticAnchor>
        </Reveal>
      )}

      <Reveal delay={0.15} className="mt-14 max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Or send a message
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </Reveal>

      {settings.social.length > 0 && (
        <Reveal delay={0.2} className="mt-16 flex flex-wrap gap-6 border-t border-border pt-8 text-sm">
          {settings.social.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground"
            >
              {link.platform}
            </a>
          ))}
        </Reveal>
      )}
    </section>
  );
}
