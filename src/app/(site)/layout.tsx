import type { Metadata, Viewport } from "next";
import { Literata, Unbounded, Martian_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getSiteSettings } from "@/lib/content/site-settings";
import { SITE_URL } from "@/lib/site-config";

const literata = Literata({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const martianMono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kieran Reynolds · Full-Stack Engineer",
    template: "%s · Kieran Reynolds",
  },
  description:
    "Full-stack engineer building custom Shopify apps and headless stores for small and local businesses. Real case studies, a resume, and no corporate jargon.",
  keywords: [
    "Kieran Reynolds",
    "full-stack engineer",
    "Shopify developer",
    "headless Shopify",
    "custom Shopify apps",
    "web developer portfolio",
  ],
  authors: [{ name: "Kieran Reynolds" }],
  creator: "Kieran Reynolds",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Kieran Reynolds",
    title: "Kieran Reynolds · Full-Stack Engineer",
    description:
      "Full-stack engineer building custom Shopify apps and headless stores for small and local businesses.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kieran Reynolds · Full-Stack Engineer",
    description:
      "Full-stack engineer building custom Shopify apps and headless stores for small and local businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#180f24",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    jobTitle: settings.role,
    url: SITE_URL,
    email: settings.email ? `mailto:${settings.email}` : undefined,
    sameAs: settings.social.map((s) => s.url),
  };

  return (
    <html
      lang="en"
      className={`${literata.variable} ${martianMono.variable} ${unbounded.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script
          id="ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <SmoothScrollProvider>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter settings={settings} />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
