"use client";

import type { ComponentType } from "react";
import { MarkdownEditor as MarkdownEditorRaw } from "@/vendor/markdown-widget/markdown-widget.es";
import type { MarkdownEditorProps } from "@/vendor/markdown-widget/index";
import "@/vendor/markdown-widget/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual component treats them all as optional.
const MarkdownEditor = MarkdownEditorRaw as ComponentType<MarkdownEditorProps>;

const seed = `# Try it out

This is a **live** markdown editor. Type on the left, see it rendered on the right.

- Split-pane live preview
- A formatting toolbar
- Nothing to configure

> Built as a standalone React component.
`;

export function MarkdownWidgetDemo() {
  return (
    <DemoFrame caption="Markdown Widget">
      <MarkdownEditor initialValue={seed} />
    </DemoFrame>
  );
}
