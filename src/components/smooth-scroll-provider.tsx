"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.22,
        duration: 0.7,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
