import {
  CaseMatrix,
  CtaDock,
  Footer,
  ManifestAside,
  OfferRail,
  PackageGrid,
  PageHero,
  ProcessBoard,
  SectionHeader,
  SegmentGrid,
  ShowcaseGrid,
  SiteFrame,
  Topbar,
} from "@/components/site-shell";
import {
  audienceSegmentsFr,
  featuredCasesFr,
  homeOffersFr,
  operationalStackFr,
  studioShowcasesFr,
  templateRoutePackagesFr,
  type ProcessStep,
  type Segment,
} from "@/lib/site-data";

const processFlow: ProcessStep[] = [
  {
    step: "Brief",
    body: "Nous cartographions d'abord la marque, l'audience, l'ambition et le poids technique pour savoir immédiatement si une route studio, template ou système convient le mieux.",
  },
  {
    step: "Construire",
    body: "Ensuite nous façonnons la bonne surface : du sur-mesure là où il le faut, une rapidité portée par les templates là où c'est possible et une couche système qui tient debout après la mise en ligne.",
  },
  {
    step: "Prouver",
    body: "Via des cases, des routes en direct et des exemples tangibles, nous montrons ce qui fonctionne déjà et où la prochaine étape de croissance devient logique.",
  },
  {
    step: "Passer à l'échelle",
    body: "Quand une marque veut aller plus loin, `.online` et le hub ouvrent la couche suivante : templates, routes produit, apps et applications système plus lourdes.",
  },
];

const nextMoveSegments: Segment[] = [
  {
    title: "Démarrer avec un brief studio ou service",
    note: "Pour les marques qui ont besoin d'un front-end sérieux, d'un positionnement plus net ou d'un système plus fiable sous le site.",
    bullets: [
      "Du sur-mesure là où l'allure et le contrôle comptent vraiment",
      "Utile pour les marques premium, les fondateurs et l'hospitality",
      "De la stratégie et la surface jusqu'à l'hébergement et la gestion",
    ],
  },
  {
    title: "Passer sur `.online` pour des routes tangibles",
    note: "C'est là que nous montrons à quoi ressemblent templates, fonctionnalités et couches produit une fois que l'étape suivante doit devenir plus concrète et comparable.",
    bullets: [
      "Routes de templates et de capacité",
      "Exemples tangibles de frontend, backend et automatisation",
      "Une frontière plus claire entre départ rapide et sur-mesure",
    ],
  },
  {
    title: "Utiliser le hub comme galerie d'apps",
    note: "Le hub devient l'endroit central pour les web apps, apps Android, versions logicielles et téléchargements futurs au sein du même écosystème.",
    bullets: [
      "Rassembler les apps en un seul endroit",
      "Séparer clairement versions web et téléchargements",
      "Sous le même parapluie PixelPiraterij, mais avec son propre rôle",
    ],
  },
];

const operationalSegments: Segment[] = operationalStackFr.map((item) => ({
  title: item.label,
  note: item.text,
  bullets: [
    "Fait partie de la même route PixelPiraterij",
    "Pensé pour rapprocher présentation et opérations",
    "Peut évoluer plus tard vers `.online` ou le hub quand cela devient logique",
  ],
}));

export default function FrenchHomePage() {
  return (
    <SiteFrame>
      <Topbar />

      <PageHero
        kicker="Studio, sites et couches système"
        title={
          <>
            Des sites et
            <br />
            des systèmes
            <br />
            qui n'ont pas
            <br />
            à être génériques.
          </>
        }
        body="PixelPiraterij aide les marques, fondateurs et services premium avec des sites sur mesure, des routes template, un hébergement géré et des couches système qui non seulement ont fière allure, mais continuent aussi de fonctionner professionnellement après le lancement."
        primaryCta={{ href: "/fr/contact", label: "Démarrer un brief" }}
        secondaryCta={{ href: "/fr/cases", label: "Voir les cases" }}
        aside={
          <ManifestAside
            capLeft="PixelPiraterij"
            problemKicker="Ce qui dérape souvent"
            stanceKicker="Ce que nous visons"
            problemTitle="Beaucoup de marques héritent soit d'un site générique, soit d'un beau travail sans colonne vertébrale technique fiable."
            problemBody="Cela laisse les projets fragiles : hébergement faible, trop de prestataires, peu de contrôle et une couche en ligne qui ne grandit pas avec l'entreprise."
            stanceTitle="Nous rapprochons la présentation, la structure et la couche système."
            stanceBody="Cela crée une route où marque, site, hébergement et croissance à long terme s'articulent mieux et restent crédibles après le lancement."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Ce que PixelPiraterij peut faire pour vous à la base."
          body="Chaque projet ne démarre pas au même endroit. Parfois il faut du sur-mesure, parfois une route template, parfois surtout une couche gérée qui redonne du calme et de la continuité."
        />
        <OfferRail items={homeOffersFr} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="À qui cette couche profite le plus."
          body="Nous ne visons pas tout le monde de la même façon. La force réside dans le choix de la bonne route pour le bon type de marque, d'équipe ou de produit."
        />
        <SegmentGrid segments={audienceSegmentsFr} locale="fr" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Le travail construit doit fonctionner comme une preuve, pas comme un flux de portfolio décousu."
          body="Les cases montrent différents types de force : commerce identitaire, hospitality, routes culturelles et systèmes orientés logiciel."
        />
        <CaseMatrix items={featuredCasesFr} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Quelques routes montrent déjà l'étendue réelle de cette capacité."
          body="De l'univers de marque à l'hospitality, des interfaces culturelles aux tableaux de bord : voici des exemples de la qualité et de la direction déjà tangibles."
        />
        <ShowcaseGrid items={studioShowcasesFr} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="La couche système en dessous doit aussi être visible dans l'offre."
          body="Hébergement, templates et routes app ou portail ne sont pas des à-côtés. Ils font partie de la façon dont une marque reste fonctionnelle en ligne, professionnellement."
        />
        <SegmentGrid segments={operationalSegments} locale="fr" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="06"
          title="La direction tarifaire et le point d'entrée doivent être clairs."
          body="Tout ne doit pas être immédiatement du sur-mesure. Nous rendons donc visible où commence une route de base solide, quelles couches additionnelles sont logiques et quand un projet devient un sur-mesure plus lourd."
        />
        <PackageGrid items={templateRoutePackagesFr} locale="fr" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="07"
          title="Où aller logiquement ensuite."
          body="`.nl` reste la porte d'entrée commerciale. Ensuite, `.online` et le hub ouvrent la couche suivante : routes tangibles, fonctionnalités en direct, apps et environnements produit."
        />
        <SegmentGrid segments={nextMoveSegments} locale="fr" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="08"
          title="Notre méthode doit avancer de la clarté vers la croissance."
          body="Nous ne voulons pas seulement livrer quelque chose de beau. Nous voulons poser une route capable de grandir logiquement dès qu'une marque ou un produit se développe davantage."
        />
        <ProcessBoard steps={processFlow} />
      </section>

      <CtaDock
        title="Utilisez `.nl` pour choisir d'abord la bonne route, puis allez plus loin dans l'écosystème."
        body="Besoin de sur-mesure, d'un site plus fort ou d'un système plus fiable sous votre marque ? Cela commence ici. Envie de voir ensuite des routes template tangibles, des fonctionnalités en direct ou des environnements d'apps ? `.online` et le hub ouvrent la couche suivante."
        primary={{ href: "/fr/contact", label: "Démarrer le brief" }}
        secondary={{ href: "https://pixelpiraterij.online", label: "Aller sur .online" }}
        locale="fr"
      />

      <Footer />
    </SiteFrame>
  );
}
