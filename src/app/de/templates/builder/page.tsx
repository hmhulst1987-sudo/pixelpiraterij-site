import Link from "next/link";

import { TemplateRouteEditorDemo } from "@/components/template-route-editor-demo";
import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { getAvailableModules, routeFamilies } from "@/lib/template-route-builder";
import { routePackageTiers } from "@/lib/template-route-phase-two";

const familySlugSet = new Set(routeFamilies.map((family) => family.slug));

export default async function GermanTemplateBuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ family?: string }>;
}) {
  const params = await searchParams;
  const requestedFamily = typeof params.family === "string" && familySlugSet.has(params.family) ? params.family : routeFamilies[0].slug;

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Builder-Arbeitsbereich"
        title={
          <>
            Geführter Builder,
            <br />
            echter Arbeitsbereich,
            <br />
            kein offenes
            <br />
            Kosten-Leck.
          </>
        }
        body="Hier wird die Template-Route zu einem echten Arbeitsbereich. Zuerst wählst du das richtige Fundament, dann formst du Atmosphäre und Inhalt, und erst danach gehen Domain- und Launch-Schritte weiter, wenn die Paket- und Operator-Ebene es erlauben."
        primaryCta={{ href: "#workspace", label: "Öffne den Arbeitsbereich" }}
        secondaryCta={{ href: "/de/templates", label: "Zurück zu den Template-Routen" }}
        aside={
          <ManifestAside
            capLeft="Geschützte Route"
            capRight="Builder"
            problemKicker="Was wir vermeiden"
            stanceKicker="Was wir bauen"
            problemTitle="Kein öffentlicher Builder, bei dem jeder beiläufig Serverkosten auslösen kann."
            problemBody="Das würde die Route unordentlich, teuer und kommerziell schwach machen, besonders sobald Module, Domain-Checks und Launch-Logik echtes Gewicht bekommen."
            stanceTitle="Ein geführter Arbeitsbereich mit klarer Familienauswahl, Paketzugang und Operator-Grenzen."
            stanceBody="Das hält den Builder nützlich für echte Kunden, ohne die Premium-Studio-Route oder die Infrastruktur dahinter auszuhöhlen."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Starte mit der richtigen Routenfamilie."
          body="Jeder Builder-Einstiegspunkt soll schon zu seinem Kontext passen. Du wählst keine lose Skin, sondern eine Route mit der richtigen Atmosphäre, den richtigen Abschnitten und Konversionslogik."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.en;
            const isActive = requestedFamily === family.slug;
            const baseFlow = copy.flowPresets.base;
            const recommendedModules = getAvailableModules(family.slug).filter((module) => family.recommendedModuleSlugs.includes(module.slug));

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Template-Familie</p>
                <h3 className="segment-title">{copy.label}</h3>
                <p className="route-note">{copy.audience}</p>
                <ul className="feature-list">
                  {copy.sections.slice(0, 4).map((section) => (
                    <li key={section} className="feature-item">
                      {section}
                    </li>
                  ))}
                </ul>
                <div className="route-editor-badge-list route-editor-badge-list--dark">
                  <span className="route-editor-badge route-editor-badge--paper">Wichtigster Moment: {baseFlow?.ctaLabel ?? "Base route"}</span>
                  {recommendedModules.map((module) => (
                    <span key={module.slug} className="route-editor-badge route-editor-badge--paper">
                      {module.copy.en.label}
                    </span>
                  ))}
                </div>
                <p className="route-note">{copy.moduleStrategy}</p>
                <a href={family.previewUrl} target="_blank" rel="noreferrer" className="btn-secondary">Live-Konzept ansehen</a>
                <Link href={`/de/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  {isActive ? "Aktiver Arbeitsbereich" : "Öffne diese Route"}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section id="workspace" className="section-block">
        <SectionHeader
          index="02"
          title="Das ist der Arbeitsbereich, in dem der Builder wirklich beginnt."
          body="Routenkonfiguration, Module, Paketwahl, Domain-Intake und Registrar-Vorbereitung kommen hier innerhalb eines gespeicherten Projektzustands zusammen."
        />
        <TemplateRouteEditorDemo key={`de:${requestedFamily}`} locale="en" initialFamilySlug={requestedFamily} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Zugang erweitert sich mit dem Paket, nicht durch zufälliges Klicken."
          body="Der Builder bleibt bewusst hinter Leitplanken. Kunden können vorankommen, ohne alles auf einmal zu bezahlen und ohne sofort Publishing, Registrar-Aktionen oder Provisioning öffentlich freizuschalten."
        />
        <div className="package-grid">
          {routePackageTiers.map((tier) => (
            <article key={tier.slug} className="package-card">
              <p className="section-tag">Zugang</p>
              <h3 className="segment-title">{tier.copy.en.label}</h3>
              <p className="package-price">{tier.monthlyFee === 0 ? "Im Intake inbegriffen" : `+ ${tier.monthlyFee} € / Monat`}</p>
              <p className="route-note">{tier.copy.en.description}</p>
              <ul className="feature-list">
                {tier.copy.en.features.map((feature) => (
                  <li key={feature} className="feature-item">
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="route-note">{tier.copy.en.fit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="So liest sich die Freischalt-Route kommerziell."
          body="Nicht jeder braucht am ersten Tag alles offen. Diese Reihenfolge hält die Route verkäuflich, handhabbar und glaubwürdig, während der Einstiegspunkt kompakt bleibt und schwerere Kosten erst später beginnen."
        />
        <div className="segment-grid">
          <article className="segment-card">
            <p className="section-tag">Kickstart</p>
            <h3 className="segment-title">Starte mit Richtung und Intake</h3>
            <p className="route-note">Stark, wenn jemand noch die richtige Route, Atmosphäre und Domain-Richtung sucht, aber noch keinen eigenständigen Builder-Zugang braucht.</p>
            <ul className="feature-list">
              <li className="feature-item">Öffentliche Vorschau der Route</li>
              <li className="feature-item">Domain-Screening und erstes Intake-Briefing</li>
              <li className="feature-item">Noch kein offener Speicher oder Launch-Push</li>
            </ul>
            <Link href="/de/contact" className="btn-secondary">
              Besprich Kickstart
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Route Plus</p>
            <h3 className="segment-title">Speichern, fortsetzen und weiter formen</h3>
            <p className="route-note">Für Kunden, die ernsthaft an ihrer Route weiterarbeiten und sie innerhalb von Leitplanken formen wollen, ohne schon die Live-Infrastruktur anzufassen.</p>
            <ul className="feature-list">
              <li className="feature-item">Arbeitsbereich speichern und fortsetzen</li>
              <li className="feature-item">Intake und Routenverfeinerung zusätzlich zur Vorschau</li>
              <li className="feature-item">Weiterhin keine direkten Registrar-Aktionen</li>
            </ul>
            <Link href="/de/contact" className="btn-secondary">
              Fordere Route Plus an
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Managed Launch</p>
            <h3 className="segment-title">Operator-geführte Livegang</h3>
            <p className="route-note">Hier bewegt sich die Route in echte Domain-Registrierung, DNS und Launch-Vorbereitung, während sie unter Operator-Kontrolle bleibt.</p>
            <ul className="feature-list">
              <li className="feature-item">Serverseitige Registrar-Übergabe</li>
              <li className="feature-item">Launch-Warteschlange und Operator-Review</li>
              <li className="feature-item">Brücke zwischen schneller Route und ernsthafter Livegang</li>
            </ul>
            <Link href="/de/contact" className="btn-primary">
              Starte Managed Launch
            </Link>
          </article>
        </div>
      </section>

      <CtaDock
        title="Der Builder liest sich jetzt wie eine geführte Produktebene, nicht wie ein Spielzeug."
        body="Von hier aus können wir weiter auf Publishing-Logik, Intake-Follow-up und tiefere Module hinarbeiten, ohne die Route jedes Mal neu zu erfinden."
        primary={{ href: "/de/contact", label: "Besprich eine Launch-Route" }}
        secondary={{ href: "/de/studio", label: "Sieh die Studio-Route" }}
        locale="de"
      />
      <Footer />
    </SiteFrame>
  );
}
