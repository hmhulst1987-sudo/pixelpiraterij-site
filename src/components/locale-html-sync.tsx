"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LocaleHtmlSync() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.startsWith("/en") ? "en" : "nl";
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
