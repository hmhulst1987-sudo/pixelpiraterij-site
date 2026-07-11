import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { processStepsFr, studioCapabilitiesFr, studioShowcasesFr } from "@/lib/site-data";

export default function FrenchStudioPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Studio"
        title={
          <>
            Surfaces sur mesure
            <br />
            avec une
            <br />
            colonne système.
          </>
        }
        body="Le studio est la route la plus lourde au sein de PixelPiraterij : surfaces sur mesure, structures de campagne et environnements orientés produit pour les marques qui ont besoin d'identité, de structure et de sérieux opérationnel à la fois."
        primaryCta={{ href: "/fr/contact", label: "Ouvrir la route blueprint" }}
        secondaryCta={{ href: "/fr", label: "Retour à la carte des routes" }}
        aside={
          <ManifestAside
            capLeft="Logique studio"
            capRight="Ligne de construction"
            problemTitle="Un beau travail sans profondeur système reste fragile."
            problemBody="Une surface peut paraître premium et pourtant échouer si la copy, la structure, la transmission et l'infrastructure derrière sont faibles."
            stanceTitle="Le studio construit en partant de l'entreprise."
            stanceBody="Identité, UX, code et logique de rollout sont traités comme une seule ligne de travail, pas comme des prestataires séparés assemblés plus tard ou laissés hors du système."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Ce que le studio construit réellement."
          body="Ce n'est pas que du travail de brochure. Le studio se situe entre l'expression de marque, les systèmes de lancement et les interfaces qui donnent à l'entreprise plus de marge de manœuvre."
        />
        <div className="segment-grid">
          {studioCapabilitiesFr.map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Capacité</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="À quoi ressemble cette route studio en pratique."
          body="Pas en théorie, mais à travers différents types de surfaces prouvant qu'identité, construction d'univers et discipline produit peuvent coexister ici."
        />
        <ShowcaseGrid items={studioShowcasesFr} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Le travail a besoin d'un rythme opérationnel, pas d'un sprint ponctuel."
          body="La construction devient plus forte quand découverte, cadrage, livraison et support géré restent connectés. C'est ainsi qu'une surface sur mesure reste utile après le lancement."
        />
        <ProcessBoard steps={processStepsFr} />
      </section>

      <CtaDock
        title="Si le travail plus lourd est nécessaire, il doit aussi être clairement cadré comme la route studio."
        body="Nous pouvons partir d'un brief sur mesure, d'une route plus nette dans une marque existante ou d'une route template qui évolue ensuite vers quelque chose de plus distinctif."
        primary={{ href: "/fr/contact", label: "Démarrer la route studio" }}
        locale="fr"
      />
      <Footer />
    </SiteFrame>
  );
}
