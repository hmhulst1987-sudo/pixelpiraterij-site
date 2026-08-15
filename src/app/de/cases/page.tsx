import { CaseMatrix, CtaDock, Footer, ManifestAside, PageHero, ProofCaseGrid, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { featuredCasesDe, proofCasesDe } from "@/lib/site-data";

export default function GermanCasesPage() {
  const readingSignals = [
    {
      title: "Fähigkeit vor Kategorie",
      body: "Es geht nicht nur darum, welche Art von Projekt jemand sieht, sondern welchen Muskel dieses Projekt beweist: Positionierung, ruhige Konversion, Atmosphäre oder Systemtiefe.",
    },
    {
      title: "Geschäftswert vor Applaus",
      body: "Eine Case Study wird nützlich, wenn klar ist, warum sie kommerziell zählt: stärkeres Vertrauen, schärfere Konversion, bessere Rahmung oder eine glaubwürdigere Produktebene.",
    },
    {
      title: "Auswahl vor Überladung",
      body: "Indem nicht alles auf einmal gezeigt wird, gewinnt jedes Projekt mehr Gewicht. Kuratierung macht aus einem Portfolio ein Argument statt eines Sammelordners.",
    },
  ];

  const proofLayers = [
    {
      label: "Identität",
      text: "KunstvanVB zeigt, dass PixelPiraterij mehr kann als Websites bauen. Es kann eine vollständige Markenoberfläche mit so viel redaktioneller Kontrolle rahmen, dass Premium-Vertrauen sofort entsteht.",
    },
    {
      label: "Konversion",
      text: "Die Hospitality-Richtungen beweisen, dass Zurückhaltung, Geschmack und kommerzielle Logik zusammen bestehen können. Nicht laut, aber unbestreitbar bewusst.",
    },
    {
      label: "Narrativ",
      text: "Hermes Records und vage.blog zeigen, dass Atmosphäre hier kein dekorativer Füllstoff ist. Sie ist ein funktionaler Teil von Positionierung, Präsentation und kulturellem Wert.",
    },
    {
      label: "Systemebene",
      text: "LumenOS, EvaQuant und verwandte Tools zeigen, dass hinter der visuellen Ebene echte Produkt- und Softwarelogik steckt. Das erhöht die Glaubwürdigkeit des gesamten Studios.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Kuratierter Beweis"
        title={
          <>
            Projekte, die
            <br />
            unterschiedliche
            <br />
            Fähigkeiten
            <br />
            beweisen.
          </>
        }
        body="Die Arbeit zählt am meisten, wenn sie danach gerahmt wird, was sie beweist. Identitätskontrolle, Hospitality-Ruhe, kulturelle Atmosphäre und softwareorientierte Logik gehören zu unterschiedlichen, aber verbundenen Stärken."
        primaryCta={{ href: "/de/contact", label: "Nutze den Beweis in deinem Briefing" }}
        secondaryCta={{ href: "/de/studio", label: "Zurück zum Studio" }}
        aside={
          <ManifestAside
            capLeft="Beweis"
            capRight="Auswahl"
            problemTitle="Ein riesiges Portfolio schafft nicht automatisch Vertrauen."
            problemBody="Wenn alles auf einmal präsentiert wird, muss der Betrachter trotzdem herausfinden, was das Ganze eigentlich beweist."
            stanceTitle="Beweis sollte selektiv, strukturiert und geschäftsrelevant sein."
            stanceBody="PixelPiraterij kuratiert Case Studies nach Fähigkeit, sodass jede zu einem Argument wird statt zu einem Screenshot."
          />
        }
      />

      <section className="section-block proof-layout">
        <SectionHeader
          index="01"
          title="Die aktuelle Beweiskarte."
          body="Jede Lane steht für eine andere Art von Stärke im System. Deshalb soll das Portfolio kategorisiert bleiben, statt in einen visuellen Feed ohne strategische Bedeutung zu zerfallen."
        />
        <ProofCaseGrid items={proofCasesDe} />
        <div className="matrix-shell">
          <p className="section-tag">Fähigkeitsregister</p>
          <CaseMatrix items={featuredCasesDe} />
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Wie dieser Beweis gelesen werden soll."
          body="Ein Investor, Kunde oder Partner muss nicht alles gleichermaßen lieben. Er muss schnell verstehen, warum diese Auswahl Vertrauen schafft und wo die eigentliche Hebelwirkung liegt."
        />
        <div className="segment-grid">
          {readingSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Perspektive</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Was diese Auswahl bereits beweist."
          body="Nicht nur, dass viel gebaut wurde, sondern dass PixelPiraterij mehrere Ebenen gleichzeitig kontrollieren kann: Marke, Konversion, narrative Atmosphäre und Produktlogik."
        />
        <div className="stack-board">
          {proofLayers.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Der richtige Case ist nicht der lauteste, sondern der, der die richtige Fähigkeit für deine Route beweist."
        body="So soll das Studio Beweis einsetzen: als gezielten Nachweis, nicht als Rauschen. Die nächste Frage bleibt immer gleich: Welcher Muskel muss zuerst Vertrauen gewinnen?"
        primary={{ href: "/de/contact", label: "Besprich deine Route" }}
        locale="de"
      />
      <Footer />
    </SiteFrame>
  );
}
