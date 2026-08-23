import {
  CaseMatrix,
  CtaDock,
  Footer,
  ManifestAside,
  OfferRail,
  PackageGrid,
  PageHero,
  ProcessBoard,
  SectionHeader,
  SegmentGrid,
  ShowcaseGrid,
  SiteFrame,
  Topbar,
} from "@/components/site-shell";
import {
  audienceSegmentsDe,
  featuredCasesDe,
  homeOffersDe,
  operationalStackDe,
  studioShowcasesDe,
  templateRoutePackagesDe,
  type ProcessStep,
  type Segment,
} from "@/lib/site-data";
import { DomainSection } from "@/components/domain-section";

const processFlow: ProcessStep[] = [
  {
    step: "Briefing",
    body: "Wir bringen zuerst Marke, Zielgruppe, Ambition und technisches Gewicht in Karte, damit klar wird, ob eine Studio-, Template- oder Systemroute am besten passt.",
  },
  {
    step: "Bauen",
    body: "Dann formen wir die richtige Oberfläche: Maßwerk, wo es zählt, template-getragene Geschwindigkeit, wo sie hilft, und eine Systemebene, die nach der Livegang glaubwürdig bleibt.",
  },
  {
    step: "Beweisen",
    body: "Durch Cases, Live-Routes und greifbare Beispiele zeigen wir, was schon funktioniert und wo der nächste Wachstumsschritt logisch wird.",
  },
  {
    step: "Skalieren",
    body: "Wenn eine Marke mehr braucht, öffnen `.online` und der Hub die nächste Ebene: Templates, Produktrouten, Apps und schwerere Systemanwendungen.",
  },
];

const nextMoveSegments: Segment[] = [
  {
    title: "Starte mit einem Studio- oder Service-Briefing",
    note: "Für Marken, die eine ernsthafte Oberfläche, schärfere Positionierung oder ein verlässlicheres System unter der Website brauchen.",
    bullets: [
      "Maßwerk, wo Präsentation und Kontrolle wirklich zählen",
      "Nützlich für Premium-Marken, Gründer und Hospitality",
      "Von Strategie und Oberfläche bis Hosting und Betreuung",
    ],
  },
  {
    title: "Wechsle zu `.online` für greifbare Routen",
    note: "Dort zeigen wir, wie Templates, Features und Produktebenen aussehen, sobald der nächste Schritt praktischer und vergleichbarer werden muss.",
    bullets: [
      "Template- und Capability-Routen",
      "Greifbare Beispiele für Frontend, Backend und Automatisierung",
      "Eine klarere Grenze zwischen schnellem Start und Maßwerk",
    ],
  },
  {
    title: "Nutze den Hub als App-Galerie",
    note: "Der Hub wird der zentrale Ort für Web-Apps, Android-Apps, Softwareversionen und spätere Downloads innerhalb desselben Ökosystems.",
    bullets: [
      "Apps an einem Ort sammeln",
      "Webversionen und Downloads sauber trennen",
      "Unter demselben PixelPiraterij-Dach, aber mit eigener Rolle",
    ],
  },
];

const operationalSegments: Segment[] = operationalStackDe.map((item) => ({
  title: item.label,
  note: item.text,
  bullets: [
    "Teil derselben PixelPiraterij-Route",
    "Soll Präsentation und Betrieb enger zusammenbringen",
    "Kann später in `.online` oder den Hub hineinwachsen, wenn das der logische nächste Schritt wird",
  ],
}));

export default function GermanHomePage() {
  return (
    <SiteFrame>
      <Topbar />

      <PageHero
        kicker="Studio, Websites und Systemebenen"
        title={
          <>
            Websites und
            <br />
            Systeme, die
            <br />
            sich nicht generisch
            <br />
            anfühlen müssen.
          </>
        }
        body="PixelPiraterij hilft Marken, Gründern und Premium-Services mit maßgeschneiderten Websites, Template-Routen, Managed Hosting und Systemebenen, die nicht nur gut aussehen, sondern auch nach der Livegang professionell weiterlaufen."
        primaryCta={{ href: "/de/contact", label: "Briefing starten" }}
        secondaryCta={{ href: "/de/cases", label: "Cases ansehen" }}
        aside={
          <ManifestAside
            capLeft="PixelPiraterij"
            problemKicker="Was oft schiefgeht"
            stanceKicker="Worauf wir hinarbeiten"
            problemTitle="Viele Marken bekommen entweder eine generische Website oder schöne Arbeit ohne verlässliches technisches Rückgrat."
            problemBody="Das macht Projekte anfällig: schwaches Hosting, zu viele Anbieter, wenig Kontrolle und eine Online-Ebene, die nicht mit dem Unternehmen mitwächst."
            stanceTitle="Wir bringen Präsentation, Struktur und Systemebene enger zusammen."
            stanceBody="So entsteht eine Route, in der Marke, Website, Hosting und langfristiges Wachstum besser zusammenpassen und auch nach der Livegang glaubwürdig bleiben."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Was PixelPiraterij für dich auf der Grundebene leisten kann."
          body="Nicht jedes Projekt startet am selben Punkt. Manchmal ist Maßwerk nötig, manchmal eine Template-Route, manchmal vor allem eine verwaltete Ebene, die Ruhe und Kontinuität zurückbringt."
        />
        <OfferRail items={homeOffersDe} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Wem diese Ebene am meisten hilft."
          body="Wir richten nicht alles auf einen Kundentyp aus. Die Stärke liegt darin, die richtige Route für die richtige Art von Marke, Team oder Produkt zu wählen."
        />
        <SegmentGrid segments={audienceSegmentsDe} locale="de" />
      </section>

      <DomainSection locale="de" index="03" />

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Fertige Arbeit soll als Beweis dienen, nicht als lose Portfolio-Feed."
          body="Die Cases zeigen unterschiedliche Arten von Stärke: identitätsgeführten Commerce, Hospitality, kulturelle Routen und softwareorientierte Systeme."
        />
        <CaseMatrix items={featuredCasesDe} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Ein paar Routes zeigen schon jetzt, wie breit diese Fähigkeit wirklich ist."
          body="Von Markenwelten bis Hospitality und von kulturellen Interfaces bis Dashboards: Diese Beispiele machen die aktuelle Qualitätslatte greifbar."
        />
        <ShowcaseGrid items={studioShowcasesDe} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="06"
          title="Die Systemebene darunter soll im Angebot ebenfalls sichtbar sein."
          body="Hosting, Templates und App- oder Portal-Routen sind keine Randnotizen. Sie sind Teil davon, wie eine Marke online professionell funktionsfähig bleibt."
        />
        <SegmentGrid segments={operationalSegments} locale="de" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="07"
          title="Preisrichtung und Einstiegspunkte sollen verständlich wirken."
          body="Nicht alles muss als volles Maßwerk starten. Deshalb machen wir sichtbar, wo eine starke Basisroute beginnt, welche Zusatzebenen sinnvoll sind und wann ein Projekt zu schwererem Maßwerk wird."
        />
        <PackageGrid items={templateRoutePackagesDe} locale="de" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="08"
          title="Wohin es als Nächstes geht."
          body="`.nl` bleibt die kommerzielle Vordertür. Danach öffnen `.online` und der Hub die nächste Ebene: greifbare Routen, Live-Funktionen, Apps und Produktumgebungen."
        />
        <SegmentGrid segments={nextMoveSegments} locale="de" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="09"
          title="Unser Prozess soll von Klarheit zu Wachstum führen."
          body="Wir wollen nicht nur etwas Attraktives ausliefern. Wir wollen eine Route aufbauen, die logisch skalieren kann, sobald Marke oder Produkt weiterwachsen."
        />
        <ProcessBoard steps={processFlow} />
      </section>

      <CtaDock
        title="Nutze `.nl`, um zuerst die richtige Route zu wählen, und geh danach tiefer ins Ökosystem."
        body="Brauchst du Maßwerk, eine stärkere Website oder ein verlässlicheres System unter deiner Marke? Das beginnt hier. Willst du danach greifbare Template-Routen, Live-Funktionen oder App-Umgebungen sehen, öffnen `.online` und der Hub die nächste Ebene."
        primary={{ href: "/de/contact", label: "Briefing starten" }}
        secondary={{ href: "https://pixelpiraterij.online", label: "Zu .online" }}
        locale="de"
      />

      <Footer />
    </SiteFrame>
  );
}
