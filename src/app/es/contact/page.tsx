import { CtaDock, Footer, ManifestAside, OfferRail, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";

export default function SpanishContactPage() {
  const routeSignals = [
    {
      id: "01",
      title: "Ruta de estudio",
      note: "Para marcas que necesitan una superficie con autoría, un posicionamiento más afilado y un front-end más maduro.",
    },
    {
      id: "02",
      title: "Ruta de plantilla",
      note: "Para rutas donde la velocidad importa, siempre que el punto de partida no tenga que sentirse genérico o estratégicamente débil.",
    },
    {
      id: "03",
      title: "Capa de sistema",
      note: "Para construcciones que ya existen pero necesitan volverse más tranquilas, fiables y mejor acompañadas tras el lanzamiento.",
    },
  ];

  const intakeSignals = [
    {
      label: "Problema",
      text: "¿Qué vende exactamente el negocio, dónde se está filtrando la confianza y qué parte de la ruta se siente hoy demasiado débil o demasiado genérica?",
    },
    {
      label: "Contexto",
      text: "¿Qué existe ya: dominios, sitio actual, textos, activos de marca, stack técnico, plazos y sistemas circundantes?",
    },
    {
      label: "Dirección",
      text: "¿El siguiente paso se parece más a trabajo a medida, respaldado por plantillas, intensivo en hosting o más orientado a producto y sistema?",
    },
    {
      label: "Resultado",
      text: "Después de la primera conversación, la ruta debería ser más clara que antes: qué se construye, en qué orden y por qué ese orden tiene sentido.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Contacto y blueprint"
        title={
          <>
            Empieza con
            <br />
            la ruta,
            <br />
            no con
            <br />
            suposiciones.
          </>
        }
        body="Si la marca necesita una ruta de estudio, una ruta de plantilla o una capa de sistema más fuerte, el mejor primer paso es enmarcar la situación con claridad y trabajar hacia atrás desde ahí."
        primaryCta={{ href: "mailto:inbox@pixelpiraterij.nl", label: "inbox@pixelpiraterij.nl" }}
        secondaryCta={{ href: "/es/templates", label: "Ver el camino de plantillas" }}
        aside={
          <ManifestAside
            capLeft="Intake"
            capRight="Blueprint"
            problemTitle="La mayoría de los proyectos empiezan demasiado tarde en la conversación equivocada."
            problemBody="La gente suele saltar a pantallas, temas y herramientas antes de que la oferta, la ruta y la infraestructura estén bien encuadradas."
            stanceTitle="Un intake más preciso ahorra tiempo más adelante."
            stanceBody="La primera conversación debe identificar la ruta: estudio, plantilla, capa de sistema o una construcción de sistema más amplia."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Las tres rutas a las que suele conducir el intake."
          body="No todos los proyectos necesitan el mismo tipo de respuesta. Ayuda identificar pronto qué ruta lleva más peso."
        />
        <OfferRail items={routeSignals} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Qué llevar a la primera conversación."
          body="Cuanto más preciso el encuadre, mejor la ruta. Estas son las señales que crean un punto de partida más útil."
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
          title="Qué hace que un primer correo sea inmediatamente útil."
          body="No se necesita un briefing perfecto. Solo el contexto suficiente para revelar dónde está la palanca y qué ruta no debe desperdiciarse."
        />
        <div className="segment-grid">
          {[
            "Una breve explicación de a qué se dedica realmente el negocio o proyecto.",
            "Un enlace a lo que ya existe, si algo está en vivo.",
            "Qué se siente mal ahora mismo: presentación, estructura, hosting, ritmo o falta de coherencia.",
            "Cómo debería sentirse la siguiente fase: más premium, más tranquila, más rápida de lanzar o más orientada a sistema.",
          ].map((item) => (
            <article key={item} className="segment-card">
              <p className="section-tag">Primer briefing</p>
              <h3 className="segment-title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Si el proyecto importa, encuadremos bien la ruta antes de tocar la superficie equivocada."
        body="Correo, solicitud de blueprint o conversación directa, siempre que la ruta empiece con claridad en lugar de desmoronarse en piezas desconectadas."
        primary={{ href: "mailto:inbox@pixelpiraterij.nl", label: "Enviar el primer briefing" }}
        secondary={{ href: "/es", label: "Volver al mapa de rutas" }}
        locale="es"
      />
      <Footer />
    </SiteFrame>
  );
}
