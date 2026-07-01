"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  chromeCopy,
  processSteps,
  siteNavByLocale,
  type CaseItem,
  type Locale,
  type Offer,
  type PackageTier,
  type ProofCase,
  type ProcessStep,
  type Segment,
  type ShowcaseItem,
} from "@/lib/site-data";

function isActivePath(pathname: string, href: string) {
  const cleanHref = href.split("#")[0] || "/";

  if (cleanHref === "/") {
    return pathname === "/";
  }

  if (cleanHref === "/en") {
    return pathname === "/en";
  }

  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <main className="relative overflow-x-hidden bg-[var(--color-canvas)] text-[var(--color-text)] selection:bg-[var(--color-signal)] selection:text-white">
      <div className="noise-grid" />
      <div className="relative z-10 mx-auto max-w-[92rem] px-4 pb-20 pt-4 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}

export function Topbar() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith("/en") ? "en" : "nl";
  const otherLocaleHref =
    locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname === "/" ? "/en" : `/en${pathname}`;
  const nav = siteNavByLocale[locale];
  const chrome = chromeCopy[locale];

  return (
    <header className="topbar-shell">
      <div className="topbar-inner">
        <Link href={locale === "en" ? "/en" : "/"} className="brand-lockup" aria-label="PixelPiraterij home">
          <div className="brand-mark">PP</div>
          <div className="space-y-1">
            <p className="topbar-label">{chrome.studioLabel}</p>
            <p className="text-lg font-semibold text-white">PixelPiraterij</p>
          </div>
        </Link>
        <p className="topbar-status">{chrome.topbarStatus}</p>
      </div>

      <div className="topbar-nav">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`topbar-link${isActivePath(pathname, item.href) ? " is-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
        <ThemeSwitch />
        <div className="locale-switch" aria-label="Language switch">
          <Link href={locale === "nl" ? pathname : otherLocaleHref} className={`locale-pill${locale === "nl" ? " is-active" : ""}`}>
            {chrome.localeLabelNl}
          </Link>
          <Link href={locale === "en" ? pathname : otherLocaleHref} className={`locale-pill${locale === "en" ? " is-active" : ""}`}>
            {chrome.localeLabelEn}
          </Link>
        </div>
        <Link href={locale === "en" ? "/en/studio" : "/studio"} className="topbar-cta">
          {chrome.contactCta}
        </Link>
      </div>
    </header>
  );
}

export function PageHero({
  kicker,
  title,
  body,
  primaryCta,
  secondaryCta,
  aside,
}: {
  kicker: string;
  title: ReactNode;
  body: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  aside?: ReactNode;
}) {
  return (
    <section className="hero-grid">
      <div className="hero-panel">
        <p className="section-tag">{kicker}</p>
        <h1 className="hero-title">{title}</h1>

        <div className="hero-copy-wrap">
          <p className="hero-copy">{body}</p>
          <div className="hero-actions">
            <Link href={primaryCta.href} className="btn-primary">
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="btn-secondary">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {aside ? <aside className="manifest-panel">{aside}</aside> : null}
    </section>
  );
}

export function ManifestAside({
  capLeft = "Manifest",
  capRight = "2026",
  problemKicker = "Old problem",
  stanceKicker = "New stance",
  problemTitle,
  problemBody,
  stanceTitle,
  stanceBody,
}: {
  capLeft?: string;
  capRight?: string;
  problemKicker?: string;
  stanceKicker?: string;
  problemTitle: string;
  problemBody: string;
  stanceTitle: string;
  stanceBody: string;
}) {
  return (
    <>
      <div className="manifest-cap">
        <span>{capLeft}</span>
        <span>{capRight}</span>
      </div>

      <div className="manifest-block">
        <p className="manifest-kicker">{problemKicker}</p>
        <h2 className="manifest-title">{problemTitle}</h2>
        <p className="manifest-body">{problemBody}</p>
      </div>

      <div className="manifest-divider" />

      <div className="manifest-block">
        <p className="manifest-kicker">{stanceKicker}</p>
        <h2 className="manifest-title">{stanceTitle}</h2>
        <p className="manifest-body">{stanceBody}</p>
      </div>
    </>
  );
}

export function SectionHeader({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-head">
      <p className="section-index">{index}</p>
      <div>
        <h2 className="section-title">{title}</h2>
        <p className="section-body">{body}</p>
      </div>
    </div>
  );
}

export function OfferRail({ items }: { items: Offer[] }) {
  return (
    <div className="route-rail">
      {items.map((item) => (
        <article key={item.title} className="route-node">
          <div className="route-id">{item.id}</div>
          <div>
            <h3 className="route-title">{item.title}</h3>
            <p className="route-note">{item.note}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function SegmentGrid({
  segments,
  locale = "nl",
}: {
  segments: Segment[];
  locale?: Locale;
}) {
  const chrome = chromeCopy[locale];

  return (
    <div className="segment-grid">
      {segments.map((segment) => (
        <article key={segment.title} className="segment-card">
          <p className="section-tag">{chrome.segmentLabel}</p>
          <h3 className="segment-title">{segment.title}</h3>
          <p className="route-note">{segment.note}</p>
          <ul className="feature-list">
            {segment.bullets.map((bullet) => (
              <li key={bullet} className="feature-item">
                {bullet}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function CaseMatrix({ items }: { items: CaseItem[] }) {
  return (
    <div className="matrix-board">
      {items.map((item) => (
        <article key={item.name} className="matrix-row">
          <div className="matrix-lane">{item.lane}</div>
          <div className="matrix-name">{item.name}</div>
          <div className="matrix-proof">{item.proof}</div>
        </article>
      ))}
    </div>
  );
}

export function ProofCaseGrid({ items }: { items: ProofCase[] }) {
  return (
    <div className="proof-case-grid">
      {items.map((item) => {
        const hasPair = item.visuals.length > 1;

        return (
          <article key={item.name} className="proof-case-card">
            <div className={`proof-visual-board${hasPair ? " has-pair" : ""}`}>
              {item.visuals.map((visual, index) => (
                <div
                  key={`${item.name}-${visual.src}`}
                  className={`proof-visual-frame${index === 0 ? " is-primary" : ""}${visual.tone === "light" ? " is-light" : ""}`}
                >
                  <div className="safe-visual-card" aria-label={visual.alt}>
                    <span className="safe-visual-kicker">{item.lane}</span>
                    <span className="safe-visual-title">{item.name}</span>
                    <span className="safe-visual-note">Approved visual pending</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="proof-case-copy">
              <div className="proof-case-head">
                <p className="matrix-lane">{item.lane}</p>
                <h3 className="segment-title">{item.name}</h3>
              </div>

              <p className="route-note">{item.summary}</p>
              <p className="proof-case-proof">{item.proof}</p>

              <ul className="proof-case-list">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ShowcaseGrid({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="showcase-grid">
      {items.map((item) => (
        <article key={item.title} className="showcase-card">
          <div className={`showcase-visual${item.visual.tone === "light" ? " is-light" : ""}`}>
            <div className="safe-visual-card" aria-label={item.visual.alt}>
              <span className="safe-visual-kicker">{item.label}</span>
              <span className="safe-visual-title">{item.title}</span>
              <span className="safe-visual-note">Branded route panel</span>
            </div>
          </div>

          <div className="showcase-copy">
            <p className="section-tag">{item.label}</p>
            <h3 className="segment-title">{item.title}</h3>
            <p className="route-note">{item.body}</p>
            <ul className="feature-list">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="feature-item">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProcessBoard({ steps = processSteps }: { steps?: ProcessStep[] }) {
  return (
    <div className="stack-board">
      {steps.map((item) => (
        <article key={item.step} className="stack-row">
          <p className="stack-label">{item.step}</p>
          <p className="stack-text">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function PackageGrid({
  items,
  locale = "nl",
}: {
  items: PackageTier[];
  locale?: Locale;
}) {
  const chrome = chromeCopy[locale];

  return (
    <div className="package-grid">
      {items.map((tier) => (
        <article key={tier.name} className="package-card">
          <p className="section-tag">{chrome.packageLabel}</p>
          <h3 className="segment-title">{tier.name}</h3>
          <p className="package-price">{tier.price}</p>
          <p className="route-note">{tier.subtitle}</p>
          <ul className="feature-list">
            {tier.features.map((feature) => (
              <li key={feature} className="feature-item">
                {feature}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function CtaDock({
  title,
  body,
  primary,
  secondary,
  locale = "nl",
}: {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  locale?: Locale;
}) {
  const chrome = chromeCopy[locale];

  return (
    <section className="cta-dock">
      <div>
        <p className="section-tag">{chrome.nextMoveLabel}</p>
        <h2 className="cta-title">{title}</h2>
        <p className="section-body">{body}</p>
      </div>
      <div className="cta-actions">
        <Link href={primary.href} className="btn-primary">
          {primary.label}
        </Link>
        {secondary ? (
          <Link href={secondary.href} className="btn-secondary">
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function Footer() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith("/en") ? "en" : "nl";
  const otherLocaleHref =
    locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname === "/" ? "/en" : `/en${pathname}`;
  const nav = siteNavByLocale[locale];
  const chrome = chromeCopy[locale];

  return (
    <footer className="footer-grid">
      <div>
        <p className="topbar-label">{chrome.studioLabel}</p>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-fog-muted)]">
          {chrome.footerBlurb}
        </p>
      </div>
      <div className="footer-links">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`topbar-link${isActivePath(pathname, item.href) ? " is-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
        <div className="locale-switch" aria-label="Language switch">
          <Link href={locale === "nl" ? pathname : otherLocaleHref} className={`locale-pill${locale === "nl" ? " is-active" : ""}`}>
            {chrome.localeLabelNl}
          </Link>
          <Link href={locale === "en" ? pathname : otherLocaleHref} className={`locale-pill${locale === "en" ? " is-active" : ""}`}>
            {chrome.localeLabelEn}
          </Link>
        </div>
        <Link href={locale === "en" ? "/en/studio" : "/studio"} className="topbar-cta">
          {locale === "en" ? "Open studio" : "Open studio"}
        </Link>
      </div>
    </footer>
  );
}
