import { CtaDock, Footer, ManifestAside, PageHero, PackageGrid, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { hostingShowcases, packageTiers } from "@/lib/site-data";

export default function HostingPage() {
  const operatingSignals = [
    {
      label: "Uptime",
      text: "Als een site premium moet voelen, mag hij zich niet gedragen als een hobbyproject. Stabiliteit is geen extraatje, maar onderdeel van de merkervaring.",
    },
    {
      label: "Updates",
      text: "Onderhoud hoort niet te wachten tot er iets stukgaat. De managed laag voorkomt achterstallig beheer en houdt de technische basis gezond.",
    },
    {
      label: "Support",
      text: "Goede support voelt niet als een ticketsysteem waar context verdwijnt. Het voelt als iemand die de build al begrijpt voordat het probleem uitgelegd is.",
    },
    {
      label: "Regie",
      text: "De grootste winst zit vaak in rust: minder losse leveranciers, minder technisch gedoe en minder twijfel over wie waarvoor verantwoordelijk is.",
    },
  ];

  const planSignals = [
    {
      title: "Harbor Starter",
      body: "Voor kleinere premium sites die vooral betrouwbaarheid, onderhoud en een kalme basis nodig hebben zonder direct een zware systeemlaag te vragen.",
    },
    {
      title: "Route Studio",
      body: "Voor merken die naast hosting ook meer ritme, betere monitoring en ruimte voor doorgroei naar extra pages, portals of productlagen willen.",
    },
    {
      title: "Sovereign Fleet",
      body: "Voor meerdere surfaces, bredere infrastructuurvragen en merken waar hosting niet los staat van roadmap, support en systeemarchitectuur.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Hosting en infrastructuur"
        title={
          <>
            Eigen
            <br />
            infrastructuur,
            <br />
            publiek
            <br />
            vertrouwen.
          </>
        }
        body="PixelPiraterij behandelt hosting als onderdeel van het systeem, niet als een saaie bijzaak. Monitoring, back-ups, support, updates en performance-zorg zorgen dat het merk ook na livegang blijft draaien."
        primaryCta={{ href: "/contact", label: "Vraag een systeemblauwdruk aan" }}
        secondaryCta={{ href: "/cases", label: "Zie wat dit ondersteunt" }}
        aside={
          <ManifestAside
            capLeft="Managed laag"
            capRight="Terugkerend"
            problemKicker="Oud probleem"
            stanceKicker="Nieuwe houding"
            problemTitle="Een sterke build faalt alsnog wanneer de overdracht landt op zwakke hosting."
            problemBody="Als uptime, support en operationele zorg fragiel zijn, verdwijnt het vertrouwen dat design heeft opgebouwd snel."
            stanceTitle="Managed hosting is onderdeel van de belofte."
            stanceBody="PixelPiraterij maakt hosting zichtbaar omdat betrouwbaarheid, stewardship en menselijke support deel zijn van wat de klant daadwerkelijk koopt."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Waarom deze hostinglaag bestaat."
          body="Niet om op prijs te concurreren met commodity hosting, maar om premium merken, creators en digitale producten een rustiger operationeel fundament te geven."
        />
        <div className="segment-grid">
          {[
            "Monitoring, updates en back-ups zijn onderdeel van het service-ritme.",
            "Support is menselijk en contextueel, geen anonieme ticketdoolhof.",
            "De stack sluit aan op het soort werk dat PixelPiraterij daadwerkelijk bouwt.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Vertrouwenslaag</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="De operationele laag moet ook zichtbaar te lezen zijn."
          body="Niet alleen in woorden, maar in surfaces, planstructuur en tooling-gevoel. Zo wordt duidelijk dat hosting hier geen dumpservice is, maar een doordachte vertrouwenslaag."
        />
        <ShowcaseGrid items={hostingShowcases} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Wat deze laag concreet oplost."
          body="De waarde van deze systeemlaag zit niet in technische terminologie, maar in minder stress, minder stilstand en veel meer grip nadat de site live is."
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
          title="Terugkerende structuur boven willekeurig reddingswerk."
          body="Het doel is een systeem van managed plannen dat stabiliteit geeft aan de klant en terugkerende kracht aan de studio. Niet pas reageren als iets kapot is, maar structureel beter draaien."
        />
        <PackageGrid items={packageTiers} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Wanneer welk plan logisch wordt."
          body="Niet elk merk heeft dezelfde infrastructuurvraag. Daarom werkt de hostinglaag pas goed wanneer het plan aansluit op fase, risico en groeirichting van de klant."
        />
        <div className="segment-grid">
          {planSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Gebruiksmoment</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Als de site ertoe doet, doet het systeem achter de site dat ook."
        body="Hosting mag onzichtbaar blijven voor de eindklant, maar nooit onzichtbaar zijn in het aanbod. Juist daar zitten de rust, continuiteit en geloofwaardigheid waar veel merken op afhaken."
        primary={{ href: "/contact", label: "Vraag een systeemblauwdruk aan" }}
        secondary={{ href: "/templates", label: "Bekijk de lichtere route" }}
      />
      <Footer />
    </SiteFrame>
  );
}
