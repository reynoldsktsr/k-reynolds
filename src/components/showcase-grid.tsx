"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { RevealGroup, RevealItem, Reveal } from "@/components/reveal";
import type { ShowcaseItem } from "@/lib/content/showcase-items";

const DEMOS: Record<string, ComponentType> = {
  "wordle-kit": dynamic(() => import("@/components/showcase/demos/wordle-demo").then((m) => m.WordleDemo), { ssr: false }),
  "command-palette": dynamic(() => import("@/components/showcase/demos/command-palette-demo").then((m) => m.CommandPaletteDemo), { ssr: false }),
  "minesweeper-kit": dynamic(() => import("@/components/showcase/demos/minesweeper-demo").then((m) => m.MinesweeperDemo), { ssr: false }),
  "game-2048": dynamic(() => import("@/components/showcase/demos/game-2048-demo").then((m) => m.Game2048Demo), { ssr: false }),
  "tic-tac-toe-ai": dynamic(() => import("@/components/showcase/demos/tic-tac-toe-demo").then((m) => m.TicTacToeDemo), { ssr: false }),
  "markdown-widget": dynamic(() => import("@/components/showcase/demos/markdown-widget-demo").then((m) => m.MarkdownWidgetDemo), { ssr: false }),
  "form-ui-kit": dynamic(() => import("@/components/showcase/demos/form-ui-kit-demo").then((m) => m.FormUiKitDemo), { ssr: false }),
  "hover-button-lab": dynamic(() => import("@/components/showcase/demos/hover-button-lab-demo").then((m) => m.HoverButtonLabDemo), { ssr: false }),
};

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
    <RevealGroup className="flex flex-col gap-14" stagger={0.06}>
      {items.map((item) => {
        const Demo = DEMOS[item.slug];
        return (
          <RevealItem key={item.slug}>
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg">{item.title}</h3>
                  <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
                {item.status === "in-progress" && (
                  <span className="shrink-0 rounded-full border border-edge bg-surface-2 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wide text-faint">
                    In progress
                  </span>
                )}
              </div>

              {item.tech.length > 0 && (
                <ul className="flex flex-wrap gap-2">
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

              {Demo && <Demo />}

              <div className="flex gap-5">
                {item.status === "live" && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent hover:text-violet-strong"
                  >
                    Open full demo ↗
                  </a>
                )}
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted hover:text-foreground"
                >
                  Source ↗
                </a>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
