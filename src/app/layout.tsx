import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { LocaleHtmlSync } from "@/components/locale-html-sync";
import { ThemeBootScript } from "@/components/theme-boot-script";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pixelpiraterij.nl"),
  title: "PixelPiraterij | Websites, hosting en maatwerk dat niet generiek voelt",
  description:
    "PixelPiraterij bouwt onderscheidende websites, managed hosting en maatwerk-routes voor merken die meer nodig hebben dan een generieke leverancier.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://pixelpiraterij.nl",
    siteName: "PixelPiraterij",
    title: "PixelPiraterij | Websites, hosting en maatwerk dat niet generiek voelt",
    description:
      "PixelPiraterij bouwt onderscheidende websites, managed hosting en maatwerk-routes voor merken die meer nodig hebben dan een generieke leverancier.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PixelPiraterij social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelPiraterij | Websites, hosting en maatwerk dat niet generiek voelt",
    description:
      "PixelPiraterij bouwt onderscheidende websites, managed hosting en maatwerk-routes voor merken die meer nodig hebben dan een generieke leverancier.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/pixelpiraterij-mark.svg",
    shortcut: "/pixelpiraterij-mark.svg",
    apple: "/pixelpiraterij-mark.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#efe2d2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="nl" data-theme="sand" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}>
      <body className="min-h-full antialiased">
        <ThemeBootScript />
        <LocaleHtmlSync />
        {children}
      </body>
    </html>
  );
}
