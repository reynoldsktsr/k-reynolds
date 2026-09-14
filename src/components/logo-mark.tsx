import { cn } from "@/lib/utils";

/**
 * kreynolds wordmark with a blinking cursor block sitting on the "r" —
 * the letter stays legible, the block just flashes behind it.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("font-mono font-semibold", className)}>
      k
      <span className="relative -mx-px px-px rounded-[2px]">
        <span
          aria-hidden
          className="absolute -inset-px -z-10 rounded-[2px] bg-violet animate-[blink_1.1s_step-end_infinite] motion-reduce:animate-none motion-reduce:opacity-55"
        />
        r
      </span>
      eynolds
    </span>
  );
}
