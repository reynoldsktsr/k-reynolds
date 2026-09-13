import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-6 py-32">
      <h1 className="font-display text-6xl">404</h1>
      <p className="mt-4 text-lg text-muted">
        This page doesn&apos;t exist, or moved.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium underline underline-offset-4 hover:text-accent"
      >
        Back home
      </Link>
    </section>
  );
}
