import { CtaDock, Footer, ManifestAside, OfferRail, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";

export default function FrenchContactPage() {
  const routeSignals = [
    {
      id: "01",
      title: "Route studio",
      note: "Pour les marques qui ont besoin d'une surface avec autorité, d'un positionnement plus net et d'un front-end plus mature.",
    },
    {
      id: "02",
      title: "Route template",
      note: "Pour les routes où la vitesse compte, tant que le point de départ n'a pas besoin de se sentir générique ou stratégiquement faible.",
    },
    {
      id: "03",
      title: "Couche système",
      note: "Pour les constructions qui existent déjà mais doivent devenir plus calmes, plus fiables et mieux accompagnées après le lancement.",
    },
  ];

  const intakeSignals = [
    {
      label: "Problème",
      text: "Que vend exactement l'entreprise, où la confiance fuit-elle et quelle partie de la route semble aujourd'hui trop faible ou trop générique ?",
    },
    {
      label: "Contexte",
      text: "Qu'est-ce qui existe déjà : domaines, site actuel, copy, actifs de marque, stack technique, échéances et systèmes environnants ?",
    },
    {
      label: "Direction",
      text: "La prochaine étape ressemble-t-elle plutôt à du sur-mesure, à une route portée par les templates, à de l'hébergement lourd ou à une orientation produit et système ?",
    },
    {
      label: "Résultat",
      text: "Après la première conversation, la route doit être plus claire qu'avant : ce qui est construit, dans quel ordre et pourquoi cet ordre a du sens.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Contact et blueprint"
        title={
          <>
            Commencer par
            <br />
            la route,
            <br />
            pas par
            <br />
            des suppositions.
          </>
        }
        body="Si la marque a besoin d'une route studio, d'une route template ou d'une couche système plus forte, la meilleure première étape est de cadrer clairement la situation puis de travailler en remontant à partir de là."
        primaryCta={{ href: "mailto:inbox@pixelpiraterij.nl", label: "inbox@pixelpiraterij.nl" }}
        secondaryCta={{ href: "/fr/templates", label: "Voir le chemin template" }}
        aside={
          <ManifestAside
            capLeft="Intake"
            capRight="Blueprint"
            problemTitle="La plupart des projets démarrent trop tard dans la mauvaise conversation."
            problemBody="Les gens se jettent souvent sur des écrans, des thèmes et des outils avant que l'offre, la route et l'infrastructure soient correctement cadrées."
            stanceTitle="Une intake plus précise fait gagner du temps plus tard."
            stanceBody="La première conversation doit identifier la route : studio, template, couche système ou une construction système plus large."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Les trois routes vers lesquelles l'intake mène habituellement."
          body="Chaque projet n'a pas besoin du même type de réponse. Il est utile d'identifier tôt quelle route porte le plus de poids."
        />
        <OfferRail items={routeSignals} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Ce qu'il faut apporter à la première conversation."
          body="Plus le cadrage est précis, meilleure est la route. Voici les signaux qui créent un point de départ plus utile."
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
          title="Ce qui rend un premier e-mail immédiatement utile."
          body="Aucun brief parfait requis. Juste assez de contexte pour révéler où se trouve le levier et quelle route ne doit pas être gaspillée."
        />
        <div className="segment-grid">
          {[
            "Une courte explication de ce que fait réellement l'entreprise ou le projet.",
            "Un lien vers ce qui existe déjà, si quelque chose est déjà en ligne.",
            "Ce qui semble actuellement faux : présentation, structure, hébergement, rythme ou manque de cohérence.",
            "Ce à quoi la prochaine phase doit ressembler : plus premium, plus calme, plus rapide à lancer ou plus orientée système.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Premier brief</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Si le projet compte, cadrons d'abord correctement la route avant de toucher la mauvaise surface."
        body="E-mail, demande de blueprint ou conversation directe, tant que la route commence dans la clarté au lieu de se disloquer en morceaux déconnectés."
        primary={{ href: "mailto:inbox@pixelpiraterij.nl", label: "Envoyer le premier brief" }}
        secondary={{ href: "/fr", label: "Retour à la carte des routes" }}
        locale="fr"
      />
      <Footer />
    </SiteFrame>
  );
}
