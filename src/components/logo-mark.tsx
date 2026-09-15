import { cn } from "@/lib/utils";

/**
 * kreynolds wordmark with a blinking cursor block sitting on the "r" —
 * the "r" inverts to white in sync with the block so it stays legible
 * whether the block is showing or not.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("font-mono font-semibold", className)}>
      k
      <span className="relative -mx-px px-px rounded-[2px]">
        <span
          aria-hidden
          className="absolute -inset-px -z-10 rounded-[2px] bg-violet animate-[blink_1.1s_step-end_infinite] motion-reduce:animate-none motion-reduce:opacity-100"
        />
        <span className="text-surface animate-[caret-invert_1.1s_step-end_infinite] motion-reduce:animate-none motion-reduce:text-surface">
          r
        </span>
      </span>
      eynolds
    </span>
  );
}
