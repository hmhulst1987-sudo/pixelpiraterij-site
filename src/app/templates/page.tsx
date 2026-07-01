import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { templateCategories, templateShowcases } from "@/lib/site-data";

export default function TemplatesPage() {
  const templateRules = [
    {
      title: "Snelheid zonder standaardgevoel",
      body: "Een template hoort tijd te winnen zonder het merk in een generieke vorm te duwen. De winst zit in versnellen, niet in afvlakken.",
    },
    {
      title: "Betere starts, geen eindproduct",
      body: "De template is het fundament, niet het plafond. Het moet een route openen naar iets sterkers, niet de ambitie vroegtijdig vastzetten.",
    },
    {
      title: "Structuur die kan doorgroeien",
      body: "Pages, componenten en flows moeten later kunnen uitbouwen naar portals, builders of productlagen. Anders win je alleen vandaag en verlies je morgen.",
    },
    {
      title: "Eerlijk over wat al staat",
      body: "PixelPiraterij hoeft de builder niet groter te verkopen dan hij nu is. Juist door duidelijk te zijn over de volgorde wordt de route geloofwaardiger.",
    },
  ];

  const rolloutSignals = [
    {
      label: "Nu",
      text: "Template-gedragen systemen, gecureerde richtingen en snellere launch-logica die al direct inzetbaar zijn voor echte trajecten.",
    },
    {
      label: "Hierna",
      text: "Gestructureerde edit-, preview- en publishflows binnen de PixelPiraterij-wereld zodat de stap van template naar builder logisch wordt in plaats van geforceerd.",
    },
    {
      label: "Later",
      text: "Een vollere multi-tenant builderlaag zodra de productlaag, gebruikslogica en operationele ritmes zichzelf eerst hebben bewezen in de praktijk.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Templates en builder-richting"
        title={
          <>
            Slimme starts,
            <br />
            geen goedkope
            <br />
            snelwegen.
          </>
        }
        body="Templates binnen PixelPiraterij zijn er om sterkere startposities te creeren, niet zwakkere uitkomsten. Het zijn gecureerde lanceersystemen die snel kunnen bewegen en tegelijk leesbaar binnen hetzelfde systeem moeten blijven."
        primaryCta={{ href: "/contact", label: "Vraag een template-route aan" }}
        secondaryCta={{ href: "/", label: "Terug naar de routekaart" }}
        aside={
          <ManifestAside
            capLeft="Template-logica"
            capRight="Builder-pad"
            problemKicker="Oud probleem"
            stanceKicker="Nieuwe houding"
            problemTitle="Templates falen wanneer ze identiteit uitwissen."
            problemBody="Snel wordt meestal generiek wanneer het systeem eronder alleen bedoeld is om moeite te besparen in plaats van richting te verbeteren."
            stanceTitle="Een sterk template moet de weg verkorten, niet het resultaat afvlakken."
            stanceBody="PixelPiraterij gebruikt templates als gecureerde startsystemen, met builder-logica die pas verder groeit wanneer deze route zich eerst in de praktijk bewijst."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Templates worden gegroepeerd op waar ze het meeste helpen."
          body="Het doel is niet om mensen te overspoelen met skins. Het doel is om elke doelgroep een betere route te geven naar een sterkere build."
        />
        <div className="segment-grid">
          {templateCategories.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Template-richting</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Wat een goede template-start nu al zichtbaar moet bewijzen."
          body="Niet als abstract principe, maar in echte surfaces: suite-logica, doelgroepkadering en productdiscipline. Zo voelt de builder-richting ineens geloofwaardig in plaats van uitgesteld."
        />
        <ShowcaseGrid items={templateShowcases} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Wat templates hier wel moeten doen."
          body="Niet elke snelle route is meteen slim. De kracht van dit systeem zit in betere startposities, meer structuur en een route die later nog verder open kan."
        />
        <div className="segment-grid">
          {templateRules.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Principes</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Builder komt na capability, niet ervoor."
          body="De volgende laag is een gestructureerde editor-, preview- en publishflow bovenop deze template-systemen. We schalen die belofte pas zodra de productlaag echt staat."
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
        title="Als je snelheid wilt zonder in template-eenvormigheid te belanden, is dit de juiste route."
        body="Deze pagina moet bewijzen dat snelheid, structuur en merkgevoel hier samen kunnen gaan, voordat de diepere builderlaag verder wordt opengezet."
        primary={{ href: "/contact", label: "Praat over een launch-route" }}
        secondary={{ href: "/studio", label: "Zie hoe dit aansluit op de studio" }}
      />
      <Footer />
    </SiteFrame>
  );
}
