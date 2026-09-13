import Link from "next/link";
import type { Route } from "next";
import type { SiteSettings } from "@/lib/content/types";
import { MagneticLink } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-6xl balance">
            Have a project worth animating?
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <MagneticLink
            href="/contact"
            className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Start a conversation
          </MagneticLink>
        </Reveal>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8 text-sm text-muted">
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
      </div>
    </footer>
  );
}
