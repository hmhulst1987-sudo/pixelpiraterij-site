"use client";

import { useState } from "react";

type Locale = "nl" | "en";
type FlowMode = "base" | "inquiry" | "reservation";

type RouteFlow = {
  title: string;
  summary: string;
  ctaLabel: string;
  steps: string[];
  fields: string[];
  operatorNote: string;
};

type RouteFamilyCopy = {
  label: string;
  audience: string;
  brandName: string;
  heroTitle: string;
  toneLine: string;
  sections: string[];
  moduleStrategy: string;
  flowPresets: Record<FlowMode, RouteFlow | undefined>;
};

type RouteFamily = {
  slug: string;
  basePrice: number;
  moduleSlugs: string[];
  recommendedModuleSlugs: string[];
  defaults: {
    nl: RouteFamilyCopy;
    en: RouteFamilyCopy;
  };
};

type RouteModule = {
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

const routeFamilies: RouteFamily[] = [
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

const routeModules: RouteModule[] = [
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

const themeOptions = [
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

function formatEuro(amount: number) {
  return `€${amount}`;
}

export function TemplateRouteEditorDemo({ locale = "nl" }: { locale?: Locale }) {
  const [familySlug, setFamilySlug] = useState(routeFamilies[0].slug);
  const [themeSlug, setThemeSlug] = useState(themeOptions[0].slug);

  const currentFamily = routeFamilies.find((item) => item.slug === familySlug) ?? routeFamilies[0];
  const familyCopy = currentFamily.defaults[locale];

  const [brandName, setBrandName] = useState(familyCopy.brandName);
  const [heroTitle, setHeroTitle] = useState(familyCopy.heroTitle);
  const [toneLine, setToneLine] = useState(familyCopy.toneLine);
  const [selectedModules, setSelectedModules] = useState<string[]>(currentFamily.recommendedModuleSlugs);

  const copy = {
    nl: {
      eyebrow: "Editor-MVP",
      title: "Zo kan de eerste template-route editor echt werken.",
      body: "Nog geen volle builder, wel de juiste productstructuur: route kiezen, sfeer bepalen, modules aanzetten en meteen zien wat voor site eruit groeit.",
      familyLabel: "Routefamilie",
      familyHint: "Kies de fundering die al klopt voor het type klant of zaak.",
      fieldsLabel: "Invulling",
      brandLabel: "Naam / merk",
      heroLabel: "Hero-regel",
      toneLabel: "Tonenotitie",
      themeLabel: "Thema",
      themeHint: "Sfeer verschuift, maar de kwaliteitslat blijft staan.",
      strategyLabel: "Route-logica",
      strategyHint: "Elke routefamilie heeft een andere primaire actie en andere zinvolle pluslagen.",
      activeFlowLabel: "Actieve flow",
      ctaLabel: "Primair moment",
      flowStepsLabel: "Flowstappen",
      fieldsPreviewLabel: "Veldenbasis",
      operatorLabel: "Operator-notitie",
      modulesLabel: "Modules",
      modulesHint: "Pluslagen boven op de basisroute, niet erin verstopt.",
      recommendedLabel: "Aanbevolen startset",
      previewLabel: "Live preview",
      previewMeta: "Structured editor concept",
      audienceLabel: "Route voor",
      sectionsLabel: "Basissecties",
      totalLabel: "Indicatie per maand",
      baseLabel: "Basis",
      plusLabel: "Pluslagen",
      moduleImpactLabel: "Effect op de route",
      flowCardLabel: "Conversielaag",
    },
    en: {
      eyebrow: "Editor MVP",
      title: "This is how the first template-route editor can actually work.",
      body: "Not a full builder yet, but the right structure: choose the route, shape the atmosphere, enable modules and see the site direction immediately.",
      familyLabel: "Route family",
      familyHint: "Choose the foundation that already fits the client or business type.",
      fieldsLabel: "Inputs",
      brandLabel: "Name / brand",
      heroLabel: "Hero line",
      toneLabel: "Tone note",
      themeLabel: "Theme",
      themeHint: "Atmosphere shifts, but the quality bar stays fixed.",
      strategyLabel: "Route logic",
      strategyHint: "Each route family carries a different primary action and different useful add-ons.",
      activeFlowLabel: "Active flow",
      ctaLabel: "Primary moment",
      flowStepsLabel: "Flow steps",
      fieldsPreviewLabel: "Field base",
      operatorLabel: "Operator note",
      modulesLabel: "Modules",
      modulesHint: "Add-on layers on top of the base route, not hidden inside it.",
      recommendedLabel: "Recommended starter set",
      previewLabel: "Live preview",
      previewMeta: "Structured editor concept",
      audienceLabel: "Route for",
      sectionsLabel: "Base sections",
      totalLabel: "Indicative monthly total",
      baseLabel: "Base",
      plusLabel: "Add-ons",
      moduleImpactLabel: "Effect on the route",
      flowCardLabel: "Conversion layer",
    },
  }[locale];

  const availableModules = routeModules.filter((item) => currentFamily.moduleSlugs.includes(item.slug));
  const selectedTheme = themeOptions.find((item) => item.slug === themeSlug) ?? themeOptions[0];
  const selectedModuleItems = availableModules.filter((item) => selectedModules.includes(item.slug));
  const total = currentFamily.basePrice + selectedModuleItems.reduce((sum, item) => sum + item.price, 0);

  const activeFlowMode: FlowMode =
    selectedModuleItems.find((item) => item.flowMode === "reservation") && familyCopy.flowPresets.reservation
      ? "reservation"
      : selectedModuleItems.find((item) => item.flowMode === "inquiry") && familyCopy.flowPresets.inquiry
        ? "inquiry"
        : "base";

  const activeFlow = familyCopy.flowPresets[activeFlowMode] ??
    familyCopy.flowPresets.base ?? {
      title: "",
      summary: "",
      ctaLabel: "",
      steps: [],
      fields: [],
      operatorNote: "",
    };

  const handleFamilyChange = (nextSlug: string) => {
    const nextFamily = routeFamilies.find((item) => item.slug === nextSlug);

    if (!nextFamily) {
      return;
    }

    const nextCopy = nextFamily.defaults[locale];

    setFamilySlug(nextSlug);
    setBrandName(nextCopy.brandName);
    setHeroTitle(nextCopy.heroTitle);
    setToneLine(nextCopy.toneLine);
    setSelectedModules(nextFamily.recommendedModuleSlugs);
  };

  const toggleModule = (slug: string) => {
    setSelectedModules((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  };

  return (
    <div className="route-editor-shell">
      <div className="route-editor-panel route-editor-controls">
        <div className="route-editor-head">
          <p className="section-tag">{copy.eyebrow}</p>
          <h3 className="route-editor-title">{copy.title}</h3>
          <p className="route-note">{copy.body}</p>
        </div>

        <div className="route-editor-group">
          <div>
            <p className="route-editor-label">{copy.familyLabel}</p>
            <p className="route-editor-hint">{copy.familyHint}</p>
          </div>
          <div className="route-editor-chip-row">
            {routeFamilies.map((family) => (
              <button
                key={family.slug}
                type="button"
                className={`route-editor-chip${family.slug === familySlug ? " is-active" : ""}`}
                onClick={() => handleFamilyChange(family.slug)}
              >
                {family.defaults[locale].label}
              </button>
            ))}
          </div>
        </div>

        <div className="route-editor-group">
          <p className="route-editor-label">{copy.fieldsLabel}</p>
          <label className="route-editor-field">
            <span>{copy.brandLabel}</span>
            <input value={brandName} onChange={(event) => setBrandName(event.target.value)} />
          </label>
          <label className="route-editor-field">
            <span>{copy.heroLabel}</span>
            <textarea value={heroTitle} onChange={(event) => setHeroTitle(event.target.value)} rows={3} />
          </label>
          <label className="route-editor-field">
            <span>{copy.toneLabel}</span>
            <input value={toneLine} onChange={(event) => setToneLine(event.target.value)} />
          </label>
        </div>

        <div className="route-editor-group">
          <div>
            <p className="route-editor-label">{copy.themeLabel}</p>
            <p className="route-editor-hint">{copy.themeHint}</p>
          </div>
          <div className="route-editor-chip-row">
            {themeOptions.map((theme) => (
              <button
                key={theme.slug}
                type="button"
                className={`route-editor-chip${theme.slug === themeSlug ? " is-active" : ""}`}
                onClick={() => setThemeSlug(theme.slug)}
              >
                {theme.label[locale]}
              </button>
            ))}
          </div>
        </div>

        <div className="route-editor-group">
          <div>
            <p className="route-editor-label">{copy.strategyLabel}</p>
            <p className="route-editor-hint">{copy.strategyHint}</p>
          </div>
          <div className="route-editor-strategy-card">
            <p className="route-editor-strategy-text">{familyCopy.moduleStrategy}</p>
            <div className="route-editor-strategy-grid">
              <article className="route-editor-strategy-pane">
                <p className="route-editor-mini-label">{copy.activeFlowLabel}</p>
                <h4 className="route-editor-strategy-title">{activeFlow.title}</h4>
                <p className="route-editor-strategy-copy">{activeFlow.summary}</p>
              </article>
              <article className="route-editor-strategy-pane">
                <p className="route-editor-mini-label">{copy.recommendedLabel}</p>
                <div className="route-editor-badge-list route-editor-badge-list--dark">
                  {currentFamily.recommendedModuleSlugs.map((slug) => {
                    const module = routeModules.find((item) => item.slug === slug);

                    if (!module) {
                      return null;
                    }

                    return (
                      <span key={slug} className="route-editor-badge route-editor-badge--paper">
                        {module.copy[locale].label}
                      </span>
                    );
                  })}
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="route-editor-group">
          <div>
            <p className="route-editor-label">{copy.modulesLabel}</p>
            <p className="route-editor-hint">{copy.modulesHint}</p>
          </div>
          <div className="route-editor-module-list">
            {availableModules.map((module) => {
              const isActive = selectedModules.includes(module.slug);

              return (
                <button
                  key={module.slug}
                  type="button"
                  className={`route-editor-module${isActive ? " is-active" : ""}`}
                  onClick={() => toggleModule(module.slug)}
                >
                  <div>
                    <p className="route-editor-module-title">{module.copy[locale].label}</p>
                    <p className="route-editor-module-text">{module.copy[locale].description}</p>
                    <p className="route-editor-module-impact-label">{copy.moduleImpactLabel}</p>
                    <p className="route-editor-module-impact">{module.copy[locale].impact}</p>
                  </div>
                  <span className="route-editor-module-price">+ {formatEuro(module.price)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`route-editor-panel route-editor-preview ${selectedTheme.className}`}>
        <div className="route-editor-preview-shell">
          <div className="route-editor-browserbar">
            <span />
            <span />
            <span />
          </div>

          <div className="route-editor-preview-body">
            <div className="route-editor-preview-head">
              <div>
                <p className="route-editor-preview-kicker">{copy.previewLabel}</p>
                <h3 className="route-editor-preview-brand">{brandName}</h3>
              </div>
              <span className="route-editor-preview-meta">{copy.previewMeta}</span>
            </div>

            <div className="route-editor-hero-block">
              <p className="route-editor-mini-label">{familyCopy.label}</p>
              <h4 className="route-editor-preview-title">{heroTitle}</h4>
              <p className="route-editor-preview-copy">{toneLine}</p>
            </div>

            <div className="route-editor-summary-grid">
              <article className="route-editor-summary-card">
                <p className="route-editor-mini-label">{copy.audienceLabel}</p>
                <p className="route-editor-summary-text">{familyCopy.audience}</p>
              </article>
              <article className="route-editor-summary-card">
                <p className="route-editor-mini-label">{copy.sectionsLabel}</p>
                <div className="route-editor-badge-list">
                  {familyCopy.sections.map((section) => (
                    <span key={section} className="route-editor-badge">
                      {section}
                    </span>
                  ))}
                  {selectedModuleItems.map((module) => (
                    <span key={module.slug} className="route-editor-badge is-module">
                      {module.copy[locale].label}
                    </span>
                  ))}
                </div>
              </article>
            </div>

            <div className="route-editor-flow-card">
              <div className="route-editor-flow-head">
                <div>
                  <p className="route-editor-mini-label">{copy.flowCardLabel}</p>
                  <h4 className="route-editor-flow-title">{activeFlow.title}</h4>
                </div>
                <span className="route-editor-flow-cta">{activeFlow.ctaLabel}</span>
              </div>
              <p className="route-editor-flow-copy">{activeFlow.summary}</p>
              <div className="route-editor-flow-grid">
                <article className="route-editor-flow-pane">
                  <p className="route-editor-mini-label">{copy.flowStepsLabel}</p>
                  <div className="route-editor-step-list">
                    {activeFlow.steps.map((step, index) => (
                      <div key={step} className="route-editor-step-item">
                        <span className="route-editor-step-index">{index + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="route-editor-flow-pane">
                  <p className="route-editor-mini-label">{copy.fieldsPreviewLabel}</p>
                  <div className="route-editor-badge-list">
                    {activeFlow.fields.map((field) => (
                      <span key={field} className="route-editor-badge route-editor-badge--field">
                        {field}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
              <div className="route-editor-operator-note">
                <p className="route-editor-mini-label">{copy.operatorLabel}</p>
                <p className="route-editor-flow-copy">{activeFlow.operatorNote}</p>
              </div>
            </div>

            <div className="route-editor-pricebar">
              <div>
                <p className="route-editor-mini-label">{copy.totalLabel}</p>
                <p className="route-editor-total">{formatEuro(total)} / maand</p>
              </div>
              <div className="route-editor-total-breakdown">
                <span>
                  {copy.baseLabel}: {formatEuro(currentFamily.basePrice)}
                </span>
                <span>
                  {copy.plusLabel}: {formatEuro(total - currentFamily.basePrice)}
                </span>
                <span>
                  {copy.ctaLabel}: {activeFlow.ctaLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
