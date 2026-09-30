# Lead studio pilot: operationele grenzen

Status op 2026-09-30: de featurebranch is lokaal en tegen een geisoleerde testdatabase getest. De worker, previewservice en lead-database zijn niet als afzonderlijke productie-Coolify-services ingericht. Deze tekst is geen bewijs dat het systeem live is.

In Google Cloud bestaat nu het project `pixelpiraterij-leads-chd` onder `chateauduhoux@gmail.com`, maar Google weigert koppeling aan de enige beschikbare billingrekening wegens billing-quota. Het project is daarom onbetaald en heeft geen actieve Places-sleutel. Wijzig de bestaande site-key niet totdat de billingkoppeling en projectquota zijn geverifieerd. In het bestaande project `pixelpiraterij-chd` staat wel budget `47147cdc-5acf-488a-acdb-63d8941f90ee`: EUR 10 per maand, uitsluitend Places API (New) en Geocoding, met waarschuwingen op 50/90/100 procent. Dit is geen hard bestedingsplafond.

## Diensten

- De publieke Next.js-site bevat de afgeschermde `/studio/leads`-interface en de lead-API's. `LEADS_ADMIN_USER` en `LEADS_ADMIN_PASSWORD` moeten beide zijn ingesteld; de worker gebruikt een aparte `LEADS_WORKER_TOKEN` van minimaal 32 tekens.
- De worker bouwt uit `Dockerfile.lead-worker`, heeft geen publieke poort, en krijgt `LEADS_DATABASE_URL`, `LEADS_SITE_URL` en dezelfde `LEADS_WORKER_TOKEN` als de site. Een heartbeat in de database is nodig voordat Start kan worden ingeschakeld.
- De lead-database gebruikt `db/lead-studio.sql` en start in modus `paused`. Gebruik een aparte database en een eigen rol; migreer niet de bestaande app-databases als bijwerking.
- De private generator bouwt uit `Dockerfile.pixelpiraterij` in de websitegenerator-branch. De site gebruikt `PREVIEW_SERVICE_URL` op het interne netwerk en `PREVIEW_SERVICE_TOKEN`; de generator krijgt dezelfde token en een persistent `/data/previews`-volume. Publiceer de generator niet rechtstreeks onder een domein. Concepten verlopen na 14 dagen.
- `GOOGLE_PLACES_API_KEY` en optioneel `FIRECRAWL_API_KEY` staan alleen op de site. Beperk de sleutels bij de providers. `LEADS_OUTREACH_ENABLED` blijft `false` en de AI-limiet blijft 0 totdat beide afzonderlijk zijn beoordeeld.

## Gedrag en kosten

Start/Pauze bestuurt alleen de worker; de site en VPS blijven bereikbaar. Pauze verhindert nieuwe externe aanvragen; een al begonnen aanvraag mag afronden. De worker bewaart campagnes, runs, kandidaten en verdiepende jobs in PostgreSQL. Na een crash markeert hij onderbroken betaalde stappen voor handmatige inspectie in plaats van blind opnieuw aan te vragen.

De database reserveert capaciteit voor elke betaalde aanvraag voordat de provider wordt aangeroepen. Pilotlimieten per Amsterdamse kalendermaand: 20 runs, 100 Places-verzoeken, 300 Firecrawl-credits, 25 geocodes, 10 previews en 0 AI-aanvragen. Gereserveerde of mislukte aanvragen blijven conservatief meetellen. De schatting in de studio is een bruto-lijstprijsschatting, geen factuur of providerhardlimiet. Nearby Search met `websiteUri` valt in de Enterprise-SKU. Stel providerquota, billingwaarschuwingen en Firecrawl-kredietgrenzen apart in voordat een echte campagne start.

De automatische flow ontdekt bedrijven, controleert de eigen website op meerdere pagina's en mobiel signaal, ontdubbelt Place ID's, verlaagt de prioriteit van herkenbare ketens en zet alleen een shortlist klaar voor een duurdere Firecrawl-verdieping. Grootte en visuele kwaliteit zijn inschattingen, geen geverifieerde feiten. Bewaar geen ruwe Places-respons als permanent prospectprofiel; de kandidaatopslag bevat een Place ID en afzonderlijk op de bedrijfswebsite geobserveerde informatie.

## Twee handmatige poorten

Een concept ontstaat alleen na de afzonderlijke knop **Bouw concept** en controle van naam, dienst en openbaar contactgegeven. De generator accepteert momenteel alleen de goedgekeurde `service-editorial`-template. De negen geplande startpunten zijn niet gereed. Dezelfde idempotency key en gegevens hergebruiken hetzelfde concept, ook als de opslaglimiet is bereikt. De preview blijft privé en verandert niets aan het domein van de kandidaat.

Een conceptmail is geen toestemming om die te versturen. Verzenden vereist een tweede handmatige actie, bewijs van een toepasselijke grondslag, en geen bezwaar/suppressie. Het verzendendpoint staat standaard uit. Telefonisch contact heeft een apart beoordelingsrecord; het systeem belt zelf niet. Zie `LEAD_MACHINE.md` voor de actuele juridische poort.

## Uitrolvolgorde

1. Controleer de Coolify-login en capaciteit op de bestaande Chateau du Houx VPS. Maak een afzonderlijke lead-database/rol, worker-service en private previewservice met persistent volume en beperkte secrets; laat de publieke site apart.
2. Draai `db/lead-studio.sql` op alleen de nieuwe lead-database en `db/lead-studio-smoke.sql` met rollback. Verifieer standaard `paused` en ontbrekende toegang zonder beheergegevens.
3. Test staging met nagebootste Places/Firecrawl-antwoorden: Start/Pauze, limiet bereikt, crash/herstart, dubbele kandidaten en preview-retry. Controleer preview op desktop en 390px mobiel zonder horizontale overflow.
4. Configureer providerquota en waarschuwingen. Doe daarna maximaal een kleine echte zoekronde en een handmatig gekozen preview. Controleer de werkelijke providerregistraties tegen de meter.
5. Koppel pas daarna de geteste branches aan productie. Verifieer de live route, heartbeat, database-isolatie, privaat previewpad en uitgeschakeld verzenden opnieuw. Geen automatische e-mail of telefoonactie.

Bronnen: [Google Places-prijzen](https://developers.google.com/maps/billing-and-pricing/pricing), [Google Maps opslagregels](https://developers.google.com/maps/documentation/places/web-service/policies), [Firecrawl-prijzen](https://www.firecrawl.dev/pricing), [ACM e-mail](https://www.acm.nl/nl/verkoop-aan-consumenten/reclame-en-verleiden/spam-voorkomen-uw-reclame), [ACM telemarketing](https://www.acm.nl/nl/verkoop-aan-consumenten/reclame-en-verleiden/verkoop-telemarketing).
