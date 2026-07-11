# Domeinflow en Builderkader

Datum: 2026-07-02
Status: Werkbesluit voor de volgende bouwfase

## 1. Kernbesluit

PixelPiraterij krijgt geen volledig open publieke builder waarin bezoekers vrijblijvend domeinen kunnen reserveren, publiceren of kosten kunnen veroorzaken.

De route wordt:

1. publiek een sterke template-route en duidelijke productuitleg
2. domeincheck als begeleide stap
3. echte registratie alleen via de PixelPiraterij-backend
4. publicatie, DNS en provisioning alleen server-side

Dat houdt drie dingen overeind:

1. grip op kosten
2. grip op misbruik
3. duidelijk verschil tussen snelle template-route en premium maatwerk

## 2. Productpositie

De builder is voor nu geen vrije alleskunner, maar een begeleide template-route met editor.

Dat betekent:

1. de klant start vanuit een sterke basis
2. sfeer, thema, kleur, copy en modules kunnen aangepast worden
3. de opbouw blijft gecontroleerd
4. maatwerk blijft relevant voor zwaardere trajecten

De builder vult dus het gat tussen:

1. volledig maatwerk
2. te goedkope, te generieke builders

## 3. Domeinpositie binnen het product

Een domein kopen hoort in het hele PixelPiraterij-plaatje thuis en niet als los bijproduct.

De domeinlaag wordt daarom:

1. onderdeel van de route naar livegang
2. gekoppeld aan pakketkeuze
3. gekoppeld aan provisioning van DNS, template-config en publicatie
4. niet publiek vrij beschikbaar zonder context of afname

Het domein is dus geen losse knop, maar een gecontroleerde stap in de funnel.

## 4. Aanbevolen stack

### Voorkeursroute

1. Openprovider als registrar-laag
2. Cloudflare voor DNS, edge, security en performance
3. PixelPiraterij-backend als centrale orchestration-laag

### Fallback

1. TransIP als pragmatische NL-first registrar-optie

### Niet als primaire registrar-kern

1. Cloudflare Registrar API

Reden:

1. Cloudflare is sterk voor DNS en live-infra
2. maar de registrar-API is op dit moment nog te beperkt als kern van een volledige automatische koopflow

## 5. Waarom deze keuze

### Openprovider

Past het best als einddoel wanneer PixelPiraterij meerdere extensies, meer volume en een echte resellerachtige flow moet dragen.

Sterke punten:

1. duidelijke developer-positionering
2. REST-API
3. sandbox
4. brede TLD-focus
5. beter passend bij automatische backend-aansturing

### TransIP

Sterke pragmatische route als `.nl` vroeg zwaar moet meewegen.

Sterke punten:

1. officiële REST-documentatie is direct bruikbaar
2. registratie, transfer, contacts, nameservers en DNS zitten in dezelfde API
3. sterke NL-relevantie

### Cloudflare

Moet wel in de stack blijven, maar dan voor:

1. DNS-beheer
2. beveiliging
3. caching
4. performance
5. edge-routing

Niet voor nu als primaire registrar-kern.

## 6. Besluit dat we nu vastzetten

### Strategisch

1. `.nl` is first-class support
2. de flow moet later ook bruikbaar zijn voor andere extensies
3. registratie gebeurt alleen na pakketkeuze en akkoordmoment

### Productmatig

1. domeincheck mag vroeg zichtbaar zijn
2. echte registratie niet
3. builder blijft begeleid en gekaderd
4. zwaardere modules blijven upsells

### Technisch

1. frontend vraagt alleen informatie op
2. backend beslist en voert uit
3. registrar-credentials blijven volledig server-side
4. DNS-acties blijven volledig server-side

## 7. Gewenste gebruikersflow

### Publieke route

1. klant kiest een template-richting
2. klant ziet wat het systeem kan
3. klant vult merknaam, type zaak en gewenste domeinnaam in
4. systeem controleert beschikbaarheid
5. klant kiest pakket
6. klant kiest optionele modules
7. klant rekent af of bevestigt traject
8. backend registreert domein
9. backend zet DNS, route-config en publicatie klaar
10. klant komt in editor of onboarding terecht

### Belangrijk onderscheid

De domeincheck is een discovery-stap.

De domeinregistratie is een betaalde provisioning-stap.

Die twee mogen niet door elkaar lopen.

## 8. Modulelogica

De basisroute blijft licht.

Standaard:

1. merklaag
2. thema
3. copyblokken
4. gallery of content-secties
5. eenvoudige CTA-flow

Extra modules als abonnement of meerprijs:

1. reserveringssysteem
2. agenda of events
3. nieuwsbrief of lead-capture plus
4. uitgebreide intake- of offerteflow
5. klantportaal of loginlaag

Zo blijft het product aantrekkelijk zonder het maatwerkmodel kapot te maken.

## 9. Financieel en operationeel kader

De echte kosten en risico's beginnen niet bij de visuele editor, maar bij:

1. domeinregistratie
2. DNS-provisioning
3. storage
4. backend persistence
5. publish-acties
6. mailflows
7. reserveringslogica
8. supportdruk

Daarom geldt:

1. geen open publieke publiceerknop
2. geen open registrar-acties
3. geen anonieme gratis flow die infra kan aanspreken

## 10. Fasevolgorde

### Fase 1

Richting staat al:

1. template-route
2. editorlaag
3. route-config
4. renderer

### Fase 2

Volgende logische stap:

1. gated access
2. opgeslagen projecten
3. domeincheckservice
4. pakket- en modulelogica
5. registrant-profiel en providerkeuze
6. server-side registrar-prep zonder live registratie

### Huidige stand

De builder staat nu functioneel tot vlak voor de echte registrar-handoff.

Dat betekent:

1. domeinintake en normalisatie zitten in de flow
2. pakketkeuze en modulelogica zitten in de workspace
3. launch-profiel voor registrant en operator zit in de workspace
4. providerkeuze voor Openprovider of TransIP zit in de flow
5. de backend kan de handoff server-side voorbereiden
6. live registratie, DNS-provisioning en publicatie zijn nog bewust niet geactiveerd

### KvK-kader

KvK wordt in deze fase niet als harde technische blokkade behandeld.

Dat betekent:

1. particulier kan zonder KvK door de prep-flow
2. zakelijk kan alvast voorbereid worden zonder directe blokkade
3. ontbrekende KvK blijft wel een reviewpunt voor de uiteindelijke registrar- of factuurstap

### Provider-kader

Voor deze productroute is een provider- of reselleraccount voldoende. Dat is niet hetzelfde als zelf direct `.nl`-registrar worden bij SIDN.

Daarom geldt voor deze fase:

1. we blokkeren niet op een onbevestigde KvK-eis
2. we bouwen door tot aan provider-handoff
3. live accountverificatie, billing en echte registrar-auth blijven pas de volgende stap

### Fase 3

Daarna:

1. echte registrar-koppeling
2. DNS-provisioning
3. publish-flow
4. onboarding na aankoop

### Fase 4

Pas daarna:

1. zwaardere self-serve uitbreidingen
2. reserveringen
3. multi-tenant operations
4. uitgebreidere productautomatisering

## 11. Werkbesluit voor PixelPiraterij

Voor nu werken we verder vanuit deze lijn:

1. PixelPiraterij `.nl` blijft de plek waar deze route als aanbod wordt gepositioneerd
2. de builder blijft begeleid in plaats van volledig vrij
3. domeinregistratie komt achter een gecontroleerde backend-flow
4. Openprovider is de voorkeursroute
5. TransIP blijft de praktische fallback
6. Cloudflare blijft de DNS- en infra-laag

## 12. Open vragen voor later, niet voor nu

Deze hoeven de huidige richting niet te blokkeren:

1. starten we eerst met Openprovider of eerst met TransIP
2. wanneer tonen we prijsindicatie voor domein en modules
3. of de eerste domeincheck publiek blijft of pas na intake
4. of een klant direct mag publiceren of eerst intern review nodig heeft

## 13. Bronnen

1. Openprovider developer portal: https://developers.openprovider.com/
2. Openprovider support: https://support.openprovider.eu/hc/en-us
3. TransIP API docs: https://api.transip.nl/rest/docs.html
4. Cloudflare Registrar API: https://developers.cloudflare.com/registrar/registrar-api/
5. Cloudflare Registrar overview: https://developers.cloudflare.com/registrar/
