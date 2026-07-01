export type Locale = "nl" | "en";

export type NavItem = {
  href: string;
  label: string;
};

export type Offer = {
  id: string;
  title: string;
  note: string;
};

export type Segment = {
  title: string;
  note: string;
  bullets: string[];
};

export type CaseItem = {
  lane: string;
  name: string;
  proof: string;
};

export type ProofVisual = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  position?: string;
  tone?: "dark" | "light";
};

export type ProofCase = {
  lane: string;
  name: string;
  summary: string;
  proof: string;
  bullets: string[];
  visuals: ProofVisual[];
};

export type ShowcaseItem = {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  visual: ProofVisual;
};

export type PackageTier = {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
};

export type ProcessStep = {
  step: string;
  body: string;
};

export const siteNavByLocale: Record<Locale, NavItem[]> = {
  nl: [
    { href: "/#templates", label: "Templates" },
    { href: "/#apps", label: "Apps" },
    { href: "/#docs", label: "Docs" },
    { href: "/#lab", label: "Lab" },
    { href: "/studio", label: "Studio" },
  ],
  en: [
    { href: "/en#templates", label: "Templates" },
    { href: "/en#apps", label: "Apps" },
    { href: "/en#docs", label: "Docs" },
    { href: "/en#lab", label: "Lab" },
    { href: "/en/studio", label: "Studio" },
  ],
};

export const chromeCopy = {
  nl: {
    studioLabel: "Systeemwereld",
    topbarStatus: "Templates, live utilities, gidsen en experimentele routes onder een leesbare PixelPiraterij-opbouw.",
    contactCta: "Open studio",
    segmentLabel: "Route",
    packageLabel: "Pakket",
    nextMoveLabel: "Volgende stap",
    footerBlurb:
      "PixelPiraterij verbindt studio, systeemlagen, template-routes en productdiepte voor merken die meer nodig hebben dan een generieke online aanwezigheid.",
    localeLabelNl: "NL",
    localeLabelEn: "EN",
  },
  en: {
    studioLabel: "System world",
    topbarStatus: "Templates, live utilities, guides and experimental routes under one readable PixelPiraterij system.",
    contactCta: "Open studio",
    segmentLabel: "Route",
    packageLabel: "Package",
    nextMoveLabel: "Next move",
    footerBlurb:
      "PixelPiraterij connects studio work, system layers, template routes and product depth for brands that need more than a generic online presence.",
    localeLabelNl: "NL",
    localeLabelEn: "EN",
  },
} as const;

export const homeOffers: Offer[] = [
  {
    id: "01",
    title: "Flagship-traject",
    note: "Maatwerk frontlijnen voor merken die zich geen geleende uitstraling kunnen permitteren.",
  },
  {
    id: "02",
    title: "Template-start",
    note: "Gecureerde startsystemen die sneller bewegen dan bouwen vanaf een leeg canvas.",
  },
  {
    id: "03",
    title: "Systeemlaag",
    note: "Hosting, portalen en operationele diepte die het geheel onder controle houden.",
  },
];

export const homeOffersEn: Offer[] = [
  {
    id: "01",
    title: "Custom system",
    note: "Custom front lines for brands that cannot afford to look borrowed.",
  },
  {
    id: "02",
    title: "Template start",
    note: "Curated starting systems that move faster than a blank-canvas build.",
  },
  {
    id: "03",
    title: "System layer",
    note: "Hosting, portals and operational depth that keep the whole thing under control.",
  },
];

export const audienceSegments: Segment[] = [
  {
    title: "Founders en digitale producten",
    note: "Voor teams die een serieuze weblaag nodig hebben zonder energie te verspillen aan zwakke hosting of generieke launch-tooling.",
    bullets: [
      "Scherpere launch-surfaces en productgerichte pagina's",
      "Infrastructuur die technische frictie verlaagt",
      "Ruimte om door te groeien naar portalen, tools en systeemlagen",
    ],
  },
  {
    title: "Creatieve studio's en labels",
    note: "Voor cultuurgedreven merken die sfeer, controle en release-klare infrastructuur op één plek nodig hebben.",
    bullets: [
      "Identity-led layouts en campagne-oppervlakken",
      "Managed hosting voor pieken, drops en releases",
      "Een sterkere wereld dan een aangekleed thema",
    ],
  },
  {
    title: "Hospitality en premium services",
    note: "Voor merken die vertrouwen, rust en premium aantrekkingskracht nodig hebben in plaats van goedkoop brochuregedrag.",
    bullets: [
      "Premium presentatie die vertrouwen voorop zet",
      "Bewustzijn van boeking en conversie",
      "Doorlopende hosting en site-stewardship",
    ],
  },
];

export const audienceSegmentsEn: Segment[] = [
  {
    title: "Founders and digital products",
    note: "For teams that need a serious web surface without wasting energy on weak hosting or generic launch tooling.",
    bullets: [
      "Sharper launch surfaces and product-facing pages",
      "Infrastructure that reduces technical drag",
      "Room to grow into portals, tools and system layers",
    ],
  },
  {
    title: "Creative studios and labels",
    note: "For culture-first brands that need atmosphere, control and release-ready infrastructure in one place.",
    bullets: [
      "Identity-led layouts and campaign surfaces",
      "Managed hosting for spikes, drops and releases",
      "A stronger world than a dressed-up theme",
    ],
  },
  {
    title: "Hospitality and premium services",
    note: "For brands that need trust, calm and premium desire instead of low-budget brochure behaviour.",
    bullets: [
      "Trust-first premium presentation",
      "Booking and conversion awareness",
      "Ongoing hosting and site stewardship",
    ],
  },
];

export const featuredCases: CaseItem[] = [
  {
    lane: "Identity-led commerce",
    name: "KunstvanVB",
    proof: "Laat editorial polish, premium kadering en sterkere visuele regie zien over een volledige merklaag.",
  },
  {
    lane: "Hospitality-systemen",
    name: "Sjoerd en Couvert-richtingen",
    proof: "Laat rustige conversie, ruimtelijke aantrekkingskracht en een verfijndere route naar hospitality-weblogica zien.",
  },
  {
    lane: "Cultuur en narratief",
    name: "Hermes Records en vage.blog",
    proof: "Laat zien dat narratieve sfeer en bruikbaarheid elkaar niet hoeven tegen te werken.",
  },
  {
    lane: "Softwaregerichte systemen",
    name: "LumenOS, EvaQuant en utilities",
    proof: "Laat productdenken, dashboardlogica en scherpere softwarepatronen achter de visuele laag zien.",
  },
];

export const featuredCasesEn: CaseItem[] = [
  {
    lane: "Identity-led commerce",
    name: "KunstvanVB",
    proof: "Shows editorial polish, premium framing and stronger visual control across a full brand surface.",
  },
  {
    lane: "Hospitality systems",
    name: "Sjoerd and Couvert directions",
    proof: "Shows calm conversion, spatial desire and a more refined route into hospitality web logic.",
  },
  {
    lane: "Culture and narrative",
    name: "Hermes Records and vage.blog",
    proof: "Shows that narrative atmosphere and usability can strengthen each other instead of competing for attention.",
  },
  {
    lane: "Software-facing systems",
    name: "LumenOS, EvaQuant and utilities",
    proof: "Shows product thinking, dashboard logic and sharper software patterns behind the visual layer.",
  },
];

export const proofCases: ProofCase[] = [
  {
    lane: "Identity-led commerce",
    name: "KunstvanVB",
    summary:
      "Een eigen merkwereld met genoeg karakter om niet generiek te voelen, maar wel genoeg controle om als zakelijke laag te blijven werken.",
    proof:
      "Bewijst dat PixelPiraterij niet alleen pagina's opmaakt, maar ook merkspanning, toon en herkenning strak kan kaderen.",
    bullets: [
      "Merklaag met duidelijk eigen signatuur",
      "Direct herkenbare visuele taal",
      "Sterk vertrekpunt voor premium framing en commerce",
    ],
    visuals: [
      {
        src: "/cases/kunstvanvb-wordmark.png",
        alt: "KunstvanVB wordmark en merkopbouw op donkere achtergrond.",
        fit: "contain",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Hospitality systems",
    name: "Sjoerd, Le Radel en rustige conversie",
    summary:
      "Van luxe branding tot een natuurlijke campingroute: hier zit de kracht in rust, vertrouwen en een omgeving die niet hoeft te schreeuwen om overtuigend te zijn.",
    proof:
      "Bewijst dat hospitality niet naar brochuregedrag hoeft te zakken om commercieel duidelijk, geloofwaardig en uitnodigend te worden.",
    bullets: [
      "Rustige merkpresentatie met premium gevoel",
      "Boekingsgerichte site zonder goedkope drukte",
      "Meerdere hospitality-tonen onder een herkenbare kwaliteitslat",
    ],
    visuals: [
      {
        src: "/cases/leradel-site.png",
        alt: "Le Radel camping site met rustige groene interface en duidelijke reserveringsroute.",
        fit: "cover",
        position: "center top",
        tone: "light",
      },
      {
        src: "/cases/sjoerd-brand.png",
        alt: "Sjoerd hospitality branding op donkere achtergrond met goudkleurige typografie.",
        fit: "cover",
        position: "center 26%",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Culture and narrative",
    name: "Hermes Records en vage.blog",
    summary:
      "Twee verschillende culturele richtingen die allebei laten zien dat sfeer hier geen filter is, maar een bruikbaar onderdeel van positionering en wereldbouw.",
    proof:
      "Bewijst dat PixelPiraterij narratief kan inzetten als functionele laag voor release-architectuur, culturele context en merkgeheugen.",
    bullets: [
      "Editorial spanning zonder chaos",
      "Culturele interfaces met eigen wereld",
      "Narratief dat verkoop en identiteit tegelijk draagt",
    ],
    visuals: [
      {
        src: "/cases/hermes-records.png",
        alt: "Hermes Records site met donkere editorial layout en labelpositionering.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
      {
        src: "/cases/vage-blog.png",
        alt: "vage.blog visual met laptop voor neonachtige lichtstrepen.",
        fit: "cover",
        position: "center center",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Software-facing systems",
    name: "EvaQuant en LumenOS",
    summary:
      "Niet alleen een mooie schil, maar ook productlogica: dashboards, planmatigheid, interfacehierarchie en softwarepatronen die laten zien dat er echte systeemdiepte onder de studio zit.",
    proof:
      "Bewijst dat PixelPiraterij ook kan denken in producten, dashboards en tool-achtige omgevingen waar structuur zwaarder telt dan decoratie.",
    bullets: [
      "Dashboardlogica en datahierarchie",
      "Productachtige interfaces met duidelijke routes",
      "Bewijs van softwarediscipline achter de merklaag",
    ],
    visuals: [
      {
        src: "/cases/evaquant-dashboard.png",
        alt: "EvaQuant dashboard met trading interface, data en signaalpanelen.",
        fit: "cover",
        position: "left top",
        tone: "dark",
      },
      {
        src: "/cases/lumenos-reference.png",
        alt: "LumenOS hero visual met gebruiker achter laptop in donkere setting.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
    ],
  },
];

export const proofCasesEn: ProofCase[] = [
  {
    lane: "Identity-led commerce",
    name: "KunstvanVB",
    summary:
      "A brand world with enough character to avoid feeling generic, yet enough control to operate as a credible business-facing layer.",
    proof:
      "Proves that PixelPiraterij does more than arrange pages. It can author brand tension, tone and recognition with real control.",
    bullets: [
      "A brand layer with a distinct signature",
      "Immediate visual recognition",
      "A strong base for premium framing and commerce",
    ],
    visuals: [
      {
        src: "/cases/kunstvanvb-wordmark.png",
        alt: "KunstvanVB wordmark and brand construction on a dark background.",
        fit: "contain",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Hospitality systems",
    name: "Sjoerd, Le Radel and calm conversion",
    summary:
      "From luxury branding to a nature-first camping route, the strength here is restraint, trust and an environment that does not need to shout to convert.",
    proof:
      "Proves that hospitality does not need brochure energy to become commercially clear, credible and inviting.",
    bullets: [
      "Calm brand presentation with premium confidence",
      "Booking-aware routing without cheap pressure",
      "Multiple hospitality tones held to one quality bar",
    ],
    visuals: [
      {
        src: "/cases/leradel-site.png",
        alt: "Le Radel camping site with a calm green interface and a clear reservation route.",
        fit: "cover",
        position: "center top",
        tone: "light",
      },
      {
        src: "/cases/sjoerd-brand.png",
        alt: "Sjoerd hospitality branding on a dark background with gold typography.",
        fit: "cover",
        position: "center 26%",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Culture and narrative",
    name: "Hermes Records and vage.blog",
    summary:
      "Two different cultural directions showing that atmosphere here is not decorative filler. It is a usable part of positioning and worldbuilding.",
    proof:
      "Proves that PixelPiraterij can use narrative as a working layer for release architecture, cultural framing and long-term brand memory.",
    bullets: [
      "Editorial tension without chaos",
      "Cultural interfaces with a world of their own",
      "Narrative that supports identity and commercial meaning together",
    ],
    visuals: [
      {
        src: "/cases/hermes-records.png",
        alt: "Hermes Records site with a dark editorial layout and label positioning.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
      {
        src: "/cases/vage-blog.png",
        alt: "vage.blog visual showing a laptop in front of neon-like light streaks.",
        fit: "cover",
        position: "center center",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Software-facing systems",
    name: "EvaQuant and LumenOS",
    summary:
      "Not just a polished shell, but product logic: dashboards, planning discipline, interface hierarchy and software patterns that prove there is real system depth under the studio.",
    proof:
      "Proves that PixelPiraterij can think in products, dashboards and tool-facing environments where structure matters more than decoration.",
    bullets: [
      "Dashboard logic and data hierarchy",
      "Product-facing interfaces with clear routing",
      "Evidence of software discipline behind the brand layer",
    ],
    visuals: [
      {
        src: "/cases/evaquant-dashboard.png",
        alt: "EvaQuant dashboard showing a trading interface, data and signal panels.",
        fit: "cover",
        position: "left top",
        tone: "dark",
      },
      {
        src: "/cases/lumenos-reference.png",
        alt: "LumenOS hero visual with a user behind a laptop in a dark setting.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
    ],
  },
];

export const hostingShowcases: ShowcaseItem[] = [
  {
    label: "Client surface",
    title: "Een hosted site moet er niet alleen goed uitzien, maar ook rustig blijven aanvoelen.",
    body:
      "Hosting is pas waardevol wanneer de voorkant niet broos voelt. Le Radel laat zien hoe een kalme, lichte surface alleen geloofwaardig blijft als de technische basis niet wankelt.",
    bullets: [
      "Rustige voorkant zonder fragiel gevoel",
      "Geschikt voor echte reserverings- en contactroutes",
      "Laat zien waarom betrouwbaarheid onderdeel is van de merkervaring",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Le Radel site als voorbeeld van een rustige hospitality-surface.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Operator zicht",
    title: "Achter de schermen hoort net zoveel structuur te zitten als aan de voorkant.",
    body:
      "EvaQuant toont het soort dashboarddiscipline dat belangrijk is voor monitoring, statusbewustzijn en systeemvertrouwen. Ook deze systeemlaag verkoopt uiteindelijk rust via zicht en controle.",
    bullets: [
      "Monitoring en statusgevoel als productlaag",
      "Duidelijke datahierarchie in plaats van blinde afhankelijkheid",
      "Bewijst dat de studio ook denkt in operations en tooling",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "EvaQuant dashboard als voorbeeld van operator-zicht en controle.",
      fit: "cover",
      position: "left top",
      tone: "dark",
    },
  },
  {
    label: "Planstructuur",
    title: "Managed hosting verkoopt beter wanneer het aanbod net zo helder is als de techniek erachter.",
    body:
      "Een terugkerende laag moet duidelijk voelen: wat krijgt iemand nu, wat groeit later mee en waarom is die structuur zakelijk logisch. Dat soort planmatigheid geeft vertrouwen nog voor de eerste supportvraag komt.",
    bullets: [
      "Duidelijke tier-logica",
      "Geschikt voor terugkerende stewardship in plaats van losse reddingsacties",
      "Verbindt infrastructuur aan commerciele helderheid",
    ],
    visual: {
      src: "/cases/evaquant-pricing.png",
      alt: "EvaQuant pricing als voorbeeld van heldere planstructuur.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
];

export const hostingShowcasesEn: ShowcaseItem[] = [
  {
    label: "Client surface",
    title: "A hosted site should not only look good. It should keep feeling calm and dependable.",
    body:
      "Hosting becomes valuable when the front end does not feel brittle. Le Radel shows how a calm, light surface only stays credible when the technical base underneath does not wobble.",
    bullets: [
      "A calm front end without a fragile feel",
      "Suitable for real booking and contact routes",
      "Shows why reliability is part of the brand experience",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Le Radel site as an example of a calm hospitality surface.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Operator visibility",
    title: "The layer behind the scenes should carry as much structure as the public-facing side.",
    body:
      "EvaQuant shows the kind of dashboard discipline that matters for monitoring, status awareness and system trust. Managed hosting also sells calm through visibility and control.",
    bullets: [
      "Monitoring and status awareness as a product layer",
      "Clear data hierarchy instead of blind dependence",
      "Proof that the studio thinks in operations and tooling too",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "EvaQuant dashboard as an example of operator visibility and control.",
      fit: "cover",
      position: "left top",
      tone: "dark",
    },
  },
  {
    label: "Plan structure",
    title: "Managed hosting sells better when the offer is as clear as the system behind it.",
    body:
      "A recurring layer should feel explicit: what someone gets now, what expands later and why that structure makes commercial sense. That kind of plan logic creates trust before the first support request even exists.",
    bullets: [
      "Clear tier logic",
      "Designed for recurring stewardship instead of random rescue work",
      "Connects infrastructure to commercial clarity",
    ],
    visual: {
      src: "/cases/evaquant-pricing.png",
      alt: "EvaQuant pricing as an example of clear plan structure.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
];

export const templateShowcases: ShowcaseItem[] = [
  {
    label: "Template suite",
    title: "Een template-start mag compact zijn, zolang de route erachter slim genoeg is.",
    body:
      "De PixelPiraterij-suite laat zien hoe een kleine entry-point toch strak kan voelen wanneer pricing, unlock-logica en productrichting helder zijn. Dat is bruikbare snelheid, geen rommelige shortcut.",
    bullets: [
      "Snelle instap zonder goedkoop gevoel",
      "Geschikt voor suite- en upselllogica",
      "Laat zien dat een compacte route alsnog premium kan ogen",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "PixelPiraterij lifetime bundle scherm als compact template-suite voorbeeld.",
      fit: "contain",
      tone: "light",
    },
  },
  {
    label: "Doelgroep-richting",
    title: "Templates worden pas sterk als ze al vanaf het begin voor een echte doelgroep zijn gekaderd.",
    body:
      "Le Radel bewijst dat een rustige, natuurgedreven hospitality-richting heel anders moet voelen dan een founder-tool of labelsite. De template moet dus het juiste vertrekpunt kiezen, niet alleen een layout.",
    bullets: [
      "Doelgroep bepaalt de sfeer en flow",
      "Sterkere starts dan een generieke skin",
      "Geeft richting aan copy, CTA's en page-opbouw",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Le Radel site als voorbeeld van doelgroep-specifieke template-richting.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Productpad",
    title: "De builder hoeft nu nog niet alles te doen, zolang de fundering later wel kan doorgroeien.",
    body:
      "LumenOS laat zien hoe een productgerichte voorkant nu al richting, helderheid en interface-discipline kan dragen. Dat is precies hoe de builderlaag moet ontstaan: uit echte capability, niet uit losse beloftes.",
    bullets: [
      "Template kan doorgroeien naar productlogica",
      "Helderheid en structuur eerst, complexiteit later",
      "Bewijst dat sequencing hier belangrijker is dan hype",
    ],
    visual: {
      src: "/cases/lumenos-reference.png",
      alt: "LumenOS hero als voorbeeld van een template die kan doorgroeien naar productlogica.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
];

export const templateShowcasesEn: ShowcaseItem[] = [
  {
    label: "Template suite",
    title: "A template-backed start can stay compact, as long as the route behind it is smart enough.",
    body:
      "The PixelPiraterij suite shows how a small entry point can still feel sharp when pricing, unlock logic and product direction are clear. That is usable speed, not a messy shortcut.",
    bullets: [
      "Fast entry without a cheap feel",
      "Works for suite logic and upsell structure",
      "Shows how a compact route can still feel premium",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "PixelPiraterij lifetime bundle screen as a compact template-suite example.",
      fit: "contain",
      tone: "light",
    },
  },
  {
    label: "Audience direction",
    title: "Templates only get strong when they are framed for a real audience from the start.",
    body:
      "Le Radel proves that a calm, nature-led hospitality route should feel completely different from a founder tool or a label site. The template must therefore choose the right starting logic, not just a layout.",
    bullets: [
      "Audience defines atmosphere and flow",
      "Stronger starting points than a generic skin",
      "Shapes copy, CTAs and page structure from the outset",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Le Radel site as an example of audience-specific template direction.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Product path",
    title: "The builder does not need to do everything today, as long as the foundation can genuinely expand later.",
    body:
      "LumenOS shows how a product-facing front end can already carry direction, clarity and interface discipline. That is exactly how the builder layer should emerge: from real capability, not from inflated promises.",
    bullets: [
      "A template can grow into product logic",
      "Clarity and structure first, complexity later",
      "Proof that sequencing matters more here than hype",
    ],
    visual: {
      src: "/cases/lumenos-reference.png",
      alt: "LumenOS hero as an example of a template that can grow into product logic.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
];

export const studioShowcases: ShowcaseItem[] = [
  {
    label: "Identity surface",
    title: "Een flagship-surface moet voelen alsof hij is gemaakt voor dit merk en voor geen ander.",
    body:
      "KunstvanVB bewijst hoe een eigen visuele taal, duidelijke merkspanning en gecontroleerde presentatie samen een merklaag kunnen dragen die niet inwisselbaar aanvoelt.",
    bullets: [
      "Maatwerk uitstraling in plaats van theme-assemblage",
      "Merkkaders die direct herkenning opbouwen",
      "Premium framing die commercieel bruikbaar blijft",
    ],
    visual: {
      src: "/cases/kunstvanvb-wordmark.png",
      alt: "KunstvanVB wordmark als voorbeeld van identity-led surface design.",
      fit: "contain",
      tone: "dark",
    },
  },
  {
    label: "Cultural world",
    title: "De studio bouwt niet alleen pagina's, maar complete werelden waar toon en richting in vastliggen.",
    body:
      "Hermes Records laat zien dat een cultuurgedreven interface tegelijk editorial, commercieel en toekomstbestendig kan zijn wanneer de onderliggende structuur klopt.",
    bullets: [
      "Editorial layout met echte positionering",
      "Narratief en release-logica in dezelfde surface",
      "Laat zien hoe sfeer functioneel wordt in plaats van decoratief",
    ],
    visual: {
      src: "/cases/hermes-records.png",
      alt: "Hermes Records als voorbeeld van een culturele worldbuilding-surface.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
  {
    label: "Product layer",
    title: "Een studioroute wordt veel sterker wanneer de voorkant ook productdiscipline verraadt.",
    body:
      "EvaQuant laat zien dat PixelPiraterij ook interfaces kan bouwen waar hiërarchie, tooling-gevoel en systeemlogica net zo belangrijk zijn als branding.",
    bullets: [
      "Duidelijke interfacehierarchie",
      "Geschikt voor product- en dashboardachtige omgevingen",
      "Bewijs dat design en systeemdenken hier samen optrekken",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "EvaQuant dashboard als voorbeeld van productgerichte studio-capability.",
      fit: "cover",
      position: "left top",
      tone: "dark",
    },
  },
];

export const studioShowcasesEn: ShowcaseItem[] = [
  {
    label: "Identity surface",
    title: "A flagship surface should feel like it was built for this brand and no other.",
    body:
      "KunstvanVB proves how a distinct visual language, clear brand tension and controlled presentation can carry a brand layer that never feels interchangeable.",
    bullets: [
      "Custom presence instead of theme assembly",
      "Brand framing that builds recognition immediately",
      "Premium presentation that remains commercially useful",
    ],
    visual: {
      src: "/cases/kunstvanvb-wordmark.png",
      alt: "KunstvanVB wordmark as an example of identity-led surface design.",
      fit: "contain",
      tone: "dark",
    },
  },
  {
    label: "Cultural world",
    title: "The studio builds more than pages. It builds worlds where tone and direction are already embedded.",
    body:
      "Hermes Records shows how a culture-led interface can be editorial, commercial and future-ready at the same time when the structure underneath is disciplined.",
    bullets: [
      "Editorial layout with real positioning",
      "Narrative and release logic inside the same surface",
      "Shows how atmosphere becomes functional rather than decorative",
    ],
    visual: {
      src: "/cases/hermes-records.png",
      alt: "Hermes Records as an example of a cultural worldbuilding surface.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
  {
    label: "Product layer",
    title: "A studio route gets much stronger when the front end also hints at real product discipline.",
    body:
      "EvaQuant shows that PixelPiraterij can also build interfaces where hierarchy, tooling feel and system logic matter as much as branding.",
    bullets: [
      "Clear interface hierarchy",
      "Suitable for product-facing and dashboard environments",
      "Proof that design and system thinking move together here",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "EvaQuant dashboard as an example of product-facing studio capability.",
      fit: "cover",
      position: "left top",
      tone: "dark",
    },
  },
];

export const aboutShowcases: ShowcaseItem[] = [
  {
    label: "Niet generiek",
    title: "De positionering bestaat niet uit een moodboard, maar uit zichtbaar andere uitkomsten.",
    body:
      "Van KunstvanVB tot Le Radel zie je dat PixelPiraterij niet naar één AI-achtig huisje toe werkt, maar naar passende surfaces met een duidelijke kwaliteitslat.",
    bullets: [
      "Geen één-stijl-dwang over totaal verschillende merken",
      "Wel een herkenbare standaard in regie en afwerking",
      "Bewijst dat eigenzinnigheid hier gecontroleerd blijft",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Le Radel als voorbeeld van rustige, niet-generieke merkuitkomst.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Niet oppervlakkig",
    title: "De studio probeert het gat tussen branding en operatie te dichten.",
    body:
      "EvaQuant en de systeemrichting maken duidelijk dat de ambitie niet stopt bij een mooie homepage. Er hoort ook systeemlogica en zicht achter te zitten.",
    bullets: [
      "Merklaag en systeemlaag horen bij elkaar",
      "Tooling-gevoel en operationele rust versterken de voorkant",
      "Laat zien waarom PixelPiraterij niet als klassieke studio is opgezet",
    ],
    visual: {
      src: "/cases/evaquant-pricing.png",
      alt: "EvaQuant pricing als voorbeeld van systeem- en aanboddiscipline.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
  {
    label: "Niet toevallig",
    title: "De naam houdt de houding vast, maar het model eronder is bewust opgebouwd.",
    body:
      "Hermes Records, de hospitality-richtingen en de template-suite laten samen zien dat dit geen losse probeersels zijn, maar onderdelen van een breder operating model.",
    bullets: [
      "Studio, hosting en template-logica versterken elkaar",
      "Culturele en zakelijke routes kunnen binnen hetzelfde systeem bestaan",
      "Bewijst waarom de naam rebels mag blijven zonder amateuristisch te voelen",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "PixelPiraterij suite als voorbeeld van een bewust opgebouwd operating model.",
      fit: "contain",
      tone: "light",
    },
  },
];

export const aboutShowcasesEn: ShowcaseItem[] = [
  {
    label: "Not generic",
    title: "The positioning is not a moodboard. It shows up in visibly different outcomes.",
    body:
      "From KunstvanVB to Le Radel, you can see that PixelPiraterij is not steering every project toward one AI-looking aesthetic, but toward the right surface with a consistent quality bar.",
    bullets: [
      "No one-style force across very different brands",
      "A recognizable standard in control and finish",
      "Proof that the rebellious tone still stays disciplined",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Le Radel as an example of a calm, non-generic brand outcome.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Not superficial",
    title: "The studio exists to close the gap between branding and operations.",
    body:
      "EvaQuant and the system direction make it clear that the ambition does not stop at a beautiful homepage. There also needs to be system logic and visibility behind it.",
    bullets: [
      "Brand layer and system layer belong together",
      "Tooling feel and operational calm reinforce the front end",
      "Shows why PixelPiraterij is not framed like a conventional studio",
    ],
    visual: {
      src: "/cases/evaquant-pricing.png",
      alt: "EvaQuant pricing as an example of system and offer discipline.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
  {
    label: "Not accidental",
    title: "The name keeps the stance, but the model underneath it is deliberate.",
    body:
      "Hermes Records, the hospitality directions and the template suite together show that these are not loose experiments, but parts of a broader operating model.",
    bullets: [
      "Studio, hosting and template logic reinforce each other",
      "Cultural and commercial routes can live inside the same system",
      "Proof that the name can stay rebellious without feeling amateur",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "PixelPiraterij suite as an example of a deliberately built operating model.",
      fit: "contain",
      tone: "light",
    },
  },
];

export const packageTiers: PackageTier[] = [
  {
    name: "Harbor Starter",
    price: "Vanaf €75 / maand",
    subtitle: "Managed hosting en rustige regie voor kleinere flagship-sites.",
    features: [
      "Eén managed site",
      "Basis-updates, back-ups en uptime-checks",
      "Support en operationele zorg met vertrouwen voorop",
    ],
  },
  {
    name: "Route Studio",
    price: "Vanaf €275 / maand",
    subtitle: "Voor merken die hosting nodig hebben plus een sterkere systeemlaag rond de site.",
    features: [
      "Priority monitoring en performance-zorg",
      "Template-gedragen uitbreidingsroutes",
      "Maandelijkse systeem-stewardship",
    ],
  },
  {
    name: "Sovereign Fleet",
    price: "Maatwerk scope",
    subtitle: "Voor merken met meerdere surfaces, portalen en zwaardere infrastructuurbehoeften.",
    features: [
      "Meerdere sites of app-surfaces",
      "Dieper support-ritme en planning",
      "Infrastructuur gevormd rond het bedrijf zelf",
    ],
  },
];

export const packageTiersEn: PackageTier[] = [
  {
    name: "Harbor Starter",
    price: "From €75 / month",
    subtitle: "Managed hosting and calm oversight for smaller flagship sites.",
    features: [
      "One managed site",
      "Core updates, backups and uptime checks",
      "Trust-first support and operational care",
    ],
  },
  {
    name: "Route Studio",
    price: "From €275 / month",
    subtitle: "For brands that need hosting plus a stronger system layer around the site.",
    features: [
      "Priority monitoring and performance care",
      "Template-backed expansion routes",
      "Monthly system stewardship",
    ],
  },
  {
    name: "Sovereign Fleet",
    price: "Custom scope",
    subtitle: "For multi-surface brands, portals and heavier infrastructure needs.",
    features: [
      "Multiple sites or app surfaces",
      "Deeper support rhythm and planning",
      "Infrastructure shaped around the business itself",
    ],
  },
];

export const templateCategories = [
  {
    title: "Founders en productlanceringen",
    body: "Landing-systemen, productpagina's die vertrouwen voorop zetten en rollout-vriendelijke structuren die snel bewegen zonder standaard aan te voelen.",
  },
  {
    title: "Creatives en labels",
    body: "Release-werelden, editorial commerce en culturele surfaces die identiteit vasthouden zonder hun structuur kwijt te raken.",
  },
  {
    title: "Hospitality en premium services",
    body: "Template-gedragen rust, conversiebewuste presentatie en een sterkere eerste stap naar premium positionering.",
  },
];

export const templateCategoriesEn = [
  {
    title: "Founders and product launches",
    body: "Landing systems, trust-first product pages and rollout-friendly structures built to move fast without feeling off-the-shelf.",
  },
  {
    title: "Creatives and labels",
    body: "Release worlds, editorial commerce and cultural surfaces that hold identity without losing structure.",
  },
  {
    title: "Hospitality and premium services",
    body: "Template-backed calm, conversion-aware presentation and a stronger first move into premium positioning.",
  },
];

export const operationalStack = [
  {
    label: "Designstudio",
    text: "Maatwerk surfaces, systeemdenken en geautoriseerde presentatie in plaats van thema-assemblage.",
  },
  {
    label: "Managed hosting",
    text: "Een terugkerende vertrouwenslaag met back-ups, monitoring, updates en menselijke support ingebouwd in het aanbod.",
  },
  {
    label: "Template-gedragen systemen",
    text: "Herbruikbare structuren die launchtijd verkorten en tegelijk ruimte laten voor maatwerk-uitkomsten.",
  },
  {
    label: "Apps en portalen",
    text: "De productkant van PixelPiraterij, als bewijs dat er echte operationele en softwarematige diepte onder het merk zit.",
  },
];

export const operationalStackEn = [
  {
    label: "Design studio",
    text: "Custom surfaces, system thinking and authored presentation instead of theme assembly.",
  },
  {
    label: "Managed hosting",
    text: "A recurring trust layer with backups, monitoring, updates and human support built into the offer.",
  },
  {
    label: "Template-backed systems",
    text: "Reusable structures that shorten launch time while keeping room for custom outcomes.",
  },
  {
    label: "Apps and portals",
    text: "The product side of PixelPiraterij, proving there is real operational and software depth under the brand.",
  },
];

export const studioCapabilities = [
  "Flagship-websites voor premium merken en producten",
  "Identity-led systemen voor creators, labels en hospitality",
  "Portalen, app-gerichte surfaces en gedeelde UI-logica",
  "Template-gedragen maatwerk voor snellere launch-cycli",
];

export const studioCapabilitiesEn = [
  "Flagship websites for premium brands and products",
  "Identity-led systems for creators, labels and hospitality",
  "Portals, app-facing surfaces and shared UI logic",
  "Template-backed custom work for faster launch cycles",
];

export const processSteps: ProcessStep[] = [
  {
    step: "Verkennen",
    body: "We brengen het businessmodel, de doelgroep en de juiste route in kaart: maatwerk, template-gedragen of juist systeemzwaar.",
  },
  {
    step: "Kaderen",
    body: "We bepalen welke surface, infrastructuur en welk bewijs nodig zijn zodat de build niet alleen mooi is, maar ook strategisch werkt.",
  },
  {
    step: "Bouwen",
    body: "Design, copy, structuur en code worden gevormd als één systeem, niet als losse bureau-outputs die later aan elkaar worden gezet.",
  },
  {
    step: "Doorzetten",
    body: "De hosting- en supportlaag houdt het werk gezond na livegang en maakt ruimte voor de volgende uitbreidingsstap.",
  },
];

export const processStepsEn: ProcessStep[] = [
  {
    step: "Discover",
    body: "We map the business model, the audience and whether the right route is custom, template-backed or system-heavy.",
  },
  {
    step: "Frame",
    body: "We define the surface, the infrastructure and the proof needed so the build is not just pretty, but strategically useful.",
  },
  {
    step: "Build",
    body: "Design, copy, structure and code are shaped as one system, not as disconnected agency outputs.",
  },
  {
    step: "Run",
    body: "The hosting and support layer keeps the work healthy after launch and creates room for the next expansion step.",
  },
];
