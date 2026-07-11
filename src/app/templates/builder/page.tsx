import Link from "next/link";

import { TemplateRouteEditorDemo } from "@/components/template-route-editor-demo";
import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { getAvailableModules, routeFamilies } from "@/lib/template-route-builder";
import { routePackageTiers } from "@/lib/template-route-phase-two";

const familySlugSet = new Set(routeFamilies.map((family) => family.slug));

export default async function TemplateBuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ family?: string }>;
}) {
  const params = await searchParams;
  const requestedFamily = typeof params.family === "string" && familySlugSet.has(params.family) ? params.family : routeFamilies[0].slug;

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Builder-workspace"
        title={
          <>
            Guided builder,
            <br />
            echte workspace,
            <br />
            geen open
            <br />
            kostenlek.
          </>
        }
        body="Hier wordt de template-route een echte werkruimte. Je kiest eerst de juiste fundering, vormt daarna sfeer en content, en schuift pas met domein en launch verder zodra pakket en operatorlaag dat toelaten."
        primaryCta={{ href: "#workspace", label: "Open de workspace" }}
        secondaryCta={{ href: "/templates", label: "Terug naar template-routes" }}
        aside={
          <ManifestAside
            capLeft="Gated route"
            capRight="Builder"
            problemKicker="Wat we niet doen"
            stanceKicker="Wat we wel doen"
            problemTitle="Geen publieke builder waar iedereen vrijblijvend serverkosten kan trekken."
            problemBody="Dat maakt de route rommelig, duur en commercieel zwak. Zeker als modules, domeinchecks en launchlogica straks mee gaan tellen."
            stanceTitle="Wel een begeleide workspace met duidelijke familiekeuze, pakketlaag en operatorgrenzen."
            stanceBody="Zo blijft de builder bruikbaar voor echte klanten, zonder dat hij de premium studioroute of de infrastructuur erachter uitholt."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Start vanuit de juiste routefamilie."
          body="Elke builderinstap hoort al te kloppen voor zijn context. Je kiest dus geen losse skin, maar een route met de juiste sfeer, secties en conversielogica."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.nl;
            const isActive = requestedFamily === family.slug;
            const baseFlow = copy.flowPresets.base;
            const recommendedModules = getAvailableModules(family.slug).filter((module) => family.recommendedModuleSlugs.includes(module.slug));

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Templatefamilie</p>
                <h3 className="segment-title">{copy.label}</h3>
                <p className="route-note">{copy.audience}</p>
                <ul className="feature-list">
                  {copy.sections.slice(0, 4).map((section) => (
                    <li key={section} className="feature-item">
                      {section}
                    </li>
                  ))}
                </ul>
                <div className="route-editor-badge-list route-editor-badge-list--dark">
                  <span className="route-editor-badge route-editor-badge--paper">Primair moment: {baseFlow?.ctaLabel ?? "Basisroute"}</span>
                  {recommendedModules.map((module) => (
                    <span key={module.slug} className="route-editor-badge route-editor-badge--paper">
                      {module.copy.nl.label}
                    </span>
                  ))}
                </div>
                <p className="route-note">{copy.moduleStrategy}</p>
                <Link href={`/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  {isActive ? "Actieve workspace" : "Open deze route"}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section id="workspace" className="section-block">
        <SectionHeader
          index="02"
          title="Dit is de werkruimte waar de builder echt begint."
          body="Hier komen route-config, modules, pakketkeuze, domein-intake en registrar-voorbereiding samen in één opgeslagen projectstate."
        />
        <TemplateRouteEditorDemo key={`nl:${requestedFamily}`} locale="nl" initialFamilySlug={requestedFamily} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Toegang groeit mee met het pakket, niet met los klikken."
          body="De builder blijft bewust achter kaders staan. Zo kan iemand wel vooruit zonder meteen voor alles te betalen, en zonder dat publicatie, registrar-actie of provisioning direct open op straat ligt."
        />
        <div className="package-grid">
          {routePackageTiers.map((tier) => (
            <article key={tier.slug} className="package-card">
              <p className="section-tag">Toegang</p>
              <h3 className="segment-title">{tier.copy.nl.label}</h3>
              <p className="package-price">{tier.monthlyFee === 0 ? "Inbegrepen bij intake" : `+ €${tier.monthlyFee} / maand`}</p>
              <p className="route-note">{tier.copy.nl.description}</p>
              <ul className="feature-list">
                {tier.copy.nl.features.map((feature) => (
                  <li key={feature} className="feature-item">
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="route-note">{tier.copy.nl.fit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Zo ziet de unlock-route er commercieel uit."
          body="Niet iedereen hoeft meteen alles open te hebben. Deze volgorde houdt de route verkoopbaar, beheersbaar en geloofwaardig, terwijl de instap compact blijft en zwaardere kosten pas later beginnen."
        />
        <div className="segment-grid">
          <article className="segment-card">
            <p className="section-tag">Kickstart</p>
            <h3 className="segment-title">Eerst richting en intake</h3>
            <p className="route-note">Sterk wanneer iemand nog zoekt naar de juiste route, sfeer en domeinrichting, maar nog niet zelfstandig hoeft te bouwen.</p>
            <ul className="feature-list">
              <li className="feature-item">Publieke preview van de route</li>
              <li className="feature-item">Domeinscreening en eerste intake-brief</li>
              <li className="feature-item">Geen open opslag of launch-doorzet</li>
            </ul>
            <Link href="/contact" className="btn-secondary">
              Bespreek Kickstart
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Route Plus</p>
            <h3 className="segment-title">Opslaan, hervatten en verder vormen</h3>
            <p className="route-note">Voor klanten die serieus verder willen met hun route en binnen kaders zelf mogen vormen, maar nog niet live infrastructuur mogen raken.</p>
            <ul className="feature-list">
              <li className="feature-item">Workspace-opslag en hervatten</li>
              <li className="feature-item">Intake- en routeverfijning boven op de preview</li>
              <li className="feature-item">Nog steeds geen directe registrar-acties</li>
            </ul>
            <Link href="/contact" className="btn-secondary">
              Vraag Route Plus aan
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Managed Launch</p>
            <h3 className="segment-title">Operator-gestuurde livegang</h3>
            <p className="route-note">Hier schuift de route door naar echte domeinregistratie, DNS en live launchvoorbereiding, maar nog steeds onder operatorcontrole.</p>
            <ul className="feature-list">
              <li className="feature-item">Server-side registrar-handoff</li>
              <li className="feature-item">Launch-queue en operatorreview</li>
              <li className="feature-item">Brug tussen snelle route en serieuze livegang</li>
            </ul>
            <Link href="/contact" className="btn-primary">
              Start Managed Launch
            </Link>
          </article>
        </div>
      </section>

      <CtaDock
        title="De builder is nu een begeleide productlaag, geen los speeltje."
        body="Van hieruit kunnen we gericht verder bouwen aan publishlogica, intake-opvolging en moduleverdieping, zonder de route opnieuw te hoeven uitvinden."
        primary={{ href: "/contact", label: "Bespreek een launch-route" }}
        secondary={{ href: "/studio", label: "Zie de studioroute" }}
      />
      <Footer />
    </SiteFrame>
  );
}
