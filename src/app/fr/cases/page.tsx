import { CaseMatrix, CtaDock, Footer, ManifestAside, PageHero, ProofCaseGrid, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { featuredCasesFr, proofCasesFr } from "@/lib/site-data";

export default function FrenchCasesPage() {
  const readingSignals = [
    {
      title: "La capacité avant la catégorie",
      body: "L'important n'est pas seulement le type de projet que quelqu'un voit, mais surtout quel muscle ce projet prouve : positionnement, conversion posée, ambiance ou profondeur système.",
    },
    {
      title: "La valeur business avant les applaudissements",
      body: "Un case devient utile quand on comprend clairement pourquoi il compte commercialement : plus de confiance, une conversion plus nette, un meilleur cadrage ou une couche produit plus crédible.",
    },
    {
      title: "La sélection avant la surcharge",
      body: "En refusant de tout montrer à la fois, chaque projet gagne en poids. La curation transforme un portfolio en argument plutôt qu'en dossier fourre-tout.",
    },
  ];

  const proofLayers = [
    {
      label: "Identité",
      text: "KunstvanVB montre que PixelPiraterij peut faire plus que construire des sites. Le studio peut cadrer une surface de marque entière avec assez de contrôle éditorial pour rendre la confiance premium immédiate.",
    },
    {
      label: "Conversion",
      text: "Les directions hospitality prouvent que retenue, goût et logique commerciale peuvent coexister. Pas de bruit, mais une intention indéniable.",
    },
    {
      label: "Narratif",
      text: "Hermes Records et vage.blog montrent que l'ambiance n'est pas ici un simple filtre décoratif. C'est une composante utile du positionnement, de la présentation et de la valeur culturelle.",
    },
    {
      label: "Couche système",
      text: "LumenOS, EvaQuant et les outils associés montrent qu'il y a une vraie logique produit et logicielle derrière la couche visuelle. Cela rehausse la crédibilité de tout le studio.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Preuve sélectionnée"
        title={
          <>
            Des projets qui
            <br />
            prouvent
            <br />
            différentes
            <br />
            capacités.
          </>
        }
        body="Le travail compte le plus lorsqu'il est cadré par ce qu'il prouve. Contrôle d'identité, calme hospitality, ambiance culturelle et logique orientée logiciel appartiennent tous à des forces différentes mais connectées."
        primaryCta={{ href: "/fr/contact", label: "Utiliser la preuve dans votre brief" }}
        secondaryCta={{ href: "/fr/studio", label: "Retour au studio" }}
        aside={
          <ManifestAside
            capLeft="Preuve"
            capRight="Sélection"
            problemTitle="Un portfolio gigantesque ne crée pas automatiquement de la confiance."
            problemBody="Quand tout est présenté à la fois, la personne qui regarde doit encore comprendre ce que cela prouve réellement."
            stanceTitle="La preuve doit être sélective, structurée et pertinente pour le business."
            stanceBody="PixelPiraterij sélectionne les cases par capacité, afin que chacun devienne un argument plutôt qu'une simple capture d'écran."
          />
        }
      />

      <section className="section-block proof-layout">
        <SectionHeader
          index="01"
          title="La carte de preuve actuelle."
          body="Chaque ligne représente un type de force différent au sein du système. C'est pourquoi le portfolio doit rester catégorisé plutôt que de s'effondrer en un flux visuel sans sens stratégique."
        />
        <ProofCaseGrid items={proofCasesFr} />
        <div className="matrix-shell">
          <p className="section-tag">Registre de capacités</p>
          <CaseMatrix items={featuredCasesFr} />
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Comment lire cette preuve."
          body="Un investisseur, un client ou un partenaire n'a pas besoin de tout aimer également. Il doit surtout comprendre rapidement pourquoi cette sélection crée de la confiance et où se trouve le vrai levier."
        />
        <div className="segment-grid">
          {readingSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Grille de lecture</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Ce que cette sélection prouve déjà."
          body="Pas seulement qu'on a beaucoup construit, mais que PixelPiraterij peut contrôler plusieurs couches à la fois : marque, conversion, ambiance narrative et logique produit."
        />
        <div className="stack-board">
          {proofLayers.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Le bon case n'est pas le plus bruyant, mais celui qui prouve la bonne capacité pour votre route."
        body="Voilà comment le studio doit utiliser la preuve : comme un matériel dirigé, pas comme du bruit. La prochaine question est toujours la même : quel muscle doit d'abord gagner la confiance ?"
        primary={{ href: "/fr/contact", label: "Discuter de votre route" }}
        locale="fr"
      />
      <Footer />
    </SiteFrame>
  );
}
