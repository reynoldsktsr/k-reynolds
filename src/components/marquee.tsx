"use client";

import { cn } from "@/lib/utils";

/**
 * Continuous CSS-driven marquee (no JS animation loop, so it stays smooth
 * even under main-thread pressure elsewhere on the page).
 */
export function Marquee({
  items,
  className,
  speed = 28,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max gap-12 pr-12 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap font-display text-3xl text-foreground/30 sm:text-4xl"
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
