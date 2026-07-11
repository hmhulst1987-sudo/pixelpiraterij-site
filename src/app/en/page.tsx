import {
  CaseMatrix,
  CtaDock,
  Footer,
  ManifestAside,
  OfferRail,
  PackageGrid,
  PageHero,
  ProcessBoard,
  SectionHeader,
  SegmentGrid,
  ShowcaseGrid,
  SiteFrame,
  Topbar,
} from "@/components/site-shell";
import {
  audienceSegmentsEn,
  featuredCasesEn,
  homeOffersEn,
  operationalStackEn,
  studioShowcasesEn,
  templateRoutePackagesEn,
  type ProcessStep,
  type Segment,
} from "@/lib/site-data";

const processFlow: ProcessStep[] = [
  {
    step: "Brief",
    body: "We first map the brand, audience, ambition and technical weight so it becomes clear whether a studio, template or system route fits best.",
  },
  {
    step: "Build",
    body: "Then we shape the right surface: custom where it matters, template-backed speed where it helps and a system layer that stays credible after launch.",
  },
  {
    step: "Prove",
    body: "Through cases, live routes and tangible examples we show what already works and where the next growth step becomes logical.",
  },
  {
    step: "Scale",
    body: "When a brand needs more, `.online` and the hub open the next layer: templates, product routes, apps and heavier system applications.",
  },
];

const nextMoveSegments: Segment[] = [
  {
    title: "Start with a studio or service brief",
    note: "For brands that need a serious front end, sharper positioning or a more reliable system underneath the site.",
    bullets: [
      "Custom work where presentation and control really matter",
      "Useful for premium brands, founders and hospitality",
      "From strategy and surface to hosting and stewardship",
    ],
  },
  {
    title: "Move into `.online` for tangible routes",
    note: "That is where we show how templates, features and product layers look once the next step needs to become more hands-on and comparable.",
    bullets: [
      "Template and capability routes",
      "Tangible examples of frontend, backend and automation",
      "A clearer line between fast starts and custom work",
    ],
  },
  {
    title: "Use the hub as the app gallery",
    note: "The hub becomes the central place for web apps, Android apps, software versions and later downloads inside the same ecosystem.",
    bullets: [
      "Collect apps in one place",
      "Separate web versions and downloads cleanly",
      "Under the same PixelPiraterij umbrella, but with its own role",
    ],
  },
];

const operationalSegments: Segment[] = operationalStackEn.map((item) => ({
  title: item.label,
  note: item.text,
  bullets: [
    "Part of the same PixelPiraterij route",
    "Meant to pull presentation and operations closer together",
    "Can later grow into `.online` or the hub when that becomes the logical next step",
  ],
}));

export default function EnglishHomePage() {
  return (
    <SiteFrame>
      <Topbar />

      <PageHero
        kicker="Studio, sites and system layers"
        title={
          <>
            Websites and
            <br />
            systems that
            <br />
            do not need to
            <br />
            feel generic.
          </>
        }
        body="PixelPiraterij helps brands, founders and premium services with custom sites, template routes, managed hosting and system layers that not only look strong, but keep functioning professionally after launch."
        primaryCta={{ href: "/en/contact", label: "Start a brief" }}
        secondaryCta={{ href: "/en/cases", label: "View cases" }}
        aside={
          <ManifestAside
            capLeft="PixelPiraterij"
            problemKicker="What often goes wrong"
            stanceKicker="What we aim for"
            problemTitle="Many brands still get either a generic site or beautiful work without a reliable technical spine."
            problemBody="That leaves projects fragile: weak hosting, too many vendors, little control and an online layer that does not grow with the business."
            stanceTitle="We pull presentation, structure and the system layer closer together."
            stanceBody="That creates a route where brand, site, hosting and long-term growth fit each other better and stay credible after launch."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="What PixelPiraterij can do for you at the base layer."
          body="Not every project starts in the same place. Sometimes custom work is needed, sometimes a template route, sometimes mostly a managed layer that brings back calm and continuity."
        />
        <OfferRail items={homeOffersEn} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Who this layer tends to help most."
          body="We do not aim everything at one client type. The strength is in choosing the right route for the right kind of brand, team or product."
        />
        <SegmentGrid segments={audienceSegmentsEn} locale="en" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Built work should function as proof, not as a loose portfolio feed."
          body="The cases show different types of strength: identity-led commerce, hospitality, cultural routes and software-facing systems."
        />
        <CaseMatrix items={featuredCasesEn} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="A few routes already show how broad that capability really is."
          body="From brand worlds to hospitality and from cultural interfaces to dashboards: these examples make the current quality bar tangible."
        />
        <ShowcaseGrid items={studioShowcasesEn} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="The system layer underneath should also be visible in the offer."
          body="Hosting, templates and app or portal routes are not side notes. They are part of how a brand stays professionally functional online."
        />
        <SegmentGrid segments={operationalSegments} locale="en" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="06"
          title="Price direction and entry points should feel understandable."
          body="Not everything needs to start as full custom work. We therefore make it visible where a strong base route begins, which add-ons make sense and when a project becomes heavier custom work."
        />
        <PackageGrid items={templateRoutePackagesEn} locale="en" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="07"
          title="Where you move next."
          body="`.nl` remains the commercial front door. After that, `.online` and the hub open the next layer: tangible routes, live features, apps and product environments."
        />
        <SegmentGrid segments={nextMoveSegments} locale="en" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="08"
          title="Our process should move from clarity into growth."
          body="We do not only want to ship something attractive. We want to set up a route that can scale logically once the brand or product grows further."
        />
        <ProcessBoard steps={processFlow} />
      </section>

      <CtaDock
        title="Use `.nl` to choose the right route first, then go deeper into the ecosystem."
        body="Need custom work, a stronger site or a more reliable system underneath your brand? That starts here. Want to see tangible template routes, live features or app environments after that, then `.online` and the hub open the next layer."
        primary={{ href: "/en/contact", label: "Start the brief" }}
        secondary={{ href: "https://pixelpiraterij.online", label: "Go to .online" }}
        locale="en"
      />

      <Footer />
    </SiteFrame>
  );
}
