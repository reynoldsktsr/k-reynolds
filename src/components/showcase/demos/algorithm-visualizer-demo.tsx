"use client";

import { useState, type ComponentType } from "react";
import {
  SortingVisualizer as SortingVisualizerRaw,
  PathfindingVisualizer as PathfindingVisualizerRaw,
} from "@/vendor/algorithm-visualizer/algorithm-visualizer";
import type {
  SortingVisualizerProps,
  PathfindingVisualizerProps,
} from "@/vendor/algorithm-visualizer/index";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual components treat them all as optional.
const SortingVisualizer = SortingVisualizerRaw as ComponentType<SortingVisualizerProps>;
const PathfindingVisualizer = PathfindingVisualizerRaw as ComponentType<PathfindingVisualizerProps>;

const TABS = [
  { id: "sorting", label: "Sorting" },
  { id: "pathfinding", label: "Pathfinding" },
] as const;

export function AlgorithmVisualizerDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("sorting");

  return (
    <DemoFrame caption="Algorithm Visualizer">
      <div className="mb-4 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
              tab === t.id
                ? "bg-foreground text-background"
                : "border border-edge text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === "sorting" ? (
        <SortingVisualizer initialSize={30} />
      ) : (
        <PathfindingVisualizer initialGridSize={16} />
      )}
    </DemoFrame>
  );
}
