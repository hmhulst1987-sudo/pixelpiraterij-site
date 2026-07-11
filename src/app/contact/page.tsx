import { CtaDock, Footer, ManifestAside, OfferRail, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";

export default function ContactPage() {
  const routeSignals = [
    {
      id: "01",
      title: "Studioroute",
      note: "Voor merken die een eigen surface, scherpere positionering en een volwassenere voorkant nodig hebben.",
    },
    {
      id: "02",
      title: "Template-route",
      note: "Voor routes waar snelheid telt, zolang die start niet generiek of strategisch zwak hoeft te worden.",
    },
    {
      id: "03",
      title: "Systeemlaag",
      note: "Voor builds die al bestaan maar rustiger, betrouwbaarder en beter begeleid moeten worden na livegang.",
    },
  ];

  const intakeSignals = [
    {
      label: "Probleem",
      text: "Wat verkoop je precies, waar lekt vertrouwen weg en welk deel van de route voelt nu nog te zwak of te generiek?",
    },
    {
      label: "Context",
      text: "Wat staat er al: domeinen, huidige site, copy, merkassets, techniek, deadlines en eventuele losse systemen eromheen?",
    },
    {
      label: "Richting",
      text: "Lijkt de juiste volgende stap op maatwerk, template-gedragen, hosting-zwaar of juist product- en systeemgericht?",
    },
    {
      label: "Uitkomst",
      text: "Na het eerste gesprek hoort de route duidelijker te zijn dan ervoor: wat bouwen we, in welke volgorde en waarom juist zo.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Contact en blauwdruk"
        title={
          <>
            Start met
            <br />
            de route,
            <br />
            niet met
            <br />
            giswerk.
          </>
        }
        body="Als het merk een studioroute, een template-route of een sterkere systeemlaag nodig heeft, is de beste eerste stap om de situatie helder te kaderen en daarvandaan terug te werken."
        primaryCta={{ href: "mailto:inbox@pixelpiraterij.nl", label: "inbox@pixelpiraterij.nl" }}
        secondaryCta={{ href: "/cases", label: "Bekijk cases en richting" }}
        aside={
          <ManifestAside
            capLeft="Intake"
            capRight="Blauwdruk"
            problemKicker="Oud probleem"
            stanceKicker="Nieuwe houding"
            problemTitle="De meeste projecten starten te laat in het verkeerde gesprek."
            problemBody="Mensen springen vaak al in schermen, thema's en tools voordat aanbod, route en infrastructuur goed zijn gekaderd."
            stanceTitle="Een scherpere intake bespaart later tijd."
            stanceBody="Het eerste gesprek moet de route aanwijzen: studio, template, systeemlaag of een bredere systeembuild."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="De drie routes waar intake meestal op uitkomt."
          body="Niet elk project heeft hetzelfde soort antwoord nodig. Daarom helpt het om snel duidelijk te krijgen welke route het meeste gewicht draagt."
        />
        <OfferRail items={routeSignals} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Wat je meeneemt in het eerste gesprek."
          body="Hoe scherper de kadering, hoe beter de route. Dit zijn de signalen die zorgen voor een bruikbaarder vertrekpunt."
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
          title="Wat een goede eerste mail meteen bruikbaar maakt."
          body="Geen perfecte briefing nodig. Wel genoeg context om te zien waar de hefboom zit en welke route niet verspild hoeft te worden."
        />
        <div className="segment-grid">
          {[
            "Een korte uitleg van wat het bedrijf of project werkelijk doet.",
            "De link naar wat er al staat, als dat er al is.",
            "Waar je nu ontevreden over bent: uitstraling, structuur, hosting, tempo of gebrek aan samenhang.",
            "Waar de volgende fase op moet lijken: premiumer, rustiger, sneller live of juist systeemmatiger.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Eerste briefing</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Wat er na de eerste intake gebeurt."
          body="`.nl` bepaalt de commerciële route. Pas daarna wordt duidelijk of `.online` nodig is voor tastbare template- of capability-demonstraties, of dat de hub relevant is voor app- en softwarelagen."
        />
        <div className="stack-board">
          {[
            {
              label: "Voordeur",
              text: "Hier bepalen we of het traject vooral draait om verkoop, positionering, cases, aanbod of een sterkere merklaag.",
            },
            {
              label: ".online",
              text: "Die laag gebruiken we alleen wanneer live template-routes, featureproof of showroommateriaal helpen om de volgende stap zichtbaar te maken.",
            },
            {
              label: "Hub",
              text: "De hub komt pas in beeld wanneer apps, webversies, downloads of suite-logica onderdeel van de route worden.",
            },
          ].map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Als het project ertoe doet, laten we de route dan eerst goed kaderen voordat we de verkeerde surface aanraken."
        body="Mail, blauwdruk-aanvraag of direct gesprek, zolang de route maar in helderheid begint en niet opnieuw in losse onderdelen uit elkaar valt."
        primary={{ href: "mailto:inbox@pixelpiraterij.nl", label: "Stuur de eerste briefing" }}
        secondary={{ href: "/", label: "Terug naar PixelPiraterij.nl" }}
      />
      <Footer />
    </SiteFrame>
  );
}
