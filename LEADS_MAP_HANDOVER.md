# Leads-kaart voortgang

Opgeslagen voor herstart op 2026-09-10.

## Gereed

- Nieuwe afgeschermde `POST /api/leads/nearby` route.
- Zoeken rond latitude/longitude met een instelbare straal van 0,5 tot 50 km.
- Vijf verschillende bedrijfsgroepen, maximaal twintig resultaten per groep.
- Duplicaten worden op Google Place ID samengevoegd.
- Iedere respons meldt exact vijf uitgevoerde Places-verzoeken en eventuele mislukte groepen.
- De nieuwe route valt onder dezelfde Basic Auth-beveiliging als de leads-pagina.

## Afgerond na herstart

- Interactieve Google-kaart, plaatszoeker en klikbaar middelpunt toegevoegd.
- Straalkeuze 5/10/20/25 km toegevoegd.
- Gevonden websites worden automatisch met beperkte gelijktijdigheid beoordeeld.
- Kaartmarkeringen, voortgang, samenvatting en verkoopkansfilters toegevoegd.
- Lokale maandteller toegevoegd; Google Cloud Monitoring blijft leidend voor facturatie.
- Aparte, op HTTP-referrers beperkte browser-key voor Maps JavaScript aangemaakt.
- Server-key uitgebreid met Geocoding zonder de productie-IP-restrictie te verwijderen.
- Typecheck en productiebuild uitgevoerd.

## Productieconfiguratie

- Stel `GOOGLE_MAPS_BROWSER_KEY` in bij de bestaande website-runtime.
- `GOOGLE_PLACES_API_KEY` blijft uitsluitend server-side en is beperkt tot het productie-IP.
- Test na deployment een zoekopdracht vanuit `/studio/leads`; lokale Places-tests werken bewust niet met de productie-IP-restrictie.
