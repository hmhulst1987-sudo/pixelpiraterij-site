import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { processSteps, studioCapabilities, studioShowcases } from "@/lib/site-data";

export default function StudioPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Studio"
        title={
          <>
            Maatwerk-surfaces
            <br />
            met een
            <br />
            systeemruggengraat.
          </>
        }
        body="De studio is de zwaardere route binnen PixelPiraterij: maatwerk-surfaces, campagne-opzetten en productnabije omgevingen voor merken die identiteit, structuur en operationele volwassenheid tegelijk nodig hebben."
        primaryCta={{ href: "/contact", label: "Open de blauwdrukroute" }}
        secondaryCta={{ href: "/", label: "Terug naar de routekaart" }}
        aside={
          <ManifestAside
            capLeft="Studiologica"
            capRight="Bouwlijn"
            problemKicker="Oud probleem"
            stanceKicker="Nieuwe houding"
            problemTitle="Mooi werk zonder systeemdiepte blijft fragiel."
            problemBody="Een surface kan premium ogen en toch falen als copy, structuur, overdracht en infrastructuur erachter zwak zijn."
            stanceTitle="De studio bouwt terug vanuit het bedrijf."
            stanceBody="Identiteit, UX, code en rollout-logica worden behandeld als één lijn van werk, niet als losse schakels die later aan elkaar worden gezet of buiten het systeem vallen."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Wat de studio daadwerkelijk bouwt."
          body="Dit is niet alleen brochurewerk. De studio zit tussen merkexpressie, lanceersystemen en de interfaces die een bedrijf echt meer ruimte geven om te bewegen."
        />
        <div className="segment-grid">
          {studioCapabilities.map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Vermogen</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Hoe die studioroute er in het echt uitziet."
          body="Niet als theorie, maar als verschillende soorten surfaces die allemaal bewijzen dat identiteit, worldbuilding en productdiscipline hier samen kunnen vallen."
        />
        <ShowcaseGrid items={studioShowcases} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Het werk heeft een ritme nodig, geen eenmalige sprint."
          body="De build wordt sterker wanneer verkennen, kaderen, opleveren en de supportlaag verbonden blijven. Zo blijft een maatwerk-surface ook na livegang bruikbaar."
        />
        <ProcessBoard steps={processSteps} />
      </section>

      <CtaDock
        title="Als het zwaardere werk nodig is, hoort het ook duidelijk als studioroute gekaderd te worden."
        body="We kunnen starten vanuit een maatwerk-briefing, een scherpere route binnen een bestaand merk of een template-route die later doorbouwt naar iets eigens."
        primary={{ href: "/contact", label: "Start de studioroute" }}
      />
      <Footer />
    </SiteFrame>
  );
}
