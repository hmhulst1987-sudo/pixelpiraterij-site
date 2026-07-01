import { CtaDock, Footer, ManifestAside, OfferRail, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";

export default function EnglishContactPage() {
  const routeSignals = [
    {
      id: "01",
      title: "Studio route",
      note: "For brands that need an authored surface, sharper positioning and a more mature public-facing front end.",
    },
    {
      id: "02",
      title: "Template route",
      note: "For routes where speed matters, as long as the starting point does not need to feel generic or strategically weak.",
    },
    {
      id: "03",
      title: "System layer",
      note: "For builds that already exist but need to become calmer, more reliable and better supported after launch.",
    },
  ];

  const intakeSignals = [
    {
      label: "Problem",
      text: "What exactly does the business sell, where is trust leaking and which part of the route currently feels too weak or too generic?",
    },
    {
      label: "Context",
      text: "What already exists: domains, current site, copy, brand assets, technical stack, deadlines and any surrounding systems?",
    },
    {
      label: "Direction",
      text: "Does the next move look more custom, template-backed, hosting-heavy or product- and system-facing?",
    },
    {
      label: "Outcome",
      text: "After the first conversation, the route should be clearer than before: what gets built, in which order and why that order makes sense.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Contact and blueprint"
        title={
          <>
            Start with
            <br />
            the route,
            <br />
            not with
            <br />
            guesswork.
          </>
        }
        body="If the brand needs a studio route, a template route or a stronger system layer, the best first step is to frame the situation clearly and work backward from there."
        primaryCta={{ href: "mailto:inbox@pixelpiraterij.nl", label: "inbox@pixelpiraterij.nl" }}
        secondaryCta={{ href: "/en/templates", label: "See the template path" }}
        aside={
          <ManifestAside
            capLeft="Intake"
            capRight="Blueprint"
            problemTitle="Most projects start too late in the wrong conversation."
            problemBody="People often jump into screens, themes and tools before the offer, route and infrastructure are framed properly."
            stanceTitle="A sharper intake saves time later."
            stanceBody="The first conversation should identify the route: studio, template, system layer or a broader system build."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="The three routes intake usually points toward."
          body="Not every project needs the same kind of answer. It helps to identify early which route is carrying the most weight."
        />
        <OfferRail items={routeSignals} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="What to bring into the first conversation."
          body="The sharper the framing, the better the route. These are the signals that create a more useful starting point."
        />
        <div className="stack-board">
          {intakeSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="What makes a first email immediately useful."
          body="No perfect brief required. Just enough context to reveal where the leverage sits and which route should not be wasted."
        />
        <div className="segment-grid">
          {[
            "A short explanation of what the business or project actually does.",
            "A link to what already exists, if anything is already live.",
            "What currently feels wrong: presentation, structure, hosting, pace or missing coherence.",
            "What the next phase should feel like: more premium, calmer, faster to launch or more system-led.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">First brief</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="If the project matters, let’s frame the route properly before we touch the wrong surface."
        body="Email, blueprint request or direct conversation, as long as the route starts in clarity instead of falling apart into disconnected pieces."
        primary={{ href: "mailto:inbox@pixelpiraterij.nl", label: "Send the first brief" }}
        secondary={{ href: "/en", label: "Back to the route map" }}
        locale="en"
      />
      <Footer />
    </SiteFrame>
  );
}
