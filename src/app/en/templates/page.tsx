import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { templateCategoriesEn, templateShowcasesEn } from "@/lib/site-data";

export default function EnglishTemplatesPage() {
  const templateRules = [
    {
      title: "Speed without template fatigue",
      body: "A template should save time without forcing the brand into a generic shape. The gain is acceleration, not flattening.",
    },
    {
      title: "A stronger starting point, not a ceiling",
      body: "The template is the foundation, not the final ambition. It should open the road to something stronger rather than locking the project too early.",
    },
    {
      title: "Structure that can expand later",
      body: "Pages, components and flows should be able to grow into portals, builders or product layers. Otherwise you only win today and lose tomorrow.",
    },
    {
      title: "Honest sequencing over inflated promises",
      body: "PixelPiraterij does not need to oversell the builder before it is product-ready. Clear sequencing makes the route more credible, not less ambitious.",
    },
  ];

  const rolloutSignals = [
    {
      label: "Now",
      text: "Template-backed systems, curated directions and faster launch logic that are already useful in real client routes.",
    },
    {
      label: "Next",
      text: "Structured editing, preview and publishing flows inside the PixelPiraterij world so the step from template to builder feels earned instead of forced.",
    },
    {
      label: "Later",
      text: "A fuller multi-tenant builder layer once the product logic, operating rhythm and user behavior have first proved themselves in practice.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Templates and builder direction"
        title={
          <>
            Smart starts,
            <br />
            not cheap
            <br />
            shortcuts.
          </>
        }
        body="Templates inside PixelPiraterij are there to create stronger starting positions, not weaker outcomes. They are curated launch systems that can move quickly while still reading as part of the same wider system."
        primaryCta={{ href: "/en/contact", label: "Request a template route" }}
        secondaryCta={{ href: "/en", label: "Back to the route map" }}
        aside={
          <ManifestAside
            capLeft="Template logic"
            capRight="Builder path"
            problemTitle="Templates fail when they erase identity."
            problemBody="Fast usually becomes generic when the system underneath exists only to reduce effort instead of sharpening direction."
            stanceTitle="A strong template should shorten the road, not flatten the result."
            stanceBody="PixelPiraterij uses templates as curated starting systems, with builder logic growing further only after this route proves itself in practice."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Templates are grouped by where they help most."
          body="The point is not to flood people with skins. The point is to give each audience a stronger route into a better build."
        />
        <div className="segment-grid">
          {templateCategoriesEn.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Template lane</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="What a strong template-backed start should already prove on sight."
          body="Not as an abstract promise, but through real surfaces: suite logic, audience framing and product discipline. That is what makes the future builder direction feel credible instead of deferred."
        />
        <ShowcaseGrid items={templateShowcasesEn} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="What templates should actually do here."
          body="Not every fast route is automatically a smart one. The strength of this system lies in better starting positions, more structure and a road that can still open wider later."
        />
        <div className="segment-grid">
          {templateRules.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Principle</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Builder comes after capability, not before it."
          body="The next layer is a structured editor, preview and publishing flow on top of these template systems. We only scale that promise once the product layer is real."
        />
        <div className="stack-board">
          {rolloutSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="If you want speed without ending up in template sameness, this is the right route."
        body="This page needs to prove that speed, structure and brand character can live together before the deeper builder layer opens any further."
        primary={{ href: "/en/contact", label: "Talk about a launch route" }}
        secondary={{ href: "/en/studio", label: "See how this connects to the studio" }}
        locale="en"
      />
      <Footer />
    </SiteFrame>
  );
}
