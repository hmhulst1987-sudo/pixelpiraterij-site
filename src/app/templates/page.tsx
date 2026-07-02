import { CtaDock, Footer, ManifestAside, PackageGrid, PageHero, SectionHeader, ShowcaseGrid, SiteFrame, Topbar } from "@/components/site-shell";
import { TemplateRouteEditorDemo } from "@/components/template-route-editor-demo";
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
      text: "Voor hospitality, tafelboekingen of plekken die met beschikbaarheid, aanvraag of planning werken. Denk aan pluslagen vanaf ongeveer €20 tot €25 per maand.",
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
        primaryCta={{ href: "/contact", label: "Vraag een template-route aan" }}
        secondaryCta={{ href: "/", label: "Terug naar de routekaart" }}
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
          title="Zo kan de eerste builderlaag meteen tastbaar worden."
          body="Niet als vrije builder zonder richting, maar als een gestructureerde editor die al een opslaanbare route-config en een losse renderer oplevert."
        />
        <TemplateRouteEditorDemo />
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
        <div className="stack-board">
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
        <div className="stack-board">
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
          title="Zo leest het aanbod commercieel het helderst."
          body="De basisroute blijft simpel. Functionele pluslagen komen er logisch bovenop en maatwerk blijft de volgende stap zodra iemand buiten het systeem groeit."
        />
        <PackageGrid items={templateRoutePackages} />
      </section>

      <section className="section-block">
        <SectionHeader
          index="08"
          title="Zo bouwen we de productlaag op zonder hem groter te verkopen dan hij nu is."
          body="We beginnen met een gecureerde editorroute en laten pas daarna preview-, module- en publishlogica verder uitgroeien. Daarmee blijft het geloofwaardig en commercieel bruikbaar."
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
        title="Als je snel live wilt zonder dat het generiek of goedkoop aanvoelt, is dit de juiste route."
        body="De template-route vult het gat tussen een standaard template en volledig maatwerk. Eerst een sterke basis, daarna de juiste modules en pas daarna zwaarder custom werk als dat nodig blijkt."
        primary={{ href: "/contact", label: "Praat over een launch-route" }}
        secondary={{ href: "/studio", label: "Zie hoe dit aansluit op de studio" }}
      />
      <Footer />
    </SiteFrame>
  );
}
