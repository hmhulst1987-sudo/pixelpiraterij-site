import Link from "next/link";

import { TemplateRouteEditorDemo } from "@/components/template-route-editor-demo";
import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { getAvailableModules, routeFamilies } from "@/lib/template-route-builder";
import { routePackageTiers } from "@/lib/template-route-phase-two";

const familySlugSet = new Set(routeFamilies.map((family) => family.slug));

export default async function FrenchTemplateBuilderPage({
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
        kicker="Espace de travail builder"
        title={
          <>
            Builder guidé,
            <br />
            vrai espace de travail,
            <br />
            pas de fuite
            <br />
            de coûts ouverte.
          </>
        }
        body="C'est ici que la route template devient un vrai espace de travail. Vous choisissez d'abord la bonne fondation, puis façonnez l'ambiance et le contenu, et faites avancer domaine et lancement seulement quand le pack et la couche opérateur le permettent."
        primaryCta={{ href: "#workspace", label: "Ouvrir l'espace de travail" }}
        secondaryCta={{ href: "/fr/templates", label: "Retour aux routes template" }}
        aside={
          <ManifestAside
            capLeft="Route encadrée"
            capRight="Builder"
            problemKicker="Ce que nous évitons"
            stanceKicker="Ce que nous construisons"
            problemTitle="Pas de builder public où n'importe qui peut déclencher des coûts serveur au hasard."
            problemBody="Cela rendrait la route désordonnée, coûteuse et commercialement faible, surtout une fois que modules, vérifications de domaine et logique de lancement compteront vraiment."
            stanceTitle="Un espace de travail guidé avec une sélection de famille claire, un accès par pack et des limites opérateur."
            stanceBody="Cela garde le builder utile pour de vrais clients sans vider de son sens la route studio premium ou l'infrastructure derrière."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Démarrer depuis la bonne famille de route."
          body="Chaque point d'entrée du builder doit déjà correspondre à son contexte. Vous ne choisissez pas un skin isolé, mais une route avec la bonne ambiance, les bonnes sections et la bonne logique de conversion."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.en;
            const isActive = requestedFamily === family.slug;
            const baseFlow = copy.flowPresets.base;
            const recommendedModules = getAvailableModules(family.slug).filter((module) => family.recommendedModuleSlugs.includes(module.slug));

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Famille de templates</p>
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
                  <span className="route-editor-badge route-editor-badge--paper">Moment principal : {baseFlow?.ctaLabel ?? "Route de base"}</span>
                  {recommendedModules.map((module) => (
                    <span key={module.slug} className="route-editor-badge route-editor-badge--paper">
                      {module.copy.en.label}
                    </span>
                  ))}
                </div>
                <p className="route-note">{copy.moduleStrategy}</p>
                <Link href={`/fr/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  {isActive ? "Espace de travail actif" : "Ouvrir cette route"}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section id="workspace" className="section-block">
        <SectionHeader
          index="02"
          title="Voici l'espace de travail où le builder commence réellement."
          body="Configuration de route, modules, choix de pack, intake de domaine et préparation registrar se rassemblent ici dans un seul état de projet sauvegardé."
        />
        <TemplateRouteEditorDemo key={`fr:${requestedFamily}`} locale="en" initialFamilySlug={requestedFamily} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="L'accès grandit avec le pack, pas avec des clics au hasard."
          body="Le builder reste volontairement derrière des garde-fous. Les clients peuvent avancer sans payer pour tout d'un coup, et sans débloquer instantanément la publication, les actions registrar ou le provisioning en public."
        />
        <div className="package-grid">
          {routePackageTiers.map((tier) => (
            <article key={tier.slug} className="package-card">
              <p className="section-tag">Accès</p>
              <h3 className="segment-title">{tier.copy.en.label}</h3>
              <p className="package-price">{tier.monthlyFee === 0 ? "Inclus dans l'intake" : `+ €${tier.monthlyFee} / mois`}</p>
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
          title="Voici comment se lit commercialement la route de déblocage."
          body="Personne n'a besoin de tout ouvrir dès le premier jour. Cette séquence garde la route vendable, gérable et crédible, tandis que le point d'entrée reste compact et que les coûts plus lourds ne commencent que plus tard."
        />
        <div className="segment-grid">
          <article className="segment-card">
            <p className="section-tag">Kickstart</p>
            <h3 className="segment-title">Commencer par la direction et l'intake</h3>
            <p className="route-note">Fort quand quelqu'un cherche encore la bonne route, l'ambiance et la direction de domaine, mais n'a pas encore besoin d'un accès builder indépendant.</p>
            <ul className="feature-list">
              <li className="feature-item">Aperçu public de la route</li>
              <li className="feature-item">Vérification de domaine et premier brief d'intake</li>
              <li className="feature-item">Pas encore de stockage ouvert ni de poussée de lancement</li>
            </ul>
            <Link href="/fr/contact" className="btn-secondary">
              Discuter de Kickstart
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Route Plus</p>
            <h3 className="segment-title">Sauvegarder, reprendre et façonner davantage</h3>
            <p className="route-note">Pour les clients qui veulent continuer sérieusement leur route et la façonner dans des limites, sans toucher encore à l'infrastructure en direct.</p>
            <ul className="feature-list">
              <li className="feature-item">Sauvegarde et reprise de l'espace de travail</li>
              <li className="feature-item">Intake et affinement de route au-delà de l'aperçu</li>
              <li className="feature-item">Toujours pas d'actions registrar directes</li>
            </ul>
            <Link href="/fr/contact" className="btn-secondary">
              Demander Route Plus
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Managed Launch</p>
            <h3 className="segment-title">Mise en ligne pilotée par l'opérateur</h3>
            <p className="route-note">C'est ici que la route passe à l'enregistrement réel du domaine, au DNS et à la préparation de lancement, tout en restant sous contrôle de l'opérateur.</p>
            <ul className="feature-list">
              <li className="feature-item">Transfert registrar côté serveur</li>
              <li className="feature-item">File de lancement et revue opérateur</li>
              <li className="feature-item">Pont entre route rapide et mise en ligne sérieuse</li>
            </ul>
            <Link href="/fr/contact" className="btn-primary">
              Démarrer Managed Launch
            </Link>
          </article>
        </div>
      </section>

      <CtaDock
        title="Le builder se lit désormais comme une couche produit guidée, pas comme un jouet."
        body="À partir d'ici, nous pouvons continuer à construire la logique de publication, le suivi d'intake et l'approfondissement des modules sans réinventer la route à chaque fois."
        primary={{ href: "/fr/contact", label: "Discuter d'une route de lancement" }}
        secondary={{ href: "/fr/studio", label: "Voir la route studio" }}
        locale="fr"
      />
      <Footer />
    </SiteFrame>
  );
}
