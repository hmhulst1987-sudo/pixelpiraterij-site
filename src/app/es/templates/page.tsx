import Link from "next/link";

import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { routeFamilies } from "@/lib/template-route-builder";
import { templateCategoriesEs, templateShowcasesEs } from "@/lib/site-data";

export default function SpanishTemplatesPage() {
  const templateRules = [
    {
      title: "Velocidad sin fatiga de plantilla",
      body: "Una plantilla debe ahorrar tiempo sin forzar a la marca hacia una forma genérica. La ganancia es aceleración, no aplanamiento.",
    },
    {
      title: "Un punto de partida más fuerte, no un techo",
      body: "La plantilla es la base, no la ambición final. Debe abrir el camino hacia algo más fuerte en lugar de encerrar el proyecto demasiado pronto.",
    },
    {
      title: "Estructura que puede expandirse después",
      body: "Páginas, componentes y flujos deben poder crecer hacia portales, builders o capas de producto. De lo contrario solo se gana hoy y se pierde mañana.",
    },
    {
      title: "Secuenciación honesta antes que promesas infladas",
      body: "PixelPiraterij no necesita sobrevender el builder antes de que esté listo para producto. Una secuenciación clara hace la ruta más creíble, no menos ambiciosa.",
    },
  ];

  const rolloutSignals = [
    {
      label: "Ahora",
      text: "Sistemas respaldados por plantillas, direcciones curadas y una lógica de lanzamiento más rápida que ya son útiles en rutas reales de clientes.",
    },
    {
      label: "Después",
      text: "Flujos estructurados de edición, vista previa y publicación dentro del universo PixelPiraterij, para que el paso de plantilla a builder se sienta ganado en lugar de forzado.",
    },
    {
      label: "Más adelante",
      text: "Una capa de builder multi-tenant más completa una vez que la lógica de producto, el ritmo operativo y el comportamiento de los usuarios se hayan probado primero en la práctica.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Plantillas y dirección del builder"
        title={
          <>
            Arranques inteligentes,
            <br />
            no atajos
            <br />
            baratos.
          </>
        }
        body="Las plantillas dentro de PixelPiraterij existen para crear puntos de partida más fuertes, no resultados más débiles. Son sistemas de lanzamiento curados que pueden avanzar rápido y seguir siendo parte del mismo sistema más amplio."
        primaryCta={{ href: "/es/templates/builder", label: "Abrir el espacio de trabajo del builder" }}
        secondaryCta={{ href: "/es/contact", label: "Solicitar una ruta de plantilla" }}
        aside={
          <ManifestAside
            capLeft="Lógica de plantilla"
            capRight="Camino del builder"
            problemTitle="Las plantillas fallan cuando borran la identidad."
            problemBody="Lo rápido suele volverse genérico cuando el sistema debajo existe solo para reducir esfuerzo en lugar de afinar la dirección."
            stanceTitle="Una plantilla fuerte debe acortar el camino, no aplanar el resultado."
            stanceBody="PixelPiraterij usa las plantillas como sistemas de partida curados, y la lógica de builder solo crece una vez que esta ruta se ha probado en la práctica."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Las plantillas se agrupan según dónde ayudan más."
          body="El objetivo no es inundar a la gente con skins. El objetivo es dar a cada audiencia una ruta más fuerte hacia una mejor construcción."
        />
        <div className="segment-grid">
          {templateCategoriesEs.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Línea de plantillas</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="El builder se abre como un espacio de trabajo guiado, no como una herramienta de acceso libre."
          body="Primero eliges la familia de ruta. Solo después entras al espacio de trabajo con acceso al plan, intake de dominio y lógica de módulos."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.en;

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Inicio de builder</p>
                <h3 className="segment-title">{copy.label}</h3>
                <p className="route-note">{copy.audience}</p>
                <ul className="feature-list">
                  {copy.sections.slice(0, 4).map((section) => (
                    <li key={section} className="feature-item">
                      {section}
                    </li>
                  ))}
                </ul>
                <Link href={`/es/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  Abrir este espacio de trabajo
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Lo que un arranque sólido respaldado por plantillas ya debe demostrar a simple vista."
          body="No como una promesa abstracta, sino a través de superficies reales: lógica de suite, encuadre de audiencia y disciplina de producto. Eso es lo que hace que la futura dirección del builder se sienta creíble en lugar de aplazada."
        />
        <ShowcaseGrid items={templateShowcasesEs} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Lo que las plantillas realmente deben hacer aquí."
          body="No toda ruta rápida es automáticamente inteligente. La fuerza de este sistema está en mejores puntos de partida, más estructura y un camino que aún puede abrirse más adelante."
        />
        <div className="segment-grid">
          {templateRules.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Principio</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="El builder llega después de la capacidad, no antes."
          body="La siguiente capa es un flujo estructurado de edición, vista previa y publicación sobre estos sistemas de plantillas. Solo escalamos esa promesa una vez que la capa de producto es real."
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
        title="Si quieres velocidad sin terminar en la uniformidad de las plantillas, esta es la ruta correcta."
        body="Esta página debe demostrar que velocidad, estructura y carácter de marca pueden convivir antes de que la capa de builder más profunda se abra más."
        primary={{ href: "/es/templates/builder", label: "Abrir el espacio de trabajo del builder" }}
        secondary={{ href: "/es/studio", label: "Ver cómo esto conecta con el estudio" }}
        locale="es"
      />
      <Footer />
    </SiteFrame>
  );
}
