"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Locale } from "@/lib/site-data";

const REDIRECT_FLAG = "pp-locale-checked";
const PREFIXED_LOCALES: Locale[] = ["en", "fr", "es", "de"];

function detectBrowserLocale(): Locale | null {
  const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const short = candidate.slice(0, 2).toLowerCase();
    if (PREFIXED_LOCALES.includes(short as Locale)) return short as Locale;
  }
  return null;
}

/**
 * Only fires on the bare "/" (Dutch has no prefix, so it is the one URL
 * with no locale signal at all) and only once ever per browser, so a
 * visitor who lands directly on /en, /fr, /es or /de never gets bounced.
 */
export function LocaleBootRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;
    if (window.localStorage.getItem(REDIRECT_FLAG)) return;
    window.localStorage.setItem(REDIRECT_FLAG, "1");

    const detected = detectBrowserLocale();
    if (detected) {
      router.replace(`/${detected}`);
    }
  }, [pathname, router]);

  return null;
}
