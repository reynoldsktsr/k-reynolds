import type { ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export function CaseStudyHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  meta: ReactNode;
}) {
  return (
    <header>
      <Reveal>
        <p className="mb-3 font-mono text-sm text-rose">{eyebrow}</p>
        <h1 className="mb-10 max-w-[20ch] font-display text-3xl font-bold leading-tight balance sm:text-4xl">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.05} className="mb-14 grid items-start gap-9 md:grid-cols-[1.5fr_1fr]">
        <p className="text-lg leading-relaxed text-muted">{lede}</p>
        {meta}
      </Reveal>
    </header>
  );
}

export function CaseStudyMeta({
  client,
  via,
  role,
  stack,
  liveUrl,
  notClient = false,
}: {
  client: string;
  via: string;
  role: string;
  stack: string[];
  liveUrl?: string;
  notClient?: boolean;
}) {
  return (
    <aside className="rounded-xl border border-border bg-surface p-5">
      {notClient && (
        <p className="mb-4 rounded-lg border border-dashed border-edge bg-surface-2 px-3 py-2.5 font-mono text-[0.7rem] leading-relaxed text-muted">
          Not a direct client. I worked on this via {via}.
        </p>
      )}
      <dl className="flex flex-col gap-3.5">
        <div>
          <dt className="mb-0.5 font-mono text-[0.66rem] uppercase tracking-wider text-faint">
            Client
          </dt>
          <dd className="text-[0.92rem]">{client}</dd>
        </div>
        {!notClient && (
          <div>
            <dt className="mb-0.5 font-mono text-[0.66rem] uppercase tracking-wider text-faint">
              Via
            </dt>
            <dd className="text-[0.92rem]">{via}</dd>
          </div>
        )}
        <div>
          <dt className="mb-0.5 font-mono text-[0.66rem] uppercase tracking-wider text-faint">
            Role
          </dt>
          <dd className="text-[0.92rem]">{role}</dd>
        </div>
      </dl>
      {(stack.length > 0 || liveUrl) && (
        <div className="mt-4 flex flex-col gap-3 border-t border-dashed border-edge pt-4">
          {stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1 text-[0.85rem] font-medium text-accent hover:text-violet-strong"
            >
              Visit site ↗
            </a>
          )}
        </div>
      )}
    </aside>
  );
}

export function BuiltList({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <RevealGroup className="mb-14 flex max-w-[62ch] flex-col gap-5" stagger={0.06}>
      {items.map((item, i) => (
        <RevealItem key={item.title}>
          <div className="grid grid-cols-[22px_1fr] gap-3">
            <span className="pt-0.5 font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <b className="mb-1 block text-foreground">{item.title}</b>
              <span className="text-[0.95rem] leading-relaxed text-muted">
                {item.description}
              </span>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function CaseStudySubhead({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 mt-14 font-display text-lg font-semibold">
      {children}
    </h2>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="mt-16 max-w-[32ch] border-t border-edge pt-7 font-display text-xl font-medium leading-snug balance sm:text-2xl">
        {children}
      </p>
    </Reveal>
  );
}
