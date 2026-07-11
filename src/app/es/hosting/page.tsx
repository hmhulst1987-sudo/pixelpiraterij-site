import { CtaDock, Footer, ManifestAside, PageHero, PackageGrid, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { hostingShowcasesEs, packageTiersEs } from "@/lib/site-data";

export default function SpanishHostingPage() {
  const operatingSignals = [
    {
      label: "Uptime",
      text: "Si un sitio debe sentirse premium, no puede comportarse como un proyecto de hobby. La estabilidad no es un extra. Es parte de la experiencia de marca en sí misma.",
    },
    {
      label: "Actualizaciones",
      text: "El mantenimiento no debería esperar a que algo se rompa. La capa gestionada evita el deterioro técnico y mantiene la base saludable con el tiempo.",
    },
    {
      label: "Soporte",
      text: "Un buen soporte no debería sentirse como un sistema de tickets donde el contexto desaparece. Debería sentirse como alguien que ya entiende la construcción antes de que se explique el problema.",
    },
    {
      label: "Control",
      text: "La mayor ganancia suele ser la calma: menos proveedores, menos ruido técnico y mucha menos incertidumbre sobre quién es responsable de qué tras el lanzamiento.",
    },
  ];

  const planSignals = [
    {
      title: "Harbor Starter",
      body: "Para sitios premium más pequeños que necesitan sobre todo fiabilidad, mantenimiento y una base técnica tranquila sin exigir de inmediato una capa de sistema más pesada.",
    },
    {
      title: "Route Studio",
      body: "Para marcas que necesitan hosting más un ritmo más fuerte, mejor monitoreo y espacio para crecer hacia páginas, portales o capas de producto adicionales.",
    },
    {
      title: "Sovereign Fleet",
      body: "Para múltiples superficies, necesidades de infraestructura más amplias y marcas donde el hosting no puede separarse de la hoja de ruta, el soporte y la arquitectura de sistema.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Hosting e infraestructura"
        title={
          <>
            Infraestructura
            <br />
            propia,
            <br />
            confianza
            <br />
            pública.
          </>
        }
        body="PixelPiraterij trata el hosting como parte del sistema, no como una idea de último momento. Monitoreo, copias de seguridad, soporte, actualizaciones y cuidado del rendimiento son lo que mantiene a la marca funcionando después del lanzamiento."
        primaryCta={{ href: "/es/contact", label: "Solicitar un blueprint de sistema" }}
        secondaryCta={{ href: "/es", label: "Volver al mapa de rutas" }}
        aside={
          <ManifestAside
            capLeft="Capa gestionada"
            capRight="Recurrente"
            problemTitle="Una construcción sólida sigue fallando cuando la entrega recae en un hosting débil."
            problemBody="Si el uptime, el soporte y el cuidado operativo son frágiles, la confianza creada por el diseño desaparece rápido."
            stanceTitle="El hosting gestionado forma parte de la promesa."
            stanceBody="PixelPiraterij hace visible el hosting porque la fiabilidad, la gestión y el soporte humano son parte de lo que el cliente realmente está comprando."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Por qué existe esta capa de hosting."
          body="No para competir en precio con el hosting genérico, sino para dar a marcas premium, creadores y productos digitales una base operativa más tranquila."
        />
        <div className="segment-grid">
          {[
            "Monitoreo, actualizaciones y copias de seguridad forman parte del ritmo de servicio.",
            "El soporte es humano y contextual, no un laberinto de tickets anónimo.",
            "La stack está alineada con el tipo de trabajo que PixelPiraterij realmente construye.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Capa de confianza</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="La capa operativa también debe leerse con claridad a simple vista."
          body="No solo en palabras, sino en superficies, estructura de planes y sensación de herramienta. Así queda claro que el hosting aquí no es un servicio de descarte, sino una capa de confianza deliberada."
        />
        <ShowcaseGrid items={hostingShowcasesEs} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Lo que esta capa resuelve en la práctica."
          body="El valor de esta capa de sistema no es jerga técnica. Es menos estrés, menos tiempo caído y mucho más control una vez el sitio está en vivo."
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
          title="Estructura recurrente por encima del rescate aleatorio."
          body="El objetivo es un sistema de planes gestionados que crea estabilidad para el cliente y fuerza recurrente para el estudio. No reparación reactiva, sino un ritmo operativo más sano desde el principio."
        />
        <PackageGrid items={packageTiersEs} locale="es" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Cuándo empieza a tener sentido cada plan."
          body="No todas las marcas tienen la misma pregunta de infraestructura. La capa de hosting funciona mejor cuando el plan encaja con la etapa, el perfil de riesgo y la dirección de crecimiento del cliente."
        />
        <div className="segment-grid">
          {planSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Caso de uso</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Si el sitio importa, el sistema detrás del sitio también importa."
        body="El hosting puede permanecer invisible para el cliente final, pero nunca debe permanecer invisible dentro de la oferta. Ahí es exactamente donde se ganan o se pierden la calma, la continuidad y la credibilidad."
        primary={{ href: "/es/contact", label: "Solicitar un blueprint de sistema" }}
        secondary={{ href: "/es", label: "Volver al mapa de rutas" }}
        locale="es"
      />
      <Footer />
    </SiteFrame>
  );
}
