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
    slug: "artist",
    basePrice: 95,
    moduleSlugs: ["inquiry", "gallery", "agenda", "newsletter"],
    recommendedModuleSlugs: ["inquiry", "gallery"],
    defaults: {
      nl: {
        label: "Artist / maker",
        audience: "Voor artiesten, labels en makers die snel een eigen wereld willen neerzetten.",
        brandName: "Studio Nova",
        heroTitle: "Nieuwe release. Eigen sfeer. Meteen geloofwaardig.",
        toneLine: "Een route voor makers die niet generiek online willen staan.",
        sections: ["Hero", "Over de maker", "Werk / releases", "Contact"],
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
        label: "Artist / maker",
        audience: "For artists, labels and makers who need a distinct world fast.",
        brandName: "Studio Nova",
        heroTitle: "New release. Distinct atmosphere. Instant credibility.",
        toneLine: "A route for makers who do not want to look generic online.",
        sections: ["Hero", "About the maker", "Work / releases", "Contact"],
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
    slug: "hospitality",
    basePrice: 95,
    moduleSlugs: ["reservation", "inquiry", "menu", "newsletter"],
    recommendedModuleSlugs: ["reservation", "newsletter"],
    defaults: {
      nl: {
        label: "Hospitality / stay",
        audience: "Voor camping, stay en hospitality-routes waar vertrouwen en sfeer leidend zijn.",
        brandName: "Dune Stay",
        heroTitle: "Rust, sfeer en een route die direct boekbaar voelt.",
        toneLine: "Een hospitality-template die niet als brochure hoeft te voelen.",
        sections: ["Hero", "Kamers / plekken", "Locatie", "Contact"],
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
        label: "Hospitality / stay",
        audience: "For camping, stay and hospitality routes where calm and trust matter most.",
        brandName: "Dune Stay",
        heroTitle: "Calm atmosphere and a route that already feels bookable.",
        toneLine: "A hospitality template that does not collapse into brochure energy.",
        sections: ["Hero", "Rooms / places", "Location", "Contact"],
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
    slug: "service",
    basePrice: 95,
    moduleSlugs: ["reservation", "inquiry", "menu", "newsletter"],
    recommendedModuleSlugs: ["menu", "inquiry"],
    defaults: {
      nl: {
        label: "Small service / food",
        audience: "Voor koffiebar, lunchzaak of kleine servicebusiness die snel sterk wil starten.",
        brandName: "North Counter",
        heroTitle: "Compact aanbod, sterke uitstraling, snelle route naar contact.",
        toneLine: "Een service-route waar sfeer en duidelijkheid samen moeten vallen.",
        sections: ["Hero", "Aanbod", "Opening / locatie", "Contact"],
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
        label: "Small service / food",
        audience: "For coffee bars, food spots or small service businesses that need a strong fast start.",
        brandName: "North Counter",
        heroTitle: "Compact offer, strong look, fast route into contact.",
        toneLine: "A service route where atmosphere and clarity need to move together.",
        sections: ["Hero", "Offer", "Opening / location", "Contact"],
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

export const routeModules: RouteModule[] = [
  {
    slug: "reservation",
    price: 25,
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
    price: 20,
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
    price: 20,
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
    price: 20,
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
    price: 15,
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
    price: 15,
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
  return routeFamilies.find((item) => item.slug === slug) ?? routeFamilies[0];
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

export function createDefaultRouteConfig(locale: Locale, familySlug = routeFamilies[0].slug): TemplateRouteConfig {
  const family = getRouteFamily(familySlug);
  const defaults = family.defaults[locale];
  const createdAt = new Date().toISOString();

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
