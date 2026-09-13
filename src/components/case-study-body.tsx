import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import { Reveal } from "@/components/reveal";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Reveal className="my-5 max-w-[65ch] text-lg leading-relaxed text-foreground/85">
        <p>{children}</p>
      </Reveal>
    ),
    h2: ({ children }) => (
      <Reveal className="mt-16 mb-4 font-display text-3xl sm:text-4xl">
        <h2>{children}</h2>
      </Reveal>
    ),
    h3: ({ children }) => (
      <Reveal className="mt-10 mb-3 font-display text-2xl">
        <h3>{children}</h3>
      </Reveal>
    ),
    blockquote: ({ children }) => (
      <Reveal className="my-12 max-w-[60ch] border-l-2 border-accent pl-6 font-display text-2xl italic text-foreground/90 sm:text-3xl">
        <blockquote>{children}</blockquote>
      </Reveal>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value).width(1400).url();
      return (
        <Reveal className="relative my-10 aspect-video w-full overflow-hidden rounded-2xl bg-surface">
          <Image
            src={url}
            alt={value.alt ?? ""}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 800px, 100vw"
          />
        </Reveal>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-accent underline-offset-4 hover:text-accent"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 text-lg text-foreground/85">
        {children}
      </ul>
    ),
  },
};

export function CaseStudyBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
