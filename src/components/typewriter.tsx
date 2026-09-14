"use client";

import { useEffect, useState } from "react";

/**
 * Types and deletes through a list of phrases, one character at a time.
 * Freezes on the first phrase if the visitor prefers reduced motion.
 */
export function Typewriter({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (phrases.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const phrase = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        setText(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, 1400);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        charIndex--;
        setText(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = setTimeout(tick, 300);
          return;
        }
        timer = setTimeout(tick, 30);
      }
    }

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={className}>
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  );
}
