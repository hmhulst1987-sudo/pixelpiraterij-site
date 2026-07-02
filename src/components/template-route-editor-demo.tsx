"use client";

import { useEffect, useState } from "react";

import { TemplateRouteSiteRenderer } from "@/components/template-route-site-renderer";
import {
  createDefaultRouteConfig,
  formatEuro,
  getActiveFlow,
  getAvailableModules,
  getRouteFamily,
  getRouteTotal,
  getSelectedModules,
  getThemeOption,
  parseRouteConfig,
  routeConfigStorageKey,
  routeFamilies,
  routeModules,
  serializeRouteConfig,
  slugifyRouteLabel,
  themeOptions,
  type Locale,
  type TemplateRouteConfig,
} from "@/lib/template-route-builder";

type StatusTone = "idle" | "saved" | "loaded" | "copied" | "error";

export function TemplateRouteEditorDemo({ locale = "nl" }: { locale?: Locale }) {
  const [config, setConfig] = useState<TemplateRouteConfig>(() => createDefaultRouteConfig(locale));
  const [statusTone, setStatusTone] = useState<StatusTone>("idle");
  const [hasStoredDraft, setHasStoredDraft] = useState(false);

  useEffect(() => {
    try {
      setHasStoredDraft(Boolean(window.localStorage.getItem(routeConfigStorageKey)));
    } catch {
      setHasStoredDraft(false);
    }
  }, []);

  const currentFamily = getRouteFamily(config.familySlug);
  const familyCopy = currentFamily.defaults[locale];
  const availableModules = getAvailableModules(config.familySlug);
  const selectedTheme = getThemeOption(config.themeSlug);
  const selectedModuleItems = getSelectedModules(config);
  const total = getRouteTotal(config);
  const activeFlow = getActiveFlow(config);
  const serializedConfig = serializeRouteConfig(config);

  const copy = {
    nl: {
      eyebrow: "Builder-MVP",
      title: "De eerste builderlaag kan nu al een echte route-config opleveren.",
      body: "Niet alleen een slimme preview, maar een opslaanbare configuratie die daarna opnieuw kan worden geladen en via een renderer als losse route kan worden opgebouwd.",
      familyLabel: "Routefamilie",
      familyHint: "Kies de fundering die al klopt voor het type klant of zaak.",
      fieldsLabel: "Invulling",
      brandLabel: "Naam / merk",
      slugLabel: "Route-slug",
      heroLabel: "Hero-regel",
      toneLabel: "Tonenotitie",
      themeLabel: "Thema",
      themeHint: "Sfeer verschuift, maar de kwaliteitslat blijft staan.",
      strategyLabel: "Route-logica",
      strategyHint: "Elke routefamilie heeft een andere primaire actie en andere zinvolle pluslagen.",
      activeFlowLabel: "Actieve flow",
      modulesLabel: "Modules",
      modulesHint: "Pluslagen boven op de basisroute, niet erin verstopt.",
      recommendedLabel: "Aanbevolen startset",
      previewLabel: "Live preview",
      previewMeta: "Stored builder config",
      audienceLabel: "Route voor",
      sectionsLabel: "Basissecties",
      totalLabel: "Indicatie per maand",
      baseLabel: "Basis",
      plusLabel: "Pluslagen",
      ctaLabel: "Primair moment",
      moduleImpactLabel: "Effect op de route",
      flowCardLabel: "Conversielaag",
      flowStepsLabel: "Flowstappen",
      fieldsPreviewLabel: "Veldenbasis",
      operatorLabel: "Operator-notitie",
      configLabel: "Route-config",
      configHint: "Dit is de eerste echte builder-output: een object dat later opgeslagen, gerenderd en gepubliceerd kan worden.",
      saveLabel: "Sla concept op",
      loadLabel: "Laad laatste concept",
      resetLabel: "Reset route",
      copyLabel: "Kopieer JSON",
      storedYes: "Lokaal concept gevonden",
      storedNo: "Nog geen lokaal concept",
      savedText: "Concept lokaal opgeslagen",
      loadedText: "Concept opnieuw geladen",
      copiedText: "JSON naar clipboard gekopieerd",
      errorText: "Opslaan of laden lukte hier niet",
      rendererLabel: "Route-renderer",
      rendererHint: "Onder deze laag staat dezelfde config al als losse route gerenderd.",
    },
    en: {
      eyebrow: "Builder MVP",
      title: "The first builder layer can already output a real route config.",
      body: "Not just a smart preview, but a storable configuration that can be loaded again and rendered as a standalone route.",
      familyLabel: "Route family",
      familyHint: "Choose the foundation that already fits the client or business type.",
      fieldsLabel: "Inputs",
      brandLabel: "Name / brand",
      slugLabel: "Route slug",
      heroLabel: "Hero line",
      toneLabel: "Tone note",
      themeLabel: "Theme",
      themeHint: "Atmosphere shifts, but the quality bar stays fixed.",
      strategyLabel: "Route logic",
      strategyHint: "Each route family carries a different primary action and different useful add-ons.",
      activeFlowLabel: "Active flow",
      modulesLabel: "Modules",
      modulesHint: "Add-on layers on top of the base route, not hidden inside it.",
      recommendedLabel: "Recommended starter set",
      previewLabel: "Live preview",
      previewMeta: "Stored builder config",
      audienceLabel: "Route for",
      sectionsLabel: "Base sections",
      totalLabel: "Indicative monthly total",
      baseLabel: "Base",
      plusLabel: "Add-ons",
      ctaLabel: "Primary moment",
      moduleImpactLabel: "Effect on the route",
      flowCardLabel: "Conversion layer",
      flowStepsLabel: "Flow steps",
      fieldsPreviewLabel: "Field base",
      operatorLabel: "Operator note",
      configLabel: "Route config",
      configHint: "This is the first real builder output: one object that can later be stored, rendered and published.",
      saveLabel: "Save concept",
      loadLabel: "Load last concept",
      resetLabel: "Reset route",
      copyLabel: "Copy JSON",
      storedYes: "Local concept found",
      storedNo: "No local concept yet",
      savedText: "Concept saved locally",
      loadedText: "Concept loaded again",
      copiedText: "JSON copied to clipboard",
      errorText: "Saving or loading did not work here",
      rendererLabel: "Route renderer",
      rendererHint: "Below this layer, the same config is already rendered as a standalone route.",
    },
  }[locale];

  const updateConfig = (patch: Partial<TemplateRouteConfig>) => {
    setConfig((current) => ({ ...current, ...patch }));
    setStatusTone("idle");
  };

  const handleFamilyChange = (nextSlug: string) => {
    const nextFamily = getRouteFamily(nextSlug);
    const nextCopy = nextFamily.defaults[locale];

    setConfig((current) => ({
      ...current,
      familySlug: nextFamily.slug,
      brandName: nextCopy.brandName,
      routeSlug: slugifyRouteLabel(nextCopy.brandName),
      heroTitle: nextCopy.heroTitle,
      toneLine: nextCopy.toneLine,
      selectedModules: [...nextFamily.recommendedModuleSlugs],
    }));
    setStatusTone("idle");
  };

  const toggleModule = (slug: string) => {
    setConfig((current) => ({
      ...current,
      selectedModules: current.selectedModules.includes(slug)
        ? current.selectedModules.filter((item) => item !== slug)
        : [...current.selectedModules, slug],
    }));
    setStatusTone("idle");
  };

  const saveDraft = () => {
    try {
      window.localStorage.setItem(routeConfigStorageKey, serializedConfig);
      setHasStoredDraft(true);
      setStatusTone("saved");
    } catch {
      setStatusTone("error");
    }
  };

  const loadDraft = () => {
    try {
      const raw = window.localStorage.getItem(routeConfigStorageKey);

      if (!raw) {
        setStatusTone("error");
        return;
      }

      const parsed = parseRouteConfig(raw, locale);

      if (!parsed) {
        setStatusTone("error");
        return;
      }

      setConfig(parsed);
      setHasStoredDraft(true);
      setStatusTone("loaded");
    } catch {
      setStatusTone("error");
    }
  };

  const resetDraft = () => {
    setConfig(createDefaultRouteConfig(locale, config.familySlug));
    setStatusTone("idle");
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(serializedConfig);
      setStatusTone("copied");
    } catch {
      setStatusTone("error");
    }
  };

  const statusText =
    statusTone === "saved"
      ? copy.savedText
      : statusTone === "loaded"
        ? copy.loadedText
        : statusTone === "copied"
          ? copy.copiedText
          : statusTone === "error"
            ? copy.errorText
            : hasStoredDraft
              ? copy.storedYes
              : copy.storedNo;

  return (
    <div className="route-builder-stack">
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
                  className={`route-editor-chip${family.slug === config.familySlug ? " is-active" : ""}`}
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
              <input
                value={config.brandName}
                onChange={(event) =>
                  updateConfig({
                    brandName: event.target.value,
                    routeSlug: slugifyRouteLabel(event.target.value),
                  })
                }
              />
            </label>
            <label className="route-editor-field">
              <span>{copy.slugLabel}</span>
              <input value={config.routeSlug} onChange={(event) => updateConfig({ routeSlug: slugifyRouteLabel(event.target.value) })} />
            </label>
            <label className="route-editor-field">
              <span>{copy.heroLabel}</span>
              <textarea value={config.heroTitle} onChange={(event) => updateConfig({ heroTitle: event.target.value })} rows={3} />
            </label>
            <label className="route-editor-field">
              <span>{copy.toneLabel}</span>
              <input value={config.toneLine} onChange={(event) => updateConfig({ toneLine: event.target.value })} />
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
                  className={`route-editor-chip${theme.slug === config.themeSlug ? " is-active" : ""}`}
                  onClick={() => updateConfig({ themeSlug: theme.slug })}
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
                const isActive = config.selectedModules.includes(module.slug);

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
                  <h3 className="route-editor-preview-brand">{config.brandName}</h3>
                </div>
                <span className="route-editor-preview-meta">{copy.previewMeta}</span>
              </div>

              <div className="route-editor-hero-block">
                <p className="route-editor-mini-label">{familyCopy.label}</p>
                <h4 className="route-editor-preview-title">{config.heroTitle}</h4>
                <p className="route-editor-preview-copy">{config.toneLine}</p>
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
                  <p className="route-editor-total">{formatEuro(total.total)} / maand</p>
                </div>
                <div className="route-editor-total-breakdown">
                  <span>
                    {copy.baseLabel}: {formatEuro(total.base)}
                  </span>
                  <span>
                    {copy.plusLabel}: {formatEuro(total.addOns)}
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

      <div className="route-builder-meta-grid">
        <article className="route-builder-meta-card">
          <div className="route-builder-meta-head">
            <div>
              <p className="route-editor-label">{copy.configLabel}</p>
              <p className="route-editor-hint">{copy.configHint}</p>
            </div>
            <span className={`route-builder-status is-${statusTone}`}>{statusText}</span>
          </div>
          <div className="route-builder-toolbar">
            <button type="button" className="route-builder-tool is-primary" onClick={saveDraft}>
              {copy.saveLabel}
            </button>
            <button type="button" className="route-builder-tool" onClick={loadDraft}>
              {copy.loadLabel}
            </button>
            <button type="button" className="route-builder-tool" onClick={resetDraft}>
              {copy.resetLabel}
            </button>
            <button type="button" className="route-builder-tool" onClick={copyJson}>
              {copy.copyLabel}
            </button>
          </div>
          <div className="route-builder-meta-strip">
            <span>routeId: {config.routeId}</span>
            <span>slug: /{config.routeSlug}</span>
            <span>modules: {config.selectedModules.length}</span>
          </div>
          <pre className="route-builder-codeblock">{serializedConfig}</pre>
        </article>

        <article className="route-builder-meta-card">
          <p className="route-editor-label">{copy.rendererLabel}</p>
          <p className="route-editor-hint">{copy.rendererHint}</p>
          <TemplateRouteSiteRenderer config={config} />
        </article>
      </div>
    </div>
  );
}
