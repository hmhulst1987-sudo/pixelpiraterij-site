import type { Metadata } from "next";
import { CtaDock, Footer, ManifestAside, PageHero, SectionHeader, SiteFrame, Topbar } from "@/components/site-shell";
import { DomainSearch } from "@/components/domain-search";

export const metadata: Metadata = {
  title: "Domeinnamen | PixelPiraterij",
  description:
    "Controleer direct of je domeinnaam vrij is en leg hem vast bij PixelPiraterij. Inclusief DNS die meteen goed staat.",
};

export default function DomeinenPage() {
  const serviceSignals = [
    {
      label: "DNS",
      text: "Een domein is pas iets waard als het ergens naartoe wijst. Ik zet de records meteen goed, zodat je niet met nameservers hoeft te schuiven of te wachten tot iemand anders het doet.",
    },
    {
      label: "Verlengen",
      text: "Je betaalt per jaar hetzelfde tarief. Geen lokkertje in het eerste jaar dat daarna stilletjes verdubbelt, want dat is precies waar mensen op afknappen.",
    },
    {
      label: "Verhuizen",
      text: "Je domein blijft van jou. Wil je later weg, dan krijg je de verhuiscode zonder gedoe en zonder dat ik er een afscheidsgesprek van maak.",
    },
    {
      label: "Een aanspreekpunt",
      text: "Site, hosting en domein bij dezelfde partij betekent dat er niemand is die naar een ander kan wijzen als er iets niet werkt.",
    },
  ];

  return (
    <SiteFrame>
      <Topbar />
      <PageHero
        kicker="Domeinnamen"
        title={
          <>
            Eerst de naam.
            <br />
            Dan de rest.
          </>
        }
        body="Een domein vastleggen is de kleinste stap van een nieuw plan, en tegelijk de stap waar het vaakst op blijft liggen. Hier kun je direct kijken wat er vrij is en het meteen regelen."
        primaryCta={{ href: "#zoeken", label: "Check je naam" }}
        secondaryCta={{ href: "/templates", label: "Bekijk de template-route" }}
        aside={
          <ManifestAside
            capLeft="Registratie"
            capRight="Per jaar"
            problemKicker="Oud probleem"
            stanceKicker="Nieuwe houding"
            problemTitle="Een domein kopen is simpel, maar het goed laten werken is dat niet."
            problemBody="De naam is binnen een minuut geregeld. Daarna sta je met nameservers, DNS-records en een hoster die naar je registrar wijst, terwijl je alleen een site online wilde hebben."
            stanceTitle="Ik lever het domein en zet het meteen goed."
            stanceBody="Je krijgt de naam op je eigen gegevens, met DNS die al wijst naar waar je site straks draait. Geen tussenstap waarin jij de techniek moet begrijpen."
          />
        }
      />

      <section className="section-block" id="zoeken">
        <SectionHeader
          index="01"
          title="Kijk of je naam nog vrij is."
          body="Ik vraag het live op bij de registry, niet uit een lijstje. Je ziet meteen wat er beschikbaar is en wat het per jaar kost."
        />
        <div className="mt-8">
          <DomainSearch />
        </div>
      </section>

      <section className="section-block">
        <SectionHeader
          index="02"
          title="Wat je erbij krijgt."
          body="Ik ga niet concurreren op prijs met partijen die honderdduizenden domeinen draaien. Wat ik wel kan bieden is dat het meteen goed staat en dat er iemand opneemt."
        />
        <div className="stack-board">
          {serviceSignals.map((item) => (
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
          title="Hoort een domein bij een site, dan zit hij erbij."
          body="Neem je een template-route of een managed pakket af, dan hoef je het domein niet apart te regelen of apart te betalen. Het hoort bij de livegang."
        />
        <div className="segment-grid">
          {[
            {
              tag: "Bij een pakket",
              title: "Inbegrepen",
              body: "Bij de template-route en de managed plannen zit je domein in het abonnement. Kies je een duurdere extensie dan een .nl of .eu, dan zie je het verschil vooraf.",
            },
            {
              tag: "Los",
              title: "Gewoon per jaar",
              body: "Wil je alleen de naam en verder niets, dan kan dat ook. Je betaalt per jaar, je krijgt toegang tot de DNS en je zit nergens aan vast.",
            },
            {
              tag: "Later alsnog",
              title: "Verhuizen kan",
              body: "Heb je je domein ergens anders staan en wil je het hierheen halen, dan regel ik de verhuizing. Stuur even een bericht met de naam erbij.",
            },
          ].map((item) => (
            <article key={item.title} className="segment-card">
              <p className="section-tag">{item.tag}</p>
              <h3 className="segment-title">{item.title}</h3>
              <p className="route-note">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaDock
        title="Naam gevonden, maar nog geen idee wat erop komt?"
        body="Dan is de volgende stap geen techniek maar een gesprek. Vertel wat je van plan bent en ik zeg eerlijk of een template-route genoeg is of dat je beter af bent met maatwerk."
        primary={{ href: "/contact", label: "Stuur een bericht" }}
        secondary={{ href: "/templates", label: "Bekijk de template-route" }}
      />
      <Footer />
    </SiteFrame>
  );
}
