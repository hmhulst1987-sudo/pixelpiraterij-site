import { CaseMatrix, CtaDock, Footer, ManifestAside, PageHero, ProofCaseGrid, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { featuredCasesEs, proofCasesEs } from "@/lib/site-data";

export default function SpanishCasesPage() {
  const readingSignals = [
    {
      title: "Capacidad antes que categoría",
      body: "Lo importante no es solo qué tipo de proyecto ve alguien, sino qué músculo demuestra ese proyecto: posicionamiento, conversión serena, atmósfera o profundidad de sistema.",
    },
    {
      title: "Valor de negocio antes que aplausos",
      body: "Un caso se vuelve útil cuando queda claro por qué importa comercialmente: más confianza, conversión más afilada, mejor encuadre o una capa de producto más creíble.",
    },
    {
      title: "Selección antes que sobrecarga",
      body: "Al negarse a mostrar todo a la vez, cada proyecto gana peso. La curaduría convierte un portfolio en un argumento en lugar de una carpeta de volcado.",
    },
  ];

  const proofLayers = [
    {
      label: "Identidad",
      text: "KunstvanVB muestra que PixelPiraterij puede hacer más que construir sitios web. Puede encuadrar una superficie de marca completa con suficiente control editorial para que la confianza premium sea inmediata.",
    },
    {
      label: "Conversión",
      text: "Las direcciones de hospitality demuestran que la contención, el gusto y la lógica comercial pueden convivir. No es ruidoso, pero es innegablemente intencional.",
    },
    {
      label: "Narrativa",
      text: "Hermes Records y vage.blog muestran que la atmósfera no es aquí un relleno decorativo. Es una parte útil del posicionamiento, la presentación y el valor cultural.",
    },
    {
      label: "Capa de sistema",
      text: "LumenOS, EvaQuant y herramientas relacionadas muestran que hay lógica real de producto y software detrás de la capa visual. Eso eleva la credibilidad de todo el estudio.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Prueba curada"
        title={
          <>
            Proyectos que
            <br />
            demuestran
            <br />
            distintas
            <br />
            capacidades.
          </>
        }
        body="El trabajo importa más cuando se enmarca por lo que demuestra. Control de identidad, calma de hospitality, atmósfera cultural y lógica orientada a software pertenecen todos a fortalezas distintas pero conectadas."
        primaryCta={{ href: "/es/contact", label: "Usar la prueba en tu briefing" }}
        secondaryCta={{ href: "/es/studio", label: "Volver al estudio" }}
        aside={
          <ManifestAside
            capLeft="Prueba"
            capRight="Selección"
            problemTitle="Un portfolio gigante no crea confianza automáticamente."
            problemBody="Cuando todo se presenta a la vez, quien lo mira todavía tiene que averiguar qué demuestra realmente."
            stanceTitle="La prueba debe ser selectiva, estructurada y relevante para el negocio."
            stanceBody="PixelPiraterij selecciona los casos por capacidad, de modo que cada uno se convierta en un argumento en lugar de una captura de pantalla."
          />
        }
      />

      <section className="section-block proof-layout">
        <SectionHeader
          index="01"
          title="El mapa de prueba actual."
          body="Cada línea representa un tipo de fortaleza distinto dentro del sistema. Por eso el portfolio debe seguir categorizado en lugar de colapsar en un feed visual sin sentido estratégico."
        />
        <ProofCaseGrid items={proofCasesEs} />
        <div className="matrix-shell">
          <p className="section-tag">Registro de capacidades</p>
          <CaseMatrix items={featuredCasesEs} />
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Cómo debe leerse esta prueba."
          body="Un inversor, cliente o socio no necesita que le guste todo por igual. Necesita entender rápido por qué esta selección genera confianza y dónde está realmente la palanca."
        />
        <div className="segment-grid">
          {readingSignals.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Clave de lectura</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="Lo que esta selección ya demuestra."
          body="No solo que se ha construido mucho, sino que PixelPiraterij puede controlar varias capas a la vez: marca, conversión, atmósfera narrativa y lógica de producto."
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
        title="El caso correcto no es el más ruidoso, sino el que demuestra la capacidad correcta para tu ruta."
        body="Así es como el estudio debe usar la prueba: como evidencia dirigida, no como ruido. La siguiente pregunta es siempre la misma: ¿qué músculo necesita ganar primero la confianza?"
        primary={{ href: "/es/contact", label: "Hablar de tu ruta" }}
        locale="es"
      />
      <Footer />
    </SiteFrame>
  );
}
