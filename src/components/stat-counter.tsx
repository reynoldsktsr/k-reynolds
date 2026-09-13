"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

const NUMERIC_PATTERN = /^([+-]?)(\d+(?:\.\d+)?)(.*)$/;

/**
 * Animates the numeric portion of a metric value (e.g. "-38%", "0.9s")
 * from zero when it scrolls into view. Falls back to a plain reveal for
 * values with no leading number (e.g. "under 16ms").
 */
export function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(() => {
    const match = value.match(NUMERIC_PATTERN);
    return match ? `${match[1]}0${match[3]}` : value;
  });

  // `value` is a stable string prop, so this only (re-)runs when the
  // metric changes or it first scrolls into view — not on every render.
  useEffect(() => {
    if (!inView) return;
    const match = value.match(NUMERIC_PATTERN);
    if (!match) return;

    const [, sign, numberStr, suffix] = match;
    const target = parseFloat(numberStr);
    const decimals = numberStr.includes(".") ? numberStr.split(".")[1].length : 0;

    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(`${sign}${latest.toFixed(decimals)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
