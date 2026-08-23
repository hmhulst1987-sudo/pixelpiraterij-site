import { SectionHeader } from "@/components/site-shell";
import { starterGalleryCopy, starterTemplates } from "@/lib/starter-templates";
import type { Locale } from "@/lib/site-data";

/**
 * De starter-routes met een screenshot die bij hover door de site scrollt.
 * Zelfde gedrag als op .online, hier opgebouwd binnen dit designsysteem.
 */
export function TemplateGallery({ locale, index }: { locale: Locale; index: string }) {
  const copy = starterGalleryCopy[locale];

  return (
    <section className="section-block" id="starters">
      <SectionHeader index={index} title={copy.title} body={copy.body} />
      <div className="starter-grid">
        {starterTemplates.map((template) => {
          const text = template.copy[locale];

          return (
            <a
              key={template.slug}
              className="starter-card"
              href={`https://${template.domain}`}
              target="_blank"
              rel="noreferrer"
              style={{ ["--starter-preview" as string]: `url(${template.preview})` }}
            >
              <span className="starter-shot" aria-hidden="true" />
              <span className="starter-body">
                <span className="section-tag">{text.tag}</span>
                <span className="starter-title">{template.title}</span>
                <span className="starter-note">{text.note}</span>
                <span className="starter-domain">{template.domain}</span>
                <span className="starter-visit">{copy.visit}</span>
              </span>
            </a>
          );
        })}
      </div>
      <p className="starter-hint">{copy.hint}</p>
    </section>
  );
}
