"use client";

import type { ComponentType } from "react";
import { Wordle as WordleRaw } from "@/vendor/wordle-kit/wordle-kit";
import type { WordleProps } from "@/vendor/wordle-kit/index";
import "@/vendor/wordle-kit/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual component treats them all as optional.
const Wordle = WordleRaw as ComponentType<WordleProps>;

export function WordleDemo() {
  return (
    <DemoFrame caption="Wordle Kit">
      <div className="mx-auto max-w-xs">
        <Wordle />
      </div>
    </DemoFrame>
  );
}
