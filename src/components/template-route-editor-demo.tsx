"use client";

import { useState } from "react";

type Locale = "nl" | "en";

type RouteFamily = {
  slug: string;
  basePrice: number;
  moduleSlugs: string[];
  defaults: {
    nl: {
      label: string;
      audience: string;
      brandName: string;
      heroTitle: string;
      toneLine: string;
      sections: string[];
    };
    en: {
      label: string;
      audience: string;
      brandName: string;
      heroTitle: string;
      toneLine: string;
      sections: string[];
    };
  };
};

type RouteModule = {
  slug: string;
  price: number;
  copy: {
    nl: {
      label: string;
      description: string;
    };
    en: {
      label: string;
      description: string;
    };
  };
};

const routeFamilies: RouteFamily[] = [
  {
    slug: "artist",
    basePrice: 95,
    moduleSlugs: ["inquiry", "gallery", "agenda", "newsletter"],
    defaults: {
      nl: {
        label: "Artist / maker",
        audience: "Voor artiesten, labels en makers die snel een eigen wereld willen neerzetten.",
        brandName: "Studio Nova",
        heroTitle: "Nieuwe release. Eigen sfeer. Meteen geloofwaardig.",
        toneLine: "Een route voor makers die niet generiek online willen staan.",
        sections: ["Hero", "Over de maker", "Werk / releases", "Contact"],
      },
      en: {
        label: "Artist / maker",
        audience: "For artists, labels and makers who need a distinct world fast.",
        brandName: "Studio Nova",
        heroTitle: "New release. Distinct atmosphere. Instant credibility.",
        toneLine: "A route for makers who do not want to look generic online.",
        sections: ["Hero", "About the maker", "Work / releases", "Contact"],
      },
    },
  },
  {
    slug: "hospitality",
    basePrice: 95,
    moduleSlugs: ["reservation", "inquiry", "menu", "newsletter"],
    defaults: {
      nl: {
        label: "Hospitality / stay",
        audience: "Voor camping, stay en hospitality-routes waar vertrouwen en sfeer leidend zijn.",
        brandName: "Dune Stay",
        heroTitle: "Rust, sfeer en een route die direct boekbaar voelt.",
        toneLine: "Een hospitality-template die niet als brochure hoeft te voelen.",
        sections: ["Hero", "Kamers / plekken", "Locatie", "Contact"],
      },
      en: {
        label: "Hospitality / stay",
        audience: "For camping, stay and hospitality routes where calm and trust matter most.",
        brandName: "Dune Stay",
        heroTitle: "Calm atmosphere and a route that already feels bookable.",
        toneLine: "A hospitality template that does not collapse into brochure energy.",
        sections: ["Hero", "Rooms / places", "Location", "Contact"],
      },
    },
  },
  {
    slug: "service",
    basePrice: 95,
    moduleSlugs: ["reservation", "inquiry", "menu", "newsletter"],
    defaults: {
      nl: {
        label: "Small service / food",
        audience: "Voor koffiebar, lunchzaak of kleine servicebusiness die snel sterk wil starten.",
        brandName: "North Counter",
        heroTitle: "Compact aanbod, sterke uitstraling, snelle route naar contact.",
        toneLine: "Een service-route waar sfeer en duidelijkheid samen moeten vallen.",
        sections: ["Hero", "Aanbod", "Opening / locatie", "Contact"],
      },
      en: {
        label: "Small service / food",
        audience: "For coffee bars, food spots or small service businesses that need a strong fast start.",
        brandName: "North Counter",
        heroTitle: "Compact offer, strong look, fast route into contact.",
        toneLine: "A service route where atmosphere and clarity need to move together.",
        sections: ["Hero", "Offer", "Opening / location", "Contact"],
      },
    },
  },
];

const routeModules: RouteModule[] = [
  {
    slug: "reservation",
    price: 25,
    copy: {
      nl: {
        label: "Reservering",
        description: "Voor boekingen, tafels of beschikbaarheidsflows.",
      },
      en: {
        label: "Booking",
        description: "For bookings, tables or availability flows.",
      },
    },
  },
  {
    slug: "inquiry",
    price: 20,
    copy: {
      nl: {
        label: "Aanvraagflow",
        description: "Voor intake, offerte of booking-achtige aanvraagroutes.",
      },
      en: {
        label: "Inquiry flow",
        description: "For intake, quote or booking-style request routes.",
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
      },
      en: {
        label: "Menu / offer",
        description: "For food, services or clear offer blocks.",
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
      },
      en: {
        label: "Agenda / events",
        description: "For performances, releases or cultural calendar layers.",
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
      },
      en: {
        label: "Gallery / media",
        description: "For image work, press shots or visual release blocks.",
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
      },
      en: {
        label: "Newsletter capture",
        description: "For mailing list, updates or lead capture on top of the base route.",
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
  const [selectedModules, setSelectedModules] = useState<string[]>(currentFamily.moduleSlugs.slice(0, 2));

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
      modulesLabel: "Modules",
      modulesHint: "Pluslagen boven op de basisroute, niet erin verstopt.",
      previewLabel: "Live preview",
      previewMeta: "Structured editor concept",
      audienceLabel: "Route voor",
      sectionsLabel: "Basissecties",
      totalLabel: "Indicatie per maand",
      baseLabel: "Basis",
      plusLabel: "Pluslagen",
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
      modulesLabel: "Modules",
      modulesHint: "Add-on layers on top of the base route, not hidden inside it.",
      previewLabel: "Live preview",
      previewMeta: "Structured editor concept",
      audienceLabel: "Route for",
      sectionsLabel: "Base sections",
      totalLabel: "Indicative monthly total",
      baseLabel: "Base",
      plusLabel: "Add-ons",
    },
  }[locale];

  const availableModules = routeModules.filter((item) => currentFamily.moduleSlugs.includes(item.slug));
  const selectedTheme = themeOptions.find((item) => item.slug === themeSlug) ?? themeOptions[0];
  const selectedModuleItems = availableModules.filter((item) => selectedModules.includes(item.slug));
  const total = currentFamily.basePrice + selectedModuleItems.reduce((sum, item) => sum + item.price, 0);

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
    setSelectedModules(nextFamily.moduleSlugs.slice(0, 2));
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
