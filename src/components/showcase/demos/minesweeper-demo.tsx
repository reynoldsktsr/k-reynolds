"use client";

import type { ComponentType } from "react";
import { Minesweeper as MinesweeperRaw } from "@/vendor/minesweeper-kit/minesweeper-kit";
import type { MinesweeperProps } from "@/vendor/minesweeper-kit/Minesweeper";
import "@/vendor/minesweeper-kit/minesweeper-kit.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual component treats them all as optional.
const Minesweeper = MinesweeperRaw as ComponentType<MinesweeperProps>;

export function MinesweeperDemo() {
  return (
    <DemoFrame caption="Minesweeper Kit">
      <div className="flex justify-center">
        <Minesweeper rows={9} cols={9} mineCount={10} />
      </div>
    </DemoFrame>
  );
}
