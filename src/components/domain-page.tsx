import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { DomainSearch } from "@/components/domain-search";
import { domainPageCopy, domainPageLinks, domainSearchCopy } from "@/lib/domain-copy";
import type { Locale } from "@/lib/site-data";

export function DomainPage({ locale }: { locale: Locale }) {
  const copy = domainPageCopy[locale];
  const links = domainPageLinks(locale);

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker={copy.kicker}
        title={
          <>
            {copy.titleLines[0]}
            <br />
            {copy.titleLines[1]}
          </>
        }
        body={copy.heroBody}
        primaryCta={{ href: "#zoeken", label: copy.primaryCta }}
        secondaryCta={{ href: links.secondary, label: copy.secondaryCta }}
        aside={<ManifestAside {...copy.manifest} />}
      />

      <section className="section-block" id="zoeken">
        <SectionHeader index="01" title={copy.searchSection.title} body={copy.searchSection.body} />
        <div className="mt-8">
          <DomainSearch copy={domainSearchCopy[locale]} />
        </div>
      </section>

      <section className="section-block">
        <SectionHeader index="02" title={copy.serviceSection.title} body={copy.serviceSection.body} />
        <div className="stack-board">
          {copy.serviceSection.items.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader index="03" title={copy.packageSection.title} body={copy.packageSection.body} />
        <div className="segment-grid">
          {copy.packageSection.cards.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">{item.tag}</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title={copy.cta.title}
        body={copy.cta.body}
        primary={{ href: links.contact, label: copy.cta.primary }}
        secondary={{ href: links.templates, label: copy.cta.secondary }}
      />
      <Footer />
    </SiteFrame>
  );
}
