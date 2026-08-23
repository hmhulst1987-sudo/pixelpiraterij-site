export type Locale = "nl" | "en";
export type FlowMode = "base" | "inquiry" | "reservation";

export type RouteFlow = {
  title: string;
  summary: string;
  ctaLabel: string;
  steps: string[];
  fields: string[];
  operatorNote: string;
};

export type RouteFamilyCopy = {
  label: string;
  audience: string;
  brandName: string;
  heroTitle: string;
  toneLine: string;
  sections: string[];
  moduleStrategy: string;
  flowPresets: Record<FlowMode, RouteFlow | undefined>;
};

export type RouteFamily = {
  slug: string;
  previewUrl: string;
  basePrice: number;
  moduleSlugs: string[];
  recommendedModuleSlugs: string[];
  defaults: {
    nl: RouteFamilyCopy;
    en: RouteFamilyCopy;
  };
};

export type RouteModule = {
  slug: string;
  price: number;
  flowMode?: Exclude<FlowMode, "base">;
  copy: {
    nl: {
      label: string;
      description: string;
      impact: string;
    };
    en: {
      label: string;
      description: string;
      impact: string;
    };
  };
};

export type ThemeOption = {
  slug: string;
  className: string;
  label: {
    nl: string;
    en: string;
  };
};

export type TemplateRouteConfig = {
  routeId: string;
  locale: Locale;
  familySlug: string;
  themeSlug: string;
  brandName: string;
  routeSlug: string;
  heroTitle: string;
  toneLine: string;
  selectedModules: string[];
  createdAt: string;
};

export const routeConfigStorageKey = "pp-template-route-config-v1";

export const routeFamilies: RouteFamily[] = [
  {
    slug: "paperback",
    previewUrl: "https://paperback.pixelpiraterij.online",
    basePrice: 39,
    moduleSlugs: ["inquiry", "gallery", "agenda", "newsletter"],
    recommendedModuleSlugs: ["inquiry", "gallery"],
    defaults: {
      nl: {
        label: "Digital Paperback Atelier",
        audience: "Voor uitgevers, auteurs en makers die boeken, releases en redactionele diensten als een eigen wereld willen presenteren.",
        brandName: "Digital Paperback Atelier",
        heroTitle: "Van manuscript naar een uitgave die gelezen wil worden.",
        toneLine: "Een redactionele route voor boeken, auteurs, releases en vakmanschap.",
        sections: ["Hero", "Boeken", "Auteurs", "Werkwijze", "Releases", "Contact"],
        moduleStrategy:
          "De basis blijft narratief en visueel sterk. Aanvraag vangt briefing of booking op, gallery en agenda bouwen bewijs en context uit.",
        flowPresets: {
          base: {
            title: "Basisroute voor release en positionering",
            summary: "De eerste conversie is hier vaak herkenning. De route moet sfeer, werk en geloofwaardigheid eerst strak neerzetten.",
            ctaLabel: "Bekijk werk",
            steps: ["Hero + releasehaak", "Werk / context", "Contactmoment"],
            fields: ["Naam", "Project / release", "Link of referentie", "Vraag / doel"],
            operatorNote: "Geschikt als snelle launch voor artiest, label of maker zonder vol boekingssysteem.",
          },
          inquiry: {
            title: "Briefing- of bookingaanvraag",
            summary: "De aanvraaglaag trekt de bezoeker van sfeer naar actie zonder de route direct zakelijk of kaal te maken.",
            ctaLabel: "Start briefing",
            steps: ["Type aanvraag", "Context / timing", "Budget of schaal", "Reactiepad"],
            fields: ["Naam", "Mail", "Aanvraagtype", "Timing", "Korte context"],
            operatorNote: "Kan worden doorgestuurd naar intake, mail of een latere CRM-koppeling.",
          },
          reservation: undefined,
        },
      },
      en: {
        label: "Digital Paperback Atelier",
        audience: "For publishers, authors and makers presenting books, releases and editorial services as a distinct world.",
        brandName: "Digital Paperback Atelier",
        heroTitle: "From manuscript to an edition that asks to be read.",
        toneLine: "An editorial route for books, authors, releases and craft.",
        sections: ["Hero", "Books", "Authors", "Process", "Releases", "Contact"],
        moduleStrategy:
          "The base stays narrative and visual. Inquiry handles briefing or booking, while gallery and agenda expand proof and context.",
        flowPresets: {
          base: {
            title: "Base route for release and positioning",
            summary: "The first conversion here is often recognition. The route needs to land atmosphere, work and credibility before anything else.",
            ctaLabel: "View work",
            steps: ["Hero + release hook", "Work / context", "Contact moment"],
            fields: ["Name", "Project / release", "Link or reference", "Question / goal"],
            operatorNote: "Works as a fast launch route for artists, labels or makers without a full booking system.",
          },
          inquiry: {
            title: "Briefing or booking inquiry",
            summary: "The inquiry layer moves visitors from atmosphere into action without turning the route dry or corporate.",
            ctaLabel: "Start briefing",
            steps: ["Inquiry type", "Context / timing", "Budget or scope", "Reply path"],
            fields: ["Name", "Email", "Inquiry type", "Timing", "Short context"],
            operatorNote: "Can later feed into intake, email or a CRM handoff.",
          },
          reservation: undefined,
        },
      },
    },
  },
  {
    slug: "sjoerd",
    previewUrl: "https://sjoerd.pixelpiraterij.online",
    basePrice: 39,
    moduleSlugs: ["reservation", "inquiry", "menu", "newsletter"],
    recommendedModuleSlugs: ["reservation", "newsletter"],
    defaults: {
      nl: {
        label: "Sjoerd Hospitality",
        audience: "Voor restaurants en culinaire concepten waar sfeer, menu en reservering samen de ervaring dragen.",
        brandName: "Sjoerd",
        heroTitle: "Baskische smaken, een eigen ritme en een tafel die op je wacht.",
        toneLine: "Een culinaire route waarin verhaal, gerechten en reservering samenkomen.",
        sections: ["Hero", "Verhaal", "Menu", "Chef", "Galerij", "Reserveren"],
        moduleStrategy:
          "Hier draagt de basis de beleving, maar reservering pakt de echte actie. Aanvraag blijft bruikbaar voor maatwerkverblijven of groepsvragen.",
        flowPresets: {
          base: {
            title: "Basisroute voor sfeer en vertrouwen",
            summary: "Nog zonder boekingslaag moet de route al rust, beschikbaarheid en een logische eerste stap uitstralen.",
            ctaLabel: "Bekijk plekken",
            steps: ["Hero + verblijfstype", "Plekken / kamers", "Praktische info"],
            fields: ["Naam", "Voorkeur", "Periode", "Korte vraag"],
            operatorNote: "Sterke basis voor een hospitality-site die nog niet direct op een vol systeem hoeft te draaien.",
          },
          inquiry: {
            title: "Verblijfsaanvraag voor maatwerk of groepen",
            summary: "Wanneer direct boeken nog niet passend is, vangt deze route groepsvragen of bijzondere verblijven rustig op.",
            ctaLabel: "Vraag verblijf aan",
            steps: ["Verblijfstype", "Data + personen", "Vraag of wens", "Reactieroute"],
            fields: ["Naam", "Mail", "Aankomst", "Nachten", "Aantal gasten", "Vraag"],
            operatorNote: "Goede tussenlaag voordat echte boekingslogica of availability sync wordt toegevoegd.",
          },
          reservation: {
            title: "Reserveringsflow als pluslaag",
            summary: "De boekingslaag maakt van een sfeervolle route een route die ook direct kan converteren zonder maatwerkchaos.",
            ctaLabel: "Reserveer nu",
            steps: ["Kies data", "Aantal gasten", "Selecteer plek", "Bevestig aanvraag"],
            fields: ["Aankomst", "Vertrek", "Aantal gasten", "Type plek", "Extra notitie"],
            operatorNote: "Legt de fundering voor een latere koppeling met beschikbaarheid, pricing of bevestigingsmails.",
          },
        },
      },
      en: {
        label: "Sjoerd Hospitality",
        audience: "For restaurants and culinary concepts where atmosphere, menu and reservations carry the experience together.",
        brandName: "Sjoerd",
        heroTitle: "Basque flavours, a distinct rhythm and a table waiting for you.",
        toneLine: "A culinary route bringing story, dishes and reservations together.",
        sections: ["Hero", "Story", "Menu", "Chef", "Gallery", "Reservations"],
        moduleStrategy:
          "The base carries the atmosphere, but booking carries the main action. Inquiry still works for custom stays or group requests.",
        flowPresets: {
          base: {
            title: "Base route for atmosphere and trust",
            summary: "Even without a booking layer yet, the route should already communicate calm, availability and a clear first move.",
            ctaLabel: "View stays",
            steps: ["Hero + stay type", "Places / rooms", "Practical info"],
            fields: ["Name", "Preference", "Period", "Short question"],
            operatorNote: "A strong base for hospitality sites that do not need a full booking system immediately.",
          },
          inquiry: {
            title: "Stay inquiry for custom or group requests",
            summary: "When direct booking is not the right first move, this route quietly collects group requests or custom stay questions.",
            ctaLabel: "Request a stay",
            steps: ["Stay type", "Dates + guests", "Question or request", "Reply path"],
            fields: ["Name", "Email", "Arrival", "Nights", "Guest count", "Question"],
            operatorNote: "A useful bridge before real booking logic or availability sync is added.",
          },
          reservation: {
            title: "Booking flow as an add-on layer",
            summary: "The booking layer turns a calm presentation route into something that can convert directly without collapsing into custom chaos.",
            ctaLabel: "Book now",
            steps: ["Choose dates", "Guest count", "Select stay", "Confirm request"],
            fields: ["Arrival", "Departure", "Guest count", "Stay type", "Extra note"],
            operatorNote: "Lays the groundwork for later availability, pricing or confirmation-mail integrations.",
          },
        },
      },
    },
  },
  {
    slug: "computerwinkel",
    previewUrl: "https://computerwinkel.pixelpiraterij.online",
    basePrice: 39,
    moduleSlugs: ["reservation", "inquiry", "menu", "newsletter"],
    recommendedModuleSlugs: ["menu", "inquiry"],
    defaults: {
      nl: {
        label: "TechPunt Computers",
        audience: "Voor computerspeciaalzaken en technische retail waar productkeuze, service en vertrouwen centraal staan.",
        brandName: "TechPunt Computers",
        heroTitle: "De juiste computer begint bij advies dat verder kijkt dan specificaties.",
        toneLine: "Een betrouwbare retailroute voor systemen, reparatie en persoonlijk advies.",
        sections: ["Hero", "Productcategorieen", "Uitgelicht", "Reparatie", "Advies", "Contact"],
        moduleStrategy:
          "Aanbod en presentatie moeten meteen kloppen. Daarna bepaalt de zaak of de actie vooral een aanvraag, reservering of bestelmoment wordt.",
        flowPresets: {
          base: {
            title: "Basisroute voor aanbod en locatie",
            summary: "De site moet direct duidelijk maken wat je aanbiedt, voor wie het is en hoe iemand in beweging komt.",
            ctaLabel: "Bekijk aanbod",
            steps: ["Hero + aanbod", "Praktische info", "Contact of bezoek"],
            fields: ["Naam", "Vraag", "Voorkeursmoment", "Kanaal"],
            operatorNote: "Sterke start voor kleinere zaken die eerst uitstraling en helderheid nodig hebben.",
          },
          inquiry: {
            title: "Aanvraagflow voor catering of intake",
            summary: "Deze laag past wanneer de volgende stap eerder een aanvraag, offerte of intake is dan een directe boeking.",
            ctaLabel: "Vraag aan",
            steps: ["Type aanvraag", "Datum of timing", "Aantal / schaal", "Reactiepad"],
            fields: ["Naam", "Mail", "Type aanvraag", "Datum", "Aantal mensen", "Korte wens"],
            operatorNote: "Werkt voor catering, barista-op-locatie, workshops of servicegesprekken.",
          },
          reservation: {
            title: "Reserveringsflow voor tafel of pick-up",
            summary: "Wanneer snelheid voorop staat, maakt deze laag van een kleine service-site een direct bruikbaar reserveringspunt.",
            ctaLabel: "Plan moment",
            steps: ["Kies service", "Datum + tijd", "Aantal personen", "Bevestiging"],
            fields: ["Service", "Datum", "Tijd", "Aantal personen", "Naam", "Telefoon"],
            operatorNote: "Goede basis voor tafelreservering, afhaalmoment of afspraakplanning.",
          },
        },
      },
      en: {
        label: "TechPunt Computers",
        audience: "For computer specialists and technical retail where product choice, service and trust come first.",
        brandName: "TechPunt Computers",
        heroTitle: "The right computer starts with advice that looks beyond specifications.",
        toneLine: "A trustworthy retail route for systems, repairs and personal advice.",
        sections: ["Hero", "Product categories", "Featured", "Repairs", "Advice", "Contact"],
        moduleStrategy:
          "Offer and presentation need to feel right immediately. After that, the business decides whether the main action is inquiry, booking or ordering.",
        flowPresets: {
          base: {
            title: "Base route for offer and location",
            summary: "The site should make it obvious what is offered, who it is for and how someone moves next.",
            ctaLabel: "View offer",
            steps: ["Hero + offer", "Practical info", "Contact or visit"],
            fields: ["Name", "Question", "Preferred moment", "Channel"],
            operatorNote: "A strong start for smaller businesses that first need presence and clarity.",
          },
          inquiry: {
            title: "Inquiry flow for catering or intake",
            summary: "This layer fits when the next move is an inquiry, quote or intake instead of instant booking.",
            ctaLabel: "Request now",
            steps: ["Inquiry type", "Date or timing", "Party size / scope", "Reply path"],
            fields: ["Name", "Email", "Inquiry type", "Date", "Party size", "Short request"],
            operatorNote: "Useful for catering, on-location barista work, workshops or service intake.",
          },
          reservation: {
            title: "Booking flow for table or pickup",
            summary: "When speed matters most, this layer turns a small service site into a directly usable reservation point.",
            ctaLabel: "Plan a slot",
            steps: ["Choose service", "Date + time", "Party size", "Confirmation"],
            fields: ["Service", "Date", "Time", "Party size", "Name", "Phone"],
            operatorNote: "A good base for table bookings, pickup windows or appointment planning.",
          },
        },
      },
    },
  },
];

function conceptFamily(input: {
  slug: string;
  previewUrl: string;
  label: string;
  audienceNl: string;
  audienceEn: string;
  heroNl: string;
  heroEn: string;
  toneNl: string;
  toneEn: string;
  sectionsNl: string[];
  sectionsEn: string[];
  modules: string[];
  recommended: string[];
  ctaNl: string;
  ctaEn: string;
}): RouteFamily {
  const makeFlow = (locale: Locale): RouteFlow => ({
    title: locale === "nl" ? `Basisroute voor ${input.label}` : `Base route for ${input.label}`,
    summary:
      locale === "nl"
        ? "De gekozen conceptstructuur blijft herkenbaar, terwijl merk, inhoud en conversie worden aangepast aan de klant."
        : "The selected concept structure stays recognizable while brand, content and conversion are adapted to the client.",
    ctaLabel: locale === "nl" ? input.ctaNl : input.ctaEn,
    steps:
      locale === "nl"
        ? ["Merk en richting", "Inhoud en bewijs", "Actie en contact"]
        : ["Brand and direction", "Content and proof", "Action and contact"],
    fields: locale === "nl" ? ["Naam", "E-mail", "Vraag", "Voorkeur"] : ["Name", "Email", "Question", "Preference"],
    operatorNote:
      locale === "nl"
        ? "De live conceptsite is de visuele kwaliteitsbasis; publicatie blijft onder operatorcontrole."
        : "The live concept site is the visual quality baseline; publishing remains operator-controlled.",
  });

  const inquiryFlow = (locale: Locale): RouteFlow => ({
    ...makeFlow(locale),
    title: locale === "nl" ? "Gestructureerde aanvraag" : "Structured inquiry",
    ctaLabel: locale === "nl" ? "Start aanvraag" : "Start inquiry",
  });

  return {
    slug: input.slug,
    previewUrl: input.previewUrl,
    basePrice: 39,
    moduleSlugs: input.modules,
    recommendedModuleSlugs: input.recommended,
    defaults: {
      nl: {
        label: input.label,
        audience: input.audienceNl,
        brandName: input.label,
        heroTitle: input.heroNl,
        toneLine: input.toneNl,
        sections: input.sectionsNl,
        moduleStrategy: "De basis volgt het bewezen live concept; alleen relevante functies worden als module toegevoegd.",
        flowPresets: { base: makeFlow("nl"), inquiry: inquiryFlow("nl"), reservation: undefined },
      },
      en: {
        label: input.label,
        audience: input.audienceEn,
        brandName: input.label,
        heroTitle: input.heroEn,
        toneLine: input.toneEn,
        sections: input.sectionsEn,
        moduleStrategy: "The foundation follows the proven live concept; only relevant functions are added as modules.",
        flowPresets: { base: makeFlow("en"), inquiry: inquiryFlow("en"), reservation: undefined },
      },
    },
  };
}

routeFamilies.push(
  conceptFamily({
    slug: "rcatelier", previewUrl: "https://rcatelier.pixelpiraterij.online", label: "RC Atelier",
    audienceNl: "Voor gespecialiseerde hobbyretail met producten die uitleg, vergelijking en vertrouwen nodig hebben.",
    audienceEn: "For specialist hobby retail with products that need explanation, comparison and trust.",
    heroNl: "Techniek, precisie en een winkel die expertise uitstraalt.", heroEn: "Technology, precision and a store that communicates expertise.",
    toneNl: "Een premium retailroute voor RC, onderdelen en specialistisch advies.", toneEn: "A premium retail route for RC products, parts and specialist advice.",
    sectionsNl: ["Hero", "Categorieen", "Uitgelichte modellen", "Expertise", "Contact"],
    sectionsEn: ["Hero", "Categories", "Featured models", "Expertise", "Contact"],
    modules: ["inquiry", "gallery", "newsletter"], recommended: ["gallery", "inquiry"], ctaNl: "Bekijk modellen", ctaEn: "View models",
  }),
  conceptFamily({
    slug: "tradingplatform", previewUrl: "https://tradingplatform.pixelpiraterij.online", label: "TradingPlatform",
    audienceNl: "Voor fintech, dashboards en datagedreven producten die controle en hierarchie moeten uitstralen.",
    audienceEn: "For fintech, dashboards and data-driven products that need to communicate control and hierarchy.",
    heroNl: "Data wordt bruikbaar wanneer de interface richting geeft.", heroEn: "Data becomes useful when the interface provides direction.",
    toneNl: "Een productroute voor dashboards, signalen en operatorzicht.", toneEn: "A product route for dashboards, signals and operator visibility.",
    sectionsNl: ["Hero", "Dashboard", "Functies", "Methodiek", "Aanvraag"],
    sectionsEn: ["Hero", "Dashboard", "Features", "Method", "Inquiry"],
    modules: ["inquiry", "newsletter"], recommended: ["inquiry"], ctaNl: "Open dashboard", ctaEn: "Open dashboard",
  }),
  conceptFamily({
    slug: "hovenier", previewUrl: "https://hovenier.pixelpiraterij.online", label: "Hof & Hei",
    audienceNl: "Voor hoveniers en landschapsateliers die vakmanschap, seizoenen en projecten willen verbinden.",
    audienceEn: "For garden and landscape studios connecting craft, seasons and projects.",
    heroNl: "Elke tuin een plan. Elk seizoen zijn eigen ritme.", heroEn: "Every garden a plan. Every season its own rhythm.",
    toneNl: "Een aardse serviceroute met projectbewijs en een heldere offerteaanvraag.", toneEn: "An earthy service route with project proof and a clear quote request.",
    sectionsNl: ["Hero", "Diensten", "Projecten", "Werkwijze", "Werkgebied", "Offerte"],
    sectionsEn: ["Hero", "Services", "Projects", "Process", "Service area", "Quote"],
    modules: ["inquiry", "gallery", "newsletter"], recommended: ["gallery", "inquiry"], ctaNl: "Bespreek de tuin", ctaEn: "Discuss your garden",
  }),
  conceptFamily({
    slug: "festival", previewUrl: "https://festival.pixelpiraterij.online", label: "Havenlicht",
    audienceNl: "Voor festivals en culturele evenementen met programma, artiesten en praktische bezoekersinformatie.",
    audienceEn: "For festivals and cultural events with schedules, artists and practical visitor information.",
    heroNl: "Vier podia, een kade en een dag die je zelf samenstelt.", heroEn: "Four stages, one quay and a day you shape yourself.",
    toneNl: "Een energieke eventroute zonder dat programma en navigatie onrustig worden.", toneEn: "An energetic event route that keeps schedules and navigation clear.",
    sectionsNl: ["Hero", "Programma", "Artiesten", "Plattegrond", "Tickets", "Praktisch"],
    sectionsEn: ["Hero", "Schedule", "Artists", "Map", "Tickets", "Practical"],
    modules: ["agenda", "gallery", "newsletter", "inquiry"], recommended: ["agenda", "newsletter"], ctaNl: "Bekijk programma", ctaEn: "View schedule",
  }),
  conceptFamily({
    slug: "makelaar", previewUrl: "https://makelaar.pixelpiraterij.online", label: "Werf & Vecht",
    audienceNl: "Voor makelaars die aanbod, vergelijking en lokale expertise in een rustige premium route willen combineren.",
    audienceEn: "For estate agents combining listings, comparison and local expertise in a calm premium route.",
    heroNl: "Wonen langs stad en Vecht, helder vergeleken.", heroEn: "Living between city and river, compared clearly.",
    toneNl: "Een listingsroute met ruimte voor data, vertrouwen en bezichtigingen.", toneEn: "A listings route with room for data, trust and viewings.",
    sectionsNl: ["Hero", "Woningaanbod", "Filters", "Objectdetail", "Buurt", "Bezichtiging"],
    sectionsEn: ["Hero", "Listings", "Filters", "Property detail", "Area", "Viewing"],
    modules: ["inquiry", "gallery", "newsletter"], recommended: ["gallery", "inquiry"], ctaNl: "Bekijk aanbod", ctaEn: "View listings",
  }),
  conceptFamily({
    slug: "stichting", previewUrl: "https://stichting.pixelpiraterij.online", label: "Leeslicht",
    audienceNl: "Voor stichtingen en maatschappelijke initiatieven die impact, transparantie en deelname helder moeten maken.",
    audienceEn: "For foundations and social initiatives that need to communicate impact, transparency and participation clearly.",
    heroNl: "Samen lezen opent werelden die anders gesloten blijven.", heroEn: "Reading together opens worlds that would otherwise remain closed.",
    toneNl: "Een menselijke non-profitroute voor missie, impact, vrijwilligers en donaties.", toneEn: "A human non-profit route for mission, impact, volunteers and donations.",
    sectionsNl: ["Hero", "Missie", "Impact", "Werkwijze", "Vrijwilligers", "Steun ons"],
    sectionsEn: ["Hero", "Mission", "Impact", "Approach", "Volunteers", "Support us"],
    modules: ["inquiry", "gallery", "newsletter"], recommended: ["inquiry", "newsletter"], ctaNl: "Doe mee", ctaEn: "Join us",
  }),
);

export const routeModules: RouteModule[] = [
  {
    slug: "reservation",
    price: 15,
    flowMode: "reservation",
    copy: {
      nl: {
        label: "Reservering",
        description: "Voor boekingen, tafels of beschikbaarheidsflows.",
        impact: "Schakelt de preview om naar een echte boekingsroute met data, capaciteit en bevestiging.",
      },
      en: {
        label: "Booking",
        description: "For bookings, tables or availability flows.",
        impact: "Switches the preview into a real booking route with dates, capacity and confirmation.",
      },
    },
  },
  {
    slug: "inquiry",
    price: 12,
    flowMode: "inquiry",
    copy: {
      nl: {
        label: "Aanvraagflow",
        description: "Voor intake, offerte of booking-achtige aanvraagroutes.",
        impact: "Zet contact om in een gestructureerde intake in plaats van een los contactformulier.",
      },
      en: {
        label: "Inquiry flow",
        description: "For intake, quote or booking-style request routes.",
        impact: "Turns contact into a structured intake instead of a loose contact form.",
      },
    },
  },
  {
    slug: "menu",
    price: 12,
    copy: {
      nl: {
        label: "Menu / aanbod",
        description: "Voor food, services of duidelijke aanbodsblokken.",
        impact: "Maakt van de basisroute een duidelijker aanbodscherm met betere commerciële leesbaarheid.",
      },
      en: {
        label: "Menu / offer",
        description: "For food, services or clear offer blocks.",
        impact: "Turns the base route into a clearer offer surface with stronger commercial readability.",
      },
    },
  },
  {
    slug: "agenda",
    price: 10,
    copy: {
      nl: {
        label: "Agenda / events",
        description: "Voor optredens, releases of culturele kalenderlagen.",
        impact: "Voegt een ritmische update-laag toe die releases, events of optredens zichtbaar houdt.",
      },
      en: {
        label: "Agenda / events",
        description: "For performances, releases or cultural calendar layers.",
        impact: "Adds a rhythmic update layer that keeps releases, events or performances visible.",
      },
    },
  },
  {
    slug: "gallery",
    price: 10,
    copy: {
      nl: {
        label: "Gallery / media",
        description: "Voor beeldwerk, persshots of visuele releaseblokken.",
        impact: "Geeft makers en visuele merken direct meer bewijs zonder de basisroute te verzwaren.",
      },
      en: {
        label: "Gallery / media",
        description: "For image work, press shots or visual release blocks.",
        impact: "Gives makers and visual brands stronger proof without bloating the base route.",
      },
    },
  },
  {
    slug: "newsletter",
    price: 10,
    copy: {
      nl: {
        label: "Nieuwsbrief capture",
        description: "Voor mailinglist, updates of lead-capture boven op de basis.",
        impact: "Houdt de route commercieel actief na het eerste bezoek, ook zonder directe aanvraag of boeking.",
      },
      en: {
        label: "Newsletter capture",
        description: "For mailing list, updates or lead capture on top of the base route.",
        impact: "Keeps the route commercially alive after the first visit, even without instant inquiry or booking.",
      },
    },
  },
];

export const themeOptions: ThemeOption[] = [
  {
    slug: "sand",
    className: "is-sand",
    label: {
      nl: "Warm sand",
      en: "Warm sand",
    },
  },
  {
    slug: "forest",
    className: "is-forest",
    label: {
      nl: "Forest calm",
      en: "Forest calm",
    },
  },
  {
    slug: "clay",
    className: "is-clay",
    label: {
      nl: "Clay dusk",
      en: "Clay dusk",
    },
  },
  {
    slug: "sea",
    className: "is-sea",
    label: {
      nl: "Sea glass",
      en: "Sea glass",
    },
  },
  {
    slug: "night",
    className: "is-night",
    label: {
      nl: "Night studio",
      en: "Night studio",
    },
  },
];

export function formatEuro(amount: number) {
  return `€${amount}`;
}

export function slugifyRouteLabel(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 36) || "nieuwe-route";
}

export function getRouteFamily(slug: string) {
  const legacyAliases: Record<string, string> = {
    artist: "paperback",
    hospitality: "sjoerd",
    service: "computerwinkel",
  };
  const normalizedSlug = legacyAliases[slug] ?? slug;
  return routeFamilies.find((item) => item.slug === normalizedSlug) ?? routeFamilies[0];
}

export function getThemeOption(slug: string) {
  return themeOptions.find((item) => item.slug === slug) ?? themeOptions[0];
}

export function getAvailableModules(familySlug: string) {
  const family = getRouteFamily(familySlug);
  return routeModules.filter((item) => family.moduleSlugs.includes(item.slug));
}

export function getSelectedModules(config: TemplateRouteConfig) {
  return getAvailableModules(config.familySlug).filter((item) => config.selectedModules.includes(item.slug));
}

export function getActiveFlow(config: TemplateRouteConfig) {
  const family = getRouteFamily(config.familySlug);
  const familyCopy = family.defaults[config.locale];
  const selectedModules = getSelectedModules(config);

  const activeFlowMode: FlowMode =
    selectedModules.find((item) => item.flowMode === "reservation") && familyCopy.flowPresets.reservation
      ? "reservation"
      : selectedModules.find((item) => item.flowMode === "inquiry") && familyCopy.flowPresets.inquiry
        ? "inquiry"
        : "base";

  return familyCopy.flowPresets[activeFlowMode] ??
    familyCopy.flowPresets.base ?? {
      title: "",
      summary: "",
      ctaLabel: "",
      steps: [],
      fields: [],
      operatorNote: "",
    };
}

export function getRouteTotal(config: TemplateRouteConfig) {
  const family = getRouteFamily(config.familySlug);
  const total = family.basePrice + getSelectedModules(config).reduce((sum, item) => sum + item.price, 0);

  return {
    base: family.basePrice,
    total,
    addOns: total - family.basePrice,
  };
}

export function createDefaultRouteConfig(locale: Locale, familySlug = routeFamilies[0].slug, timestamp?: string): TemplateRouteConfig {
  const family = getRouteFamily(familySlug);
  const defaults = family.defaults[locale];
  const createdAt = timestamp ?? new Date().toISOString();

  return {
    routeId: `${family.slug}-${createdAt.slice(0, 10)}`,
    locale,
    familySlug: family.slug,
    themeSlug: themeOptions[0].slug,
    brandName: defaults.brandName,
    routeSlug: slugifyRouteLabel(defaults.brandName),
    heroTitle: defaults.heroTitle,
    toneLine: defaults.toneLine,
    selectedModules: [...family.recommendedModuleSlugs],
    createdAt,
  };
}

export function serializeRouteConfig(config: TemplateRouteConfig) {
  return JSON.stringify(config, null, 2);
}

export function parseRouteConfig(value: string, locale: Locale) {
  try {
    const parsed = JSON.parse(value) as Partial<TemplateRouteConfig>;

    if (
      typeof parsed.familySlug !== "string" ||
      typeof parsed.themeSlug !== "string" ||
      typeof parsed.brandName !== "string" ||
      typeof parsed.heroTitle !== "string" ||
      typeof parsed.toneLine !== "string" ||
      !Array.isArray(parsed.selectedModules)
    ) {
      return null;
    }

    const family = getRouteFamily(parsed.familySlug);
    const allowedModules = family.moduleSlugs;

    return {
      routeId: typeof parsed.routeId === "string" ? parsed.routeId : `${family.slug}-${Date.now()}`,
      locale,
      familySlug: family.slug,
      themeSlug: getThemeOption(parsed.themeSlug).slug,
      brandName: parsed.brandName,
      routeSlug:
        typeof parsed.routeSlug === "string" && parsed.routeSlug.length > 0
          ? slugifyRouteLabel(parsed.routeSlug)
          : slugifyRouteLabel(parsed.brandName),
      heroTitle: parsed.heroTitle,
      toneLine: parsed.toneLine,
      selectedModules: parsed.selectedModules.filter(
        (item): item is string => typeof item === "string" && allowedModules.includes(item),
      ),
      createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : new Date().toISOString(),
    } satisfies TemplateRouteConfig;
  } catch {
    return null;
  }
}
