import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { aboutShowcases, processSteps } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Over de studio"
        title={
          <>
            Eigenzinnig
            <br />
            in houding,
            <br />
            niet in
            <br />
            kostuum.
          </>
        }
        body="PixelPiraterij bestaat omdat te veel digitale merken nog steeds moeten kiezen tussen generieke builders, gezichtsloze hosting en studio's die mooi werk afleveren zonder operationele diepte."
        primaryCta={{ href: "/contact", label: "Open de blauwdrukroute" }}
        secondaryCta={{ href: "/", label: "Terug naar de routekaart" }}
        aside={
          <ManifestAside
            capLeft="Positionering"
            capRight="Waarom het bestaat"
            problemKicker="Oud probleem"
            stanceKicker="Nieuwe houding"
            problemTitle="De markt zit vol fragmenten."
            problemBody="De één ontwerpt, de ander host, en weer een ander komt later de boel oplappen. Het resultaat is vaak mooi, duur en zwak onder druk."
            stanceTitle="PixelPiraterij bestaat om die fragmentatie terug te dringen."
            stanceBody="Studiowerk, systeemlagen, templates en toekomstige builder-logica horen thuis in één gedisciplineerd operating model."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="De filosofie is simpel."
          body="Werk buiten de generieke route, maar doe het met genoeg discipline dat het resultaat nog steeds vertrouwen verdient."
        />
        <div className="stack-board">
          {[
            { label: "Onafhankelijk", text: "Het werk wordt gebouwd rond sterkere positionering en meer regie, niet rond passen binnen standaard bureau- of host-categorieën." },
            { label: "Menselijk", text: "Support en besluitvorming moeten nog steeds voelen als contact met mensen die de build begrijpen, niet met een black box." },
            { label: "Systemisch", text: "Het gaat niet om losse pagina's. Het gaat om de set van surfaces, tools en infrastructuur eronder." },
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
          title="Waar die houding al zichtbaar wordt in het model."
          body="De positionering leeft pas echt wanneer je haar terugziet in verschillende soorten uitkomsten: niet generiek, niet oppervlakkig en niet toevallig opgebouwd."
        />
        <ShowcaseGrid items={aboutShowcases} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Hoe de studio werkt."
          body="De route moet van helderheid naar actie bewegen, niet van esthetiek naar verwarring. Daarom volgt elke build een strakker systeem."
        />
        <ProcessBoard steps={processSteps} />
      </section>

      <CtaDock
        title="De naam blijft omdat de houding blijft: onafhankelijk, scherp en niet bereid om generiek werk te shippen."
        body="Wat verandert, is de volwassenheid van het systeem eromheen."
        primary={{ href: "/contact", label: "Bespreek de volgende route" }}
      />
      <Footer />
    </SiteFrame>
  );
}
