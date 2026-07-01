import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { processStepsEn, studioCapabilitiesEn, studioShowcasesEn } from "@/lib/site-data";

export default function EnglishStudioPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Studio"
        title={
          <>
            Custom surfaces
            <br />
            with a
            <br />
            system spine.
          </>
        }
        body="The studio is the heavier route inside PixelPiraterij: custom surfaces, campaign structures and product-facing environments for brands that need identity, structure and operational seriousness at once."
        primaryCta={{ href: "/en/contact", label: "Open the blueprint route" }}
        secondaryCta={{ href: "/en", label: "Back to the route map" }}
        aside={
          <ManifestAside
            capLeft="Studio logic"
            capRight="Build line"
            problemTitle="Pretty work without system depth is fragile."
            problemBody="A surface can look premium and still fail if the copy, structure, handoff and infrastructure behind it are weak."
            stanceTitle="The studio builds from the business backwards."
            stanceBody="Identity, UX, code and rollout logic are treated as one line of work, not as separate vendors stitched together later or left outside the system."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="What the studio actually builds."
          body="This is not brochure work alone. The studio sits between brand expression, launch systems and the interfaces that give the business more room to move."
        />
        <div className="segment-grid">
          {studioCapabilitiesEn.map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Capability</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="What that studio route looks like in practice."
          body="Not as theory, but as different kinds of surfaces proving that identity, worldbuilding and product discipline can live together here."
        />
        <ShowcaseGrid items={studioShowcasesEn} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="The work needs an operating rhythm, not a one-off sprint."
          body="The build gets stronger when discovery, framing, delivery and managed support stay connected. That is how a custom surface stays useful after launch."
        />
        <ProcessBoard steps={processStepsEn} />
      </section>

      <CtaDock
        title="If the heavier work is needed, it should also be framed clearly as the studio route."
        body="We can start from a custom brief, a sharper route into an existing brand or a template route that later grows into something more distinctive."
        primary={{ href: "/en/contact", label: "Start the studio route" }}
        locale="en"
      />
      <Footer />
    </SiteFrame>
  );
}
