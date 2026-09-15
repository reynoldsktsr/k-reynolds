"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticLink } from "@/components/magnetic-button";
import { Typewriter } from "@/components/typewriter";

const headline = ["Self-taught,", "mildly caffeinated,", "full-stack."];

const eyebrowPhrases = [
  "full-stack engineer",
  "shopify plus developer",
  "self-taught, all the way through",
  "friendly neighborhood coder",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const line = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero({ tagline }: { tagline: string }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 pb-20 sm:pt-40 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8 inline-flex min-h-[1.6rem] items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-sm text-muted"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <Typewriter phrases={eyebrowPhrases} />
      </motion.div>

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl"
      >
        {headline.map((word) => (
          <span key={word} className="block overflow-hidden">
            <motion.span variants={line} className="block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 max-w-xl text-lg text-muted balance"
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex items-center gap-4"
      >
        <MagneticLink
          href="/work"
          className="rounded-full bg-foreground px-6 py-3 font-display text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          See the work
        </MagneticLink>
        <Link
          href="/about"
          className="text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          About me
        </Link>
      </motion.div>
    </section>
  );
}
