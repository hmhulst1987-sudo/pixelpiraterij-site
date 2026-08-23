import Link from "next/link";
import { SectionHeader } from "@/components/site-shell";
import { DomainSearch } from "@/components/domain-search";
import { domainPageHref, domainSearchCopy, domainSectionCopy, domainSectionLinkLabel } from "@/lib/domain-copy";
import type { Locale } from "@/lib/site-data";

/** De domeinzoeker als sectie op een homepage. */
export function DomainSection({ locale, index }: { locale: Locale; index: string }) {
  const copy = domainSectionCopy[locale];

  return (
    <section className="section-block" id="domeinen">
      <SectionHeader index={index} title={copy.title} body={copy.body} />
      <div className="mt-8">
        <DomainSearch copy={domainSearchCopy[locale]} />
      </div>
      <div className="mt-6">
        <Link href={domainPageHref(locale)} className="btn-secondary">
          {domainSectionLinkLabel[locale]}
        </Link>
      </div>
    </section>
  );
}
