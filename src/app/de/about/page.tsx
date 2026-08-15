import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { aboutShowcasesDe, processStepsDe } from "@/lib/site-data";

export default function GermanAboutPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Über das Studio"
        title={
          <>
            Freibeuter
            <br />
            aus Haltung,
            <br />
            nicht aus
            <br />
            Kostüm.
          </>
        }
        body="PixelPiraterij existiert, weil zu viele digitale Marken noch immer zwischen generischen Buildern, gesichtslosem Hosting und Studios wählen müssen, die attraktive Arbeit ohne operative Tiefe abliefern."
        primaryCta={{ href: "/de/contact", label: "Öffne die Blueprint-Route" }}
        secondaryCta={{ href: "/de", label: "Zurück zur Routenkarte" }}
        aside={
          <ManifestAside
            capLeft="Positionierung"
            capRight="Warum es existiert"
            problemTitle="Der Markt ist voller Bruchstücke."
            problemBody="Die eine Partei gestaltet, die andere hostet, und eine dritte flickt später alles zusammen. Das Ergebnis ist oft attraktiv, teuer und unter Druck schwach."
            stanceTitle="PixelPiraterij existiert, um diese Fragmentierung zu verringern."
            stanceBody="Studioarbeit, Systemebenen, Templates und künftige Builder-Logik gehören in ein diszipliniertes Operating-Modell."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Die Philosophie ist einfach."
          body="Außerhalb der generischen Route arbeiten, aber mit genug Disziplin, dass das Ergebnis trotzdem Vertrauen verdient."
        />
        <div className="stack-board">
          {[
            { label: "Unabhängig", text: "Die Arbeit ist um stärkere Positionierung und mehr Kontrolle herum aufgebaut, nicht darum, in Standard-Agentur- oder Hosting-Kategorien zu passen." },
            { label: "Menschlich", text: "Support und Entscheidungen sollen sich weiterhin anfühlen, als hätte man es mit Menschen zu tun, die den Build verstehen, nicht mit einer Blackbox." },
            { label: "Systemisch", text: "Es geht nicht um isolierte Seiten. Es geht um die Gesamtheit der Oberflächen, Tools und Infrastruktur darunter." },
          ].map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Wo sich diese Haltung im Modell bereits zeigt."
          body="Die Positionierung wird erst glaubwürdig, wenn sie sich in unterschiedlichen Ergebnissen zeigt: nicht generisch, nicht oberflächlich und nicht zufällig zusammengesetzt."
        />
        <ShowcaseGrid items={aboutShowcasesDe} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Wie das Studio arbeitet."
          body="Die Route muss von Klarheit zu Handlung führen, nicht von Ästhetik zu Verwirrung. Deshalb folgt jeder Build einem strafferen System."
        />
        <ProcessBoard steps={processStepsDe} />
      </section>

      <CtaDock
        title="Der Name bleibt, weil die Haltung bleibt: unabhängig, scharf und nicht bereit, generische Arbeit auszuliefern."
        body="Was sich ändert, ist die Reife des Systems drumherum."
        primary={{ href: "/de/contact", label: "Besprich die nächste Route" }}
        locale="de"
      />
      <Footer />
    </SiteFrame>
  );
}
