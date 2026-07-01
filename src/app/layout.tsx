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
  title: "PixelPiraterij | Routes, studio en systeemlagen",
  description:
    "PixelPiraterij bundelt studio, template-routes, apps, docs en systeemlagen in een leesbare opbouw voor merken die meer nodig hebben dan een generieke site.",
  icons: { icon: "/favicon.ico" },
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
