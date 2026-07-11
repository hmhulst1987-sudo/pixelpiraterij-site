import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { aboutShowcasesEs, processStepsEs } from "@/lib/site-data";

export default function SpanishAboutPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Sobre el estudio"
        title={
          <>
            Pirata
            <br />
            por postura,
            <br />
            no por
            <br />
            disfraz.
          </>
        }
        body="PixelPiraterij existe porque demasiadas marcas digitales todavía tienen que elegir entre builders genéricos, hosting sin rostro y estudios que entregan un trabajo bonito sin profundidad operativa."
        primaryCta={{ href: "/es/contact", label: "Abrir la ruta blueprint" }}
        secondaryCta={{ href: "/es", label: "Volver al mapa de rutas" }}
        aside={
          <ManifestAside
            capLeft="Posicionamiento"
            capRight="Por qué existe"
            problemTitle="El mercado está lleno de fragmentos."
            problemBody="Uno diseña, otro aloja y un tercero llega después a arreglar las cosas. El resultado suele ser bonito, caro y débil bajo presión."
            stanceTitle="PixelPiraterij existe para reducir esa fragmentación."
            stanceBody="El trabajo de estudio, las capas de sistema, las plantillas y la futura lógica de builder pertenecen a un mismo modelo operativo disciplinado."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="La filosofía es simple."
          body="Operar fuera de la ruta genérica, pero con suficiente disciplina para que el resultado siga mereciendo confianza."
        />
        <div className="stack-board">
          {[
            { label: "Independiente", text: "El trabajo se construye alrededor de un posicionamiento más fuerte y más control, no para encajar en categorías estándar de agencia o de hosting." },
            { label: "Humano", text: "El soporte y la toma de decisiones deben seguir sintiéndose como trato con personas que entienden la construcción, no como una caja negra." },
            { label: "Sistémico", text: "No se trata de páginas aisladas. Se trata del conjunto de superficies, herramientas e infraestructura que hay debajo." },
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
          title="Dónde esa postura ya se vuelve visible en el modelo."
          body="El posicionamiento solo se vuelve creíble cuando aparece en distintos tipos de resultados: no genérico, no superficial y no ensamblado al azar."
        />
        <ShowcaseGrid items={aboutShowcasesEs} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Cómo trabaja el estudio."
          body="La ruta debe avanzar de la claridad a la acción, no de la estética a la confusión. Por eso cada construcción sigue un sistema más riguroso."
        />
        <ProcessBoard steps={processStepsEs} />
      </section>

      <CtaDock
        title="El nombre se mantiene porque la postura se mantiene: independiente, afilado y poco dispuesto a entregar trabajo genérico."
        body="Lo que cambia es la madurez del sistema a su alrededor."
        primary={{ href: "/es/contact", label: "Hablar del siguiente paso" }}
        locale="es"
      />
      <Footer />
    </SiteFrame>
  );
}
