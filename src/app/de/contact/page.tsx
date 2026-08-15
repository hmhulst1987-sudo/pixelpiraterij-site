import { CtaDock, Footer, ManifestAside, OfferRail, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";

export default function GermanContactPage() {
  const routeSignals = [
    {
      id: "01",
      title: "Studio-Route",
      note: "Für Marken, die eine durchdachte Oberfläche, schärfere Positionierung und ein reiferes öffentliches Frontend brauchen.",
    },
    {
      id: "02",
      title: "Template-Route",
      note: "Für Routen, bei denen Geschwindigkeit zählt, solange der Ausgangspunkt sich nicht generisch oder strategisch schwach anfühlen muss.",
    },
    {
      id: "03",
      title: "Systemebene",
      note: "Für Builds, die bereits existieren, aber nach der Livegang ruhiger, verlässlicher und besser betreut werden müssen.",
    },
  ];

  const intakeSignals = [
    {
      label: "Problem",
      text: "Was genau verkauft das Unternehmen, wo geht Vertrauen verloren, und welcher Teil der Route fühlt sich aktuell zu schwach oder zu generisch an?",
    },
    {
      label: "Kontext",
      text: "Was existiert bereits: Domains, aktuelle Website, Texte, Markenmaterial, technischer Stack, Deadlines und umgebende Systeme?",
    },
    {
      label: "Richtung",
      text: "Sieht der nächste Schritt eher nach Maßwerk, Template-getragen, hosting-lastig oder produkt- und systemorientiert aus?",
    },
    {
      label: "Ergebnis",
      text: "Nach dem ersten Gespräch soll die Route klarer sein als zuvor: was gebaut wird, in welcher Reihenfolge und warum diese Reihenfolge sinnvoll ist.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Kontakt und Blueprint"
        title={
          <>
            Starte mit
            <br />
            der Route,
            <br />
            nicht mit
            <br />
            Rätselraten.
          </>
        }
        body="Ob die Marke eine Studio-Route, eine Template-Route oder eine stärkere Systemebene braucht: Der beste erste Schritt ist, die Situation klar einzuordnen und von dort aus rückwärts zu arbeiten."
        primaryCta={{ href: "mailto:inbox@pixelpiraterij.nl", label: "inbox@pixelpiraterij.nl" }}
        secondaryCta={{ href: "/de/templates", label: "Sieh dir den Template-Pfad an" }}
        aside={
          <ManifestAside
            capLeft="Intake"
            capRight="Blueprint"
            problemTitle="Die meisten Projekte starten zu spät im falschen Gespräch."
            problemBody="Oft springen Menschen zu Screens, Themes und Tools, bevor Angebot, Route und Infrastruktur richtig eingeordnet sind."
            stanceTitle="Ein schärferer Intake spart später Zeit."
            stanceBody="Das erste Gespräch soll die Route identifizieren: Studio, Template, Systemebene oder ein breiterer Systembau."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Die drei Routen, auf die der Intake meist hinweist."
          body="Nicht jedes Projekt braucht dieselbe Art von Antwort. Es hilft, früh zu erkennen, welche Route das meiste Gewicht trägt."
        />
        <OfferRail items={routeSignals} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Was du ins erste Gespräch mitbringen solltest."
          body="Je schärfer die Einordnung, desto besser die Route. Das sind die Signale, die einen nützlicheren Ausgangspunkt schaffen."
        />
        <div className="stack-board">
          {intakeSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Was eine erste E-Mail sofort nützlich macht."
          body="Kein perfektes Briefing nötig. Nur genug Kontext, um zu zeigen, wo der Hebel liegt und welche Route nicht verschwendet werden sollte."
        />
        <div className="segment-grid">
          {[
            "Eine kurze Erklärung, was das Unternehmen oder Projekt tatsächlich macht.",
            "Ein Link zu dem, was bereits existiert, falls schon etwas live ist.",
            "Was sich aktuell falsch anfühlt: Präsentation, Struktur, Hosting, Tempo oder fehlende Kohärenz.",
            "Wie sich die nächste Phase anfühlen soll: premiumhafter, ruhiger, schneller zu launchen oder stärker systemgeführt.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Erstes Briefing</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Wenn das Projekt zählt, lass uns die Route richtig einordnen, bevor wir die falsche Oberfläche anfassen."
        body="E-Mail, Blueprint-Anfrage oder direktes Gespräch – solange die Route in Klarheit beginnt, statt in unverbundene Teile zu zerfallen."
        primary={{ href: "mailto:inbox@pixelpiraterij.nl", label: "Sende das erste Briefing" }}
        secondary={{ href: "/de", label: "Zurück zur Routenkarte" }}
        locale="de"
      />
      <Footer />
    </SiteFrame>
  );
}
