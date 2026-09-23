"use client";

import { useState, type ComponentType } from "react";
import { KanbanBoard as KanbanBoardRaw } from "@/vendor/kanban-board/kanban-board";
import type { Column, KanbanBoardProps } from "@/vendor/kanban-board/index";
import "@/vendor/kanban-board/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual component treats them all as optional.
const KanbanBoard = KanbanBoardRaw as ComponentType<KanbanBoardProps>;

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "card-1", title: "Write onboarding checklist" },
      { id: "card-2", title: "Research keyboard shortcuts" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "card-3", title: "Implement drag-and-drop reordering", description: "Native HTML5 DnD, no library." },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [{ id: "card-4", title: "Set up the project" }],
  },
];

export function KanbanBoardDemo() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  return (
    <DemoFrame caption="Kanban Board">
      <KanbanBoard columns={columns} onChange={setColumns} />
    </DemoFrame>
  );
}
