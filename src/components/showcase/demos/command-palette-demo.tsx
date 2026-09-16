"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  CommandPalette as CommandPaletteRaw,
  useCommandPalette,
} from "@/vendor/command-palette/command-palette";
import type { CommandPaletteProps } from "@/vendor/command-palette/index";
import "@/vendor/command-palette/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual component treats most of them as optional.
const CommandPalette = CommandPaletteRaw as ComponentType<CommandPaletteProps>;

export function CommandPaletteDemo() {
  const palette = useCommandPalette();
  const [lastAction, setLastAction] = useState<string | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(clearTimer.current), []);

  function runAction(message: string) {
    setLastAction(message);
    clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setLastAction(null), 2200);
  }

  const commands = [
    { id: "work", label: "Go to Work", group: "Navigate", action: () => runAction("Would navigate to /work") },
    { id: "about", label: "Go to About", group: "Navigate", action: () => runAction("Would navigate to /about") },
    { id: "contact", label: "Go to Contact", group: "Navigate", action: () => runAction("Would navigate to /contact") },
    { id: "theme", label: "Toggle theme", group: "Actions", action: () => runAction("Would toggle theme") },
    { id: "copy", label: "Copy page link", group: "Actions", action: () => runAction("Would copy the link") },
  ];

  return (
    <DemoFrame caption="Command Palette">
      <div className="flex flex-col items-center gap-4 py-6">
        <p className="text-sm text-muted">Press Cmd/Ctrl+K, or</p>
        <button
          type="button"
          onClick={palette.openPalette}
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          Open command palette
        </button>
        <p
          className={`font-mono text-xs text-accent transition-opacity ${lastAction ? "opacity-100" : "opacity-0"}`}
          aria-live="polite"
        >
          {lastAction ?? " "}
        </p>
      </div>
      <CommandPalette
        open={palette.open}
        onClose={palette.closePalette}
        commands={commands}
      />
    </DemoFrame>
  );
}
