import { CtaDock, Footer, ManifestAside, PageHero, PackageGrid, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { hostingShowcasesEn, packageTiersEn } from "@/lib/site-data";

export default function EnglishHostingPage() {
  const operatingSignals = [
    {
      label: "Uptime",
      text: "If a site is meant to feel premium, it cannot behave like a hobby project. Stability is not an extra. It is part of the brand experience itself.",
    },
    {
      label: "Updates",
      text: "Maintenance should not wait for something to break. The managed layer prevents technical drift and keeps the foundation healthy over time.",
    },
    {
      label: "Support",
      text: "Good support should not feel like a ticket system where context disappears. It should feel like someone already understands the build before the issue is explained.",
    },
    {
      label: "Control",
      text: "The biggest win is often calm: fewer vendors, less technical noise and far less uncertainty about who is responsible for what after launch.",
    },
  ];

  const planSignals = [
    {
      title: "Harbor Starter",
      body: "For smaller premium sites that mainly need reliability, maintenance and a calm technical base without immediately requiring a heavier system layer.",
    },
    {
      title: "Route Studio",
      body: "For brands that need hosting plus stronger rhythm, better monitoring and room to grow into extra pages, portals or product layers.",
    },
    {
      title: "Sovereign Fleet",
      body: "For multiple surfaces, broader infrastructure needs and brands where hosting cannot be separated from roadmap, support and system architecture.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Hosting and infrastructure"
        title={
          <>
            Private
            <br />
            infrastructure,
            <br />
            public
            <br />
            confidence.
          </>
        }
        body="PixelPiraterij treats hosting as part of the system, not as a forgettable afterthought. Monitoring, backups, support, updates and performance care are what keep the brand working after launch."
        primaryCta={{ href: "/en/contact", label: "Request a system blueprint" }}
        secondaryCta={{ href: "/en", label: "Back to the route map" }}
        aside={
          <ManifestAside
            capLeft="Managed layer"
            capRight="Recurring"
            problemTitle="A strong build still fails when the handoff lands on weak hosting."
            problemBody="If uptime, support and operational care are fragile, the trust created by the design disappears quickly."
            stanceTitle="Managed hosting is part of the promise."
            stanceBody="PixelPiraterij makes hosting visible because reliability, stewardship and human support are part of what the client is actually buying."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Why this hosting layer exists."
          body="Not to compete with commodity hosting on price, but to give premium brands, creators and digital products a calmer operational base."
        />
        <div className="segment-grid">
          {[
            "Monitoring, updates and backups are part of the service rhythm.",
            "Support is human and contextual, not a faceless ticket maze.",
            "The stack is aligned with the kind of work PixelPiraterij actually builds.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Trust layer</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="The operational layer should also read clearly on sight."
          body="Not only in words, but in surfaces, plan structure and tooling feel. That is how it becomes clear that hosting here is not a dump service, but a deliberate trust layer."
        />
        <ShowcaseGrid items={hostingShowcasesEn} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="What this layer solves in practice."
          body="The value of managed hosting is not technical jargon. It is less stress, less downtime and far more control once the site is live."
        />
        <div className="stack-board">
          {operatingSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Recurring structure over random rescue work."
          body="The aim is a system of managed plans that creates stability for the client and recurring strength for the studio. Not reactive repair, but a healthier operating rhythm from the start."
        />
        <PackageGrid items={packageTiersEn} locale="en" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="When each plan starts making sense."
          body="Not every brand has the same infrastructure question. The hosting layer works best when the plan fits the stage, risk profile and growth direction of the client."
        />
        <div className="segment-grid">
          {planSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Use case</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="If the site matters, the system behind the site matters too."
        body="Hosting can stay invisible to the end client, but it should never stay invisible inside the offer. That is exactly where calm, continuity and credibility are won or lost."
        primary={{ href: "/en/contact", label: "Request a system blueprint" }}
        secondary={{ href: "/en", label: "Back to the route map" }}
        locale="en"
      />
      <Footer />
    </SiteFrame>
  );
}
