"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Defers mounting `children` until the wrapper has scrolled near the
 * viewport, then keeps it mounted. With 16+ showcase demos on one page,
 * next/dynamic's code-splitting alone isn't enough: every demo still
 * mounts (and starts any rAF/WebGL/physics loop) as soon as the page
 * renders, regardless of scroll position. That's wasted work for demos
 * never scrolled to, and heavy enough with several running at once to
 * stall the tab under software rendering.
 */
export function LazyMount({
  children,
  rootMargin = "600px",
}: {
  children: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
}
