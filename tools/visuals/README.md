# Showcase-visuals (bron)

De negen module-impressies in de homepage-showcase zijn **in code gebouwd**
(HTML + `shell.css`), niet gefotografeerd en niet AI-gegenereerd. De
gerenderde afbeeldingen staan in `public/assets/app/{id}.jpg`; dit zijn de
bewerkbare bronnen.

## Bestanden
- `shell.css` — gedeelde stijl (sidebar, topbar, kaarten, tabel, tokens).
- `overzicht.html` … `promoot.html` — de negen schermen. Elk verwijst
  relatief naar `shell.css`, dus je kunt ze direct in een browser openen.
- `gen1.py` / `gen2.py` — de generators die de HTML schreven (referentie; de
  padvariabele `D` bovenin wijst naar een scratchpad en moet je aanpassen om
  opnieuw te genereren).
- `render-pub.mjs` — rendert de HTML naar JPG.

## Een visual bijwerken en opnieuw renderen
1. Pas het betreffende `*.html` (of de generator) aan.
2. Render met Playwright/Chromium op **1440×960, deviceScaleFactor 2**,
   als JPEG kwaliteit ~84, naar `public/assets/app/{id}.jpg`:
   ```js
   const p = await ctx.newPage(); // viewport 1440x960, deviceScaleFactor:2
   await p.goto('file://' + absPad + '/overzicht.html', {waitUntil:'networkidle'});
   await p.screenshot({path:'public/assets/app/overzicht.jpg', type:'jpeg', quality:84});
   ```
   (`render-pub.mjs` doet dit voor alle negen; pas de padvariabele aan.)

## Regels bij het bouwen/bijwerken
- Accuraat: elk label klopt met wat de module doet. Geen verzonnen functies,
  geen AI-framing, geen sparkles (huisstijl §1/§12).
- EmmaZiet toont alleen de live-functies (kaart + KvK/SBI-detectie +
  wekelijkse monitoring), niet prijsvergelijking/reviews/sentiment (roadmap).
- Merk-tokens staan in `shell.css` (kleuren/fonts uit het huisstijlhandboek).
