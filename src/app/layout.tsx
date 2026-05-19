import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixel Piraterij — Premium Web Heists",
  description:
    "Headless Next.js websites, custom Stripe e-commerce en private VPS hosting. Geen WordPress ellende.",
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${mono.variable} h-full`}>
      <body className="min-h-full antialiased bg-[#050505] text-green-500 font-mono">
        {children}
      </body>
    </html>
  );
}
