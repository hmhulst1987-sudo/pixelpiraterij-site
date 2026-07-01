import {
  CtaDock,
  Footer,
  ManifestAside,
  OfferRail,
  PageHero,
  ProcessBoard,
  SectionHeader,
  SegmentGrid,
  ShowcaseGrid,
  SiteFrame,
  Topbar,
} from "@/components/site-shell";
import type { Offer, ProcessStep, Segment, ShowcaseItem } from "@/lib/site-data";

const routeLayers: Offer[] = [
  {
    id: "01",
    title: "Template routes",
    note: "Shaped starts for founders, hospitality and culture-first brands that need speed without borrowed aesthetics.",
  },
  {
    id: "02",
    title: "Apps and portals",
    note: "Live utilities, focused tools and proof that the product-facing side of PixelPiraterij can already operate in public.",
  },
  {
    id: "03",
    title: "Docs and lab",
    note: "Guides, notes and experiments that keep the wider system legible while it expands.",
  },
];

const entrySegments: Segment[] = [
  {
    title: "Launch a site faster",
    note: "Start from a route already shaped for the right audience instead of beginning from scratch or from a generic theme.",
    bullets: [
      "Template directions per brand type",
      "A stronger start without cheap-looking speed",
      "A clear bridge back to flagship work",
    ],
  },
  {
    title: "Open a live utility",
    note: "Use tools and public routes that already exist around the PixelPiraterij stack without presenting them as scattered side projects.",
    bullets: [
      "One coherent harbor instead of loose links",
      "Utilities framed by role and maturity",
      "Useful now, expandable later",
    ],
  },
  {
    title: "Keep the system readable",
    note: "Docs and guides are not there to look bigger than reality. They are there to clarify sequencing and expectations.",
    bullets: [
      "Getting-started logic",
      "Guides for use and sequencing",
      "Clarity without inflated claims",
    ],
  },
];

const routeShowcases: ShowcaseItem[] = [
  {
    label: "Template route",
    title: "PixelPiraterij utility suite",
    body: "A compact route for utility-style products where pricing, unlock logic and a calm surface already need to feel sellable.",
    bullets: [
      "A strong starting point for smaller premium offers",
      "Proof that fast starts do not need generic aesthetics",
      "Useful when the route begins with a focused paid product",
    ],
    visual: {
      src: "/cases/pixelpiraterij-lifetime-bundle.png",
      alt: "PixelPiraterij utility route.",
      fit: "contain",
      tone: "light",
    },
  },
  {
    label: "App harbor",
    title: "EvaQuant product discipline",
    body: "A sharper product-facing route that shows PixelPiraterij can carry dashboards, operator logic and system hierarchy.",
    bullets: [
      "Interface discipline under the brand layer",
      "Useful proof for tooling and dashboard routes",
      "A believable bridge toward deeper product layers",
    ],
    visual: {
      src: "/cases/evaquant-dashboard.png",
      alt: "EvaQuant as app harbor proof.",
      position: "left top",
      tone: "dark",
    },
  },
  {
    label: "Docs and proof",
    title: "Hermes Records and Le Radel as framing",
    body: "Proof should not drift around as loose screenshots. Cultural and hospitality routes become stronger when framed by what they actually prove.",
    bullets: [
      "Release and editorial logic for culture-first brands",
      "Calmer trust building for hospitality routes",
      "Not random screenshots, but readable system signals",
    ],
    visual: {
      src: "/cases/hermes-records.png",
      alt: "Docs and proof route example.",
      position: "center top",
      tone: "dark",
    },
  },
];

const labFlow: ProcessStep[] = [
  {
    step: "Choose",
    body: "Choose the route that already matches the audience, product type and commercial rhythm instead of restarting every time.",
  },
  {
    step: "Frame",
    body: "Decide what belongs to flagship work, what belongs to template work and what can appear as a utility or docs route.",
  },
  {
    step: "Connect",
    body: "Make routes, tools and guides read like one system so the front end and the operation behind it stop drifting apart.",
  },
  {
    step: "Scale",
    body: "Publish what is already credible now and let it grow into deeper studio, hosting and product layers later.",
  },
];

export default function EnglishHomePage() {
  return (
    <SiteFrame>
      <Topbar />

      <PageHero
        kicker="The routes behind the flagship"
        title={
          <>
            Choose the layer
            <br />
            you actually
            <br />
            need.
          </>
        }
        body="PixelPiraterij does not only need to exist as a studio pitch. Around the flagship route there are templates, apps, docs and experiments that make the wider system easier to read and faster to use."
        primaryCta={{ href: "/en#templates", label: "Enter the route map" }}
        secondaryCta={{ href: "/en/studio", label: "Go to the studio" }}
        aside={
          <ManifestAside
            capLeft="System map"
            problemKicker="Where it breaks"
            stanceKicker="How it should read"
            problemTitle="Too many pieces live as disconnected links without a clear relationship."
            problemBody="Templates, tools, docs and experiments then look like side projects. That weakens trust and makes the model behind them harder to understand."
            stanceTitle="Make the routes visible as layers of the same system."
            stanceBody="That is where PixelPiraterij becomes useful: flagship where weight is needed, templates where speed helps and routes that keep the rest of the system readable."
          />
        }
      />

      <section id="templates" className="section-block">
        <SectionHeader
          index="01"
          title="Use the part of the system that fits the job."
          body="Not every brand needs a full flagship build on day one. Sometimes a template route is enough, and sometimes a live app or docs layer is more valuable."
        />
        <OfferRail items={routeLayers} />
      </section>

      <section id="apps" className="section-block">
        <SectionHeader
          index="02"
          title="Three entry points, one readable model."
          body="The move is not to hide everything under one offer, but to make each route clear and then let them live under the same PixelPiraterij logic."
        />
        <SegmentGrid segments={entrySegments} locale="en" />
      </section>

      <section id="docs" className="section-block">
        <SectionHeader
          index="03"
          title="Routes should carry proof, not just promises."
          body="Templates, apps and docs only gain weight when they already show something tangible. These routes reveal where the system is already useful."
        />
        <ShowcaseGrid items={routeShowcases} />
      </section>

      <section id="lab" className="section-block">
        <SectionHeader
          index="04"
          title="Lab and documentation should make the system calmer."
          body="Experimental routes and guides are not noise. They should clarify what is already live, what is still sharpening and how someone should enter the system."
        />
        <ProcessBoard steps={labFlow} />
      </section>

      <CtaDock
        title="Two domains can hold two roles, as long as they still come from the same system."
        body="The studio, the templates, the apps and the docs do not need to compete. They need to function again as one readable PixelPiraterij structure."
        primary={{ href: "/en/templates", label: "See template routes" }}
        secondary={{ href: "/en/studio", label: "Open the studio" }}
        locale="en"
      />

      <Footer />
    </SiteFrame>
  );
}
