"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

const MotionLink = motion.create(Link);

/**
 * Shared pointer-tracking logic for the "magnetic" hover effect: the
 * element leans gently toward the cursor when nearby and springs back
 * on leave. Strength is intentionally subtle.
 */
function useMagnetic(strength: number) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return { style: { x: springX, y: springY }, onPointerMove, onPointerLeave };
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
} & Omit<HTMLMotionProps<"button">, "children" | "className" | "style">) {
  const ref = useRef<HTMLButtonElement>(null);
  const magnetic = useMagnetic(strength);

  return (
    <motion.button ref={ref} className={className} {...magnetic} {...props}>
      {children}
    </motion.button>
  );
}

export function MagneticLink({
  children,
  className,
  strength = 0.35,
  href,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  href: React.ComponentProps<typeof Link>["href"];
}) {
  const magnetic = useMagnetic(strength);

  return (
    <MotionLink href={href} className={className} {...magnetic}>
      {children}
    </MotionLink>
  );
}

/**
 * Same effect for external / non-route hrefs (mailto:, tel:, https://...)
 * where Next's typed `Link` href would reject the string.
 */
export function MagneticAnchor({
  children,
  className,
  strength = 0.35,
  href,
  ...props
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
} & Omit<HTMLMotionProps<"a">, "children" | "className" | "style">) {
  const magnetic = useMagnetic(strength);

  return (
    <motion.a href={href} className={className} {...magnetic} {...props}>
      {children}
    </motion.a>
  );
}
