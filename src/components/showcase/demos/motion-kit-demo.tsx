"use client";

import type { ComponentType } from "react";
import {
  Stagger as StaggerRaw,
  AnimatedCounter as AnimatedCounterRaw,
  Marquee as MarqueeRaw,
} from "@/vendor/motion-kit/motion-kit";
import type {
  StaggerProps,
  AnimatedCounterProps,
  MarqueeProps,
} from "@/vendor/motion-kit/index";
import "@/vendor/motion-kit/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual components treat them all as optional.
const Stagger = StaggerRaw as ComponentType<StaggerProps>;
const AnimatedCounter = AnimatedCounterRaw as ComponentType<AnimatedCounterProps>;
const Marquee = MarqueeRaw as ComponentType<MarqueeProps>;

const stats = [
  { label: "Reveal", value: 60 },
  { label: "Stagger", value: 120 },
  { label: "Parallax", value: 8 },
];

export function MotionKitDemo() {
  return (
    <DemoFrame caption="Motion Kit">
      <div className="flex flex-col gap-6">
        <Stagger staggerMs={90} className="flex flex-wrap gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-[6rem]">
              <p className="font-display text-3xl font-bold text-foreground">
                <AnimatedCounter value={stat.value} duration={900} />
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-faint">
                {stat.label}
              </p>
            </div>
          ))}
        </Stagger>
        <Marquee speed={40} className="rounded-lg border border-edge-soft bg-surface-2 py-2.5">
          <span className="mx-6 font-mono text-xs text-muted">
            IntersectionObserver
          </span>
          <span className="mx-6 font-mono text-xs text-muted">
            requestAnimationFrame
          </span>
          <span className="mx-6 font-mono text-xs text-muted">
            no framer-motion
          </span>
          <span className="mx-6 font-mono text-xs text-muted">
            no gsap
          </span>
        </Marquee>
      </div>
    </DemoFrame>
  );
}
