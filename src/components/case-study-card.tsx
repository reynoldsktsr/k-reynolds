"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CoverMedia } from "@/components/cover-media";
import type { CaseStudy } from "@/lib/content/types";

export function CaseStudyCard({
  study,
  priority = false,
}: {
  study: CaseStudy;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      className="group"
    >
      <Link href={`/work/${study.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <CoverMedia
              image={study.coverImage}
              logo={study.logo}
              seed={study.slug}
              priority={priority}
              className="h-full w-full"
            />
          </motion.div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl">{study.title}</h3>
            <p className="mt-1 text-sm text-muted">
              {study.role}
              {study.year ? ` · ${study.year}` : ""}
            </p>
          </div>
          <motion.span
            aria-hidden
            variants={{
              rest: { x: 0, y: 0, opacity: 0.5 },
              hover: { x: 4, y: -4, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 shrink-0 text-2xl"
          >
            ↗
          </motion.span>
        </div>

        {study.tech.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {study.tech.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </Link>
    </motion.div>
  );
}
