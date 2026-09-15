"use client";

import type { ComponentType } from "react";
import { TicTacToe as TicTacToeRaw } from "@/vendor/tic-tac-toe-ai/tic-tac-toe-ai";
import type { TicTacToeProps } from "@/vendor/tic-tac-toe-ai/index";
import "@/vendor/tic-tac-toe-ai/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual component treats them all as optional.
const TicTacToe = TicTacToeRaw as ComponentType<TicTacToeProps>;

export function TicTacToeDemo() {
  return (
    <DemoFrame caption="Tic-Tac-Toe AI">
      <div className="mx-auto max-w-xs">
        <TicTacToe difficulty="unbeatable" firstPlayer="human" />
      </div>
    </DemoFrame>
  );
}
