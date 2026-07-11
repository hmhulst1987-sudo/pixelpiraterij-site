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
  audienceSegmentsEs,
  featuredCasesEs,
  homeOffersEs,
  operationalStackEs,
  studioShowcasesEs,
  templateRoutePackagesEs,
  type ProcessStep,
  type Segment,
} from "@/lib/site-data";

const processFlow: ProcessStep[] = [
  {
    step: "Briefing",
    body: "Primero mapeamos la marca, la audiencia, la ambición y el peso técnico para saber de inmediato si la ruta correcta es estudio, plantilla o sistema.",
  },
  {
    step: "Construir",
    body: "Después damos forma a la superficie correcta: a medida donde importa, velocidad respaldada por plantillas donde ayuda y una capa de sistema que se mantiene creíble tras el lanzamiento.",
  },
  {
    step: "Demostrar",
    body: "A través de casos, rutas en vivo y ejemplos tangibles mostramos lo que ya funciona y dónde el siguiente paso de crecimiento se vuelve lógico.",
  },
  {
    step: "Escalar",
    body: "Cuando una marca necesita más, `.online` y el hub abren la siguiente capa: plantillas, rutas de producto, apps y aplicaciones de sistema más pesadas.",
  },
];

const nextMoveSegments: Segment[] = [
  {
    title: "Empezar con un briefing de estudio o servicio",
    note: "Para marcas que necesitan un front-end serio, un posicionamiento más afinado o un sistema más fiable bajo el sitio.",
    bullets: [
      "Trabajo a medida donde la presentación y el control realmente importan",
      "Útil para marcas premium, fundadores y hospitality",
      "Desde la estrategia y la superficie hasta el hosting y la gestión",
    ],
  },
  {
    title: "Pasar a `.online` para rutas tangibles",
    note: "Ahí mostramos cómo se ven plantillas, funciones y capas de producto cuando el siguiente paso necesita volverse más práctico y comparable.",
    bullets: [
      "Rutas de plantillas y de capacidad",
      "Ejemplos tangibles de frontend, backend y automatización",
      "Una línea más clara entre el arranque rápido y el trabajo a medida",
    ],
  },
  {
    title: "Usar el hub como galería de apps",
    note: "El hub se convierte en el lugar central para web apps, apps de Android, versiones de software y descargas futuras dentro del mismo ecosistema.",
    bullets: [
      "Reunir las apps en un solo lugar",
      "Separar claramente versiones web y descargas",
      "Bajo el mismo paraguas de PixelPiraterij, pero con su propio rol",
    ],
  },
];

const operationalSegments: Segment[] = operationalStackEs.map((item) => ({
  title: item.label,
  note: item.text,
  bullets: [
    "Forma parte de la misma ruta PixelPiraterij",
    "Pensado para acercar presentación y operaciones",
    "Puede crecer más adelante hacia `.online` o el hub cuando sea lo lógico",
  ],
}));

export default function SpanishHomePage() {
  return (
    <SiteFrame>
      <Topbar />

      <PageHero
        kicker="Estudio, sitios y capas de sistema"
        title={
          <>
            Sitios y
            <br />
            sistemas que
            <br />
            no necesitan
            <br />
            sentirse genéricos.
          </>
        }
        body="PixelPiraterij ayuda a marcas, fundadores y servicios premium con sitios a medida, rutas de plantillas, hosting gestionado y capas de sistema que no solo se ven bien, sino que siguen funcionando profesionalmente después del lanzamiento."
        primaryCta={{ href: "/es/contact", label: "Iniciar un briefing" }}
        secondaryCta={{ href: "/es/cases", label: "Ver los casos" }}
        aside={
          <ManifestAside
            capLeft="PixelPiraterij"
            problemKicker="Lo que suele fallar"
            stanceKicker="A qué apuntamos"
            problemTitle="Muchas marcas todavía terminan con un sitio genérico o con un trabajo bonito sin una columna vertebral técnica fiable."
            problemBody="Eso deja los proyectos frágiles: hosting débil, demasiados proveedores, poco control y una capa online que no crece con el negocio."
            stanceTitle="Acercamos la presentación, la estructura y la capa de sistema."
            stanceBody="Eso crea una ruta donde marca, sitio, hosting y crecimiento a largo plazo encajan mejor y se mantienen creíbles después del lanzamiento."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Lo que PixelPiraterij puede hacer por ti en la capa base."
          body="No todos los proyectos empiezan en el mismo punto. A veces hace falta trabajo a medida, a veces una ruta de plantilla, a veces sobre todo una capa gestionada que devuelve calma y continuidad."
        />
        <OfferRail items={homeOffersEs} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="A quién suele beneficiar más esta capa."
          body="No dirigimos todo hacia un mismo tipo de cliente. La fuerza está en elegir la ruta correcta para el tipo correcto de marca, equipo o producto."
        />
        <SegmentGrid segments={audienceSegmentsEs} locale="es" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="El trabajo construido debe funcionar como prueba, no como un feed de portfolio suelto."
          body="Los casos muestran distintos tipos de fortaleza: comercio guiado por identidad, hospitality, rutas culturales y sistemas orientados a software."
        />
        <CaseMatrix items={featuredCasesEs} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Algunas rutas ya muestran lo amplia que es realmente esa capacidad."
          body="De universos de marca a hospitality, de interfaces culturales a dashboards: estos son ejemplos del nivel de calidad y dirección ya tangibles."
        />
        <ShowcaseGrid items={studioShowcasesEs} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="La capa de sistema debajo también debe ser visible en la oferta."
          body="Hosting, plantillas y rutas de apps o portales no son notas al margen. Forman parte de cómo una marca se mantiene funcionando profesionalmente en línea."
        />
        <SegmentGrid segments={operationalSegments} locale="es" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="06"
          title="La dirección de precios y los puntos de entrada deben sentirse comprensibles."
          body="No todo tiene que empezar como trabajo totalmente a medida. Por eso hacemos visible dónde empieza una ruta base sólida, qué capas adicionales tienen sentido y cuándo un proyecto se convierte en trabajo a medida más pesado."
        />
        <PackageGrid items={templateRoutePackagesEs} locale="es" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="07"
          title="Hacia dónde moverse lógicamente después."
          body="`.nl` sigue siendo la puerta comercial de entrada. Después, `.online` y el hub abren la siguiente capa: rutas tangibles, funciones en vivo, apps y entornos de producto."
        />
        <SegmentGrid segments={nextMoveSegments} locale="es" />
      </section>

      <section className="section-block">
        <SectionHeader
          index="08"
          title="Nuestro proceso debe avanzar de la claridad hacia el crecimiento."
          body="No solo queremos entregar algo atractivo. Queremos establecer una ruta capaz de escalar lógicamente cuando la marca o el producto crezca aún más."
        />
        <ProcessBoard steps={processFlow} />
      </section>

      <CtaDock
        title="Usa `.nl` para elegir primero la ruta correcta, y luego adéntrate más en el ecosistema."
        body="¿Necesitas trabajo a medida, un sitio más fuerte o un sistema más fiable bajo tu marca? Eso empieza aquí. ¿Quieres ver después rutas de plantillas tangibles, funciones en vivo o entornos de apps? `.online` y el hub abren la siguiente capa."
        primary={{ href: "/es/contact", label: "Iniciar el briefing" }}
        secondary={{ href: "https://pixelpiraterij.online", label: "Ir a .online" }}
        locale="es"
      />

      <Footer />
    </SiteFrame>
  );
}
