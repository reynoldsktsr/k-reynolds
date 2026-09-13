import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getSiteSettings } from "@/lib/content/site-settings";
import { SITE_URL } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kieran Reynolds — Front-End Engineer",
    template: "%s — Kieran Reynolds",
  },
  description:
    "Front-end engineer building fast, animated, accessible interfaces. Case studies on interaction design, motion systems, and performance.",
  keywords: [
    "Kieran Reynolds",
    "front-end engineer",
    "front-end developer portfolio",
    "web animation",
    "interaction design",
    "React developer",
  ],
  authors: [{ name: "Kieran Reynolds" }],
  creator: "Kieran Reynolds",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Kieran Reynolds",
    title: "Kieran Reynolds — Front-End Engineer",
    description:
      "Front-end engineer building fast, animated, accessible interfaces.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kieran Reynolds — Front-End Engineer",
    description:
      "Front-end engineer building fast, animated, accessible interfaces.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script
          id="ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <SmoothScrollProvider>
          <SiteNav settings={settings} />
          <main className="flex-1">{children}</main>
          <SiteFooter settings={settings} />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
