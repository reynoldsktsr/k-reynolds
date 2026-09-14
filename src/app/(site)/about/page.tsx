import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CaseStudyBody } from "@/components/case-study-body";
import { getSiteSettings } from "@/lib/content/site-settings";

export const metadata: Metadata = {
  title: "About",
  description: "Full-stack engineer helping small and local businesses get an online presence that actually works.",
  alternates: { canonical: "/about" },
};

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
    </section>
  );
}
