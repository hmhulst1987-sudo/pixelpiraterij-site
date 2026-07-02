import {
  getActiveFlow,
  getRouteFamily,
  getRouteTotal,
  getSelectedModules,
  getThemeOption,
  type TemplateRouteConfig,
} from "@/lib/template-route-builder";

export function TemplateRouteSiteRenderer({ config }: { config: TemplateRouteConfig }) {
  const family = getRouteFamily(config.familySlug);
  const familyCopy = family.defaults[config.locale];
  const selectedTheme = getThemeOption(config.themeSlug);
  const selectedModules = getSelectedModules(config);
  const total = getRouteTotal(config);
  const activeFlow = getActiveFlow(config);
  const hasMenu = selectedModules.some((item) => item.slug === "menu");
  const hasGallery = selectedModules.some((item) => item.slug === "gallery");
  const hasAgenda = selectedModules.some((item) => item.slug === "agenda");
  const hasNewsletter = selectedModules.some((item) => item.slug === "newsletter");

  return (
    <div className={`builder-render builder-render--${selectedTheme.slug}`}>
      <div className="builder-render-shell">
        <div className="builder-render-topbar">
          <div>
            <p className="builder-render-kicker">Rendered route</p>
            <h3 className="builder-render-brand">{config.brandName}</h3>
          </div>
          <div className="builder-render-meta">
            <span>{familyCopy.label}</span>
            <span>/{config.routeSlug}</span>
          </div>
        </div>

        <section className="builder-render-hero">
          <div className="builder-render-hero-copy">
            <p className="builder-render-eyebrow">{familyCopy.label}</p>
            <h4 className="builder-render-title">{config.heroTitle}</h4>
            <p className="builder-render-text">{config.toneLine}</p>
            <div className="builder-render-actions">
              <a href="#builder-flow" className="builder-render-primary">
                {activeFlow.ctaLabel}
              </a>
              <span className="builder-render-secondary">{familyCopy.audience}</span>
            </div>
          </div>
          <div className="builder-render-hero-card">
            <p className="builder-render-card-label">Route-config</p>
            <div className="builder-render-stat-grid">
              <article>
                <span>Basis</span>
                <strong>€{total.base}</strong>
              </article>
              <article>
                <span>Modules</span>
                <strong>{selectedModules.length}</strong>
              </article>
              <article>
                <span>Totaal</span>
                <strong>€{total.total}</strong>
              </article>
            </div>
          </div>
        </section>

        <section className="builder-render-section-grid">
          {familyCopy.sections.map((section) => (
            <article key={section} className="builder-render-panel">
              <p className="builder-render-card-label">Basissectie</p>
              <h5 className="builder-render-panel-title">{section}</h5>
              <p className="builder-render-text">
                Deze sectie wordt vanuit de routefundering gerenderd en daarna gevuld met copy, beeld en ritme uit de gekozen richting.
              </p>
            </article>
          ))}
        </section>

        {hasMenu ? (
          <section className="builder-render-offer-grid">
            {["Signature", "Seizoenslaag", "Quick choice"].map((item) => (
              <article key={item} className="builder-render-offer-card">
                <p className="builder-render-card-label">Aanbod</p>
                <h5 className="builder-render-panel-title">{item}</h5>
                <p className="builder-render-text">Voorbeeld van een aanbodsblok dat uit de route-config kan worden opgebouwd.</p>
              </article>
            ))}
          </section>
        ) : null}

        {(hasGallery || hasAgenda) ? (
          <section className="builder-render-feature-grid">
            {hasGallery ? (
              <article className="builder-render-feature-card">
                <p className="builder-render-card-label">Gallery layer</p>
                <div className="builder-render-gallery-grid">
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            ) : null}
            {hasAgenda ? (
              <article className="builder-render-feature-card">
                <p className="builder-render-card-label">Agenda layer</p>
                <div className="builder-render-list">
                  <div>
                    <strong>11/07</strong>
                    <span>Live set / launch moment</span>
                  </div>
                  <div>
                    <strong>24/07</strong>
                    <span>Nieuwe route-update</span>
                  </div>
                </div>
              </article>
            ) : null}
          </section>
        ) : null}

        <section id="builder-flow" className="builder-render-flow">
          <div className="builder-render-flow-head">
            <div>
              <p className="builder-render-card-label">Conversielaag</p>
              <h5 className="builder-render-panel-title">{activeFlow.title}</h5>
            </div>
            <span className="builder-render-flow-pill">{activeFlow.ctaLabel}</span>
          </div>
          <p className="builder-render-text">{activeFlow.summary}</p>
          <div className="builder-render-flow-grid">
            <article className="builder-render-panel">
              <p className="builder-render-card-label">Flowstappen</p>
              <div className="builder-render-list">
                {activeFlow.steps.map((step, index) => (
                  <div key={step}>
                    <strong>{index + 1}</strong>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="builder-render-panel">
              <p className="builder-render-card-label">Velden</p>
              <div className="builder-render-tag-list">
                {activeFlow.fields.map((field) => (
                  <span key={field}>{field}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        {hasNewsletter ? (
          <section className="builder-render-newsletter">
            <div>
              <p className="builder-render-card-label">Retention layer</p>
              <h5 className="builder-render-panel-title">Nieuwsbrief of lead-capture als lichte vervolgstap</h5>
            </div>
            <div className="builder-render-tag-list">
              <span>Mailcapture</span>
              <span>Updates</span>
              <span>Lead nurture</span>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
