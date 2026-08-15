"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function detectLang(pathname: string) {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  return "nl";
}

export function LocaleHtmlSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = detectLang(pathname);
  }, [pathname]);

  return null;
}
