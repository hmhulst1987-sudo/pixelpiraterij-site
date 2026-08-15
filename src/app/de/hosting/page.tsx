import { CtaDock, Footer, ManifestAside, PageHero, PackageGrid, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { hostingShowcasesDe, packageTiersDe } from "@/lib/site-data";

export default function GermanHostingPage() {
  const operatingSignals = [
    {
      label: "Uptime",
      text: "Wenn eine Website sich premium anfühlen soll, kann sie sich nicht wie ein Hobbyprojekt verhalten. Stabilität ist kein Extra. Sie ist Teil der Markenerfahrung selbst.",
    },
    {
      label: "Updates",
      text: "Wartung sollte nicht warten, bis etwas kaputtgeht. Die verwaltete Ebene verhindert technisches Abdriften und hält das Fundament langfristig gesund.",
    },
    {
      label: "Support",
      text: "Guter Support soll sich nicht wie ein Ticketsystem anfühlen, in dem Kontext verloren geht. Er soll sich anfühlen, als würde jemand den Build schon verstehen, bevor das Problem erklärt ist.",
    },
    {
      label: "Kontrolle",
      text: "Der größte Gewinn ist oft Ruhe: weniger Anbieter, weniger technisches Rauschen und deutlich weniger Unsicherheit darüber, wer nach der Livegang wofür verantwortlich ist.",
    },
  ];

  const planSignals = [
    {
      title: "Harbor Starter",
      body: "Für kleinere Premium-Websites, die vor allem Zuverlässigkeit, Wartung und eine ruhige technische Basis brauchen, ohne sofort eine schwerere Systemebene zu benötigen.",
    },
    {
      title: "Route Studio",
      body: "Für Marken, die Hosting plus einen stärkeren Rhythmus, besseres Monitoring und Raum brauchen, um in zusätzliche Seiten, Portale oder Produktebenen hineinzuwachsen.",
    },
    {
      title: "Sovereign Fleet",
      body: "Für mehrere Oberflächen, breitere Infrastrukturbedürfnisse und Marken, bei denen Hosting nicht von Roadmap, Support und Systemarchitektur zu trennen ist.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Hosting und Infrastruktur"
        title={
          <>
            Private
            <br />
            Infrastruktur,
            <br />
            öffentliches
            <br />
            Vertrauen.
          </>
        }
        body="PixelPiraterij behandelt Hosting als Teil des Systems, nicht als vergessliche Nebensache. Monitoring, Backups, Support, Updates und Performance-Pflege halten die Marke nach der Livegang am Laufen."
        primaryCta={{ href: "/de/contact", label: "Fordere einen System-Blueprint an" }}
        secondaryCta={{ href: "/de", label: "Zurück zur Routenkarte" }}
        aside={
          <ManifestAside
            capLeft="Verwaltete Ebene"
            capRight="Wiederkehrend"
            problemTitle="Ein starker Build scheitert trotzdem, wenn die Übergabe auf schwachem Hosting landet."
            problemBody="Wenn Uptime, Support und operative Betreuung wackelig sind, verschwindet das durch das Design geschaffene Vertrauen schnell wieder."
            stanceTitle="Managed Hosting ist Teil des Versprechens."
            stanceBody="PixelPiraterij macht Hosting sichtbar, weil Zuverlässigkeit, Betreuung und menschlicher Support Teil dessen sind, was der Kunde tatsächlich kauft."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Warum diese Hosting-Ebene existiert."
          body="Nicht um preislich mit Massen-Hosting zu konkurrieren, sondern um Premium-Marken, Creators und digitalen Produkten eine ruhigere operative Basis zu geben."
        />
        <div className="segment-grid">
          {[
            "Monitoring, Updates und Backups sind Teil des Service-Rhythmus.",
            "Support ist menschlich und kontextbewusst, kein gesichtsloses Ticket-Labyrinth.",
            "Der Stack ist auf die Art von Arbeit abgestimmt, die PixelPiraterij tatsächlich baut.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Vertrauensebene</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Die operative Ebene soll auch auf den ersten Blick klar lesbar sein."
          body="Nicht nur in Worten, sondern in Oberflächen, Planstruktur und Tooling-Gefühl. So wird klar, dass Hosting hier kein Wegwerf-Service ist, sondern eine bewusste Vertrauensebene."
        />
        <ShowcaseGrid items={hostingShowcasesDe} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Was diese Ebene in der Praxis löst."
          body="Der Wert dieser Systemebene ist kein technisches Fachjargon. Es ist weniger Stress, weniger Ausfallzeit und deutlich mehr Kontrolle, sobald die Website live ist."
        />
        <div className="stack-board">
          {operatingSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Wiederkehrende Struktur statt zufälliger Rettungsaktionen."
          body="Das Ziel ist ein System aus verwalteten Plänen, das Stabilität für den Kunden und wiederkehrende Stärke für das Studio schafft. Keine reaktive Reparatur, sondern ein gesünderer Betriebsrhythmus von Anfang an."
        />
        <PackageGrid items={packageTiersDe} locale="de" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Wann welcher Plan Sinn ergibt."
          body="Nicht jede Marke hat dieselbe Infrastrukturfrage. Die Hosting-Ebene funktioniert am besten, wenn der Plan zur Phase, zum Risikoprofil und zur Wachstumsrichtung des Kunden passt."
        />
        <div className="segment-grid">
          {planSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Anwendungsfall</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Wenn die Website zählt, zählt auch das System dahinter."
        body="Hosting kann für den Endkunden unsichtbar bleiben, aber es sollte im Angebot niemals unsichtbar bleiben. Genau dort werden Ruhe, Kontinuität und Glaubwürdigkeit gewonnen oder verloren."
        primary={{ href: "/de/contact", label: "Fordere einen System-Blueprint an" }}
        secondary={{ href: "/de", label: "Zurück zur Routenkarte" }}
        locale="de"
      />
      <Footer />
    </SiteFrame>
  );
}
