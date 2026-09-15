import type { ReactNode } from "react";

export function DemoFrame({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-surface">
      <div className="flex items-center gap-2.5 border-b border-edge bg-surface-2 px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-edge" />
          <span className="h-2 w-2 rounded-full bg-edge" />
          <span className="h-2 w-2 rounded-full bg-edge" />
        </span>
        <span className="mr-10 flex-1 text-center font-mono text-xs text-faint">
          {caption}
        </span>
      </div>
      <div className="overflow-x-auto p-4 sm:p-5">{children}</div>
    </div>
  );
}
