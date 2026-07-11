import { CtaDock, Footer, ManifestAside, PageHero, ProcessBoard, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { processStepsEs, studioCapabilitiesEs, studioShowcasesEs } from "@/lib/site-data";

export default function SpanishStudioPage() {
  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Estudio"
        title={
          <>
            Superficies a medida
            <br />
            con una
            <br />
            columna de sistema.
          </>
        }
        body="El estudio es la ruta más pesada dentro de PixelPiraterij: superficies a medida, estructuras de campaña y entornos orientados a producto para marcas que necesitan identidad, estructura y seriedad operativa a la vez."
        primaryCta={{ href: "/es/contact", label: "Abrir la ruta blueprint" }}
        secondaryCta={{ href: "/es", label: "Volver al mapa de rutas" }}
        aside={
          <ManifestAside
            capLeft="Lógica de estudio"
            capRight="Línea de construcción"
            problemTitle="Un trabajo bonito sin profundidad de sistema es frágil."
            problemBody="Una superficie puede verse premium y aun así fallar si el texto, la estructura, la entrega y la infraestructura detrás son débiles."
            stanceTitle="El estudio construye desde el negocio hacia afuera."
            stanceBody="Identidad, UX, código y lógica de rollout se tratan como una sola línea de trabajo, no como proveedores separados unidos después o dejados fuera del sistema."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Lo que el estudio realmente construye."
          body="Esto no es solo trabajo de folleto. El estudio se sitúa entre la expresión de marca, los sistemas de lanzamiento y las interfaces que dan al negocio más margen de maniobra."
        />
        <div className="segment-grid">
          {studioCapabilitiesEs.map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Capacidad</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Cómo se ve esa ruta de estudio en la práctica."
          body="No como teoría, sino como distintos tipos de superficies que demuestran que identidad, construcción de mundo y disciplina de producto pueden convivir aquí."
        />
        <ShowcaseGrid items={studioShowcasesEs} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="El trabajo necesita un ritmo operativo, no un sprint puntual."
          body="La construcción se fortalece cuando descubrimiento, encuadre, entrega y soporte gestionado permanecen conectados. Así es como una superficie a medida se mantiene útil después del lanzamiento."
        />
        <ProcessBoard steps={processStepsEs} />
      </section>

      <CtaDock
        title="Si se necesita el trabajo más pesado, también debe enmarcarse claramente como la ruta de estudio."
        body="Podemos partir de un briefing a medida, una ruta más afilada dentro de una marca existente o una ruta de plantilla que después crezca hacia algo más distintivo."
        primary={{ href: "/es/contact", label: "Iniciar la ruta de estudio" }}
        locale="es"
      />
      <Footer />
    </SiteFrame>
  );
}
