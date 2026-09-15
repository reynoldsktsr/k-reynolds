"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { CaseStudy } from "@/lib/content/types";

const CAROUSEL_MEDIA: Record<string, { src: string; fit: "cover" | "contain" }> = {
  tailorfit: { src: "/work/tailorfit.jpg", fit: "cover" },
  "ghost-lifestyle": { src: "/work/ghost-lifestyle.png", fit: "contain" },
  fracture: { src: "/work/fracture.jpg", fit: "cover" },
  heydude: { src: "/logos/heydude.png", fit: "contain" },
};

export function WorkCarousel({ studies }: { studies: CaseStudy[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(i);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const trackLeft = track.scrollLeft;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - trackLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-7 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {studies.map((study) => {
          const media = CAROUSEL_MEDIA[study.slug] ??
            (study.logo ? { src: study.logo, fit: "contain" as const } : null);

          return (
            <Link
              key={study._id}
              href={`/work/${study.slug}`}
              className="flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-edge-soft bg-background sm:w-[calc(60%-0.9rem)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                {media ? (
                  <Image
                    src={media.src}
                    alt={study.title}
                    fill
                    className={media.fit === "contain" ? "object-contain p-10" : "object-cover"}
                    sizes="(min-width: 640px) 60vw, 85vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-xs text-faint">
                    Cover pending
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-7">
                {study.client && (
                  <span className="self-start rounded-full border border-edge bg-surface px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wide text-violet-strong">
                    {study.client}
                  </span>
                )}
                <h3 className="font-display text-lg leading-snug">{study.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{study.summary}</p>
                {study.tech.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {study.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-edge-soft bg-surface px-2 py-0.5 font-mono text-[0.68rem] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollToIndex(Math.max(0, active - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-surface font-mono text-foreground transition-colors hover:bg-surface-2"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollToIndex(Math.min(studies.length - 1, active + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-surface font-mono text-foreground transition-colors hover:bg-surface-2"
        >
          →
        </button>
        <div className="flex gap-2">
          {studies.map((study, i) => (
            <button
              key={study._id}
              type="button"
              aria-label={`Go to ${study.title}`}
              onClick={() => scrollToIndex(i)}
              className={
                i === active
                  ? "h-2 w-[22px] rounded-full bg-accent transition-all"
                  : "h-2 w-2 rounded-full bg-edge transition-all"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
