export type Locale = "nl" | "en" | "fr" | "es";

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
  stageLabel?: string;
  badge?: string;
  priceNote?: string;
};

export type ProcessStep = {
  step: string;
  body: string;
};

export const siteNavByLocale: Record<Locale, NavItem[]> = {
  nl: [
    { href: "/studio", label: "Studio" },
    { href: "/cases", label: "Cases" },
    { href: "/hosting", label: "Hosting" },
    { href: "/templates", label: "Templates" },
    { href: "/about", label: "Over" },
    { href: "/contact", label: "Contact" },
  ],
  en: [
    { href: "/en/studio", label: "Studio" },
    { href: "/en/cases", label: "Cases" },
    { href: "/en/hosting", label: "Hosting" },
    { href: "/en/templates", label: "Templates" },
    { href: "/en/about", label: "About" },
    { href: "/en/contact", label: "Contact" },
  ],
  fr: [
    { href: "/fr/studio", label: "Studio" },
    { href: "/fr/cases", label: "Cases" },
    { href: "/fr/hosting", label: "Hosting" },
    { href: "/fr/templates", label: "Templates" },
    { href: "/fr/about", label: "À propos" },
    { href: "/fr/contact", label: "Contact" },
  ],
  es: [
    { href: "/es/studio", label: "Studio" },
    { href: "/es/cases", label: "Casos" },
    { href: "/es/hosting", label: "Hosting" },
    { href: "/es/templates", label: "Templates" },
    { href: "/es/about", label: "Nosotros" },
    { href: "/es/contact", label: "Contacto" },
  ],
};

export const chromeCopy = {
  nl: {
    studioLabel: "Studio en systemen",
    topbarStatus: "Maatwerk-sites, template-routes, hosting en systeemlagen voor merken die professioneel willen groeien zonder generieke tussenlaag.",
    contactCta: "Start briefing",
    segmentLabel: "Route",
    packageLabel: "Pakket",
    nextMoveLabel: "Volgende stap",
    footerBlurb:
      "PixelPiraterij bouwt merkwaardige sites, template-routes en beheerde systeemlagen voor merken die presentatie, betrouwbaarheid en doorgroei serieus nemen.",
    localeLabelNl: "NL",
    localeLabelEn: "EN",
  },
  en: {
    studioLabel: "Studio and systems",
    topbarStatus: "Custom sites, template routes, hosting and system layers for brands that want to grow professionally without settling for generic delivery.",
    contactCta: "Start brief",
    segmentLabel: "Route",
    packageLabel: "Package",
    nextMoveLabel: "Next move",
    footerBlurb:
      "PixelPiraterij builds distinctive sites, template routes and managed system layers for brands that take presentation, reliability and growth seriously.",
    localeLabelNl: "NL",
    localeLabelEn: "EN",
  },
  fr: {
    studioLabel: "Studio et systèmes",
    topbarStatus: "Sites sur mesure, routes template, hébergement et couches système pour les marques qui veulent grandir professionnellement sans se contenter d'une livraison générique.",
    contactCta: "Démarrer un brief",
    segmentLabel: "Route",
    packageLabel: "Formule",
    nextMoveLabel: "Prochaine étape",
    footerBlurb:
      "PixelPiraterij conçoit des sites singuliers, des routes template et des couches système gérées pour les marques qui prennent au sérieux la présentation, la fiabilité et la croissance.",
    localeLabelNl: "NL",
    localeLabelEn: "EN",
  },
  es: {
    studioLabel: "Estudio y sistemas",
    topbarStatus: "Sitios a medida, rutas de plantillas, hosting y capas de sistema para marcas que quieren crecer de forma profesional sin conformarse con una entrega genérica.",
    contactCta: "Iniciar briefing",
    segmentLabel: "Ruta",
    packageLabel: "Plan",
    nextMoveLabel: "Siguiente paso",
    footerBlurb:
      "PixelPiraterij construye sitios con carácter propio, rutas de plantillas y capas de sistema gestionadas para marcas que se toman en serio la presentación, la fiabilidad y el crecimiento.",
    localeLabelNl: "NL",
    localeLabelEn: "EN",
  },
} as const;

export const localeLabels: Record<Locale, string> = {
  nl: "NL",
  en: "EN",
  fr: "FR",
  es: "ES",
};

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

export const homeOffersFr: Offer[] = [
  {
    id: "01",
    title: "Parcours flagship",
    note: "Des premières lignes sur mesure pour les marques qui ne peuvent pas se permettre une allure empruntée.",
  },
  {
    id: "02",
    title: "Départ template",
    note: "Des systèmes de démarrage sélectionnés qui avancent plus vite qu'une construction depuis une page blanche.",
  },
  {
    id: "03",
    title: "Couche système",
    note: "Hébergement, portails et profondeur opérationnelle qui gardent l'ensemble sous contrôle.",
  },
];

export const homeOffersEs: Offer[] = [
  {
    id: "01",
    title: "Trayecto flagship",
    note: "Frentes a medida para marcas que no pueden permitirse una imagen prestada.",
  },
  {
    id: "02",
    title: "Arranque con plantilla",
    note: "Sistemas de inicio seleccionados que avanzan más rápido que partir de un lienzo en blanco.",
  },
  {
    id: "03",
    title: "Capa de sistema",
    note: "Hosting, portales y profundidad operativa que mantienen todo bajo control.",
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
      "Beheerde hosting voor pieken, drops en releases",
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

export const audienceSegmentsFr: Segment[] = [
  {
    title: "Fondateurs et produits numériques",
    note: "Pour les équipes qui ont besoin d'une couche web sérieuse sans gaspiller d'énergie sur un hébergement fragile ou des outils de lancement génériques.",
    bullets: [
      "Des surfaces de lancement plus nettes et des pages orientées produit",
      "Une infrastructure qui réduit la friction technique",
      "De la place pour évoluer vers des portails, outils et couches système",
    ],
  },
  {
    title: "Studios créatifs et labels",
    note: "Pour les marques culturelles qui ont besoin d'ambiance, de contrôle et d'une infrastructure prête pour les sorties, le tout au même endroit.",
    bullets: [
      "Des mises en page identitaires et des surfaces de campagne",
      "Un hébergement géré pour les pics, les drops et les sorties",
      "Un univers plus fort qu'un thème habillé à la hâte",
    ],
  },
  {
    title: "Hospitality et services premium",
    note: "Pour les marques qui ont besoin de confiance, de calme et d'un attrait premium plutôt qu'un comportement de brochure low-cost.",
    bullets: [
      "Une présentation premium qui privilégie la confiance",
      "Une attention portée à la réservation et à la conversion",
      "Un hébergement et une gestion de site continus",
    ],
  },
];

export const audienceSegmentsEs: Segment[] = [
  {
    title: "Fundadores y productos digitales",
    note: "Para equipos que necesitan una capa web seria sin malgastar energía en un hosting débil o herramientas de lanzamiento genéricas.",
    bullets: [
      "Superficies de lanzamiento más afiladas y páginas orientadas a producto",
      "Infraestructura que reduce la fricción técnica",
      "Espacio para crecer hacia portales, herramientas y capas de sistema",
    ],
  },
  {
    title: "Estudios creativos y sellos",
    note: "Para marcas culturales que necesitan atmósfera, control e infraestructura lista para lanzamientos, todo en un mismo lugar.",
    bullets: [
      "Maquetaciones guiadas por identidad y superficies de campaña",
      "Hosting gestionado para picos, drops y lanzamientos",
      "Un universo más sólido que una plantilla maquillada",
    ],
  },
  {
    title: "Hospitality y servicios premium",
    note: "Para marcas que necesitan confianza, calma y deseo premium en lugar de un comportamiento de folleto barato.",
    bullets: [
      "Presentación premium centrada en la confianza",
      "Conciencia de reserva y conversión",
      "Hosting continuo y cuidado permanente del sitio",
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

export const featuredCasesFr: CaseItem[] = [
  {
    lane: "Commerce identitaire",
    name: "KunstvanVB",
    proof: "Montre un vernis éditorial, un cadrage premium et une direction visuelle plus forte sur l'ensemble d'une couche de marque.",
  },
  {
    lane: "Systèmes hospitality",
    name: "Sjoerd et directions Couvert",
    proof: "Montre une conversion posée, un attrait spatial et une route plus raffinée vers la logique web hospitality.",
  },
  {
    lane: "Culture et narratif",
    name: "Hermes Records et vage.blog",
    proof: "Montre que l'ambiance narrative et l'utilisabilité peuvent se renforcer plutôt que se concurrencer.",
  },
  {
    lane: "Systèmes orientés logiciel",
    name: "LumenOS, EvaQuant et utilitaires",
    proof: "Montre la pensée produit, la logique de tableau de bord et des patterns logiciels plus fins derrière la couche visuelle.",
  },
];

export const featuredCasesEs: CaseItem[] = [
  {
    lane: "Comercio guiado por identidad",
    name: "KunstvanVB",
    proof: "Muestra un acabado editorial, un encuadre premium y un control visual más fuerte en toda una capa de marca.",
  },
  {
    lane: "Sistemas de hospitality",
    name: "Sjoerd y direcciones Couvert",
    proof: "Muestra una conversión serena, atractivo espacial y una ruta más refinada hacia la lógica web de hospitality.",
  },
  {
    lane: "Cultura y narrativa",
    name: "Hermes Records y vage.blog",
    proof: "Muestra que la atmósfera narrativa y la usabilidad pueden reforzarse mutuamente en lugar de competir.",
  },
  {
    lane: "Sistemas orientados a software",
    name: "LumenOS, EvaQuant y utilidades",
    proof: "Muestra pensamiento de producto, lógica de dashboard y patrones de software más afinados detrás de la capa visual.",
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
    name: "EvaQuant, LumenOS en WattNetjes",
    summary:
      "Niet alleen een mooie schil, maar ook productlogica: dashboards, planmatigheid, interfacehiërarchie en softwarepatronen die laten zien dat er echte systeemdiepte onder de studio zit.",
    proof:
      "Bewijst dat PixelPiraterij ook kan denken in producten, dashboards en tool-achtige omgevingen waar structuur zwaarder telt dan decoratie.",
    bullets: [
      "Dashboardlogica en datahierarchie",
      "Productachtige interfaces met duidelijke routes",
      "Bewijs van softwarediscipline achter de merklaag",
      "Data-gedreven infrastructuurverhalen, van trading tot energie",
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
      {
        src: "/cases/wattnetjes-hero.png",
        alt: "WattNetjes hero met satellietbeeld van Utrecht en energiestatistieken.",
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
    name: "EvaQuant, LumenOS and WattNetjes",
    summary:
      "Not just a polished shell, but product logic: dashboards, planning discipline, interface hierarchy and software patterns that prove there is real system depth under the studio.",
    proof:
      "Proves that PixelPiraterij can think in products, dashboards and tool-facing environments where structure matters more than decoration.",
    bullets: [
      "Dashboard logic and data hierarchy",
      "Product-facing interfaces with clear routing",
      "Evidence of software discipline behind the brand layer",
      "Data-driven infrastructure stories, from trading to energy",
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
      {
        src: "/cases/wattnetjes-hero.png",
        alt: "WattNetjes hero with a satellite image of Utrecht and energy statistics.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
    ],
  },
];

export const proofCasesFr: ProofCase[] = [
  {
    lane: "Commerce identitaire",
    name: "KunstvanVB",
    summary:
      "Un univers de marque avec assez de caractère pour ne pas paraître générique, mais assez de contrôle pour rester une couche commerciale crédible.",
    proof:
      "Prouve que PixelPiraterij ne se contente pas de mettre en page des sites, mais sait aussi cadrer avec précision la tension de marque, le ton et la reconnaissance.",
    bullets: [
      "Une couche de marque à la signature clairement distincte",
      "Un langage visuel immédiatement reconnaissable",
      "Un point de départ solide pour un cadrage premium et le commerce",
    ],
    visuals: [
      {
        src: "/cases/kunstvanvb-wordmark.png",
        alt: "Wordmark KunstvanVB et construction de marque sur fond sombre.",
        fit: "contain",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Systèmes hospitality",
    name: "Sjoerd, Le Radel et conversion posée",
    summary:
      "Du branding de luxe à un parcours de camping naturel : la force vient ici du calme, de la confiance et d'un environnement qui n'a pas besoin de crier pour convaincre.",
    proof:
      "Prouve que l'hospitality n'a pas besoin de basculer vers une logique de brochure pour devenir claire, crédible et engageante sur le plan commercial.",
    bullets: [
      "Une présentation de marque posée au ressenti premium",
      "Un site orienté réservation sans agitation bon marché",
      "Plusieurs tonalités hospitality sous une même exigence de qualité",
    ],
    visuals: [
      {
        src: "/cases/leradel-site.png",
        alt: "Site du camping Le Radel avec interface verte apaisée et parcours de réservation clair.",
        fit: "cover",
        position: "center top",
        tone: "light",
      },
      {
        src: "/cases/sjoerd-brand.png",
        alt: "Branding hospitality Sjoerd sur fond sombre avec typographie dorée.",
        fit: "cover",
        position: "center 26%",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Culture et narratif",
    name: "Hermes Records et vage.blog",
    summary:
      "Deux directions culturelles différentes qui montrent toutes deux que l'ambiance n'est pas ici un filtre, mais une composante utile du positionnement et de la construction d'univers.",
    proof:
      "Prouve que PixelPiraterij peut utiliser le narratif comme couche fonctionnelle pour l'architecture de sortie, le contexte culturel et la mémoire de marque.",
    bullets: [
      "Une tension éditoriale sans chaos",
      "Des interfaces culturelles avec un univers propre",
      "Un narratif qui porte à la fois la vente et l'identité",
    ],
    visuals: [
      {
        src: "/cases/hermes-records.png",
        alt: "Site Hermes Records avec mise en page éditoriale sombre et positionnement de label.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
      {
        src: "/cases/vage-blog.png",
        alt: "Visuel vage.blog avec un ordinateur portable devant des traits de lumière néon.",
        fit: "cover",
        position: "center center",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Systèmes orientés logiciel",
    name: "EvaQuant, LumenOS et WattNetjes",
    summary:
      "Pas seulement une belle coquille, mais aussi une logique produit : tableaux de bord, planification, hiérarchie d'interface et patterns logiciels qui prouvent une réelle profondeur système sous le studio.",
    proof:
      "Prouve que PixelPiraterij peut aussi penser en produits, tableaux de bord et environnements outillés où la structure compte plus que la décoration.",
    bullets: [
      "Logique de tableau de bord et hiérarchie des données",
      "Interfaces orientées produit avec des parcours clairs",
      "Preuve de discipline logicielle derrière la couche de marque",
      "Récits d'infrastructure orientés données, du trading à l'énergie",
    ],
    visuals: [
      {
        src: "/cases/evaquant-dashboard.png",
        alt: "Tableau de bord EvaQuant avec interface de trading, données et panneaux de signaux.",
        fit: "cover",
        position: "left top",
        tone: "dark",
      },
      {
        src: "/cases/lumenos-reference.png",
        alt: "Visuel hero LumenOS avec un utilisateur derrière un ordinateur portable dans un cadre sombre.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
      {
        src: "/cases/wattnetjes-hero.png",
        alt: "Visuel hero WattNetjes avec une image satellite d'Utrecht et des statistiques énergétiques.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
    ],
  },
];

export const proofCasesEs: ProofCase[] = [
  {
    lane: "Comercio guiado por identidad",
    name: "KunstvanVB",
    summary:
      "Un universo de marca con suficiente carácter para no sentirse genérico, pero con el control necesario para funcionar como capa de negocio creíble.",
    proof:
      "Demuestra que PixelPiraterij no se limita a maquetar páginas, sino que también sabe encuadrar con precisión la tensión de marca, el tono y el reconocimiento.",
    bullets: [
      "Una capa de marca con firma claramente propia",
      "Un lenguaje visual reconocible al instante",
      "Un punto de partida sólido para un encuadre premium y el comercio",
    ],
    visuals: [
      {
        src: "/cases/kunstvanvb-wordmark.png",
        alt: "Wordmark de KunstvanVB y construcción de marca sobre fondo oscuro.",
        fit: "contain",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Sistemas de hospitality",
    name: "Sjoerd, Le Radel y conversión serena",
    summary:
      "Del branding de lujo a una ruta de camping natural: aquí la fuerza está en la calma, la confianza y un entorno que no necesita gritar para convencer.",
    proof:
      "Demuestra que la hospitality no necesita caer en un comportamiento de folleto para volverse comercialmente clara, creíble y acogedora.",
    bullets: [
      "Presentación de marca serena con sensación premium",
      "Sitio orientado a reservas sin ruido barato",
      "Varios tonos de hospitality bajo un mismo estándar de calidad",
    ],
    visuals: [
      {
        src: "/cases/leradel-site.png",
        alt: "Sitio del camping Le Radel con interfaz verde serena y una ruta de reserva clara.",
        fit: "cover",
        position: "center top",
        tone: "light",
      },
      {
        src: "/cases/sjoerd-brand.png",
        alt: "Branding de hospitality Sjoerd sobre fondo oscuro con tipografía dorada.",
        fit: "cover",
        position: "center 26%",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Cultura y narrativa",
    name: "Hermes Records y vage.blog",
    summary:
      "Dos direcciones culturales distintas que demuestran que la atmósfera aquí no es un filtro decorativo, sino una parte útil del posicionamiento y la construcción de mundo.",
    proof:
      "Demuestra que PixelPiraterij puede usar la narrativa como capa funcional para la arquitectura de lanzamientos, el contexto cultural y la memoria de marca.",
    bullets: [
      "Tensión editorial sin caos",
      "Interfaces culturales con un mundo propio",
      "Narrativa que sostiene a la vez ventas e identidad",
    ],
    visuals: [
      {
        src: "/cases/hermes-records.png",
        alt: "Sitio de Hermes Records con maquetación editorial oscura y posicionamiento de sello.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
      {
        src: "/cases/vage-blog.png",
        alt: "Visual de vage.blog con un portátil frente a franjas de luz neón.",
        fit: "cover",
        position: "center center",
        tone: "dark",
      },
    ],
  },
  {
    lane: "Sistemas orientados a software",
    name: "EvaQuant, LumenOS y WattNetjes",
    summary:
      "No solo una cáscara bonita, también lógica de producto: dashboards, disciplina de planificación, jerarquía de interfaz y patrones de software que demuestran una profundidad de sistema real bajo el estudio.",
    proof:
      "Demuestra que PixelPiraterij también puede pensar en productos, dashboards y entornos tipo herramienta donde la estructura pesa más que la decoración.",
    bullets: [
      "Lógica de dashboard y jerarquía de datos",
      "Interfaces orientadas a producto con rutas claras",
      "Evidencia de disciplina de software detrás de la capa de marca",
      "Relatos de infraestructura basados en datos, del trading a la energía",
    ],
    visuals: [
      {
        src: "/cases/evaquant-dashboard.png",
        alt: "Dashboard de EvaQuant con interfaz de trading, datos y paneles de señales.",
        fit: "cover",
        position: "left top",
        tone: "dark",
      },
      {
        src: "/cases/lumenos-reference.png",
        alt: "Visual hero de LumenOS con un usuario detrás de un portátil en un entorno oscuro.",
        fit: "cover",
        position: "center top",
        tone: "dark",
      },
      {
        src: "/cases/wattnetjes-hero.png",
        alt: "Visual hero de WattNetjes con una imagen satelital de Utrecht y estadísticas energéticas.",
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
      "Verbindt infrastructuur aan commerciële helderheid",
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

export const hostingShowcasesFr: ShowcaseItem[] = [
  {
    label: "Surface client",
    title: "Un site hébergé ne doit pas seulement bien paraître. Il doit aussi rester calme et fiable.",
    body:
      "L'hébergement ne devient précieux que lorsque le front-end ne semble pas fragile. Le Radel montre comment une surface calme et claire ne reste crédible que si la base technique sous-jacente ne vacille pas.",
    bullets: [
      "Un front-end apaisé sans sensation de fragilité",
      "Adapté à de vrais parcours de réservation et de contact",
      "Montre pourquoi la fiabilité fait partie de l'expérience de marque",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Site Le Radel comme exemple d'une surface hospitality apaisée.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Visibilité opérateur",
    title: "La couche en coulisses doit porter autant de structure que la partie visible.",
    body:
      "EvaQuant illustre le type de discipline de tableau de bord qui compte pour le monitoring, la conscience du statut et la confiance système. L'hébergement géré vend lui aussi du calme via la visibilité et le contrôle.",
    bullets: [
      "Monitoring et conscience du statut comme couche produit",
      "Une hiérarchie de données claire plutôt qu'une dépendance aveugle",
      "Preuve que le studio pense aussi en opérations et en outillage",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "Tableau de bord EvaQuant comme exemple de visibilité et de contrôle opérateur.",
      fit: "cover",
      position: "left top",
      tone: "dark",
    },
  },
  {
    label: "Structure des plans",
    title: "L'hébergement géré se vend mieux quand l'offre est aussi claire que le système qui la soutient.",
    body:
      "Une couche récurrente doit se ressentir de façon explicite : ce qu'on obtient maintenant, ce qui grandit ensuite et pourquoi cette structure est logique sur le plan commercial. Cette rigueur de planification crée la confiance avant même la première demande de support.",
    bullets: [
      "Une logique de paliers claire",
      "Conçu pour une gestion récurrente plutôt que des interventions ponctuelles",
      "Relie l'infrastructure à une clarté commerciale",
    ],
    visual: {
      src: "/cases/evaquant-pricing.png",
      alt: "Grille tarifaire EvaQuant comme exemple de structure de plans claire.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
];

export const hostingShowcasesEs: ShowcaseItem[] = [
  {
    label: "Superficie del cliente",
    title: "Un sitio alojado no solo debe verse bien. Debe seguir sintiéndose tranquilo y fiable.",
    body:
      "El hosting se vuelve valioso cuando el front-end no se siente frágil. Le Radel muestra cómo una superficie serena y clara solo mantiene su credibilidad si la base técnica no tiembla.",
    bullets: [
      "Un front-end sereno sin sensación de fragilidad",
      "Adecuado para rutas reales de reserva y contacto",
      "Muestra por qué la fiabilidad forma parte de la experiencia de marca",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Sitio de Le Radel como ejemplo de una superficie de hospitality serena.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Visibilidad del operador",
    title: "La capa detrás de escena debe llevar tanta estructura como la cara visible.",
    body:
      "EvaQuant muestra el tipo de disciplina de dashboard que importa para el monitoreo, la conciencia de estado y la confianza en el sistema. El hosting gestionado también vende calma a través de la visibilidad y el control.",
    bullets: [
      "Monitoreo y conciencia de estado como capa de producto",
      "Jerarquía de datos clara en lugar de dependencia ciega",
      "Prueba de que el estudio también piensa en operaciones y herramientas",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "Dashboard de EvaQuant como ejemplo de visibilidad y control del operador.",
      fit: "cover",
      position: "left top",
      tone: "dark",
    },
  },
  {
    label: "Estructura de planes",
    title: "El hosting gestionado se vende mejor cuando la oferta es tan clara como el sistema que hay detrás.",
    body:
      "Una capa recurrente debe sentirse explícita: qué se obtiene ahora, qué crece después y por qué esa estructura tiene sentido comercial. Ese tipo de disciplina de planificación genera confianza incluso antes de la primera solicitud de soporte.",
    bullets: [
      "Lógica de niveles clara",
      "Pensado para una gestión recurrente en lugar de rescates puntuales",
      "Conecta la infraestructura con la claridad comercial",
    ],
    visual: {
      src: "/cases/evaquant-pricing.png",
      alt: "Precios de EvaQuant como ejemplo de una estructura de planes clara.",
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
      "Le Radel bewijst dat een rustige, natuurgedreven hospitality-richting heel anders moet voelen dan een founder-tool of labelsite. De template moet dus het juiste vertrekpunt kiezen, niet alleen een lay-out.",
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

export const templateShowcasesFr: ShowcaseItem[] = [
  {
    label: "Suite de templates",
    title: "Un départ template peut rester compact tant que la route derrière est assez intelligente.",
    body:
      "La suite PixelPiraterij montre comment un petit point d'entrée peut quand même paraître soigné lorsque la tarification, la logique de déblocage et la direction produit sont claires. C'est de la rapidité utile, pas un raccourci brouillon.",
    bullets: [
      "Une entrée rapide sans sensation bon marché",
      "Adapté à une logique de suite et d'upsell",
      "Montre qu'une route compacte peut quand même paraître premium",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "Écran du bundle à vie PixelPiraterij comme exemple compact de suite de templates.",
      fit: "contain",
      tone: "light",
    },
  },
  {
    label: "Direction d'audience",
    title: "Les templates ne deviennent forts que lorsqu'ils sont cadrés pour une audience réelle dès le départ.",
    body:
      "Le Radel prouve qu'une route hospitality calme et naturelle doit se ressentir très différemment d'un outil pour fondateur ou d'un site de label. Le template doit donc choisir la bonne logique de départ, pas seulement une mise en page.",
    bullets: [
      "L'audience détermine l'ambiance et le flux",
      "Des départs plus forts qu'un skin générique",
      "Guide la copy, les CTA et la structure des pages",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Site Le Radel comme exemple de direction template spécifique à l'audience.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Chemin produit",
    title: "Le builder n'a pas besoin de tout faire dès maintenant, tant que la fondation peut grandir plus tard.",
    body:
      "LumenOS montre comment un front-end orienté produit peut déjà porter direction, clarté et discipline d'interface. C'est exactement ainsi que la couche builder doit émerger : d'une réelle capacité, pas de promesses en l'air.",
    bullets: [
      "Un template peut évoluer vers une logique produit",
      "Clarté et structure d'abord, complexité ensuite",
      "Prouve que le séquencement compte ici plus que le battage",
    ],
    visual: {
      src: "/cases/lumenos-reference.png",
      alt: "Hero LumenOS comme exemple d'un template capable d'évoluer vers une logique produit.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
];

export const templateShowcasesEs: ShowcaseItem[] = [
  {
    label: "Suite de plantillas",
    title: "Un arranque con plantilla puede seguir siendo compacto mientras la ruta detrás sea lo bastante inteligente.",
    body:
      "La suite de PixelPiraterij muestra cómo un punto de entrada pequeño puede sentirse afinado cuando el precio, la lógica de desbloqueo y la dirección de producto son claros. Es velocidad útil, no un atajo desordenado.",
    bullets: [
      "Entrada rápida sin sensación barata",
      "Funciona para lógica de suite y de upsell",
      "Muestra que una ruta compacta puede seguir pareciendo premium",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "Pantalla del paquete de por vida de PixelPiraterij como ejemplo compacto de suite de plantillas.",
      fit: "contain",
      tone: "light",
    },
  },
  {
    label: "Dirección de audiencia",
    title: "Las plantillas solo se vuelven fuertes cuando se enmarcan para una audiencia real desde el principio.",
    body:
      "Le Radel demuestra que una ruta de hospitality serena y natural debe sentirse completamente distinta a una herramienta para fundadores o un sitio de sello discográfico. La plantilla debe elegir la lógica de partida correcta, no solo un diseño.",
    bullets: [
      "La audiencia define la atmósfera y el flujo",
      "Puntos de partida más fuertes que una plantilla genérica",
      "Da forma a los textos, los CTA y la estructura de página",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Sitio de Le Radel como ejemplo de dirección de plantilla específica para una audiencia.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Camino de producto",
    title: "El builder no necesita hacerlo todo hoy, mientras la base pueda crecer de verdad más adelante.",
    body:
      "LumenOS muestra cómo un front-end orientado a producto ya puede transmitir dirección, claridad y disciplina de interfaz. Así es exactamente como debe surgir la capa de builder: desde una capacidad real, no desde promesas infladas.",
    bullets: [
      "Una plantilla puede crecer hacia lógica de producto",
      "Claridad y estructura primero, complejidad después",
      "Prueba de que la secuenciación importa aquí más que el hype",
    ],
    visual: {
      src: "/cases/lumenos-reference.png",
      alt: "Hero de LumenOS como ejemplo de una plantilla que puede crecer hacia lógica de producto.",
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
      "Duidelijke interfacehiërarchie",
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

export const studioShowcasesFr: ShowcaseItem[] = [
  {
    label: "Surface d'identité",
    title: "Une surface flagship doit donner l'impression d'avoir été conçue pour cette marque, et pour aucune autre.",
    body:
      "KunstvanVB prouve comment un langage visuel propre, une tension de marque claire et une présentation maîtrisée peuvent ensemble porter une couche de marque qui ne se sent jamais interchangeable.",
    bullets: [
      "Une allure sur mesure plutôt qu'un assemblage de thème",
      "Des cadres de marque qui créent immédiatement de la reconnaissance",
      "Un cadrage premium qui reste commercialement exploitable",
    ],
    visual: {
      src: "/cases/kunstvanvb-wordmark.png",
      alt: "Wordmark KunstvanVB comme exemple de design de surface guidé par l'identité.",
      fit: "contain",
      tone: "dark",
    },
  },
  {
    label: "Univers culturel",
    title: "Le studio ne construit pas que des pages, mais des univers complets où le ton et la direction sont ancrés.",
    body:
      "Hermes Records montre qu'une interface culturelle peut être à la fois éditoriale, commerciale et pérenne lorsque la structure sous-jacente tient la route.",
    bullets: [
      "Une mise en page éditoriale avec un vrai positionnement",
      "Narratif et logique de sortie dans la même surface",
      "Montre comment l'ambiance devient fonctionnelle plutôt que décorative",
    ],
    visual: {
      src: "/cases/hermes-records.png",
      alt: "Hermes Records comme exemple de surface de construction d'univers culturel.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
  {
    label: "Couche produit",
    title: "Une route studio devient bien plus forte quand le front-end trahit aussi une discipline produit.",
    body:
      "EvaQuant montre que PixelPiraterij peut aussi construire des interfaces où la hiérarchie, le ressenti outillé et la logique système comptent autant que le branding.",
    bullets: [
      "Une hiérarchie d'interface claire",
      "Adapté aux environnements produit et de type tableau de bord",
      "Preuve que design et pensée système avancent ici de concert",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "Tableau de bord EvaQuant comme exemple de capacité studio orientée produit.",
      fit: "cover",
      position: "left top",
      tone: "dark",
    },
  },
];

export const studioShowcasesEs: ShowcaseItem[] = [
  {
    label: "Superficie de identidad",
    title: "Una superficie flagship debe sentirse como si se hubiera construido para esta marca y para ninguna otra.",
    body:
      "KunstvanVB demuestra cómo un lenguaje visual propio, una tensión de marca clara y una presentación controlada pueden sostener juntos una capa de marca que nunca se siente intercambiable.",
    bullets: [
      "Presencia a medida en lugar de ensamblaje de plantilla",
      "Encuadres de marca que generan reconocimiento de inmediato",
      "Presentación premium que sigue siendo comercialmente útil",
    ],
    visual: {
      src: "/cases/kunstvanvb-wordmark.png",
      alt: "Wordmark de KunstvanVB como ejemplo de diseño de superficie guiado por identidad.",
      fit: "contain",
      tone: "dark",
    },
  },
  {
    label: "Mundo cultural",
    title: "El estudio construye más que páginas. Construye mundos donde el tono y la dirección ya están integrados.",
    body:
      "Hermes Records muestra cómo una interfaz guiada por la cultura puede ser editorial, comercial y preparada para el futuro a la vez, cuando la estructura de base es disciplinada.",
    bullets: [
      "Maquetación editorial con posicionamiento real",
      "Narrativa y lógica de lanzamientos en la misma superficie",
      "Muestra cómo la atmósfera se vuelve funcional en lugar de decorativa",
    ],
    visual: {
      src: "/cases/hermes-records.png",
      alt: "Hermes Records como ejemplo de una superficie de construcción de mundo cultural.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
  {
    label: "Capa de producto",
    title: "Una ruta de estudio se vuelve mucho más fuerte cuando el front-end también insinúa disciplina de producto real.",
    body:
      "EvaQuant muestra que PixelPiraterij también puede construir interfaces donde la jerarquía, la sensación de herramienta y la lógica de sistema importan tanto como el branding.",
    bullets: [
      "Jerarquía de interfaz clara",
      "Adecuado para entornos orientados a producto y tipo dashboard",
      "Prueba de que diseño y pensamiento de sistema avanzan juntos aquí",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "Dashboard de EvaQuant como ejemplo de capacidad de estudio orientada a producto.",
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

export const aboutShowcasesFr: ShowcaseItem[] = [
  {
    label: "Pas générique",
    title: "Le positionnement ne tient pas dans un moodboard, mais dans des résultats visiblement différents.",
    body:
      "De KunstvanVB à Le Radel, on voit que PixelPiraterij ne pousse pas chaque projet vers une même esthétique qui sent l'IA, mais vers la surface qui convient, sous une même exigence de qualité.",
    bullets: [
      "Aucune contrainte de style unique sur des marques totalement différentes",
      "Un standard reconnaissable de direction et de finition",
      "Prouve que le ton rebelle reste ici discipliné",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Le Radel comme exemple d'un résultat de marque calme et non générique.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "Pas superficiel",
    title: "Le studio existe pour combler l'écart entre le branding et l'opérationnel.",
    body:
      "EvaQuant et la direction système montrent clairement que l'ambition ne s'arrête pas à une belle page d'accueil. Il faut aussi une logique système et de la visibilité derrière.",
    bullets: [
      "La couche de marque et la couche système vont ensemble",
      "Le ressenti outillé et le calme opérationnel renforcent le front-end",
      "Montre pourquoi PixelPiraterij n'est pas structuré comme un studio classique",
    ],
    visual: {
      src: "/cases/evaquant-pricing.png",
      alt: "Grille tarifaire EvaQuant comme exemple de discipline système et d'offre.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
  {
    label: "Pas un hasard",
    title: "Le nom garde la posture, mais le modèle en dessous est construit avec intention.",
    body:
      "Hermes Records, les directions hospitality et la suite de templates montrent ensemble qu'il ne s'agit pas d'essais isolés, mais des composantes d'un modèle opérationnel plus large.",
    bullets: [
      "Studio, hébergement et logique de templates se renforcent mutuellement",
      "Les routes culturelles et commerciales peuvent coexister dans le même système",
      "Prouve pourquoi le nom peut rester rebelle sans paraître amateur",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "Suite PixelPiraterij comme exemple d'un modèle opérationnel construit avec intention.",
      fit: "contain",
      tone: "light",
    },
  },
];

export const aboutShowcasesEs: ShowcaseItem[] = [
  {
    label: "No genérico",
    title: "El posicionamiento no es un moodboard. Se manifiesta en resultados visiblemente distintos.",
    body:
      "De KunstvanVB a Le Radel, se ve que PixelPiraterij no empuja cada proyecto hacia una misma estética con aire de IA, sino hacia la superficie adecuada con un mismo estándar de calidad.",
    bullets: [
      "Sin un único estilo impuesto sobre marcas muy distintas",
      "Un estándar reconocible de control y acabado",
      "Prueba de que el tono rebelde se mantiene disciplinado",
    ],
    visual: {
      src: "/cases/leradel-site.png",
      alt: "Le Radel como ejemplo de un resultado de marca sereno y no genérico.",
      fit: "cover",
      position: "center top",
      tone: "light",
    },
  },
  {
    label: "No superficial",
    title: "El estudio existe para cerrar la brecha entre el branding y las operaciones.",
    body:
      "EvaQuant y la dirección de sistema dejan claro que la ambición no se detiene en una bonita página de inicio. También debe haber lógica de sistema y visibilidad detrás.",
    bullets: [
      "La capa de marca y la capa de sistema van juntas",
      "La sensación de herramienta y la calma operativa refuerzan el front-end",
      "Muestra por qué PixelPiraterij no está planteado como un estudio convencional",
    ],
    visual: {
      src: "/cases/evaquant-pricing.png",
      alt: "Precios de EvaQuant como ejemplo de disciplina de sistema y de oferta.",
      fit: "cover",
      position: "center top",
      tone: "dark",
    },
  },
  {
    label: "No accidental",
    title: "El nombre conserva la postura, pero el modelo debajo está construido con intención.",
    body:
      "Hermes Records, las direcciones de hospitality y la suite de plantillas muestran juntos que no son experimentos sueltos, sino piezas de un modelo operativo más amplio.",
    bullets: [
      "Estudio, hosting y lógica de plantillas se refuerzan entre sí",
      "Las rutas culturales y comerciales pueden convivir en el mismo sistema",
      "Prueba de por qué el nombre puede seguir siendo rebelde sin sentirse amateur",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "Suite de PixelPiraterij como ejemplo de un modelo operativo construido con intención.",
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

export const packageTiersFr: PackageTier[] = [
  {
    name: "Harbor Starter",
    price: "À partir de 75 € / mois",
    subtitle: "Hébergement géré et supervision posée pour les sites flagship plus petits.",
    features: [
      "Un site géré",
      "Mises à jour de base, sauvegardes et contrôles d'uptime",
      "Support et attention opérationnelle axés sur la confiance",
    ],
  },
  {
    name: "Route Studio",
    price: "À partir de 275 € / mois",
    subtitle: "Pour les marques qui ont besoin d'hébergement plus une couche système plus forte autour du site.",
    features: [
      "Monitoring prioritaire et attention à la performance",
      "Routes d'extension portées par les templates",
      "Gestion système mensuelle",
    ],
  },
  {
    name: "Sovereign Fleet",
    price: "Périmètre sur mesure",
    subtitle: "Pour les marques avec plusieurs surfaces, portails et besoins d'infrastructure plus lourds.",
    features: [
      "Plusieurs sites ou surfaces applicatives",
      "Rythme et planification de support plus approfondis",
      "Infrastructure façonnée autour de l'entreprise elle-même",
    ],
  },
];

export const packageTiersEs: PackageTier[] = [
  {
    name: "Harbor Starter",
    price: "Desde 75 € / mes",
    subtitle: "Hosting gestionado y supervisión serena para sitios flagship más pequeños.",
    features: [
      "Un sitio gestionado",
      "Actualizaciones básicas, copias de seguridad y controles de uptime",
      "Soporte y cuidado operativo centrados en la confianza",
    ],
  },
  {
    name: "Route Studio",
    price: "Desde 275 € / mes",
    subtitle: "Para marcas que necesitan hosting más una capa de sistema más fuerte alrededor del sitio.",
    features: [
      "Monitoreo prioritario y cuidado del rendimiento",
      "Rutas de expansión respaldadas por plantillas",
      "Gestión de sistema mensual",
    ],
  },
  {
    name: "Sovereign Fleet",
    price: "Alcance a medida",
    subtitle: "Para marcas con varias superficies, portales y necesidades de infraestructura más pesadas.",
    features: [
      "Varios sitios o superficies de aplicación",
      "Ritmo y planificación de soporte más profundos",
      "Infraestructura moldeada en torno al propio negocio",
    ],
  },
];

export const templateRoutePackages: PackageTier[] = [
  {
    name: "Route Start",
    price: "Vanaf €79 / maand",
    subtitle: "De complete basisroute met hosting, livegang en editor. Bedoeld als echte start, niet als kale instap die direct om extra werk vraagt.",
    stageLabel: "Basis",
    priceNote: "Alles wat nodig is om serieus live te gaan zit hier al in.",
    features: [
      "Eén sterke routefundering die al commercieel klopt",
      "Editor voor sfeer, content, kleuren en beelden",
      "Hosting, livegang en basisbeheer inbegrepen",
    ],
  },
  {
    name: "Route Plus",
    price: "Meestal + €10 tot €15 / module / maand",
    subtitle: "Alleen de extra laag die echt nodig is. Geen bundel vol functies waar de klant niets aan heeft.",
    stageLabel: "Pluslaag",
    badge: "Alleen indien nodig",
    priceNote: "Je betaalt per gekozen module, niet standaard voor alles tegelijk.",
    features: [
      "Reservering, aanvraag, menu of agenda als losse pluslaag",
      "Je kiest alleen wat past bij de routefamilie",
      "Snelle uitbreiding zonder meteen richting maatwerk te schuiven",
    ],
  },
  {
    name: "Route Custom",
    price: "Pas wanneer de route eruit groeit",
    subtitle: "Maatwerk is een vervolgstap, geen verborgen verplichting vanaf dag één.",
    stageLabel: "Vervolg",
    priceNote: "Dit begint pas zodra de route aantoonbaar meer logica of diepte nodig heeft.",
    features: [
      "Meer pagina's, meer logica of zwaardere flows",
      "Doorgroei zonder de basis opnieuw op te bouwen",
      "Heldere brug naar premium maatwerk wanneer het echt nodig is",
    ],
  },
];

export const templateRoutePackagesEn: PackageTier[] = [
  {
    name: "Route Start",
    price: "From €79 / month",
    subtitle: "The complete base route with hosting, launch and editor access. Meant as a real start, not as a stripped entry that immediately creates extra work.",
    stageLabel: "Base",
    priceNote: "Everything needed for a serious go-live is already included here.",
    features: [
      "One strong route foundation that already works commercially",
      "Editor for atmosphere, content, colors and imagery",
      "Hosting, launch and core upkeep included",
    ],
  },
  {
    name: "Route Plus",
    price: "Usually + €10 to €15 / module / month",
    subtitle: "Only the extra layer that is actually needed. No bundled feature pile the client will never use.",
    stageLabel: "Add-on",
    badge: "Only when needed",
    priceNote: "You pay per selected module, not for everything by default.",
    features: [
      "Booking, inquiry, menu or agenda as separate add-on layers",
      "Choose only what fits the route family",
      "Fast expansion without jumping into custom too early",
    ],
  },
  {
    name: "Route Custom",
    price: "Only when the route truly outgrows the system",
    subtitle: "Custom work is the next step, not a hidden obligation from day one.",
    stageLabel: "Next step",
    priceNote: "This only starts once the route clearly needs more logic or depth.",
    features: [
      "More pages, deeper logic or heavier flows",
      "Growth without rebuilding the base from scratch",
      "A clear bridge into premium custom work when it is genuinely needed",
    ],
  },
];

export const templateRoutePackagesFr: PackageTier[] = [
  {
    name: "Route Start",
    price: "À partir de 79 € / mois",
    subtitle: "La route de base complète avec hébergement, mise en ligne et éditeur. Pensée comme un vrai départ, pas comme une entrée réduite qui crée aussitôt du travail supplémentaire.",
    stageLabel: "Base",
    priceNote: "Tout ce qu'il faut pour une mise en ligne sérieuse est déjà inclus ici.",
    features: [
      "Une fondation de route solide qui fonctionne déjà commercialement",
      "Éditeur pour l'ambiance, le contenu, les couleurs et les images",
      "Hébergement, mise en ligne et gestion de base inclus",
    ],
  },
  {
    name: "Route Plus",
    price: "En général + 10 à 15 € / module / mois",
    subtitle: "Seulement la couche supplémentaire réellement nécessaire. Pas un empilement de fonctionnalités que le client n'utilisera jamais.",
    stageLabel: "Couche plus",
    badge: "Seulement si nécessaire",
    priceNote: "Vous payez par module choisi, pas pour tout par défaut.",
    features: [
      "Réservation, demande, menu ou agenda en couches optionnelles séparées",
      "Vous choisissez uniquement ce qui correspond à la famille de route",
      "Extension rapide sans basculer trop tôt vers le sur-mesure",
    ],
  },
  {
    name: "Route Custom",
    price: "Seulement quand la route dépasse réellement le système",
    subtitle: "Le sur-mesure est une étape suivante, pas une obligation cachée dès le premier jour.",
    stageLabel: "Étape suivante",
    priceNote: "Cela ne démarre que lorsque la route a clairement besoin de plus de logique ou de profondeur.",
    features: [
      "Plus de pages, une logique plus profonde ou des flux plus lourds",
      "Croissance sans reconstruire la base depuis zéro",
      "Un pont clair vers le sur-mesure premium quand c'est réellement nécessaire",
    ],
  },
];

export const templateRoutePackagesEs: PackageTier[] = [
  {
    name: "Route Start",
    price: "Desde 79 € / mes",
    subtitle: "La ruta base completa con hosting, lanzamiento y acceso al editor. Pensada como un inicio real, no como una entrada recortada que enseguida genera trabajo extra.",
    stageLabel: "Base",
    priceNote: "Todo lo necesario para un lanzamiento serio ya está incluido aquí.",
    features: [
      "Una base de ruta sólida que ya funciona comercialmente",
      "Editor para atmósfera, contenido, colores e imágenes",
      "Hosting, lanzamiento y mantenimiento básico incluidos",
    ],
  },
  {
    name: "Route Plus",
    price: "Normalmente + 10 a 15 € / módulo / mes",
    subtitle: "Solo la capa extra que realmente hace falta. Sin un paquete inflado de funciones que el cliente nunca usará.",
    stageLabel: "Capa adicional",
    badge: "Solo si es necesario",
    priceNote: "Pagas por módulo elegido, no por todo de forma predeterminada.",
    features: [
      "Reserva, solicitud, menú o agenda como capas adicionales independientes",
      "Eliges solo lo que encaja con la familia de ruta",
      "Expansión rápida sin saltar demasiado pronto a lo personalizado",
    ],
  },
  {
    name: "Route Custom",
    price: "Solo cuando la ruta realmente supera el sistema",
    subtitle: "El trabajo a medida es el siguiente paso, no una obligación oculta desde el primer día.",
    stageLabel: "Siguiente paso",
    priceNote: "Esto solo comienza cuando la ruta necesita claramente más lógica o profundidad.",
    features: [
      "Más páginas, lógica más profunda o flujos más pesados",
      "Crecimiento sin reconstruir la base desde cero",
      "Un puente claro hacia el trabajo premium a medida cuando es realmente necesario",
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

export const templateCategoriesFr = [
  {
    title: "Fondateurs et lancements produit",
    body: "Systèmes de landing, pages produit qui privilégient la confiance et structures adaptées au rollout qui avancent vite sans paraître standard.",
  },
  {
    title: "Créatifs et labels",
    body: "Univers de sortie, commerce éditorial et surfaces culturelles qui gardent leur identité sans perdre leur structure.",
  },
  {
    title: "Hospitality et services premium",
    body: "Calme porté par les templates, présentation consciente de la conversion et une première étape plus forte vers un positionnement premium.",
  },
];

export const templateCategoriesEs = [
  {
    title: "Fundadores y lanzamientos de producto",
    body: "Sistemas de landing, páginas de producto centradas en la confianza y estructuras adaptadas al rollout que avanzan rápido sin sentirse estándar.",
  },
  {
    title: "Creativos y sellos discográficos",
    body: "Universos de lanzamiento, comercio editorial y superficies culturales que mantienen la identidad sin perder estructura.",
  },
  {
    title: "Hospitality y servicios premium",
    body: "Calma respaldada por plantillas, presentación consciente de la conversión y un primer paso más fuerte hacia un posicionamiento premium.",
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

export const operationalStackFr = [
  {
    label: "Studio de design",
    text: "Surfaces sur mesure, pensée système et présentation maîtrisée plutôt qu'un assemblage de thème.",
  },
  {
    label: "Hébergement géré",
    text: "Une couche de confiance récurrente avec sauvegardes, monitoring, mises à jour et support humain intégrés à l'offre.",
  },
  {
    label: "Systèmes portés par les templates",
    text: "Des structures réutilisables qui réduisent le temps de lancement tout en laissant de la place pour des résultats sur mesure.",
  },
  {
    label: "Apps et portails",
    text: "Le versant produit de PixelPiraterij, preuve d'une réelle profondeur opérationnelle et logicielle sous la marque.",
  },
];

export const operationalStackEs = [
  {
    label: "Estudio de diseño",
    text: "Superficies a medida, pensamiento de sistema y presentación con autoría en lugar de ensamblaje de plantilla.",
  },
  {
    label: "Hosting gestionado",
    text: "Una capa de confianza recurrente con copias de seguridad, monitoreo, actualizaciones y soporte humano integrados en la oferta.",
  },
  {
    label: "Sistemas respaldados por plantillas",
    text: "Estructuras reutilizables que acortan el tiempo de lanzamiento mientras dejan espacio para resultados a medida.",
  },
  {
    label: "Apps y portales",
    text: "El lado de producto de PixelPiraterij, prueba de que hay una profundidad operativa y de software real bajo la marca.",
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

export const studioCapabilitiesFr = [
  "Sites flagship pour marques et produits premium",
  "Systèmes guidés par l'identité pour créateurs, labels et hospitality",
  "Portails, surfaces orientées app et logique d'interface partagée",
  "Sur-mesure porté par les templates pour des cycles de lancement plus rapides",
];

export const studioCapabilitiesEs = [
  "Sitios flagship para marcas y productos premium",
  "Sistemas guiados por identidad para creadores, sellos y hospitality",
  "Portales, superficies orientadas a app y lógica de interfaz compartida",
  "Trabajo a medida respaldado por plantillas para ciclos de lanzamiento más rápidos",
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

export const processStepsFr: ProcessStep[] = [
  {
    step: "Explorer",
    body: "Nous cartographions le modèle économique, l'audience et la bonne route : sur mesure, portée par les templates ou orientée système.",
  },
  {
    step: "Cadrer",
    body: "Nous définissons la surface, l'infrastructure et les preuves nécessaires pour que la construction soit non seulement belle, mais aussi stratégiquement utile.",
  },
  {
    step: "Construire",
    body: "Design, copy, structure et code sont façonnés comme un seul système, pas comme des livrables d'agence déconnectés assemblés plus tard.",
  },
  {
    step: "Poursuivre",
    body: "La couche hébergement et support garde le travail sain après la mise en ligne et crée de la place pour la prochaine étape d'extension.",
  },
];

export const processStepsEs: ProcessStep[] = [
  {
    step: "Explorar",
    body: "Mapeamos el modelo de negocio, la audiencia y si la ruta correcta es a medida, respaldada por plantillas o intensiva en sistema.",
  },
  {
    step: "Encuadrar",
    body: "Definimos la superficie, la infraestructura y la prueba necesarias para que la construcción no sea solo bonita, sino estratégicamente útil.",
  },
  {
    step: "Construir",
    body: "Diseño, textos, estructura y código se moldean como un solo sistema, no como entregables de agencia desconectados que se unen después.",
  },
  {
    step: "Sostener",
    body: "La capa de hosting y soporte mantiene el trabajo saludable después del lanzamiento y crea espacio para el siguiente paso de expansión.",
  },
];
