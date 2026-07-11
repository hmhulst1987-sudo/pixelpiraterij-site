import Link from "next/link";

import { TemplateRouteEditorDemo } from "@/components/template-route-editor-demo";
import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { getAvailableModules, routeFamilies } from "@/lib/template-route-builder";
import { routePackageTiers } from "@/lib/template-route-phase-two";

const familySlugSet = new Set(routeFamilies.map((family) => family.slug));

export default async function SpanishTemplateBuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ family?: string }>;
}) {
  const params = await searchParams;
  const requestedFamily = typeof params.family === "string" && familySlugSet.has(params.family) ? params.family : routeFamilies[0].slug;

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Espacio de trabajo del builder"
        title={
          <>
            Builder guiado,
            <br />
            espacio de trabajo real,
            <br />
            sin fuga de
            <br />
            costes abierta.
          </>
        }
        body="Aquí es donde la ruta de plantilla se convierte en un espacio de trabajo real. Primero eliges la base correcta, luego das forma a la atmósfera y el contenido, y solo después avanzas con dominio y lanzamiento cuando el plan y la capa de operador lo permiten."
        primaryCta={{ href: "#workspace", label: "Abrir el espacio de trabajo" }}
        secondaryCta={{ href: "/es/templates", label: "Volver a las rutas de plantillas" }}
        aside={
          <ManifestAside
            capLeft="Ruta controlada"
            capRight="Builder"
            problemKicker="Lo que evitamos"
            stanceKicker="Lo que construimos"
            problemTitle="No un builder público donde cualquiera pueda disparar costes de servidor sin control."
            problemBody="Eso haría la ruta desordenada, cara y comercialmente débil, sobre todo una vez que módulos, verificaciones de dominio y lógica de lanzamiento pesen de verdad."
            stanceTitle="Un espacio de trabajo guiado con selección clara de familia, acceso por plan y límites de operador."
            stanceBody="Eso mantiene el builder útil para clientes reales sin vaciar la ruta de estudio premium ni la infraestructura detrás."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Empieza desde la familia de ruta correcta."
          body="Cada punto de entrada del builder ya debe encajar con su contexto. No eliges un skin suelto, sino una ruta con la atmósfera, secciones y lógica de conversión correctas."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.en;
            const isActive = requestedFamily === family.slug;
            const baseFlow = copy.flowPresets.base;
            const recommendedModules = getAvailableModules(family.slug).filter((module) => family.recommendedModuleSlugs.includes(module.slug));

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Familia de plantillas</p>
                <h3 className="segment-title">{copy.label}</h3>
                <p className="route-note">{copy.audience}</p>
                <ul className="feature-list">
                  {copy.sections.slice(0, 4).map((section) => (
                    <li key={section} className="feature-item">
                      {section}
                    </li>
                  ))}
                </ul>
                <div className="route-editor-badge-list route-editor-badge-list--dark">
                  <span className="route-editor-badge route-editor-badge--paper">Momento principal: {baseFlow?.ctaLabel ?? "Ruta base"}</span>
                  {recommendedModules.map((module) => (
                    <span key={module.slug} className="route-editor-badge route-editor-badge--paper">
                      {module.copy.en.label}
                    </span>
                  ))}
                </div>
                <p className="route-note">{copy.moduleStrategy}</p>
                <Link href={`/es/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  {isActive ? "Espacio de trabajo activo" : "Abrir esta ruta"}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section id="workspace" className="section-block">
        <SectionHeader
          index="02"
          title="Este es el espacio de trabajo donde el builder realmente empieza."
          body="La configuración de ruta, los módulos, la elección de plan, el intake de dominio y la preparación del registrar se reúnen aquí en un solo estado de proyecto guardado."
        />
        <TemplateRouteEditorDemo key={`es:${requestedFamily}`} locale="en" initialFamilySlug={requestedFamily} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="El acceso crece con el plan, no con clics al azar."
          body="El builder permanece deliberadamente detrás de barreras. Los clientes pueden avanzar sin pagar por todo de una vez, y sin desbloquear al instante la publicación, las acciones de registrar o el aprovisionamiento en público."
        />
        <div className="package-grid">
          {routePackageTiers.map((tier) => (
            <article key={tier.slug} className="package-card">
              <p className="section-tag">Acceso</p>
              <h3 className="segment-title">{tier.copy.en.label}</h3>
              <p className="package-price">{tier.monthlyFee === 0 ? "Incluido en el intake" : `+ €${tier.monthlyFee} / mes`}</p>
              <p className="route-note">{tier.copy.en.description}</p>
              <ul className="feature-list">
                {tier.copy.en.features.map((feature) => (
                  <li key={feature} className="feature-item">
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="route-note">{tier.copy.en.fit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Así se lee comercialmente la ruta de desbloqueo."
          body="No todos necesitan tenerlo todo abierto desde el primer día. Esta secuencia mantiene la ruta vendible, gestionable y creíble, mientras el punto de entrada sigue siendo compacto y los costes más pesados empiezan más tarde."
        />
        <div className="segment-grid">
          <article className="segment-card">
            <p className="section-tag">Kickstart</p>
            <h3 className="segment-title">Empezar con dirección e intake</h3>
            <p className="route-note">Fuerte cuando alguien todavía está buscando la ruta, atmósfera y dirección de dominio correctas, pero aún no necesita acceso independiente al builder.</p>
            <ul className="feature-list">
              <li className="feature-item">Vista previa pública de la ruta</li>
              <li className="feature-item">Verificación de dominio y primer briefing de intake</li>
              <li className="feature-item">Todavía sin almacenamiento abierto ni impulso de lanzamiento</li>
            </ul>
            <Link href="/es/contact" className="btn-secondary">
              Hablar de Kickstart
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Route Plus</p>
            <h3 className="segment-title">Guardar, retomar y seguir dando forma</h3>
            <p className="route-note">Para clientes que quieren continuar en serio con su ruta y darle forma dentro de límites, sin tocar aún la infraestructura en vivo.</p>
            <ul className="feature-list">
              <li className="feature-item">Guardado y reanudación del espacio de trabajo</li>
              <li className="feature-item">Intake y refinamiento de ruta sobre la vista previa</li>
              <li className="feature-item">Todavía sin acciones directas de registrar</li>
            </ul>
            <Link href="/es/contact" className="btn-secondary">
              Solicitar Route Plus
            </Link>
          </article>

          <article className="segment-card">
            <p className="section-tag">Managed Launch</p>
            <h3 className="segment-title">Puesta en marcha guiada por el operador</h3>
            <p className="route-note">Aquí la ruta pasa al registro real del dominio, DNS y preparación de lanzamiento, mientras permanece bajo control del operador.</p>
            <ul className="feature-list">
              <li className="feature-item">Transferencia de registrar del lado del servidor</li>
              <li className="feature-item">Cola de lanzamiento y revisión del operador</li>
              <li className="feature-item">Puente entre ruta rápida y puesta en marcha seria</li>
            </ul>
            <Link href="/es/contact" className="btn-primary">
              Iniciar Managed Launch
            </Link>
          </article>
        </div>
      </section>

      <CtaDock
        title="El builder ahora se lee como una capa de producto guiada, no como un juguete."
        body="Desde aquí podemos seguir construyendo la lógica de publicación, el seguimiento del intake y la profundización de módulos sin reinventar la ruta cada vez."
        primary={{ href: "/es/contact", label: "Hablar de una ruta de lanzamiento" }}
        secondary={{ href: "/es/studio", label: "Ver la ruta de estudio" }}
        locale="es"
      />
      <Footer />
    </SiteFrame>
  );
}
