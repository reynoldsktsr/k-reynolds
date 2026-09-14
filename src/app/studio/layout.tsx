import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Studio · Kieran Reynolds",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: LayoutProps<"/studio">) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
