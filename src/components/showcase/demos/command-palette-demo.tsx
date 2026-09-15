"use client";

import type { ComponentType } from "react";
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

  const commands = [
    { id: "work", label: "Go to Work", group: "Navigate", action: () => alert("Would navigate to /work") },
    { id: "about", label: "Go to About", group: "Navigate", action: () => alert("Would navigate to /about") },
    { id: "contact", label: "Go to Contact", group: "Navigate", action: () => alert("Would navigate to /contact") },
    { id: "theme", label: "Toggle theme", group: "Actions", action: () => alert("Would toggle theme") },
    { id: "copy", label: "Copy page link", group: "Actions", action: () => alert("Would copy the link") },
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
      </div>
      <CommandPalette
        open={palette.open}
        onClose={palette.closePalette}
        commands={commands}
      />
    </DemoFrame>
  );
}
