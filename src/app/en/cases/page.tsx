import { CaseMatrix, CtaDock, Footer, ManifestAside, PageHero, ProofCaseGrid, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { featuredCasesEn, proofCasesEn } from "@/lib/site-data";

export default function EnglishCasesPage() {
  const readingSignals = [
    {
      title: "Capability before category",
      body: "The point is not just what kind of project someone sees, but which muscle that project proves: positioning, calm conversion, atmosphere or system depth.",
    },
    {
      title: "Business value before applause",
      body: "A case study becomes useful when it is clear why it matters commercially: stronger trust, sharper conversion, better framing or a more credible product layer.",
    },
    {
      title: "Selection before overload",
      body: "By refusing to show everything at once, each project gains more weight. Curation turns a portfolio into an argument instead of a dump folder.",
    },
  ];

  const proofLayers = [
    {
      label: "Identity",
      text: "KunstvanVB shows that PixelPiraterij can do more than build websites. It can frame a full brand surface with enough editorial control that premium confidence becomes immediate.",
    },
    {
      label: "Conversion",
      text: "The hospitality directions prove that restraint, taste and commercial logic can exist together. Not loud, but undeniably intentional.",
    },
    {
      label: "Narrative",
      text: "Hermes Records and vage.blog show that atmosphere is not decorative filler here. It is a working part of positioning, presentation and cultural value.",
    },
    {
      label: "System layer",
      text: "LumenOS, EvaQuant and related tools show that there is real product and software logic behind the visual layer. That raises the credibility of the whole studio.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Curated proof"
        title={
          <>
            Projects that
            <br />
            prove
            <br />
            different
            <br />
            capabilities.
          </>
        }
        body="The work matters most when it is framed by what it proves. Identity control, hospitality calm, cultural atmosphere and software-facing logic all belong to different but connected strengths."
        primaryCta={{ href: "/en/contact", label: "Use the proof in your brief" }}
        secondaryCta={{ href: "/en/studio", label: "Back to the studio" }}
        aside={
          <ManifestAside
            capLeft="Proof"
            capRight="Selection"
            problemTitle="A giant portfolio does not automatically create trust."
            problemBody="When everything is presented at once, the viewer still has to figure out what any of it actually proves."
            stanceTitle="Proof should be selective, structured and business-relevant."
            stanceBody="PixelPiraterij curates case studies by capability, so each one becomes an argument rather than a screenshot."
          />
        }
      />

      <section className="section-block proof-layout">
        <SectionHeader
          index="01"
          title="The current proof map."
          body="Each lane represents a different kind of strength inside the system. That is why the portfolio should stay categorized instead of collapsing into a visual feed with no strategic meaning."
        />
        <ProofCaseGrid items={proofCasesEn} />
        <div className="matrix-shell">
          <p className="section-tag">Capability register</p>
          <CaseMatrix items={featuredCasesEn} />
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="How this proof should be read."
          body="An investor, client or partner does not need to love everything equally. They need to understand, quickly, why this selection creates trust and where the leverage actually sits."
        />
        <div className="segment-grid">
          {readingSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Reading lens</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="What this selection already proves."
          body="Not just that a lot has been built, but that PixelPiraterij can control multiple layers at once: brand, conversion, narrative atmosphere and product logic."
        />
        <div className="stack-board">
          {proofLayers.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="The right case is not the loudest one, but the one that proves the right capability for your route."
        body="That is how the studio should use proof: as directed evidence, not as noise. The next question is always the same: which muscle needs to win trust first?"
        primary={{ href: "/en/contact", label: "Discuss your route" }}
        locale="en"
      />
      <Footer />
    </SiteFrame>
  );
}
