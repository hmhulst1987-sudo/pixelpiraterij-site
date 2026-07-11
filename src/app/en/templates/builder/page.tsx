import Link from "next/link";

import { TemplateRouteEditorDemo } from "@/components/template-route-editor-demo";
import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { getAvailableModules, routeFamilies } from "@/lib/template-route-builder";
import { routePackageTiers } from "@/lib/template-route-phase-two";

const familySlugSet = new Set(routeFamilies.map((family) => family.slug));

export default async function EnglishTemplateBuilderPage({
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
        kicker="Builder workspace"
        title={
          <>
            Guided builder,
            <br />
            real workspace,
            <br />
            not an open
            <br />
            cost leak.
          </>
        }
        body="This is where the template route becomes a real workspace. First you choose the right foundation, then shape atmosphere and content, and only after that move domain and launch steps forward when the package and operator layer allow it."
        primaryCta={{ href: "#workspace", label: "Open the workspace" }}
        secondaryCta={{ href: "/en/templates", label: "Back to template routes" }}
        aside={
          <ManifestAside
            capLeft="Gated route"
            capRight="Builder"
            problemKicker="What we avoid"
            stanceKicker="What we build"
            problemTitle="Not a public builder where anyone can casually trigger server costs."
            problemBody="That would make the route messy, expensive and commercially weak, especially once modules, domain checks and launch logic carry real weight."
            stanceTitle="A guided workspace with clear family selection, package access and operator boundaries."
            stanceBody="That keeps the builder useful for real clients without hollowing out the premium studio route or the infrastructure behind it."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Start from the right route family."
          body="Each builder entry point should already fit its context. You are not choosing a loose skin, but a route with the right atmosphere, sections and conversion logic."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.en;
            const isActive = requestedFamily === family.slug;
            const baseFlow = copy.flowPresets.base;
            const recommendedModules = getAvailableModules(family.slug).filter((module) => family.recommendedModuleSlugs.includes(module.slug));

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Template family</p>
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
                  <span className="route-editor-badge route-editor-badge--paper">Primary moment: {baseFlow?.ctaLabel ?? "Base route"}</span>
                  {recommendedModules.map((module) => (
                    <span key={module.slug} className="route-editor-badge route-editor-badge--paper">
                      {module.copy.en.label}
                    </span>
                  ))}
                </div>
                <p className="route-note">{copy.moduleStrategy}</p>
                <Link href={`/en/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  {isActive ? "Active workspace" : "Open this route"}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section id="workspace" className="section-block">
        <SectionHeader
          index="02"
          title="This is the workspace where the builder actually starts."
          body="Route config, modules, package choice, domain intake and registrar preparation come together here inside one saved project state."
        />
        <TemplateRouteEditorDemo key={`en:${requestedFamily}`} locale="en" initialFamilySlug={requestedFamily} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Access expands with the package, not with random clicking."
          body="The builder intentionally stays behind guardrails. Clients can move forward without paying for everything at once, and without instantly unlocking publishing, registrar actions or provisioning in public."
        />
        <div className="package-grid">
          {routePackageTiers.map((tier) => (
            <article key={tier.slug} className="package-card">
              <p className="section-tag">Access</p>
              <h3 className="segment-title">{tier.copy.en.label}</h3>
              <p className="package-price">{tier.monthlyFee === 0 ? "Included in intake" : `+ €${tier.monthlyFee} / month`}</p>
              <p className="route-note">{tier.copy.en.description}</p>
              <ul className="feature-list">
                {tier.copy.en.features.map((feature) => (
                  <li key={feature} className="feature-item">
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="route-note">{tier.copy.en.fit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="This is how the unlock route reads commercially."
          body="Not everyone needs everything open on day one. This sequence keeps the route sellable, manageable and credible, while the entry point stays compact and heavier costs only start later."
        />
        <div className="segment-grid">
          <article className="segment-card">
            <p className="section-tag">Kickstart</p>
            <h3 className="segment-title">Start with direction and intake</h3>
            <p className="route-note">Strong when someone is still finding the right route, atmosphere and domain direction, but does not yet need independent builder access.</p>
            <ul className="feature-list">
              <li className="feature-item">Public preview of the route</li>
              <li className="feature-item">Domain screening and first intake brief</li>
              <li className="feature-item">No open storage or launch push yet</li>
            </ul>
            <Link href="/en/contact" className="btn-secondary">
              Discuss Kickstart
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Route Plus</p>
            <h3 className="segment-title">Save, resume and shape further</h3>
            <p className="route-note">For clients who want to continue seriously with their route and shape it inside guardrails, without touching live infrastructure yet.</p>
            <ul className="feature-list">
              <li className="feature-item">Workspace save and resume</li>
              <li className="feature-item">Intake and route refinement on top of the preview</li>
              <li className="feature-item">Still no direct registrar actions</li>
            </ul>
            <Link href="/en/contact" className="btn-secondary">
              Request Route Plus
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Managed Launch</p>
            <h3 className="segment-title">Operator-led go-live</h3>
            <p className="route-note">This is where the route moves into real domain registration, DNS and launch preparation, while still staying under operator control.</p>
            <ul className="feature-list">
              <li className="feature-item">Server-side registrar handoff</li>
              <li className="feature-item">Launch queue and operator review</li>
              <li className="feature-item">Bridge between fast route and serious go-live</li>
            </ul>
            <Link href="/en/contact" className="btn-primary">
              Start Managed Launch
            </Link>
          </article>
        </div>
      </section>

      <CtaDock
        title="The builder now reads like a guided product layer, not a toy."
        body="From here we can keep building toward publishing logic, intake follow-up and deeper modules without reinventing the route every time."
        primary={{ href: "/en/contact", label: "Discuss a launch route" }}
        secondary={{ href: "/en/studio", label: "See the studio route" }}
        locale="en"
      />
      <Footer />
    </SiteFrame>
  );
}
