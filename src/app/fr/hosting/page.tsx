import { CtaDock, Footer, ManifestAside, PageHero, PackageGrid, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { hostingShowcasesFr, packageTiersFr } from "@/lib/site-data";

export default function FrenchHostingPage() {
  const operatingSignals = [
    {
      label: "Uptime",
      text: "Si un site doit se sentir premium, il ne peut pas se comporter comme un projet amateur. La stabilité n'est pas un extra. Elle fait partie de l'expérience de marque elle-même.",
    },
    {
      label: "Mises à jour",
      text: "La maintenance ne doit pas attendre qu'un problème survienne. La couche gérée évite la dérive technique et maintient la fondation saine dans la durée.",
    },
    {
      label: "Support",
      text: "Un bon support ne doit pas ressembler à un système de tickets où le contexte se perd. Il doit donner l'impression que quelqu'un comprend déjà la construction avant même que le problème soit expliqué.",
    },
    {
      label: "Contrôle",
      text: "Le plus grand gain est souvent le calme : moins de prestataires, moins de bruit technique et beaucoup moins d'incertitude sur qui est responsable de quoi après le lancement.",
    },
  ];

  const planSignals = [
    {
      title: "Harbor Starter",
      body: "Pour les sites premium plus petits qui ont surtout besoin de fiabilité, de maintenance et d'une base technique calme sans exiger immédiatement une couche système plus lourde.",
    },
    {
      title: "Route Studio",
      body: "Pour les marques qui ont besoin d'hébergement plus un rythme plus soutenu, un meilleur monitoring et de la place pour grandir vers des pages, portails ou couches produit supplémentaires.",
    },
    {
      title: "Sovereign Fleet",
      body: "Pour plusieurs surfaces, des besoins d'infrastructure plus larges et des marques où l'hébergement ne peut pas être séparé de la feuille de route, du support et de l'architecture système.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Hébergement et infrastructure"
        title={
          <>
            Infrastructure
            <br />
            privée,
            <br />
            confiance
            <br />
            publique.
          </>
        }
        body="PixelPiraterij traite l'hébergement comme une partie du système, pas comme un à-côté oubliable. Monitoring, sauvegardes, support, mises à jour et attention à la performance sont ce qui garde la marque active après le lancement."
        primaryCta={{ href: "/fr/contact", label: "Demander un blueprint système" }}
        secondaryCta={{ href: "/fr", label: "Retour à la carte des routes" }}
        aside={
          <ManifestAside
            capLeft="Couche gérée"
            capRight="Récurrent"
            problemTitle="Une construction solide échoue encore quand la transmission atterrit sur un hébergement faible."
            problemBody="Si l'uptime, le support et l'attention opérationnelle sont fragiles, la confiance créée par le design disparaît vite."
            stanceTitle="L'hébergement géré fait partie de la promesse."
            stanceBody="PixelPiraterij rend l'hébergement visible parce que fiabilité, gestion et support humain font partie de ce que le client achète réellement."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Pourquoi cette couche d'hébergement existe."
          body="Pas pour concurrencer l'hébergement commodity sur le prix, mais pour donner aux marques premium, créateurs et produits numériques une base opérationnelle plus calme."
        />
        <div className="segment-grid">
          {[
            "Monitoring, mises à jour et sauvegardes font partie du rythme de service.",
            "Le support est humain et contextuel, pas un labyrinthe de tickets anonyme.",
            "La stack est alignée avec le type de travail que PixelPiraterij construit réellement.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Couche de confiance</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="La couche opérationnelle doit aussi se lire clairement au premier regard."
          body="Pas seulement en mots, mais dans les surfaces, la structure des plans et le ressenti outillé. C'est ainsi qu'il devient clair que l'hébergement ici n'est pas un service au rabais, mais une couche de confiance délibérée."
        />
        <ShowcaseGrid items={hostingShowcasesFr} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Ce que cette couche résout concrètement."
          body="La valeur de cette couche système n'est pas un jargon technique. C'est moins de stress, moins de temps d'arrêt et bien plus de contrôle une fois le site en ligne."
        />
        <div className="stack-board">
          {operatingSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Structure récurrente plutôt que travail de sauvetage aléatoire."
          body="L'objectif est un système de plans gérés qui crée de la stabilité pour le client et une force récurrente pour le studio. Pas de réparation réactive, mais un rythme opérationnel plus sain dès le départ."
        />
        <PackageGrid items={packageTiersFr} locale="fr" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Quand chaque plan commence à avoir du sens."
          body="Chaque marque n'a pas la même question d'infrastructure. La couche d'hébergement fonctionne mieux quand le plan correspond à la phase, au profil de risque et à la direction de croissance du client."
        />
        <div className="segment-grid">
          {planSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Cas d'usage</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Si le site compte, le système derrière le site compte aussi."
        body="L'hébergement peut rester invisible pour le client final, mais il ne doit jamais rester invisible dans l'offre. C'est exactement là que se gagnent ou se perdent le calme, la continuité et la crédibilité."
        primary={{ href: "/fr/contact", label: "Demander un blueprint système" }}
        secondary={{ href: "/fr", label: "Retour à la carte des routes" }}
        locale="fr"
      />
      <Footer />
    </SiteFrame>
  );
}
