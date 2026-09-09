# PixelPiraterij leadmachine

## Veilige werkwijze Nederland

- Gebruik Google Places API voor ontdekking; scrape Google Maps niet.
- Sla van Places duurzaam alleen het Place ID op. Audit de openbare bedrijfswebsite onafhankelijk en bewaar alleen de eigen meetresultaten en notities.
- Controleer vóór bellen altijd de rechtsvorm en het telefoonnummer. BV, NV, stichting en vereniging mogen via een algemeen zakelijk nummer worden benaderd wanneer het aanbod relevant is.
- Bel een eenmanszaak, VOF of maatschap alleen als aantoonbare, specifieke toestemming bestaat of binnen de wettelijke klantrelatie-uitzondering. Een KVK-vermelding of NMI-registratie is geen beltoestemming.
- Leg opt-intekst, versie, tijdstip, bron en bewijs vast. Verwerk een bezwaar direct in een permanente suppressielijst.
- Respecteer robots.txt, gebruik lage scanfrequenties en scan alleen openbare pagina's.

## Inrichting

`/gratis-websitecheck` is de publieke toestemmingsfunnel. `/studio/leads` is met Basic Auth afgeschermd. De scan mailt de operator en stuurt het volledige record naar `LEAD_WEBHOOK_URL`; koppel die URL aan een beveiligde Cloudflare Worker/D1, CRM of automatisering. Zonder webhook blijft e-mailnotificatie werken, maar is er geen duurzame centrale leadopslag.

Google Places vereist `GOOGLE_PLACES_API_KEY`. Beperk deze sleutel in Google Cloud tot Places API (New), de productieomgeving en een passend budget/quotum. De studio toont bewust eerst “rechtsvorm controleren”; ontdekking is nooit automatisch toestemming.

Benodigde productievariabelen:

- `GOOGLE_PLACES_API_KEY`: beperkte server-key voor Places API (New).
- `LEADS_ADMIN_USER` en `LEADS_ADMIN_PASSWORD`: toegang tot `/studio/leads`.
- `LEAD_WEBHOOK_URL` en optioneel `LEAD_WEBHOOK_TOKEN`: duurzame leadopslag.
- `RESEND_API_KEY`, `DOMAIN_OPERATOR_EMAIL` en `EMAIL_FROM`: melding aan de operator.

## Verkoopritme

1. Selecteer per dag één branche en één regio.
2. Verwijder bestaande klanten, suppressies en ongeschikte rechtsvormen.
3. Scan en beoordeel de website; noteer maximaal drie aantoonbare verbeterpunten.
4. Bel alleen een toegestane lead. Open met observatie en relevantie, niet met een generieke pitch.
5. Bied eerst ontwerp/herbouw aan; hosting blijft een heldere optionele beheerlaag.
6. Registreer uitkomst, bezwaar en opvolgdatum direct.
