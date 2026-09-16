"use client";

import type { ComponentType } from "react";
import { Wordle as WordleRaw, DEFAULT_WORD_LIST } from "@/vendor/wordle-kit/wordle-kit";
import type { WordleProps } from "@/vendor/wordle-kit/index";
import "@/vendor/wordle-kit/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual component treats them all as optional.
const Wordle = WordleRaw as ComponentType<WordleProps>;

// The package's own 710-word default list is curated but misses a lot
// of everyday words (including, ironically, "REACT"), so a visitor's
// first natural guess often gets rejected as "not in word list" and
// the demo feels broken. Widen the pool with common words people
// actually reach for, so typing something ordinary is more likely to
// land, without touching the vendored package itself.
const EXTRA_WORDS = [
  "REACT", "CRANE", "ABOUT", "HOUSE", "MOUSE", "WORLD", "HELLO", "PHONE",
  "PLANE", "BRAIN", "CHAIR", "TABLE", "VIDEO", "MUSIC", "HAPPY", "SMILE",
  "DANCE", "DREAM", "LIGHT", "NIGHT", "WATER", "EARTH", "HEART", "PEACE",
  "TRUST", "LEARN", "TEACH", "BUILD", "SHARE", "SPARK", "STACK", "STYLE",
  "CODER", "DEBUG", "ARRAY", "QUERY",
];

const WORD_LIST = Array.from(new Set([...DEFAULT_WORD_LIST, ...EXTRA_WORDS]));

export function WordleDemo() {
  return (
    <DemoFrame caption="Wordle Kit">
      <div className="mx-auto max-w-xs">
        <Wordle wordList={WORD_LIST} />
      </div>
    </DemoFrame>
  );
}
