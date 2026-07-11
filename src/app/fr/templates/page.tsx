import Link from "next/link";

import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { routeFamilies } from "@/lib/template-route-builder";
import { templateCategoriesFr, templateShowcasesFr } from "@/lib/site-data";

export default function FrenchTemplatesPage() {
  const templateRules = [
    {
      title: "De la vitesse sans lassitude de template",
      body: "Un template doit faire gagner du temps sans forcer la marque dans un moule générique. Le gain est l'accélération, pas l'aplatissement.",
    },
    {
      title: "Un point de départ plus fort, pas un plafond",
      body: "Le template est la fondation, pas l'ambition finale. Il doit ouvrir la route vers quelque chose de plus fort plutôt que d'enfermer le projet trop tôt.",
    },
    {
      title: "Une structure capable de s'étendre plus tard",
      body: "Pages, composants et flux doivent pouvoir évoluer vers des portails, des builders ou des couches produit. Sinon on ne gagne qu'aujourd'hui pour perdre demain.",
    },
    {
      title: "Un séquencement honnête plutôt que des promesses gonflées",
      body: "PixelPiraterij n'a pas besoin de survendre le builder avant qu'il soit prêt pour le produit. Un séquencement clair rend la route plus crédible, pas moins ambitieuse.",
    },
  ];

  const rolloutSignals = [
    {
      label: "Maintenant",
      text: "Des systèmes portés par les templates, des directions sélectionnées et une logique de lancement plus rapide déjà utiles dans de vraies routes clients.",
    },
    {
      label: "Ensuite",
      text: "Des flux d'édition, de prévisualisation et de publication structurés au sein de l'univers PixelPiraterij pour que le passage du template au builder se ressente comme mérité plutôt que forcé.",
    },
    {
      label: "Plus tard",
      text: "Une couche builder multi-tenant plus complète une fois que la logique produit, le rythme opérationnel et le comportement des utilisateurs auront d'abord fait leurs preuves.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Templates et direction du builder"
        title={
          <>
            Des départs malins,
            <br />
            pas des
            <br />
            raccourcis bon
            <br />
            marché.
          </>
        }
        body="Les templates chez PixelPiraterij existent pour créer des points de départ plus forts, pas des résultats plus faibles. Ce sont des systèmes de lancement sélectionnés capables d'avancer vite tout en restant partie du même système global."
        primaryCta={{ href: "/fr/templates/builder", label: "Ouvrir l'espace de travail du builder" }}
        secondaryCta={{ href: "/fr/contact", label: "Demander une route template" }}
        aside={
          <ManifestAside
            capLeft="Logique template"
            capRight="Chemin builder"
            problemTitle="Les templates échouent quand ils effacent l'identité."
            problemBody="La rapidité devient souvent générique quand le système sous-jacent n'existe que pour réduire l'effort au lieu d'affiner la direction."
            stanceTitle="Un template fort doit raccourcir la route, pas aplatir le résultat."
            stanceBody="PixelPiraterij utilise les templates comme des systèmes de départ sélectionnés, la logique de builder ne grandissant qu'une fois cette route ayant fait ses preuves en pratique."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Les templates sont regroupés selon là où ils aident le plus."
          body="L'idée n'est pas de noyer les gens sous des skins. L'idée est de donner à chaque audience une route plus forte vers une meilleure construction."
        />
        <div className="segment-grid">
          {templateCategoriesFr.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Ligne de templates</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Le builder s'ouvre comme un espace de travail guidé, pas comme un outil en libre accès."
          body="Vous choisissez d'abord la famille de route. Ensuite seulement vous entrez dans l'espace de travail avec l'accès au pack, l'intake de domaine et la logique de modules."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.en;

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Départ builder</p>
                <h3 className="segment-title">{copy.label}</h3>
                <p className="route-note">{copy.audience}</p>
                <ul className="feature-list">
                  {copy.sections.slice(0, 4).map((section) => (
                    <li key={section} className="feature-item">
                      {section}
                    </li>
                  ))}
                </ul>
                <Link href={`/fr/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  Ouvrir cet espace de travail
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Ce qu'un départ solide porté par les templates doit déjà prouver à vue."
          body="Pas comme une promesse abstraite, mais à travers de vraies surfaces : logique de suite, cadrage d'audience et discipline produit. C'est ce qui rend la future direction du builder crédible plutôt que reportée."
        />
        <ShowcaseGrid items={templateShowcasesFr} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Ce que les templates doivent réellement faire ici."
          body="Toute route rapide n'est pas automatiquement intelligente. La force de ce système réside dans de meilleurs points de départ, plus de structure et une route qui peut encore s'ouvrir plus large plus tard."
        />
        <div className="segment-grid">
          {templateRules.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Principe</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Le builder vient après la capacité, pas avant."
          body="La couche suivante est un flux d'édition, de prévisualisation et de publication structuré au-dessus de ces systèmes de templates. Nous n'étendons cette promesse qu'une fois la couche produit réelle."
        />
        <div className="stack-board">
          {rolloutSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Si vous voulez de la vitesse sans finir dans l'uniformité des templates, c'est la bonne route."
        body="Cette page doit prouver que vitesse, structure et caractère de marque peuvent coexister avant que la couche builder plus profonde ne s'ouvre davantage."
        primary={{ href: "/fr/templates/builder", label: "Ouvrir l'espace de travail du builder" }}
        secondary={{ href: "/fr/studio", label: "Voir le lien avec le studio" }}
        locale="fr"
      />
      <Footer />
    </SiteFrame>
  );
}
