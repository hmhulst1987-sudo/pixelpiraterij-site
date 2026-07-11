import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { aboutShowcasesFr, processStepsFr } from "@/lib/site-data";

export default function FrenchAboutPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="À propos du studio"
        title={
          <>
            Corsaire
            <br />
            par posture,
            <br />
            pas par
            <br />
            costume.
          </>
        }
        body="PixelPiraterij existe parce que trop de marques numériques doivent encore choisir entre des builders génériques, un hébergement sans visage et des studios qui livrent un beau travail sans profondeur opérationnelle."
        primaryCta={{ href: "/fr/contact", label: "Ouvrir la route blueprint" }}
        secondaryCta={{ href: "/fr", label: "Retour à la carte des routes" }}
        aside={
          <ManifestAside
            capLeft="Positionnement"
            capRight="Pourquoi il existe"
            problemTitle="Le marché est plein de fragments."
            problemBody="L'un conçoit, l'autre héberge, un troisième vient plus tard réparer les dégâts. Le résultat est souvent beau, cher et fragile sous pression."
            stanceTitle="PixelPiraterij existe pour réduire cette fragmentation."
            stanceBody="Travail de studio, couches système, templates et future logique de builder appartiennent à un seul modèle opérationnel discipliné."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="La philosophie est simple."
          body="Opérer en dehors de la route générique, mais avec assez de discipline pour que le résultat mérite encore la confiance."
        />
        <div className="stack-board">
          {[
            { label: "Indépendant", text: "Le travail se construit autour d'un positionnement plus fort et de plus de contrôle, pas autour d'un formatage dans des catégories standard d'agence ou d'hébergeur." },
            { label: "Humain", text: "Le support et la prise de décision doivent toujours ressembler à un contact avec des gens qui comprennent la construction, pas à une boîte noire." },
            { label: "Systémique", text: "Il ne s'agit pas de pages isolées. Il s'agit de l'ensemble des surfaces, outils et infrastructures en dessous." },
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
          title="Là où cette posture devient déjà visible dans le modèle."
          body="Le positionnement ne devient crédible que lorsqu'il se retrouve dans différents types de résultats : pas générique, pas superficiel et pas assemblé au hasard."
        />
        <ShowcaseGrid items={aboutShowcasesFr} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Comment le studio fonctionne."
          body="La route doit avancer de la clarté vers l'action, pas de l'esthétique vers la confusion. C'est pourquoi chaque construction suit un système plus rigoureux."
        />
        <ProcessBoard steps={processStepsFr} />
      </section>

      <CtaDock
        title="Le nom reste parce que la posture reste : indépendant, précis et refusant de livrer du travail générique."
        body="Ce qui change, c'est la maturité du système autour de lui."
        primary={{ href: "/fr/contact", label: "Discuter de la prochaine route" }}
        locale="fr"
      />
      <Footer />
    </SiteFrame>
  );
}
