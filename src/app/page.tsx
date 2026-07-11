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
  audienceSegments,
  featuredCases,
  homeOffers,
  operationalStack,
  studioShowcases,
  templateRoutePackages,
  type ProcessStep,
  type Segment,
} from "@/lib/site-data";

const processFlow: ProcessStep[] = [
  {
    step: "Brief",
    body: "We brengen eerst merk, doelgroep, ambitie en technische zwaarte in kaart zodat meteen duidelijk wordt of een studio-, template- of systeemroute het best past.",
  },
  {
    step: "Bouw",
    body: "Daarna vormen we de juiste surface: maatwerk waar het moet, template-gedragen snelheid waar het kan en een systeemlaag die het werk ook na livegang overeind houdt.",
  },
  {
    step: "Bewijs",
    body: "Via cases, live routes en tastbare voorbeelden laten we zien wat al werkt en waar de volgende groeistap logisch wordt.",
  },
  {
    step: "Schaal",
    body: "Wanneer een merk verder wil, kunnen .online en de hub de volgende laag openen: templates, productroutes, apps en zwaardere systeemtoepassingen.",
  },
];

const nextMoveSegments: Segment[] = [
  {
    title: "Start met een studio- of servicebriefing",
    note: "Voor merken die een serieuze voorkant, scherpere positionering of een betrouwbaarder systeem onder de site nodig hebben.",
    bullets: [
      "Maatwerk waar uitstraling en regie echt tellen",
      "Geschikt voor premium merken, founders en hospitality",
      "Van strategie en surface tot hosting en stewardship",
    ],
  },
  {
    title: "Ga door naar .online voor tastbare routes",
    note: "Daar laten we live zien hoe templates, features en productlagen eruitzien zodra iets meer hands-on en vergelijkbaar moet worden.",
    bullets: [
      "Templates en capability-routes",
      "Tastbare voorbeelden van frontend, backend en automatisering",
      "Duidelijke grens tussen snelle start en maatwerk",
    ],
  },
  {
    title: "Gebruik de hub als app-galerij",
    note: "De hub wordt de centrale plek voor webapps, Android-apps, softwareversies en latere downloads binnen hetzelfde ecosysteem.",
    bullets: [
      "Apps op één plek verzamelen",
      "Webversies en downloads logisch scheiden",
      "Onder dezelfde PixelPiraterij-paraplu, maar met eigen doel",
    ],
  },
];

const philosophySegments: Segment[] = [
  {
    title: "Niet generiek bouwen",
    note: "Een PixelPiraterij-route hoort niet te lezen als een ingeruild thema met nieuwe kleuren. De surface moet merk, ritme en commerciële geloofwaardigheid tegelijk dragen.",
    bullets: [
      "Geen standaard bureau-uitstraling of geleende template-energie",
      "Wel duidelijke merkregie en bruikbare commerciële structuur",
      "Een surface die ook na livegang onderscheidend blijft voelen",
    ],
  },
  {
    title: "Niet alleen mooi, maar ook houdbaar",
    note: "De presentatie mag nooit losstaan van hosting, beheer en technische rust. Daarom zit de systeemlaag al vroeg in het gesprek en niet pas wanneer iets stukgaat.",
    bullets: [
      "Hosting en systeemzorg horen in dezelfde route thuis",
      "Minder losse leveranciers en minder operationele frictie",
      "Meer controle over hoe de site zich op lange termijn gedraagt",
    ],
  },
  {
    title: "Van voordeur naar doorgroei",
    note: "De commerciële laag begint op `.nl`, maar hoeft daar niet te eindigen. Als een merk verder groeit, moeten `.online` en de hub logisch de volgende laag kunnen openen.",
    bullets: [
      "Eerst de juiste route kiezen, daarna pas verdiepen",
      "Templates, apps en productlagen pas tonen wanneer ze relevant worden",
      "Eén ecosysteem met duidelijke rolverdeling per domein",
    ],
  },
];

const contactSegments: Segment[] = [
  {
    title: "Studio-traject",
    note: "Voor merken die een sterkere voorkant, betere positionering of een niet-generieke flagship-site nodig hebben.",
    bullets: [
      "Maatwerk surface en merkregie",
      "Geschikt voor premium merken, founders en hospitality",
      "Start via briefing of inhoudelijk contact",
    ],
  },
  {
    title: "Hosting en systeemzorg",
    note: "Voor routes die al bestaan maar steviger beheer, support en een betrouwbaarder technische basis nodig hebben.",
    bullets: [
      "Managed hosting en systeemstewardship",
      "Rustiger onderhoud en betere continuiteit",
      "Bruikbaar als losse instap of vervolg op een build",
    ],
  },
  {
    title: "Template of productroute",
    note: "Voor bedrijven die sneller willen starten en tastbaar willen zien wanneer een template voldoende is en wanneer maatwerk logischer wordt.",
    bullets: [
      "Bekijk `.online` voor live capability-routes",
      "Gebruik de hub voor apps en webversies",
      "Schaal pas op zodra de route er echt om vraagt",
    ],
  },
];

const operationalSegments: Segment[] = operationalStack.map((item) => ({
  title: item.label,
  note: item.text,
  bullets: [
    "Onderdeel van dezelfde PixelPiraterij-route",
    "Bedoeld om presentatie en operatie dichter bij elkaar te brengen",
    "Kan later doorbouwen naar .online of de hub wanneer dat logisch wordt",
  ],
}));

export default function Home() {
  return (
    <SiteFrame>
      <Topbar />

      <PageHero
        kicker="Studio, sites en systeemlagen"
        title={
          <>
            Websites en
            <br />
            systemen die
            <br />
            niet generiek
            <br />
            hoeven te zijn.
          </>
        }
        body="PixelPiraterij helpt merken, founders en premium services met maatwerk-sites, template-routes, managed hosting en systeemlagen die er niet alleen goed uitzien, maar ook professioneel blijven draaien."
        primaryCta={{ href: "/contact", label: "Start een briefing" }}
        secondaryCta={{ href: "/studio", label: "Bekijk de studioroute" }}
        aside={
          <ManifestAside
            capLeft="PixelPiraterij"
            problemKicker="Wat vaak misgaat"
            stanceKicker="Onze inzet"
            problemTitle="Veel merken krijgen óf een generieke site, óf mooi werk zonder stevige technische rug."
            problemBody="Dan blijft een project kwetsbaar: zwakke hosting, losse leveranciers, weinig regie en een online laag die niet meegroeit met het bedrijf."
            stanceTitle="Wij trekken presentatie, structuur en systeemlaag dichter naar elkaar toe."
            stanceBody="Zo ontstaat een route waarin merk, site, hosting en doorgroei beter op elkaar aansluiten en ook na livegang geloofwaardig blijven."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Voor wie deze laag het meest waardevol is."
          body="We richten niet alles op één type klant. De kracht zit juist in het kiezen van de juiste route voor het juiste soort merk, team of product."
        />
        <SegmentGrid segments={audienceSegments} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Wat PixelPiraterij in de basis voor je kan betekenen."
          body="Niet elk traject begint op dezelfde plek. Soms is maatwerk nodig, soms een template-route, soms vooral een beheerde laag die rust en continuiteit terugbrengt."
        />
        <OfferRail items={homeOffers} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Gemaakt werk moet als bewijs functioneren, niet als losse portfoliofeed."
          body="De cases laten verschillende soorten kracht zien: identity-led commerce, hospitality, cultuurgedreven routes en softwaregerichte systemen."
        />
        <CaseMatrix items={featuredCases} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="De systeemlaag eronder hoort ook zichtbaar in het aanbod te zitten."
          body="Hosting, templates en app- of portaalroutes zijn geen losse bijzaken. Ze maken deel uit van hoe een merk professioneel online blijft functioneren."
        />
        <SegmentGrid segments={operationalSegments} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Waarom deze studio niet als een generieke leverancier hoort te voelen."
          body="De kern is niet alleen een mooie site maken. De kern is presentatie, infrastructuur en doorgroei zo verbinden dat het werk geloofwaardig en houdbaar blijft."
        />
        <SegmentGrid segments={philosophySegments} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="06"
          title="Prijsrichting en instap moeten duidelijk voelen."
          body="Niet alles hoeft direct maatwerk te zijn. Daarom maken we zichtbaar waar een sterke basisroute begint, welke pluslagen logisch zijn en wanneer een traject zwaarder maatwerk wordt."
        />
        <PackageGrid items={templateRoutePackages} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="07"
          title="Een paar routes laten meteen zien hoe breed die capability echt is."
          body="Van merkwereld tot hospitality en van culturele interfaces tot dashboards: dit zijn voorbeelden van de kwaliteit en richting die al tastbaar zijn."
        />
        <ShowcaseGrid items={studioShowcases} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="08"
          title="Kies hier de juiste instap, dan wordt de volgende stap vanzelf scherper."
          body="Niet iedereen hoeft met hetzelfde traject te beginnen. Daarom maken we ook het contactmoment zelf duidelijker: studio, hosting of door naar tastbare productroutes."
        />
        <SegmentGrid segments={contactSegments} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="09"
          title="Waar je hierna logisch heen beweegt."
          body="`.nl` blijft de commerciële voordeur. Daarna openen `.online` en de hub pas de volgende laag: tastbare routes, live functies, apps en productomgevingen."
        />
        <SegmentGrid segments={nextMoveSegments} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="10"
          title="Onze werkwijze moet van helderheid naar doorgroei bewegen."
          body="We willen niet alleen iets moois opleveren, maar een route neerzetten die logisch kan opschalen zodra een merk of product verder groeit."
        />
        <ProcessBoard steps={processFlow} />
      </section>

      <CtaDock
        title="Gebruik `.nl` om de juiste route te kiezen en ga daarna pas dieper het ecosysteem in."
        body="Wil je maatwerk, een sterkere site of een betrouwbaarder systeem onder je merk? Dan begint het hier. Wil je daarna tastbare template-routes, live features of app-omgevingen zien, dan wijzen `.online` en de hub de volgende laag aan."
        primary={{ href: "/contact", label: "Start de briefing" }}
        secondary={{ href: "https://pixelpiraterij.online", label: "Ga naar .online" }}
      />

      <Footer />
    </SiteFrame>
  );
}
