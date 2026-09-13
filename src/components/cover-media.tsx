import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageRef } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-orange-300 via-rose-300 to-indigo-400",
  "from-sky-300 via-teal-300 to-emerald-400",
  "from-fuchsia-300 via-violet-300 to-blue-400",
  "from-amber-300 via-orange-300 to-rose-400",
];

function gradientFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}

/**
 * Renders a real Sanity image when one exists, otherwise a generated
 * gradient placeholder — clearly a stand-in, never a broken image icon.
 */
export function CoverMedia({
  image,
  seed,
  className,
  priority = false,
}: {
  image: SanityImageRef;
  seed: string;
  className?: string;
  priority?: boolean;
}) {
  const hasRealImage = Boolean(image?.asset?._ref);

  if (!hasRealImage) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
          gradientFor(seed),
          className,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
        <span className="relative font-display text-sm uppercase tracking-[0.2em] text-white/80">
          Sample cover
        </span>
      </div>
    );
  }

  const src = urlForImage(image).width(1600).height(1000).fit("crop").url();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={image.alt ?? ""}
        fill
        priority={priority}
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );
}
