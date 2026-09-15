import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageRef } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/**
 * Renders a real Sanity image when one exists, a client logo on a neutral
 * card when one is supplied, otherwise a flat dot-grid placeholder —
 * clearly a stand-in, never a broken image icon.
 */
export function CoverMedia({
  image,
  logo,
  seed,
  className,
  priority = false,
}: {
  image: SanityImageRef;
  logo?: string;
  seed: string;
  className?: string;
  priority?: boolean;
}) {
  const hasRealImage = Boolean(image?.asset?._ref);

  if (!hasRealImage && logo) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)}>
        <div className="absolute inset-[14%]">
          <Image
            src={logo}
            alt={`${seed} logo`}
            fill
            priority={priority}
            className="object-contain"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    );
  }

  if (!hasRealImage) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-surface-2",
          className,
        )}
        style={{
          backgroundImage:
            "radial-gradient(var(--edge) 1.6px, transparent 1.6px)",
          backgroundSize: "18px 18px",
        }}
      >
        <span className="relative rounded-full border border-edge bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-faint">
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
