import type { Locale } from "@/lib/site-data";

/**
 * De starter-routes die live op .online draaien. De previewbeelden komen van
 * .online zelf, zodat er één bron blijft en een herbouw daar ook hier landt.
 */
const previewBase = "https://pixelpiraterij.online/preview-shots";

export type StarterTemplate = {
  slug: string;
  title: string;
  domain: string;
  preview: string;
  copy: Record<Locale, { tag: string; note: string }>;
};

export const starterTemplates: StarterTemplate[] = [
  {
    slug: "hovenier",
    title: "Hof & Hei",
    domain: "hovenier.pixelpiraterij.online",
    preview: `${previewBase}/hovenier.jpg`,
    copy: {
      nl: { tag: "Service starter", note: "Tuin- en landschapsatelier dat werkt vanuit het beplantingsplan." },
      en: { tag: "Service starter", note: "Garden and landscape studio built around its planting plan." },
      fr: { tag: "Service starter", note: "Atelier de jardin et paysage construit autour de son plan de plantation." },
      es: { tag: "Service starter", note: "Estudio de jardín y paisaje construido alrededor de su plan de plantación." },
      de: { tag: "Service starter", note: "Garten- und Landschaftsatelier, aufgebaut auf seinem Pflanzplan." },
    },
  },
  {
    slug: "festival",
    title: "Havenlicht",
    domain: "festival.pixelpiraterij.online",
    preview: `${previewBase}/festival.jpg`,
    copy: {
      nl: { tag: "Event starter", note: "Festival met een werkende tijdtafel die overlappende acts opmerkt." },
      en: { tag: "Event starter", note: "Festival with a working timetable that spots clashing acts." },
      fr: { tag: "Event starter", note: "Festival avec un vrai programme qui repère les concerts qui se chevauchent." },
      es: { tag: "Event starter", note: "Festival con un horario real que detecta actuaciones que se solapan." },
      de: { tag: "Event starter", note: "Festival mit echtem Zeitplan, der sich überschneidende Acts erkennt." },
    },
  },
  {
    slug: "makelaar",
    title: "Werf & Vecht",
    domain: "makelaar.pixelpiraterij.online",
    preview: `${previewBase}/makelaar.jpg`,
    copy: {
      nl: { tag: "Listings starter", note: "Makelaardij met filterbaar aanbod en vergelijking op prijs per m²." },
      en: { tag: "Listings starter", note: "Estate agency with filterable listings and price per m² comparison." },
      fr: { tag: "Listings starter", note: "Agence immobilière avec annonces filtrables et comparaison au m²." },
      es: { tag: "Listings starter", note: "Inmobiliaria con listados filtrables y comparación por precio por m²." },
      de: { tag: "Listings starter", note: "Maklerbüro mit filterbaren Objekten und Vergleich nach Preis pro m²." },
    },
  },
  {
    slug: "stichting",
    title: "Leeslicht",
    domain: "stichting.pixelpiraterij.online",
    preview: `${previewBase}/stichting.jpg`,
    copy: {
      nl: { tag: "Impact starter", note: "Goed doel met een teller die meeloopt terwijl je zit te lezen." },
      en: { tag: "Impact starter", note: "Charity with a counter that keeps running while you read." },
      fr: { tag: "Impact starter", note: "Association avec un compteur qui avance pendant que vous lisez." },
      es: { tag: "Impact starter", note: "Organización benéfica con un contador que avanza mientras lees." },
      de: { tag: "Impact starter", note: "Gemeinnütziges Projekt mit einem Zähler, der weiterläuft, während du liest." },
    },
  },
  {
    slug: "sjoerd",
    title: "Sjoerd",
    domain: "sjoerd.pixelpiraterij.online",
    preview: `${previewBase}/sjoerd.jpg`,
    copy: {
      nl: { tag: "Hospitality starter", note: "Baskische pintxos in een sterrenrestaurant." },
      en: { tag: "Hospitality starter", note: "Basque pintxos in a starred restaurant." },
      fr: { tag: "Hospitality starter", note: "Pintxos basques dans un restaurant étoilé." },
      es: { tag: "Hospitality starter", note: "Pintxos vascos en un restaurante con estrella." },
      de: { tag: "Hospitality starter", note: "Baskische Pintxos in einem Sternerestaurant." },
    },
  },
  {
    slug: "computerwinkel",
    title: "TechPunt Computers",
    domain: "computerwinkel.pixelpiraterij.online",
    preview: `${previewBase}/techpunt.jpg`,
    copy: {
      nl: { tag: "Retail starter", note: "Computerspeciaalzaak, productgericht en vertrouwenswaardig." },
      en: { tag: "Retail starter", note: "Computer specialist, product-led and trustworthy." },
      fr: { tag: "Retail starter", note: "Spécialiste informatique, axé produit et digne de confiance." },
      es: { tag: "Retail starter", note: "Tienda especializada en informática, centrada en producto y de fiar." },
      de: { tag: "Retail starter", note: "Computerfachgeschäft, produktorientiert und vertrauenswürdig." },
    },
  },
  {
    slug: "rcatelier",
    title: "RC Atelier",
    domain: "rcatelier.pixelpiraterij.online",
    preview: `${previewBase}/rcatelier.jpg`,
    copy: {
      nl: { tag: "Hobby retail starter", note: "Premium RC-helikopters, drones, auto's en boten." },
      en: { tag: "Hobby retail starter", note: "Premium RC helicopters, drones, cars and boats." },
      fr: { tag: "Hobby retail starter", note: "Hélicoptères RC, drones, voitures et bateaux haut de gamme." },
      es: { tag: "Hobby retail starter", note: "Helicópteros RC, drones, coches y barcos de gama alta." },
      de: { tag: "Hobby retail starter", note: "Hochwertige RC-Helikopter, Drohnen, Autos und Boote." },
    },
  },
  {
    slug: "tradingplatform",
    title: "TradingPlatform",
    domain: "tradingplatform.pixelpiraterij.online",
    preview: `${previewBase}/tradingplatform.jpg`,
    copy: {
      nl: { tag: "Dashboard starter", note: "Demo van een algoritmisch handelsdashboard." },
      en: { tag: "Dashboard starter", note: "Demo of an algorithmic trading dashboard." },
      fr: { tag: "Dashboard starter", note: "Démo d'un tableau de bord de trading algorithmique." },
      es: { tag: "Dashboard starter", note: "Demo de un panel de trading algorítmico." },
      de: { tag: "Dashboard starter", note: "Demo eines algorithmischen Trading-Dashboards." },
    },
  },
  {
    slug: "paperback",
    title: "Digital Paperback Atelier",
    domain: "paperback.pixelpiraterij.online",
    preview: `${previewBase}/paperback.jpg`,
    copy: {
      nl: { tag: "Cultural starter", note: "Uitgeverij- en boekenroute." },
      en: { tag: "Cultural starter", note: "Publishing and books route." },
      fr: { tag: "Cultural starter", note: "Route édition et livres." },
      es: { tag: "Cultural starter", note: "Ruta de edición y libros." },
      de: { tag: "Cultural starter", note: "Route für Verlag und Bücher." },
    },
  },
];

export const starterGalleryCopy: Record<Locale, { title: string; body: string; visit: string; hint: string }> = {
  nl: {
    title: "Dit zijn de routes die er nu al staan.",
    body: "Geen mockups maar echte sites die je kunt openen. Elk heeft een eigen structuur, palet en lettercombinatie — dat is precies het verschil met een thema waar alleen de kleuren van wisselen.",
    visit: "Bekijk de site",
    hint: "Beweeg over een kaart om door de site te scrollen.",
  },
  en: {
    title: "These are the routes that already exist.",
    body: "Not mockups but real sites you can open. Each has its own structure, palette and type pairing — which is exactly what separates it from a theme where only the colours change.",
    visit: "Open the site",
    hint: "Hover a card to scroll through the site.",
  },
  fr: {
    title: "Voici les routes qui existent déjà.",
    body: "Pas des maquettes mais de vrais sites que vous pouvez ouvrir. Chacun a sa propre structure, sa palette et son duo typographique — c'est exactement ce qui le distingue d'un thème où seules les couleurs changent.",
    visit: "Ouvrir le site",
    hint: "Survolez une carte pour faire défiler le site.",
  },
  es: {
    title: "Estas son las rutas que ya existen.",
    body: "No son maquetas sino sitios reales que puedes abrir. Cada uno tiene su propia estructura, paleta y pareja tipográfica: eso es justo lo que lo separa de una plantilla en la que solo cambian los colores.",
    visit: "Abrir el sitio",
    hint: "Pasa el ratón por una tarjeta para recorrer el sitio.",
  },
  de: {
    title: "Das sind die Routen, die es schon gibt.",
    body: "Keine Mockups, sondern echte Websites, die du öffnen kannst. Jede hat eine eigene Struktur, Palette und Schriftkombination — genau das unterscheidet sie von einem Theme, bei dem nur die Farben wechseln.",
    visit: "Website öffnen",
    hint: "Fahr über eine Karte, um durch die Website zu scrollen.",
  },
};
