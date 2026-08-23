import type { Locale } from "@/lib/site-data";
import type { DomainSearchCopy } from "@/components/domain-search";

/** Eén slug voor alle talen, anders breekt de taalwisselaar op deze pagina. */
export const domainPageSlug = "domeinen";

export function domainPageHref(locale: Locale): string {
  return locale === "nl" ? `/${domainPageSlug}` : `/${locale}/${domainPageSlug}`;
}

function localeHref(locale: Locale, path: string): string {
  return locale === "nl" ? path : `/${locale}${path}`;
}

export const domainNavLabel: Record<Locale, string> = {
  nl: "Domeinen",
  en: "Domains",
  fr: "Domaines",
  es: "Dominios",
  de: "Domains",
};

export const domainSearchCopy: Record<Locale, DomainSearchCopy> = {
  nl: {
    label: "Welke naam wil je?",
    placeholder: "bijvoorbeeld hofenhei",
    submit: "Controleer",
    submitting: "Bezig met controleren...",
    free: "Vrij",
    taken: "Bezet",
    unknown: "Onbekend",
    perYear: "per jaar",
    exVat: "excl. btw",
    select: "Vastzetten",
    selected: "Gekozen",
    order: "Vastleggen",
    ordering: "Bezig...",
    empty: "Typ een naam en ik kijk direct bij de registry welke extensies nog vrij zijn.",
    hint: "Prijzen zijn per jaar, inclusief btw. Verlengen gaat tegen hetzelfde tarief.",
  },
  en: {
    label: "Which name do you want?",
    placeholder: "for example hofenhei",
    submit: "Check",
    submitting: "Checking...",
    free: "Free",
    taken: "Taken",
    unknown: "Unknown",
    perYear: "per year",
    exVat: "excl. VAT",
    select: "Reserve",
    selected: "Chosen",
    order: "Claim it",
    ordering: "Working...",
    empty: "Type a name and I will ask the registry straight away which extensions are still free.",
    hint: "Prices are per year, VAT included. Renewal costs the same as the first year.",
  },
  fr: {
    label: "Quel nom voulez-vous ?",
    placeholder: "par exemple hofenhei",
    submit: "Vérifier",
    submitting: "Vérification...",
    free: "Libre",
    taken: "Pris",
    unknown: "Inconnu",
    perYear: "par an",
    exVat: "HT",
    select: "Réserver",
    selected: "Choisi",
    order: "Réserver",
    ordering: "En cours...",
    empty: "Tapez un nom et j'interroge directement le registre pour voir quelles extensions sont libres.",
    hint: "Prix annuels, TVA comprise. Le renouvellement coûte le même tarif.",
  },
  es: {
    label: "¿Qué nombre quieres?",
    placeholder: "por ejemplo hofenhei",
    submit: "Comprobar",
    submitting: "Comprobando...",
    free: "Libre",
    taken: "Ocupado",
    unknown: "Desconocido",
    perYear: "al año",
    exVat: "sin IVA",
    select: "Reservar",
    selected: "Elegido",
    order: "Reservar",
    ordering: "Un momento...",
    empty: "Escribe un nombre y consulto al registro al instante qué extensiones siguen libres.",
    hint: "Precios anuales, IVA incluido. La renovación cuesta lo mismo.",
  },
  de: {
    label: "Welchen Namen willst du?",
    placeholder: "zum Beispiel hofenhei",
    submit: "Prüfen",
    submitting: "Wird geprüft...",
    free: "Frei",
    taken: "Vergeben",
    unknown: "Unbekannt",
    perYear: "pro Jahr",
    exVat: "zzgl. MwSt.",
    select: "Sichern",
    selected: "Gewählt",
    order: "Sichern",
    ordering: "Moment...",
    empty: "Tipp einen Namen ein und ich frage sofort beim Registry nach, welche Endungen noch frei sind.",
    hint: "Preise pro Jahr, inklusive MwSt. Die Verlängerung kostet dasselbe.",
  },
};

export type DomainSectionCopy = { title: string; body: string };

export const domainSectionCopy: Record<Locale, DomainSectionCopy> = {
  nl: {
    title: "Je domein regel je hier meteen.",
    body: "Een naam vastleggen is de kleinste stap van een nieuw plan, en tegelijk de stap waar het vaakst op blijft liggen. Kijk direct wat vrij is — en of je nu een site bij me afneemt of alleen de naam wilt, ik zet de DNS meteen goed.",
  },
  en: {
    title: "Sort your domain out right here.",
    body: "Claiming a name is the smallest step of a new plan, and the one that stalls most often. See what is free straight away — and whether you take a site from me or only want the name, I set the DNS up properly.",
  },
  fr: {
    title: "Votre domaine se règle ici, tout de suite.",
    body: "Réserver un nom est la plus petite étape d'un nouveau projet, et pourtant celle qui traîne le plus souvent. Voyez ce qui est libre immédiatement — que vous preniez un site chez moi ou seulement le nom, je configure le DNS correctement.",
  },
  es: {
    title: "Tu dominio se resuelve aquí mismo.",
    body: "Registrar un nombre es el paso más pequeño de un plan nuevo y, aun así, el que más se atasca. Mira ahora mismo qué está libre — tanto si me encargas un sitio como si solo quieres el nombre, dejo el DNS bien configurado.",
  },
  de: {
    title: "Deine Domain regelst du direkt hier.",
    body: "Einen Namen zu sichern ist der kleinste Schritt eines neuen Vorhabens und trotzdem der, der am häufigsten liegen bleibt. Sieh sofort, was frei ist — ob du eine Website bei mir nimmst oder nur den Namen willst, ich richte das DNS gleich richtig ein.",
  },
};

export const domainSectionLinkLabel: Record<Locale, string> = {
  nl: "Alles over domeinen",
  en: "More about domains",
  fr: "Tout sur les domaines",
  es: "Todo sobre dominios",
  de: "Mehr über Domains",
};

export type DomainPageCopy = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  titleLines: [string, string];
  heroBody: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  manifest: {
    capLeft: string;
    capRight: string;
    problemKicker: string;
    stanceKicker: string;
    problemTitle: string;
    problemBody: string;
    stanceTitle: string;
    stanceBody: string;
  };
  searchSection: { title: string; body: string };
  serviceSection: { title: string; body: string; items: { label: string; text: string }[] };
  packageSection: { title: string; body: string; cards: { tag: string; title: string; body: string }[] };
  cta: { title: string; body: string; primary: string; secondary: string };
};

export const domainPageCopy: Record<Locale, DomainPageCopy> = {
  nl: {
    metaTitle: "Domeinnamen | PixelPiraterij",
    metaDescription:
      "Controleer direct of je domeinnaam vrij is en leg hem vast bij PixelPiraterij. Inclusief DNS die meteen goed staat.",
    kicker: "Domeinnamen",
    titleLines: ["Eerst de naam.", "Dan de rest."],
    heroBody:
      "Een domein vastleggen is de kleinste stap van een nieuw plan, en tegelijk de stap waar het vaakst op blijft liggen. Hier kun je direct kijken wat er vrij is en het meteen regelen.",
    primaryCta: "Check je naam",
    secondaryCta: "Bekijk de template-route",
    secondaryHref: "/templates",
    manifest: {
      capLeft: "Registratie",
      capRight: "Per jaar",
      problemKicker: "Oud probleem",
      stanceKicker: "Nieuwe houding",
      problemTitle: "Een domein kopen is simpel, maar het goed laten werken is dat niet.",
      problemBody:
        "De naam is binnen een minuut geregeld. Daarna sta je met nameservers, DNS-records en een hoster die naar je registrar wijst, terwijl je alleen een site online wilde hebben.",
      stanceTitle: "Ik lever het domein en zet het meteen goed.",
      stanceBody:
        "Je krijgt de naam op je eigen gegevens, met DNS die al wijst naar waar je site straks draait. Geen tussenstap waarin jij de techniek moet begrijpen.",
    },
    searchSection: {
      title: "Kijk of je naam nog vrij is.",
      body: "Ik vraag het live op bij de registry, niet uit een lijstje. Je ziet meteen wat er beschikbaar is en wat het per jaar kost.",
    },
    serviceSection: {
      title: "Wat je erbij krijgt.",
      body: "Ik ga niet concurreren op prijs met partijen die honderdduizenden domeinen draaien. Wat ik wel kan bieden is dat het meteen goed staat en dat er iemand opneemt.",
      items: [
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
      ],
    },
    packageSection: {
      title: "Hoort een domein bij een site, dan zit hij erbij.",
      body: "Neem je een template-route of een managed pakket af, dan hoef je het domein niet apart te regelen of apart te betalen. Het hoort bij de livegang.",
      cards: [
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
      ],
    },
    cta: {
      title: "Naam gevonden, maar nog geen idee wat erop komt?",
      body: "Dan is de volgende stap geen techniek maar een gesprek. Vertel wat je van plan bent en ik zeg eerlijk of een template-route genoeg is of dat je beter af bent met maatwerk.",
      primary: "Stuur een bericht",
      secondary: "Bekijk de template-route",
    },
  },
  en: {
    metaTitle: "Domain names | PixelPiraterij",
    metaDescription:
      "Check straight away whether your domain name is free and claim it at PixelPiraterij, with DNS set up properly from the start.",
    kicker: "Domain names",
    titleLines: ["First the name.", "Then the rest."],
    heroBody:
      "Claiming a domain is the smallest step of a new plan, and at the same time the step that stalls most often. Here you can see what is free and settle it right away.",
    primaryCta: "Check your name",
    secondaryCta: "See the template route",
    secondaryHref: "/templates",
    manifest: {
      capLeft: "Registration",
      capRight: "Per year",
      problemKicker: "Old problem",
      stanceKicker: "New stance",
      problemTitle: "Buying a domain is simple. Making it actually work is not.",
      problemBody:
        "The name is sorted within a minute. After that you are stuck with nameservers, DNS records and a host pointing back at your registrar, when all you wanted was a site online.",
      stanceTitle: "I supply the domain and set it up properly.",
      stanceBody:
        "You get the name on your own details, with DNS already pointing where your site will run. No step in between where you have to understand the plumbing.",
    },
    searchSection: {
      title: "See whether your name is still free.",
      body: "I ask the registry live, not a cached list. You see immediately what is available and what it costs per year.",
    },
    serviceSection: {
      title: "What you get with it.",
      body: "I am not going to compete on price with companies running hundreds of thousands of domains. What I can offer is that it works from the start and that somebody picks up the phone.",
      items: [
        {
          label: "DNS",
          text: "A domain is only worth something once it points somewhere. I set the records right away, so you never have to move nameservers around or wait for someone else to do it.",
        },
        {
          label: "Renewal",
          text: "You pay the same rate every year. No cheap first year that quietly doubles afterwards, because that is exactly what puts people off.",
        },
        {
          label: "Moving away",
          text: "Your domain stays yours. If you want to leave later you get the transfer code without fuss and without me turning it into a farewell conversation.",
        },
        {
          label: "One point of contact",
          text: "Site, hosting and domain in the same place means nobody can point at somebody else when something stops working.",
        },
      ],
    },
    packageSection: {
      title: "If the domain belongs to a site, it comes with it.",
      body: "Take a template route or a managed plan and you do not have to arrange or pay for the domain separately. It is part of going live.",
      cards: [
        {
          tag: "With a package",
          title: "Included",
          body: "On the template route and the managed plans your domain sits inside the subscription. Pick an extension pricier than a .nl or .eu and you see the difference up front.",
        },
        {
          tag: "On its own",
          title: "Simply per year",
          body: "If you only want the name and nothing else, that works too. You pay per year, you get access to the DNS, and you are not tied to anything.",
        },
        {
          tag: "Later on",
          title: "Transfers welcome",
          body: "Already have a domain elsewhere and want it here? I will handle the transfer. Send a message with the name and I will pick it up.",
        },
      ],
    },
    cta: {
      title: "Found a name but no idea what goes on it yet?",
      body: "Then the next step is not technical but a conversation. Tell me what you are planning and I will say honestly whether a template route is enough or whether you are better off with custom work.",
      primary: "Send a message",
      secondary: "See the template route",
    },
  },
  fr: {
    metaTitle: "Noms de domaine | PixelPiraterij",
    metaDescription:
      "Vérifiez immédiatement si votre nom de domaine est libre et réservez-le chez PixelPiraterij, avec un DNS configuré correctement dès le départ.",
    kicker: "Noms de domaine",
    titleLines: ["D'abord le nom.", "Ensuite le reste."],
    heroBody:
      "Réserver un domaine est la plus petite étape d'un nouveau projet, et pourtant celle qui traîne le plus souvent. Ici vous voyez ce qui est libre et vous réglez cela tout de suite.",
    primaryCta: "Vérifiez votre nom",
    secondaryCta: "Voir la route template",
    secondaryHref: "/templates",
    manifest: {
      capLeft: "Enregistrement",
      capRight: "Par an",
      problemKicker: "Ancien problème",
      stanceKicker: "Nouvelle position",
      problemTitle: "Acheter un domaine est simple. Le faire fonctionner correctement ne l'est pas.",
      problemBody:
        "Le nom est réglé en une minute. Ensuite vous vous retrouvez avec des serveurs de noms, des enregistrements DNS et un hébergeur qui renvoie vers votre registraire, alors que vous vouliez juste un site en ligne.",
      stanceTitle: "Je fournis le domaine et je le configure correctement.",
      stanceBody:
        "Vous obtenez le nom à vos propres coordonnées, avec un DNS qui pointe déjà là où votre site tournera. Aucune étape intermédiaire où vous devez comprendre la technique.",
    },
    searchSection: {
      title: "Regardez si votre nom est encore libre.",
      body: "J'interroge le registre en direct, pas une liste mise en cache. Vous voyez tout de suite ce qui est disponible et ce que cela coûte par an.",
    },
    serviceSection: {
      title: "Ce que vous obtenez avec.",
      body: "Je ne vais pas concurrencer sur le prix des acteurs qui gèrent des centaines de milliers de domaines. Ce que je peux offrir, c'est que tout fonctionne dès le départ et que quelqu'un réponde.",
      items: [
        {
          label: "DNS",
          text: "Un domaine ne vaut quelque chose qu'une fois qu'il pointe quelque part. Je configure les enregistrements tout de suite, pour que vous n'ayez jamais à déplacer des serveurs de noms ni à attendre quelqu'un d'autre.",
        },
        {
          label: "Renouvellement",
          text: "Vous payez le même tarif chaque année. Pas de première année bradée qui double discrètement ensuite, car c'est précisément ce qui décourage les gens.",
        },
        {
          label: "Départ",
          text: "Votre domaine reste le vôtre. Si vous voulez partir plus tard, vous recevez le code de transfert sans histoires et sans que j'en fasse une conversation d'adieu.",
        },
        {
          label: "Un seul interlocuteur",
          text: "Site, hébergement et domaine au même endroit : personne ne peut désigner quelqu'un d'autre quand quelque chose ne marche plus.",
        },
      ],
    },
    packageSection: {
      title: "Si le domaine fait partie d'un site, il est compris.",
      body: "Avec une route template ou un forfait géré, vous n'avez ni à organiser ni à payer le domaine séparément. Il fait partie de la mise en ligne.",
      cards: [
        {
          tag: "Avec un forfait",
          title: "Compris",
          body: "Sur la route template et les forfaits gérés, votre domaine est inclus dans l'abonnement. Choisissez une extension plus chère qu'un .nl ou un .eu et vous voyez la différence à l'avance.",
        },
        {
          tag: "Séparément",
          title: "Simplement par an",
          body: "Si vous voulez seulement le nom et rien d'autre, c'est possible aussi. Vous payez par an, vous accédez au DNS, et vous n'êtes engagé à rien.",
        },
        {
          tag: "Plus tard",
          title: "Transferts bienvenus",
          body: "Votre domaine est ailleurs et vous voulez le rapatrier ? Je m'occupe du transfert. Envoyez un message avec le nom et je m'en charge.",
        },
      ],
    },
    cta: {
      title: "Nom trouvé, mais aucune idée de ce qui va dessus ?",
      body: "L'étape suivante n'est alors pas technique mais une conversation. Dites-moi ce que vous préparez et je vous dirai honnêtement si une route template suffit ou si du sur-mesure vous conviendrait mieux.",
      primary: "Envoyer un message",
      secondary: "Voir la route template",
    },
  },
  es: {
    metaTitle: "Nombres de dominio | PixelPiraterij",
    metaDescription:
      "Comprueba al instante si tu nombre de dominio está libre y regístralo en PixelPiraterij, con el DNS bien configurado desde el principio.",
    kicker: "Nombres de dominio",
    titleLines: ["Primero el nombre.", "Después lo demás."],
    heroBody:
      "Registrar un dominio es el paso más pequeño de un plan nuevo y, al mismo tiempo, el que más se atasca. Aquí ves qué está libre y lo resuelves en el momento.",
    primaryCta: "Comprueba tu nombre",
    secondaryCta: "Ver la ruta de plantillas",
    secondaryHref: "/templates",
    manifest: {
      capLeft: "Registro",
      capRight: "Al año",
      problemKicker: "Problema de siempre",
      stanceKicker: "Nueva postura",
      problemTitle: "Comprar un dominio es sencillo. Que funcione bien, no.",
      problemBody:
        "El nombre se resuelve en un minuto. Después te quedas con servidores de nombres, registros DNS y un alojamiento que apunta de vuelta a tu registrador, cuando solo querías un sitio en línea.",
      stanceTitle: "Yo entrego el dominio y lo dejo bien configurado.",
      stanceBody:
        "Recibes el nombre a tus propios datos, con el DNS apuntando ya a donde funcionará tu sitio. Sin un paso intermedio en el que tengas que entender la técnica.",
    },
    searchSection: {
      title: "Mira si tu nombre sigue libre.",
      body: "Lo consulto en vivo al registro, no a una lista guardada. Ves al instante qué hay disponible y cuánto cuesta al año.",
    },
    serviceSection: {
      title: "Lo que viene incluido.",
      body: "No voy a competir en precio con empresas que gestionan cientos de miles de dominios. Lo que sí puedo ofrecer es que funcione desde el primer momento y que haya alguien que te atienda.",
      items: [
        {
          label: "DNS",
          text: "Un dominio solo vale algo cuando apunta a alguna parte. Configuro los registros de inmediato, así nunca tienes que mover servidores de nombres ni esperar a que lo haga otro.",
        },
        {
          label: "Renovación",
          text: "Pagas la misma tarifa cada año. Sin un primer año barato que después se duplica en silencio, porque es justo eso lo que harta a la gente.",
        },
        {
          label: "Marcharse",
          text: "Tu dominio sigue siendo tuyo. Si más adelante quieres irte, recibes el código de traspaso sin líos y sin que yo lo convierta en una conversación de despedida.",
        },
        {
          label: "Un único interlocutor",
          text: "Sitio, alojamiento y dominio en el mismo sitio significa que nadie puede señalar a otro cuando algo deja de funcionar.",
        },
      ],
    },
    packageSection: {
      title: "Si el dominio va con un sitio, va incluido.",
      body: "Con una ruta de plantillas o un plan gestionado no tienes que organizar ni pagar el dominio aparte. Forma parte de la puesta en marcha.",
      cards: [
        {
          tag: "Con un plan",
          title: "Incluido",
          body: "En la ruta de plantillas y en los planes gestionados tu dominio va dentro de la suscripción. Si eliges una extensión más cara que un .nl o un .eu, ves la diferencia por adelantado.",
        },
        {
          tag: "Por separado",
          title: "Simplemente al año",
          body: "Si solo quieres el nombre y nada más, también vale. Pagas al año, tienes acceso al DNS y no te atas a nada.",
        },
        {
          tag: "Más adelante",
          title: "Los traslados son bienvenidos",
          body: "¿Tienes el dominio en otro sitio y lo quieres aquí? Yo me encargo del traslado. Mándame un mensaje con el nombre y lo pongo en marcha.",
        },
      ],
    },
    cta: {
      title: "¿Nombre encontrado pero aún sin idea de qué poner encima?",
      body: "Entonces el siguiente paso no es técnico sino una conversación. Cuéntame qué tienes en mente y te diré con franqueza si basta una ruta de plantillas o si te conviene más un trabajo a medida.",
      primary: "Envía un mensaje",
      secondary: "Ver la ruta de plantillas",
    },
  },
  de: {
    metaTitle: "Domainnamen | PixelPiraterij",
    metaDescription:
      "Prüfe sofort, ob dein Domainname frei ist, und sichere ihn bei PixelPiraterij — mit DNS, das von Anfang an richtig steht.",
    kicker: "Domainnamen",
    titleLines: ["Zuerst der Name.", "Dann der Rest."],
    heroBody:
      "Eine Domain zu sichern ist der kleinste Schritt eines neuen Vorhabens und zugleich der, der am häufigsten liegen bleibt. Hier siehst du, was frei ist, und regelst es direkt.",
    primaryCta: "Namen prüfen",
    secondaryCta: "Template-Route ansehen",
    secondaryHref: "/templates",
    manifest: {
      capLeft: "Registrierung",
      capRight: "Pro Jahr",
      problemKicker: "Altes Problem",
      stanceKicker: "Neue Haltung",
      problemTitle: "Eine Domain zu kaufen ist einfach. Sie zum Laufen zu bringen nicht.",
      problemBody:
        "Der Name ist in einer Minute geregelt. Danach stehst du vor Nameservern, DNS-Einträgen und einem Hoster, der auf deinen Registrar zurückverweist — dabei wolltest du nur eine Website online haben.",
      stanceTitle: "Ich liefere die Domain und richte sie gleich richtig ein.",
      stanceBody:
        "Du bekommst den Namen auf deine eigenen Daten, mit DNS, das schon dorthin zeigt, wo deine Website später läuft. Kein Zwischenschritt, bei dem du die Technik verstehen musst.",
    },
    searchSection: {
      title: "Schau, ob dein Name noch frei ist.",
      body: "Ich frage live beim Registry nach, nicht in einer gespeicherten Liste. Du siehst sofort, was verfügbar ist und was es pro Jahr kostet.",
    },
    serviceSection: {
      title: "Was du dazubekommst.",
      body: "Ich werde nicht über den Preis mit Anbietern konkurrieren, die Hunderttausende Domains verwalten. Was ich bieten kann: Es steht von Anfang an richtig, und es geht jemand ran.",
      items: [
        {
          label: "DNS",
          text: "Eine Domain ist erst etwas wert, wenn sie irgendwohin zeigt. Ich setze die Einträge sofort, damit du nie Nameserver umschieben oder auf jemand anderen warten musst.",
        },
        {
          label: "Verlängerung",
          text: "Du zahlst jedes Jahr denselben Tarif. Kein billiges erstes Jahr, das sich danach still verdoppelt — genau daran verlieren Leute die Lust.",
        },
        {
          label: "Wechseln",
          text: "Deine Domain bleibt deine. Willst du später weg, bekommst du den Transfercode ohne Umstände und ohne dass ich ein Abschiedsgespräch daraus mache.",
        },
        {
          label: "Ein Ansprechpartner",
          text: "Website, Hosting und Domain an einem Ort heißt: Niemand kann auf jemand anderen zeigen, wenn etwas nicht funktioniert.",
        },
      ],
    },
    packageSection: {
      title: "Gehört die Domain zu einer Website, ist sie dabei.",
      body: "Bei einer Template-Route oder einem Managed-Paket musst du die Domain weder separat regeln noch separat bezahlen. Sie gehört zum Livegang.",
      cards: [
        {
          tag: "Im Paket",
          title: "Inklusive",
          body: "Bei der Template-Route und den Managed-Plänen steckt deine Domain im Abo. Wählst du eine teurere Endung als .nl oder .eu, siehst du den Unterschied vorher.",
        },
        {
          tag: "Einzeln",
          title: "Einfach pro Jahr",
          body: "Wenn du nur den Namen willst und sonst nichts, geht das auch. Du zahlst pro Jahr, bekommst Zugriff auf das DNS und bindest dich an nichts.",
        },
        {
          tag: "Später",
          title: "Umzüge willkommen",
          body: "Domain liegt woanders und soll hierher? Den Transfer übernehme ich. Schick eine Nachricht mit dem Namen, dann kümmere ich mich darum.",
        },
      ],
    },
    cta: {
      title: "Namen gefunden, aber noch keine Idee, was drauf soll?",
      body: "Dann ist der nächste Schritt kein technischer, sondern ein Gespräch. Erzähl, was du vorhast, und ich sage dir ehrlich, ob eine Template-Route reicht oder ob Maßarbeit besser passt.",
      primary: "Nachricht schicken",
      secondary: "Template-Route ansehen",
    },
  },
};

export function domainPageLinks(locale: Locale) {
  const copy = domainPageCopy[locale];
  return {
    secondary: localeHref(locale, copy.secondaryHref),
    contact: localeHref(locale, "/contact"),
    templates: localeHref(locale, "/templates"),
  };
}
