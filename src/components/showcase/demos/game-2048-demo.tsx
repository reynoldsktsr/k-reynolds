"use client";

import { Game2048 } from "@/vendor/game-2048/index";
import "@/vendor/game-2048/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

export function Game2048Demo() {
  return (
    <DemoFrame caption="2048">
      <div className="mx-auto max-w-xs">
        <Game2048 />
      </div>
    </DemoFrame>
  );
}
