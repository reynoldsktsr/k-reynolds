import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageRef } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-violet-400 via-purple-500 to-indigo-700",
  "from-fuchsia-400 via-violet-500 to-purple-800",
  "from-rose-400 via-fuchsia-500 to-violet-800",
  "from-indigo-400 via-violet-600 to-purple-900",
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
          Cover pending
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
