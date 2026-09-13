"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), so
 * this gives each page a fresh, consistent entrance transition.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
