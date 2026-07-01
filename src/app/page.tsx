import {
  CtaDock,
  Footer,
  ManifestAside,
  OfferRail,
  PageHero,
  ProcessBoard,
  SectionHeader,
  SegmentGrid,
  ShowcaseGrid,
  SiteFrame,
  Topbar,
} from "@/components/site-shell";
import type { Offer, ProcessStep, Segment, ShowcaseItem } from "@/lib/site-data";

const routeLayers: Offer[] = [
  {
    id: "01",
    title: "Template-routes",
    note: "Gevormde starts voor founders, hospitality en cultuurgedreven merken die sneller willen bewegen zonder geleende uitstraling.",
  },
  {
    id: "02",
    title: "Apps en portalen",
    note: "Live utilities, gefocuste tools en bewijs dat de productkant van PixelPiraterij al operationeel kan zijn.",
  },
  {
    id: "03",
    title: "Docs en lab",
    note: "Gidsen, notities en experimenten die het systeem leesbaar houden terwijl het verder groeit.",
  },
];

const entrySegments: Segment[] = [
  {
    title: "Sneller een site lanceren",
    note: "Begin vanuit een route die al gevormd is voor de juiste doelgroep, in plaats van vanaf nul of vanuit een generiek thema.",
    bullets: [
      "Template-richtingen per merksoort",
      "Sterkere start zonder goedkope snelheid",
      "Duidelijke brug terug naar flagship-werk",
    ],
  },
  {
    title: "Een live utility openen",
    note: "Gebruik tools en publieke routes die al rond de PixelPiraterij-stack bestaan, zonder ze als losse zijprojecten te presenteren.",
    bullets: [
      "Eén samenhangende haven in plaats van losse links",
      "Utilities gekaderd op rol en volwassenheid",
      "Nu bruikbaar, later verder uit te bouwen",
    ],
  },
  {
    title: "Het systeem begrijpelijk houden",
    note: "Docs en gidsen zijn er niet om groter te lijken dan we zijn, maar om de juiste volgorde en verwachtingen helder te houden.",
    bullets: [
      "Getting-started-logica",
      "Gidsen voor sequencing en gebruik",
      "Helderheid zonder valse grootspraak",
    ],
  },
];

const routeShowcases: ShowcaseItem[] = [
  {
    label: "Template-route",
    title: "PixelPiraterij utility-suite",
    body: "Een compacte route voor utility-achtige producten waar pricing, unlock-logica en een rustige surface nu al verkoopbaar moeten voelen.",
    bullets: [
      "Sterk vertrekpunt voor kleine premium offers",
      "Bewijst dat snelle starts niet generiek hoeven te ogen",
      "Handig wanneer de route begint met een gefocust betaald product",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "PixelPiraterij utility-route.",
      fit: "contain",
      tone: "light",
    },
  },
  {
    label: "App-haven",
    title: "EvaQuant productdiscipline",
    body: "Een scherpere productgerichte route die laat zien dat PixelPiraterij dashboards, operator-logica en systeemhiërarchie kan dragen.",
    bullets: [
      "Interface-discipline onder de merklaag",
      "Bruikbaar bewijs voor tooling- en dashboardroutes",
      "Een geloofwaardige brug naar diepere productlagen",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "EvaQuant als app-haven voorbeeld.",
      position: "left top",
      tone: "dark",
    },
  },
  {
    label: "Docs en bewijs",
    title: "Hermes Records en Le Radel als kader",
    body: "Bewijs moet niet los rondzwerven. Culturele en hospitality-routes werken beter wanneer ze gekaderd worden door wat ze aantonen.",
    bullets: [
      "Release- en editorial-logica voor cultuurgedreven merken",
      "Rustige trust-opbouw voor hospitality-routes",
      "Geen losse screenshots, maar leesbare systeemsignalen",
    ],
    visual: {
      src: "/cases/hermes-records.png",
      alt: "Docs en bewijsroute voorbeeld.",
      position: "center top",
      tone: "dark",
    },
  },
];

const labFlow: ProcessStep[] = [
  {
    step: "Kies",
    body: "Kies de route die al past bij doelgroep, producttype en commercieel ritme, in plaats van overal opnieuw te beginnen.",
  },
  {
    step: "Kader",
    body: "Bepaal wat flagship-werk is, wat templatewerk is en wat als utility of docs-route zichtbaar mag worden.",
  },
  {
    step: "Verbind",
    body: "Laat routes, tools en gidsen als één systeem lezen, zodat de buitenkant en de operatie niet uit elkaar vallen.",
  },
  {
    step: "Schaal",
    body: "Publiceer eerst wat nu al geloofwaardig is en laat dat doorgroeien naar studio-, hosting- en productdiepte.",
  },
];

export default function Home() {
  return (
    <SiteFrame>
      <Topbar />

      <PageHero
        kicker="De routes achter de flagship"
        title={
          <>
            Kies de laag
            <br />
            die je echt
            <br />
            nodig hebt.
          </>
        }
        body="PixelPiraterij hoeft niet alleen als studiopitch te bestaan. Rond de flagship-route liggen templates, apps, docs en experimenten die het bredere systeem leesbaar maken en sneller inzetbaar houden."
        primaryCta={{ href: "/#templates", label: "Open de routekaart" }}
        secondaryCta={{ href: "/studio", label: "Ga naar de studio" }}
        aside={
          <ManifestAside
            capLeft="Systeemkaart"
            problemKicker="Waar het misgaat"
            stanceKicker="Hoe het moet lezen"
            problemTitle="Te veel onderdelen leven als losse links zonder duidelijk verband."
            problemBody="Templates, tools, docs en experimenten ogen dan als zijprojecten. Dat verzwakt vertrouwen en maakt het model erachter onduidelijk."
            stanceTitle="Maak de routes zichtbaar als lagen van hetzelfde systeem."
            stanceBody="Daar wordt PixelPiraterij bruikbaar: flagship waar het zwaar moet zijn, templates waar snelheid helpt en routes die de rest van het systeem helder houden."
          />
        }
      />

      <section id="templates" className="section-block">
        <SectionHeader
          index="01"
          title="Gebruik het deel van het systeem dat past bij de klus."
          body="Niet elk merk hoeft met een volledig maatwerksysteem te beginnen. Soms is een template-route genoeg, soms is een live app of docs-laag waardevoller."
        />
        <OfferRail items={routeLayers} />
      </section>

      <section id="apps" className="section-block">
        <SectionHeader
          index="02"
          title="Drie ingangen, één leesbaar model."
          body="De kracht zit niet in alles onder één aanbod verstoppen, maar in elke route helder maken en ze daarna onder dezelfde PixelPiraterij-logica te laten vallen."
        />
        <SegmentGrid segments={entrySegments} />
      </section>

      <section id="docs" className="section-block">
        <SectionHeader
          index="03"
          title="Routes moeten bewijs dragen, niet alleen beloftes."
          body="Templates, apps en docs krijgen pas gewicht als ze al iets tastbaars laten zien. Deze routes maken zichtbaar waar het systeem nu al bruikbaar is."
        />
        <ShowcaseGrid items={routeShowcases} />
      </section>

      <section id="lab" className="section-block">
        <SectionHeader
          index="04"
          title="Lab en documentatie horen het systeem rustiger te maken."
          body="Experimentele routes en gidsen zijn geen ruislaag. Ze moeten juist helder maken welke delen live zijn, welke scherper worden en hoe iemand logisch instapt."
        />
        <ProcessBoard steps={labFlow} />
      </section>

      <CtaDock
        title="Twee domeinen kunnen best twee rollen hebben, zolang ze maar uit hetzelfde systeem komen."
        body="De studio, de templates, de apps en de docs hoeven niet te botsen. Ze moeten alleen weer als één leesbare PixelPiraterij-opbouw functioneren."
        primary={{ href: "/templates", label: "Bekijk template-routes" }}
        secondary={{ href: "/studio", label: "Open de studio" }}
      />

      <Footer />
    </SiteFrame>
  );
}
