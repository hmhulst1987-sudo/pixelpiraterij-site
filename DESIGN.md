# PixelPiraterij Design System

Dit bestand is leidend voor de huidige visuele lijn van `pixelpiraterij-site`.
Het is gebaseerd op de actuele code in:

- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/theme-switch.tsx`
- `src/lib/template-route-builder.ts`

Doel:
- geen afhankelijkheid meer van oude screenshots
- een vaste designbasis voor `.nl`, World-achtige lagen en utility-routes
- één leesbare lijn voor toekomstige builders, apps en docs

## 1. Merkstructuur

De huidige richting is geen losstaande verzameling stijlen meer.
Er is één PixelPiraterij-systeem met verschillende lagen:

- `.nl flagship`
  - zwaardere merklaag
  - studiopresentatie
  - premium, authored, directioneel
- `World / template / apps / docs`
  - dezelfde familie
  - iets rustiger en meer systemisch
  - nog steeds warm, niet generiek SaaS, niet hacker-groen
- `utility-apps / hub`
  - moeten deze systemische lijn volgen
  - niet terugvallen op oude "groene hacker" of losse app-kleuren
  - wel compacter, functioneler en scherper in hiërarchie

Kort:
- flagship = merkzwaarder
- world/hub/utilities = systeemzwaarder
- maar allemaal uit dezelfde familie

## 2. Thema’s

Globale themakeuze in de site:

- `sand`
- `night`

Extra builder-preview thema:

- `forest`

Belangrijk:
- `sand` is het standaardthema van de site
- `night` is de donkere variant
- `forest` is nu vooral een route-/previewthema, niet de hoofdhuisstijl van het hele platform

## 3. Kernkleuren

### Basis brand tokens

- `--color-signal`: `#c95634`
- `--color-ember`: `#ad4327`
- `--color-brass`: `#a87a4d`

Gebruik:

- `signal` = primaire accentkleur / merkactie
- `ember` = diepere primaire toon voor gradients en CTA’s
- `brass` = warm secundair accent voor labels, meta-info en subtiele markering

### Sand theme

- `--color-canvas`: `#efe2d2`
- `--color-canvas-top`: `#f7efe5`
- `--color-paper`: `rgba(255, 250, 244, 0.88)`
- `--color-paper-strong`: `#fffaf4`
- `--color-shell`: `rgba(247, 238, 227, 0.84)`
- `--color-shell-strong`: `rgba(255, 250, 244, 0.95)`
- `--color-text`: `#19232e`
- `--color-heading`: `#101822`
- `--color-muted`: `rgba(25, 35, 46, 0.78)`
- `--color-soft`: `rgba(25, 35, 46, 0.58)`
- `--color-line`: `rgba(34, 46, 60, 0.12)`
- `--color-line-strong`: `rgba(34, 46, 60, 0.22)`
- `--color-inner-highlight`: `rgba(255, 255, 255, 0.72)`
- `--tone-signal-wash`: `rgba(201, 86, 52, 0.13)`
- `--tone-brass-wash`: `rgba(168, 122, 77, 0.13)`
- `--noise-line`: `rgba(25, 35, 46, 0.05)`
- `--selection-text`: `#fff7f1`

Karakter:
- warm zand
- editorial maar niet fragiel
- premium zonder luxe-cliche

### Night theme

- `--color-canvas`: `#0d121a`
- `--color-canvas-top`: `#0a0f16`
- `--color-paper`: `rgba(17, 24, 33, 0.88)`
- `--color-paper-strong`: `rgba(20, 27, 37, 0.96)`
- `--color-shell`: `rgba(12, 17, 24, 0.88)`
- `--color-shell-strong`: `rgba(16, 22, 31, 0.96)`
- `--color-text`: `#dde4ec`
- `--color-heading`: `#f7f1e9`
- `--color-muted`: `rgba(221, 228, 236, 0.8)`
- `--color-soft`: `rgba(221, 228, 236, 0.58)`
- `--color-line`: `rgba(255, 255, 255, 0.08)`
- `--color-line-strong`: `rgba(255, 255, 255, 0.16)`
- `--color-inner-highlight`: `rgba(255, 255, 255, 0.08)`
- `--tone-signal-wash`: `rgba(201, 86, 52, 0.15)`
- `--tone-brass-wash`: `rgba(168, 122, 77, 0.09)`
- `--noise-line`: `rgba(255, 255, 255, 0.03)`
- `--selection-text`: `#ffffff`

Karakter:
- donker, maar niet neon
- geen pure black tech vibe
- warm, gecontroleerd, systemisch

### Builder preview themes

#### Sand preview

- gradient: `#c46f46 -> #693a27`

#### Forest preview

- gradient: `#486b53 -> #1d3026`

#### Night preview

- gradient: `#171f2d -> #090d15`

Gebruik:
- alleen voor route-preview, niet als losse huisstijl voor alles

## 4. Typografie

### Font families

Actuele font-stack:

- Display: `Space Grotesk`
- Body: `Manrope`
- Mono / labels: `IBM Plex Mono`

### Rollen

- `Space Grotesk`
  - headlines
  - grote titels
  - paneelkoppen
  - route-/builder-koppen
- `Manrope`
  - bodytekst
  - interface copy
  - langere uitleg
  - buttons en gewone UI-tekst
- `IBM Plex Mono`
  - labels
  - tags
  - metadata
  - statusregels
  - kleine UI-signalen

### Belangrijkste schaal

#### Hero

- `hero-title`: `clamp(3.2rem, 7vw, 6.6rem)`
- gewicht: `700`
- line-height: `0.9`
- tracking: `-0.075em`

#### Section title

- `section-title`: `clamp(2.15rem, 4vw, 4.6rem)`
- tracking: `-0.055em`
- line-height: `0.94`

#### Manifest / mid-display

- `manifest-title`: `clamp(1.85rem, 3vw, 2.7rem)`
- tracking: `-0.045em`

#### Body

- standaard body rond `0.95rem - 1.05rem`
- line-height meestal tussen `1.72` en `1.86`

#### Labels / meta

- mono labels rond `0.68rem - 0.8rem`
- uppercase
- tracking tussen `0.14em` en `0.18em`

### Typografische regels

- grote koppen mogen compact en zwaar zijn
- bodytekst blijft luchtig en rustig
- labels zijn mono en klein
- geen drukke serif-lijn toevoegen
- geen generieke default sans vervangen zonder duidelijke reden

## 5. Vormtaal

### Radius

- `--radius-shell`: `2rem`
- `--radius-panel`: `1.55rem`

Concreet:

- hoofdcontainers: groot, zacht afgerond
- panelen en cards: afgerond maar stevig
- pills en buttons: vaak `999px`

### Borders

Basis:

- lichte subtiele lijnen
- vaak translucent
- geen harde zwarte randen

Voorbeeld:

- standaard lijn: `var(--color-line)`
- sterkere lijn: `var(--color-line-strong)`

### Shadows

- `--shadow-shell`: `0 28px 65px rgba(39, 24, 15, 0.12)`
- `--shadow-panel`: `0 22px 55px rgba(39, 24, 15, 0.1)`

Night override:

- `--shadow-shell`: `0 38px 85px rgba(3, 7, 14, 0.42)`
- `--shadow-panel`: `0 26px 60px rgba(3, 7, 14, 0.28)`

Schaduwstijl:

- zacht
- breed
- niet "e-commerce floaty"
- meer atmosferisch dan functioneel

### Highlights

Veel panelen gebruiken:

- inner highlight
- zachte gradient-border overlay
- subtiele warme glow

Dit moet premium voelen, niet skeuomorphic.

## 6. Buttons en CTA’s

### Primary

- gradient van `ember` naar `signal`
- tekst: licht (`#fff7f1` of vergelijkbaar)
- pill-shape
- lichte vertical lift op hover

### Secondary

- translucent background
- subtiele border
- kleur op basis van `muted` / `heading`
- nooit saai grijs zonder warmte

### Interactie

Transitietempo:

- `220ms cubic-bezier(0.23, 1, 0.32, 1)`

Active:

- `scale(0.98)`

## 7. Layout, grid en spacing

### Basisritme

De site werkt in een vrij ruime ritmiek:

- veel blokken hebben `gap: 0.7rem - 1.4rem`
- secties hebben ruime verticale adem
- `section-block` start op `margin-top: 6rem`

### Container

- outer content wrapper max: `92rem`
- zijpadding:
  - mobiel: `1rem`
  - groter: `1.5rem` en `2rem`

### Veelgebruikte afstanden

- kleine gaps: `0.3rem - 0.8rem`
- normale UI-gap: `1rem`
- sectie-inhoud: `1.25rem - 1.5rem`
- grote sectieafstand: `5rem - 6rem`

### Gridlogica

Mobiel:
- bijna alles 1 kolom

Tablet:
- 2 kolommen waar logisch

Desktop:
- 3 kolommen voor cards/segments/packages
- asymmetrische split voor hero en builder

### Belangrijke gridpatronen

- hero: `1.22fr / 0.78fr`
- builder: `0.92fr / 1.08fr`
- packages: 3 kolommen op desktop
- segments: 3 kolommen op desktop

## 8. Achtergrond en sfeer

De achtergrond mag nooit dood vlak zijn.

Huidige lijn:

- zachte radial washes
- lichte noise-grid
- warme gradients
- translucent shells

Dus:
- geen kale witte pagina
- geen vlak zwart dashboard
- geen standaard SaaS clean-room look

## 9. Licht en donker

### Sand

Gebruik voor:
- standaard merkpresentatie
- flagship-route
- template- en salesgerichte pagina’s
- publieke builder-ingang

### Night

Gebruik voor:
- systemische of tool-achtige momenten
- zwaardere product-/operator-feel
- wanneer een donker oppervlak echt functioneel voelt

Belangrijk:
- donker is een variant, niet de standaardidentiteit
- sand blijft de hoofdtoon van het merk

## 10. Utility-apps en hub

De utility-apps moeten niet een derde huisstijl starten.

Ze moeten volgen:

- dezelfde fonts
- dezelfde warm-tech kleurenfamilie
- dezelfde rounded shell logic
- dezelfde subtiele brand-accenten

Maar compacter:

- minder grote hero-drama
- strakkere functionele hiërarchie
- minder editorial pacing
- meer directe task UI

### Richting voor utilities

- canvassen uit `sand` of `night`
- accent via `signal`, `ember`, `brass`
- geen groen hackerpalet
- geen losse neon app-identiteiten

### Richting voor hub

De hub hoort dichter bij `World / system layer` te zitten dan bij een losse appstore-look.

Dus:
- warm systemisch
- rustig
- betrouwbaar
- duidelijk gelabeld
- geen goedkope icon-grid vibe

## 11. Statuskleuren

Er is nog geen volledig formeel statuspalet uitgewerkt, maar de huidige lijn suggereert:

- primary action / success-ish progression:
  - `signal` / warme rood-oranje
- review / blocked:
  - `ember`
- neutral meta:
  - `soft` / `muted`

Aanbevolen uitbreiding voor later:

- success: afgeleide warme groen/olijf, niet fel
- warning: gedempt amber
- error: diep baksteenrood
- info: brass- of slate-afgeleide toon

Geen felle standaard Material-statuskleuren introduceren zonder afstemming.

## 12. Do’s

- Gebruik `Space Grotesk + Manrope + IBM Plex Mono`
- Werk vanuit `sand` als primaire merktoon
- Houd accentkleuren warm en authored
- Gebruik grote rounded shells en panelen
- Houd bodytekst rustig en goed leesbaar
- Laat utility-oppervlakken compacter zijn, maar wel in dezelfde familie
- Gebruik subtiele atmosferische achtergrondlagen

## 13. Don’ts

- Geen groen hacker-thema
- Geen generieke blauwe SaaS-huisstijl
- Geen platte witte pagina’s zonder sfeer
- Geen losse app-kleuren per utility
- Geen sharp corporate cards zonder warmte
- Geen nieuwe fontfamilies toevoegen zonder duidelijke reden
- Geen dark mode als dominante identiteit behandelen

## 14. Praktische samenvatting

Als iemand snel moet weten hoe PixelPiraterij er visueel uit hoort te zien:

- warm zand als hoofdwereld
- donker als gecontroleerde tweede laag
- `Space Grotesk` voor koppen
- `Manrope` voor body
- `IBM Plex Mono` voor labels
- baksteenrood / ember / brass als accentfamilie
- grote afgeronde panelen
- zachte luxe schaduwen
- geen generieke SaaS, geen hacker-groen, geen losse submerken

## 15. Leidende lijn voor nu

Voor huidige en komende bouw:

- `.nl flagship`, `.online world` en `hub/utilities` horen visueel familie van elkaar te zijn
- verschil zit in zwaarte en gebruiksdoel, niet in totaal andere huisstijl
- utilities volgen de `system world`-lijn, niet een oud afwijkend app-thema
