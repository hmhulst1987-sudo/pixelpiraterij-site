import Link from "next/link";

import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { routeFamilies } from "@/lib/template-route-builder";
import { templateCategoriesDe, templateShowcasesDe } from "@/lib/site-data";

export default function GermanTemplatesPage() {
  const templateRules = [
    {
      title: "Geschwindigkeit ohne Template-Müdigkeit",
      body: "Ein Template soll Zeit sparen, ohne die Marke in eine generische Form zu zwingen. Der Gewinn ist Beschleunigung, keine Abflachung.",
    },
    {
      title: "Ein stärkerer Ausgangspunkt, keine Decke",
      body: "Das Template ist das Fundament, nicht der endgültige Anspruch. Es soll den Weg zu etwas Stärkerem öffnen, statt das Projekt zu früh festzulegen.",
    },
    {
      title: "Struktur, die später wachsen kann",
      body: "Seiten, Komponenten und Abläufe sollen zu Portalen, Buildern oder Produktebenen heranwachsen können. Sonst gewinnst du nur heute und verlierst morgen.",
    },
    {
      title: "Ehrliche Reihenfolge statt aufgeblasener Versprechen",
      body: "PixelPiraterij muss den Builder nicht überverkaufen, bevor er produktreif ist. Klare Reihenfolge macht die Route glaubwürdiger, nicht weniger ambitioniert.",
    },
  ];

  const rolloutSignals = [
    {
      label: "Jetzt",
      text: "Template-getragene Systeme, kuratierte Richtungen und schnellere Launch-Logik, die bereits in echten Kundenrouten nützlich sind.",
    },
    {
      label: "Als Nächstes",
      text: "Strukturierte Editier-, Vorschau- und Publishing-Abläufe innerhalb der PixelPiraterij-World, sodass sich der Schritt vom Template zum Builder verdient statt erzwungen anfühlt.",
    },
    {
      label: "Später",
      text: "Eine vollständigere Multi-Tenant-Builder-Ebene, sobald sich Produktlogik, Betriebsrhythmus und Nutzerverhalten zuerst in der Praxis bewährt haben.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Templates und Builder-Richtung"
        title={
          <>
            Kluge Starts,
            <br />
            keine billigen
            <br />
            Abkürzungen.
          </>
        }
        body="Templates innerhalb von PixelPiraterij sollen stärkere Ausgangspositionen schaffen, keine schwächeren Ergebnisse. Es sind kuratierte Launch-Systeme, die sich schnell bewegen können und trotzdem als Teil desselben größeren Systems lesbar bleiben."
        primaryCta={{ href: "/de/templates/builder", label: "Öffne den Builder-Arbeitsbereich" }}
        secondaryCta={{ href: "/de/contact", label: "Fordere eine Template-Route an" }}
        aside={
          <ManifestAside
            capLeft="Template-Logik"
            capRight="Builder-Pfad"
            problemTitle="Templates scheitern, wenn sie Identität auslöschen."
            problemBody="Schnell wird meist generisch, wenn das System darunter nur existiert, um Aufwand zu reduzieren, statt Richtung zu schärfen."
            stanceTitle="Ein starkes Template soll den Weg verkürzen, nicht das Ergebnis abflachen."
            stanceBody="PixelPiraterij nutzt Templates als kuratierte Startsysteme, wobei sich die Builder-Logik erst weiterentwickelt, nachdem sich diese Route in der Praxis bewährt hat."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Templates sind danach gruppiert, wo sie am meisten helfen."
          body="Es geht nicht darum, Menschen mit Skins zu überfluten. Es geht darum, jeder Zielgruppe eine stärkere Route zu einem besseren Build zu geben."
        />
        <div className="segment-grid">
          {templateCategoriesDe.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Template-Lane</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Der Builder öffnet sich als geführter Arbeitsbereich, nicht als Free-for-all-Tool."
          body="Zuerst wählst du die Routenfamilie. Erst danach geht es in den Arbeitsbereich mit Paketzugang, Domain-Intake und Modul-Logik."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.en;

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Builder-Start</p>
                <h3 className="segment-title">{copy.label}</h3>
                <p className="route-note">{copy.audience}</p>
                <ul className="feature-list">
                  {copy.sections.slice(0, 4).map((section) => (
                    <li key={section} className="feature-item">
                      {section}
                    </li>
                  ))}
                </ul>
                <Link href={`/de/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  Öffne diesen Arbeitsbereich
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Was ein starker template-getragener Start schon auf den ersten Blick beweisen soll."
          body="Nicht als abstraktes Versprechen, sondern durch echte Oberflächen: Suite-Logik, Zielgruppen-Rahmung und Produktdisziplin. Das macht die künftige Builder-Richtung glaubwürdig statt aufgeschoben."
        />
        <ShowcaseGrid items={templateShowcasesDe} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Was Templates hier tatsächlich leisten sollen."
          body="Nicht jede schnelle Route ist automatisch eine kluge. Die Stärke dieses Systems liegt in besseren Ausgangspositionen, mehr Struktur und einem Weg, der sich später noch weiter öffnen kann."
        />
        <div className="segment-grid">
          {templateRules.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Prinzip</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Der Builder kommt nach der Fähigkeit, nicht davor."
          body="Die nächste Ebene ist ein strukturierter Editor-, Vorschau- und Publishing-Ablauf auf Basis dieser Template-Systeme. Wir skalieren dieses Versprechen erst, wenn die Produktebene real ist."
        />
        <div className="stack-board">
          {rolloutSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Wenn du Geschwindigkeit willst, ohne in Template-Einheitsbrei zu enden, ist das die richtige Route."
        body="Diese Seite muss beweisen, dass Geschwindigkeit, Struktur und Markencharakter zusammen bestehen können, bevor sich die tiefere Builder-Ebene weiter öffnet."
        primary={{ href: "/de/templates/builder", label: "Öffne den Builder-Arbeitsbereich" }}
        secondary={{ href: "/de/studio", label: "Sieh, wie das mit dem Studio zusammenhängt" }}
        locale="de"
      />
      <Footer />
    </SiteFrame>
  );
}
