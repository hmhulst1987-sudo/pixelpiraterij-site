import { CaseMatrix, CtaDock, Footer, ManifestAside, PageHero, ProofCaseGrid, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { featuredCases, proofCases } from "@/lib/site-data";

export default function CasesPage() {
  const readingSignals = [
    {
      title: "Capability boven categorie",
      body: "Het gaat niet alleen om welk soort project iemand ziet, maar vooral om welke spier het project bewijst: positionering, rust, narratief of systeemkracht.",
    },
    {
      title: "Bedrijfswaarde boven applaus",
      body: "Een case is pas bruikbaar wanneer duidelijk wordt waarom dit zakelijk telt: meer vertrouwen, sterkere conversie, betere framing of een geloofwaardiger productlaag.",
    },
    {
      title: "Selectie boven overload",
      body: "Juist door niet alles tegelijk te tonen, krijgt elk project meer gewicht. Curatie maakt van een portfolio een argument in plaats van een dumpmap.",
    },
  ];

  const proofLayers = [
    {
      label: "Identiteit",
      text: "KunstvanVB laat zien dat PixelPiraterij niet alleen websites kan maken, maar ook een merklaag strak kan kaderen zodat premium gevoel en geloofwaardigheid direct voelbaar zijn.",
    },
    {
      label: "Conversie",
      text: "De hospitality-richtingen bewijzen dat rust, smaak en commerciële logica prima samen kunnen bestaan. Niet schreeuwerig, wel doelgericht.",
    },
    {
      label: "Narratief",
      text: "Hermes Records en vage.blog laten zien dat sfeer hier geen los effectje is, maar een bruikbaar onderdeel van positionering, presentatie en culturele waarde.",
    },
    {
      label: "Systeemlaag",
      text: "LumenOS, EvaQuant en aanverwante tools tonen dat er achter de visuele laag ook echte product- en softwarelogica zit. Dat tilt het hele merkverhaal omhoog.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Gecureerd bewijs"
        title={
          <>
            Projecten die
            <br />
            verschillende
            <br />
            spieren
            <br />
            bewijzen.
          </>
        }
        body="Het werk krijgt pas echt gewicht wanneer het wordt gekaderd door wat het bewijst. Identiteitscontrole, hospitality-rust, culturele sfeer en softwarelogica horen bij verschillende maar verbonden krachten."
        primaryCta={{ href: "/contact", label: "Gebruik dit bewijs in je briefing" }}
        secondaryCta={{ href: "/studio", label: "Terug naar de studio" }}
        aside={
          <ManifestAside
            capLeft="Bewijs"
            capRight="Selectie"
            problemKicker="Oud probleem"
            stanceKicker="Nieuwe houding"
            problemTitle="Een gigantisch portfolio creëert niet automatisch vertrouwen."
            problemBody="Wanneer alles tegelijk wordt gepresenteerd, moet de kijker nog steeds zelf uitzoeken wat het eigenlijk bewijst."
            stanceTitle="Bewijs moet selectief, gestructureerd en zakelijk relevant zijn."
            stanceBody="PixelPiraterij cureert cases op capability, zodat elke case een argument wordt in plaats van een screenshot."
          />
        }
      />

      <section className="section-block proof-layout">
        <SectionHeader
          index="01"
          title="De huidige bewijskaart."
          body="Elke lijn vertegenwoordigt een ander soort kracht binnen het systeem. Daarom moet het portfolio gecategoriseerd blijven in plaats van in te storten tot een visuele feed zonder richting."
        />
        <ProofCaseGrid items={proofCases} />
        <div className="matrix-shell">
          <p className="section-tag">Capability register</p>
          <CaseMatrix items={featuredCases} />
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Hoe dit bewijs gelezen moet worden."
          body="Een investeerder, klant of partner hoeft niet alles mooi te vinden. Diegene moet vooral snel kunnen voelen waarom deze selectie vertrouwen wekt en waar de hefboom precies zit."
        />
        <div className="segment-grid">
          {readingSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Leesrichting</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Wat deze selectie al laat zien."
          body="Niet alleen dat er veel gebouwd is, maar vooral dat PixelPiraterij meerdere lagen onder controle heeft: merk, conversie, wereldbouw en productlogica."
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
        title="De juiste case is niet de luidste, maar degene die de juiste capability voor jouw route bewijst."
        body="Zo hoort de studio bewijs te gebruiken: als gericht materiaal, niet als ruis. De volgende stap is altijd dezelfde vraag: welke spier moet hier als eerste vertrouwen winnen?"
        primary={{ href: "/contact", label: "Bespreek jouw route" }}
      />
      <Footer />
    </SiteFrame>
  );
}
