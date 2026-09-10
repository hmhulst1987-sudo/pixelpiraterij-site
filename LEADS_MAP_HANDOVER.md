# Leads-kaart voortgang

Opgeslagen voor herstart op 2026-09-10.

## Gereed

- Nieuwe afgeschermde `POST /api/leads/nearby` route.
- Zoeken rond latitude/longitude met een instelbare straal van 0,5 tot 50 km.
- Vijf verschillende bedrijfsgroepen, maximaal twintig resultaten per groep.
- Duplicaten worden op Google Place ID samengevoegd.
- Iedere respons meldt exact vijf uitgevoerde Places-verzoeken en eventuele mislukte groepen.
- De nieuwe route valt onder dezelfde Basic Auth-beveiliging als de leads-pagina.

## Na herstart

- Interactieve Google-kaart en plaatszoeker toevoegen aan `leads-studio.tsx`.
- Radiuskeuze 5/10/20/25 km toevoegen.
- Automatische websitescans met beperkte gelijktijdigheid uitvoeren.
- Kaartmarkeringen, verkoopkansfilters en voortgang tonen.
- Maandteller in de browser toevoegen en als toolteller benoemen.
- `GOOGLE_MAPS_BROWSER_KEY` aan `.env.example` toevoegen; browserkey beperken tot Maps JavaScript API, Geocoding API en `pixelpiraterij.nl`.
- Typecheck, build en functionele tests uitvoeren.
