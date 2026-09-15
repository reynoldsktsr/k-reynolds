import { RevealGroup, RevealItem, Reveal } from "@/components/reveal";
import type { ShowcaseItem } from "@/lib/content/showcase-items";

export function ShowcaseGrid({ items }: { items: ShowcaseItem[] }) {
  if (items.length === 0) {
    return (
      <Reveal>
        <div
          className="flex flex-col items-center gap-3 rounded-[20px] border border-dashed border-edge bg-surface-2 px-6 py-20 text-center"
          style={{
            backgroundImage:
              "radial-gradient(var(--edge) 1.6px, transparent 1.6px)",
            backgroundSize: "18px 18px",
          }}
        >
          <span className="rounded-full border border-edge bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-faint">
            Coming soon
          </span>
          <p className="max-w-[42ch] text-sm leading-relaxed text-muted">
            A few smaller builds and experiments are in progress. They&apos;ll
            show up here once they&apos;re ready to look at.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2" stagger={0.06}>
      {items.map((item) => (
        <RevealItem key={item.slug}>
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-edge"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg">{item.title}</h3>
              {item.status === "in-progress" && (
                <span className="shrink-0 rounded-full border border-edge bg-surface-2 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wide text-faint">
                  In progress
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
            {item.tech.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </a>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
