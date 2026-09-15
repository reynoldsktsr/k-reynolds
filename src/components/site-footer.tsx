import Link from "next/link";
import type { Route } from "next";
import type { SiteSettings } from "@/lib/content/types";
import { MagneticLink } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-12 pt-4 sm:pt-6">
      <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[28px] bg-foreground px-8 py-14 text-background sm:flex-row sm:items-center sm:px-12">
        <h2 className="max-w-[12ch] font-display text-3xl leading-tight balance sm:text-5xl">
          Got a project? Let&apos;s talk about it.
        </h2>

        <MagneticLink
          href="/contact"
          className="inline-flex shrink-0 rounded-full bg-violet-deep px-6 py-3 text-sm font-medium text-violet-strong transition-colors hover:bg-surface"
        >
          Start a conversation
        </MagneticLink>
      </Reveal>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {settings.name}
        </p>
        <div className="flex flex-wrap gap-6">
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="hover:text-foreground">
              {settings.email}
            </a>
          )}
          {settings.social.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              {link.platform}
            </a>
          ))}
          {/* "/studio" is an optional catch-all route, so it isn't part of
              the generated route literal union — cast is intentional. */}
          <Link href={"/studio" as Route} className="hover:text-foreground">
            Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
