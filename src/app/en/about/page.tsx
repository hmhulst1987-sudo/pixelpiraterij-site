import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { aboutShowcasesEn, processStepsEn } from "@/lib/site-data";

export default function EnglishAboutPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="About the studio"
        title={
          <>
            Privateer
            <br />
            by stance,
            <br />
            not by
            <br />
            costume.
          </>
        }
        body="PixelPiraterij exists because too many digital brands still have to choose between generic builders, faceless hosting and studios that hand over attractive work without operational depth."
        primaryCta={{ href: "/en/contact", label: "Open the blueprint route" }}
        secondaryCta={{ href: "/en", label: "Back to the route map" }}
        aside={
          <ManifestAside
            capLeft="Positioning"
            capRight="Why it exists"
            problemTitle="The market is full of fragments."
            problemBody="One party designs, another hosts and another patches things up later. The result is often attractive, expensive and weak under pressure."
            stanceTitle="PixelPiraterij exists to reduce that fragmentation."
            stanceBody="Studio work, system layers, templates and future builder logic belong in one disciplined operating model."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="The philosophy is simple."
          body="Operate outside the generic route, but do it with enough discipline that the result still earns trust."
        />
        <div className="stack-board">
          {[
            { label: "Independent", text: "The work is built around stronger positioning and more control, not around fitting into default agency or host categories." },
            { label: "Human", text: "Support and decision-making should still feel like dealing with people who understand the build, not a black box." },
            { label: "Systemic", text: "The point is not isolated pages. The point is the set of surfaces, tools and infrastructure underneath them." },
          ].map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Where that stance already becomes visible in the model."
          body="The positioning only becomes credible when it shows up across different outcomes: not generic, not superficial and not accidentally assembled."
        />
        <ShowcaseGrid items={aboutShowcasesEn} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="How the studio works."
          body="The route needs to move from clarity into action, not from aesthetics into confusion. That is why each build follows a tighter system."
        />
        <ProcessBoard steps={processStepsEn} />
      </section>

      <CtaDock
        title="The name stays because the stance stays: independent, sharp and unwilling to ship generic work."
        body="What changes is the maturity of the system around it."
        primary={{ href: "/en/contact", label: "Talk through the next route" }}
        locale="en"
      />
      <Footer />
    </SiteFrame>
  );
}
