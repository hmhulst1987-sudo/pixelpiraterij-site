import Link from "next/link";

import { CtaDock, Footer, ManifestAside, PackageGrid, PageHero, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { routeFamilies } from "@/lib/template-route-builder";
import { templateRoutePackages, templateShowcases } from "@/lib/site-data";

export default function TemplatesPage() {
  const templateRules = [
    {
      title: "Vrijheid in sfeer, niet in chaos",
      body: "De editor moet ruimte geven voor kleur, beeld, toon en ritme, zonder dat de fundering van de site uit elkaar valt.",
    },
    {
      title: "Een route, geen goedkope builder",
      body: "PixelPiraterij verkoopt geen lege canvas-ervaring. De klant start vanuit een sterke route die al klopt voor het soort merk of zaak.",
    },
    {
      title: "Modules boven op de basis",
      body: "Reservering, aanvraag, menu of agenda horen niet standaard overal in te zitten. Ze worden logisch toegevoegd waar de route erom vraagt.",
    },
    {
      title: "Doorgroeien zonder opnieuw te beginnen",
      body: "Als een klant groter wordt, moet de route kunnen opschuiven naar meer pagina's, meer logica of uiteindelijk maatwerk zonder dat alles opnieuw hoeft.",
    },
  ];

  const templateFamilies = [
    {
      title: "Artist / maker",
      body: "Voor artiesten, fotografen, labels en culturele makers die snel een eigen wereld willen neerzetten zonder generiek portfolio-gevoel.",
    },
    {
      title: "Hospitality / stay",
      body: "Voor camping, stay, retreat en kleinschalige hospitality-routes waar sfeer, vertrouwen en een rustige boekingsflow leidend zijn.",
    },
    {
      title: "Small service / food",
      body: "Voor koffiebar, lunchzaak, salon of kleine servicebusiness waar presentatie, aanbod en een heldere contact- of reserveringsroute samen moeten vallen.",
    },
  ];

  const moduleSignals = [
    {
      label: "Reservering",
      text: "Voor hospitality, tafelboekingen of plekken die met beschikbaarheid, aanvraag of planning werken. Denk aan pluslagen vanaf ongeveer €10 tot €15 per maand.",
    },
    {
      label: "Aanvraag",
      text: "Voor intake, offerte of booking-achtige flows wanneer contact niet alleen een formulier moet zijn, maar een echte instaproute.",
    },
    {
      label: "Menu / aanbod",
      text: "Voor food, services of kleinere commerciële routes waar aanbod snel leesbaar en makkelijk aanpasbaar moet blijven zonder een maatwerkshop te worden.",
    },
    {
      label: "Agenda / gallery",
      text: "Voor artiesten, makers en culturele routes waar events, releases, beelden of updates een extra laag boven op de basisroute vormen.",
    },
  ];

  const routeLayers = [
    {
      label: "Basisroute",
      text: "Templatefundering, editor voor sfeer en content, live zetten en een snelle instap die niet generiek voelt.",
    },
    {
      label: "Modules",
      text: "Optionele functionele lagen die aansluiten op het type route, zonder dat elke template meteen volgepropt hoeft te worden.",
    },
    {
      label: "Custom vervolg",
      text: "Wanneer de route buiten de templatekaders groeit, schuift het project door naar zwaarder studio- of maatwerkwerk in plaats van krampachtig doorbouwen in het verkeerde model.",
    },
  ];

  const rolloutSignals = [
    {
      label: "Nu",
      text: "Gecureerde template-routes per type zaak of maker, met een editor voor kleur, sfeer, content, routegebonden modules en flow-preview.",
    },
    {
      label: "Hierna",
      text: "Publish-, intake- en beheerstappen per routefamilie, zodat een gekozen flow ook echt door kan lopen naar livegang en opvolging.",
    },
    {
      label: "Later",
      text: "Sterkere koppelingen, beheerlagen en eventueel beperkte self-serve stukken zodra deze route zich commercieel en operationeel eerst bewezen heeft in de praktijk.",
    },
  ];

  const pricingGuides = [
    {
      label: "Standaard inbegrepen",
      title: "De basisroute is al een complete live start",
      body: "Hosting, livegang, basisbeheer en de editor horen bij de instap. Dit is dus niet een kale template waar daarna nog van alles verplicht bij moet.",
    },
    {
      label: "Pluslagen",
      title: "Extra modules starten alleen als ze echt iets oplossen",
      body: "Reservering, aanvraag, menu of agenda komen pas erbij wanneer de route ze nodig heeft. Je betaalt dus niet standaard voor functies die ongebruikt blijven.",
    },
    {
      label: "Maatwerk later",
      title: "Custom werk begint pas wanneer de route het systeem echt ontgroeit",
      body: "Zwaardere logica, meer pagina's of complexere flows schuiven pas door naar maatwerk zodra dat aantoonbaar nodig is. Niet eerder.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Template route met editor"
        title={
          <>
            Snelle routes,
            <br />
            eigen sfeer,
            <br />
            geen standaard
            <br />
            builder.
          </>
        }
        body="Deze route is bedoeld voor klanten die snel live willen zonder in generieke troep te eindigen. Je start vanuit een sterke PixelPiraterij-fundering en trekt die daarna via een editor naar je eigen wereld met kleur, sfeer, content en relevante modules."
        primaryCta={{ href: "/templates/builder", label: "Open de builder-workspace" }}
        secondaryCta={{ href: "/contact", label: "Vraag een template-route aan" }}
        aside={
          <ManifestAside
            capLeft="Route-start"
            capRight="Editor-pad"
            problemKicker="Oud probleem"
            stanceKicker="Nieuwe houding"
            problemTitle="Snelle websites voelen vaak alsof elk merk dezelfde mal heeft gekregen."
            problemBody="Dan win je tijd, maar verlies je sfeer, onderscheid en geloofwaardigheid. Zeker zodra een klant niet volledig maatwerk zoekt maar wel iets eigens wil neerzetten."
            stanceTitle="De template-route moet een sterke basis geven en daarna ruimte laten voor een eigen wereld."
            stanceBody="Niet vrij bouwen vanaf nul, maar starten vanuit een bewezen route en die via editor, thema en modules naar de juiste beleving trekken."
          />
        }
      />

      <section className="section-block">
        <SectionHeader
          index="01"
          title="Niet elke klant heeft maatwerk nodig, maar ook niet elke klant kan met een generiek template wegkomen."
          body="Daarom wordt de template-route opgebouwd per type merk of zaak. Niet als losse skins, maar als sterke starts die al kloppen voor hun context."
        />
        <div className="segment-grid">
          {templateFamilies.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Templatefamilie</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="De builder opent als begeleide workspace, niet als vrije speeltuin."
          body="Je kiest eerst de juiste routefamilie. Daarna ga je pas de workspace in, inclusief pakketlaag, domein-intake en modulelogica."
        />
        <div className="segment-grid">
          {routeFamilies.map((family) => {
            const copy = family.defaults.nl;

            return (
              <article key={family.slug} className="segment-card">
                <p className="section-tag">Builder-start</p>
                <h3 className="segment-title">{copy.label}</h3>
                <p className="route-note">{copy.audience}</p>
                <ul className="feature-list">
                  {copy.sections.slice(0, 4).map((section) => (
                    <li key={section} className="feature-item">
                      {section}
                    </li>
                  ))}
                </ul>
                <Link href={`/templates/builder?family=${family.slug}#workspace`} className="btn-secondary">
                  Open deze workspace
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="03"
          title="De basisroute verkoopt de sfeer. Modules verkopen de functie."
          body="Een Le Radel-achtige route kan opnieuw voor een andere camping werken, maar net zo goed voor een andere hospitality- of servicecontext. De fundering blijft sterk, de laag erboven wordt aangepast op doel en gebruik."
        />
        <ShowcaseGrid items={templateShowcases} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="04"
          title="Wat binnen de editor mag bewegen en wat juist vast moet blijven."
          body="De klant moet veel kunnen vormen, maar niet de kwaliteitslat omver trekken. Zo blijft het snel, bruikbaar en onderscheidend tegelijk."
        />
        <div className="segment-grid">
          {templateRules.map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">Principes</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="05"
          title="Functionele modules horen erbovenop te komen, niet verstopt in elk template."
          body="Reservering, aanvraag, menu of agenda zijn geen universele standaardlaag. Ze worden aangeboden waar ze commercieel en praktisch logisch zijn."
        />
        <div className="stack-board stack-board--clean">
          {moduleSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="06"
          title="Deze route moet kunnen doorgroeien zonder opnieuw te beginnen."
          body="De template-route is de snelle instap. Daarna moet de klant logisch kunnen opschalen naar modules, extra diepte of uiteindelijk maatwerk."
        />
        <div className="stack-board stack-board--clean">
          {routeLayers.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="07"
          title="Eerst de basisroute, daarna alleen de pluslagen die echt nodig zijn."
          body="Je betaalt hier niet meteen voor een compleet maatwerksysteem. De start blijft compact, extra modules komen alleen erbij waar ze echt iets oplossen en custom werk begint pas zodra de route daar aantoonbaar uit groeit."
        />
        <div className="signal-panel">
          <p className="section-tag">Informatielaag</p>
          <h3 className="stack-title">Je koopt hier niet blind een pakket, maar een route die pas zwaarder wordt als dat logisch is.</h3>
          <p className="stack-copy">
            Daardoor blijft de instap helder, blijven extra kosten uitlegbaar en voelt het verschil tussen basis, pluslaag en vervolg ook echt eerlijk.
          </p>
        </div>
        <div className="system-grid">
          {pricingGuides.map((item) => (
            <article key={item.title} className="system-card">
              <p className="section-tag">{item.label}</p>
              <h3 className="system-title">{item.title}</h3>
              <p className="system-body">{item.body}</p>
            </article>
          ))}
        </div>
        <PackageGrid items={templateRoutePackages} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="08"
          title="Zo bouwen we de productlaag op zonder hem groter te verkopen dan hij nu is."
          body="We beginnen met een gecureerde editorroute en laten pas daarna preview-, module- en publishlogica verder uitgroeien. Daarmee blijft het geloofwaardig en commercieel bruikbaar."
        />
        <div className="stack-board stack-board--clean">
          {rolloutSignals.map((item) => (
            <article key={item.label} className="stack-row">
              <p className="stack-label">{item.label}</p>
              <p className="stack-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Als je snel live wilt zonder dat het generiek of goedkoop aanvoelt, is dit de juiste route."
        body="De template-route vult het gat tussen een standaard template en volledig maatwerk. Eerst een sterke basis, daarna de juiste modules en pas daarna zwaarder custom werk als dat nodig blijkt."
        primary={{ href: "/templates/builder", label: "Open de builder-workspace" }}
        secondary={{ href: "/studio", label: "Zie hoe dit aansluit op de studio" }}
      />
      <Footer />
    </SiteFrame>
  );
}
