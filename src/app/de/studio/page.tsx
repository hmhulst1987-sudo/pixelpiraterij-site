import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { processStepsDe, studioCapabilitiesDe, studioShowcasesDe } from "@/lib/site-data";

export default function GermanStudioPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Studio"
        title={
          <>
            Maßgeschneiderte
            <br />
            Oberflächen mit
            <br />
            System-Rückgrat.
          </>
        }
        body="Das Studio ist die schwerere Route innerhalb von PixelPiraterij: maßgeschneiderte Oberflächen, Kampagnenstrukturen und produktorientierte Umgebungen für Marken, die Identität, Struktur und operative Ernsthaftigkeit gleichzeitig brauchen."
        primaryCta={{ href: "/de/contact", label: "Öffne die Blueprint-Route" }}
        secondaryCta={{ href: "/de", label: "Zurück zur Routenkarte" }}
        aside={
          <ManifestAside
            capLeft="Studio-Logik"
            capRight="Build-Linie"
            problemTitle="Schöne Arbeit ohne Systemtiefe ist zerbrechlich."
            problemBody="Eine Oberfläche kann premium aussehen und trotzdem scheitern, wenn Copy, Struktur, Übergabe und Infrastruktur dahinter schwach sind."
            stanceTitle="Das Studio baut vom Geschäft aus rückwärts."
            stanceBody="Identität, UX, Code und Rollout-Logik werden als eine Arbeitslinie behandelt, nicht als separate Anbieter, die später zusammengeflickt oder außerhalb des Systems gelassen werden."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Was das Studio tatsächlich baut."
          body="Das ist nicht nur Broschürenarbeit. Das Studio steht zwischen Markenausdruck, Launch-Systemen und den Interfaces, die dem Geschäft mehr Bewegungsraum geben."
        />
        <div className="segment-grid">
          {studioCapabilitiesDe.map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Fähigkeit</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Wie diese Studio-Route in der Praxis aussieht."
          body="Nicht als Theorie, sondern als unterschiedliche Arten von Oberflächen, die beweisen, dass Identität, Worldbuilding und Produktdisziplin hier zusammen bestehen können."
        />
        <ShowcaseGrid items={studioShowcasesDe} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Die Arbeit braucht einen Betriebsrhythmus, keinen einmaligen Sprint."
          body="Der Build wird stärker, wenn Discovery, Einordnung, Lieferung und Managed Support miteinander verbunden bleiben. So bleibt eine maßgeschneiderte Oberfläche auch nach der Livegang nützlich."
        />
        <ProcessBoard steps={processStepsDe} />
      </section>

      <CtaDock
        title="Wenn die schwerere Arbeit gebraucht wird, sollte sie auch klar als Studio-Route eingeordnet werden."
        body="Wir können von einem individuellen Briefing starten, von einer schärferen Route in eine bestehende Marke oder von einer Template-Route, die später zu etwas Unverwechselbarerem heranwächst."
        primary={{ href: "/de/contact", label: "Starte die Studio-Route" }}
        locale="de"
      />
      <Footer />
    </SiteFrame>
  );
}
