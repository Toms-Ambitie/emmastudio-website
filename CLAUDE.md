@AGENTS.md

# Emma Studio — Merk & Huisstijlgids

Dit bestand is de enkelvoudige bron van waarheid voor de Emma Studio website.
Elke sessie: lees dit eerst. Wijk niet af zonder expliciete toestemming.

---

## 1. Merkidentiteit

**Naam:** emma — altijd kleine letters, altijd met de coral punt (het beeldmerk).  
**Merk-url:** www.emmastudio.nl  
**Eigenaar:** Toms Ambitie  
**Tagline (onveranderlijk):** "Jij doet je werk. Emma de rest."  
**Kernwoorden:** rustig · slim · behulpzaam · doordacht · allesomvattend

### Wat Emma wél is
- Rustig en zelfverzekerd
- Slim, maar geen showoff
- Warm en menselijk
- Praktisch en concreet
- Premium voelend, genderneutraal

### Wat Emma níet is
- Schreeuwerig of pushy (geen Salesforce-energie)
- Vrouwelijk-roze of stereotyperend
- AI-aankondigend (geen sparkles, geen robots, geen "AI" als ophef)
- Kinderlijk (geen mascottes of karakters)
- Luxe-prijzig (geen goud of marble)

---

## 2. Kleurenpalet

### Kernkleuren (exact — nooit zelf omrekenen)
| Naam   | Hex       | RGB             | Gebruik                       |
|--------|-----------|-----------------|-------------------------------|
| Coral  | `#EB5C43` | 235 · 92 · 67   | Primair accent, CTA-knoppen   |
| Petrol | `#0E3D37` | 14 · 61 · 55    | Nav, donkere secties          |
| Inkt   | `#1C1715` | 28 · 23 · 21    | Koppen, primaire tekst, footer|
| Crème  | `#FBF4EA` | 251 · 244 · 234 | Standaard pagina-achtergrond  |

### Accenten
| Naam         | Hex       | Gebruik                    |
|--------------|-----------|----------------------------|
| Teal         | `#16B79C` | Frisse accent, links, tags |
| Amber        | `#FFB23E` | Warme accent, badges       |
| Coral diep   | `#E8462B` | Hover-staat coral          |
| Petrol licht | `#15514A` | Hover-staat petrol         |

### Neutrale schaalverdeling
| Naam     | Hex / waarde | Gebruik                    |
|----------|-------------|----------------------------|
| Crème    | `#FBF4EA`   | Achtergrond standaard      |
| Papier   | `#FFFFFF`   | Kaarten, modals            |
| Lijn     | `#ECE2D6`   | Borders, scheidingen       |
| Subtekst | `#7C736A`   | Secundaire tekst           |
| Inkt 2   | `#4A423B`   | Lopende tekst              |
| Inkt     | `#1C1715`   | Koppen, hoofdtekst         |

### Semantische kleuren (gedempt)
| Naam    | Hex       |
|---------|-----------|
| Success | `#3E9E6E` |
| Warning | `#E89A2B` |
| Error   | `#D8553C` |
| Info    | `#2E86C9` |

### Module-accentfamilie (exact uit brandbook v1.0)
| Module       | Hex       |
|--------------|-----------|
| EmmaBoekt    | `#16B79C` |
| EmmaWaakt    | `#FFB23E` |
| EmmaLoont    | `#4D6BF5` |
| EmmaVindt    | `#EB5C43` |
| EmmaCoacht   | `#FF7FA3` |
| EmmaZiet     | `#9B6BE0` |
| EmmaSchrijft | `#1FA4E0` |
| EmmaPromoot  | `#FF4D2E` |

> Uitbreiding: nieuwe module = volgende kleur in de familie + Nederlands werkwoord-icoon.

---

## 3. Typografie

| Rol                     | Familie              | Gewicht / grootte    |
|-------------------------|----------------------|----------------------|
| Display / koppen / merk | Bricolage Grotesque  | 700–800, −0.02em     |
| Body / UI / lange tekst | Hanken Grotesk       | 400–600              |
| Labels / mono / eyebrow | Spline Sans Mono     | 400–600, 0.1em spat  |

**Belangrijk:** Het logo gebruikt Bricolage Grotesque **SemiCondensed ExtraBold (800)** via Adobe Fonts. De Google Fonts-versie heeft geen SemiCondensed. Gebruik altijd de meegeleverde SVG-vector voor het logo — nooit zelf natypen.

### Laden (Google Fonts in globals.css)
```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=Spline+Sans+Mono:wght@400;600&display=swap');
```

---

## 4. Logo-gebruik

### Bestanden in `/public/`
| Bestand             | Gebruik                                      |
|---------------------|----------------------------------------------|
| `logo-dark.svg`     | Primair — inkt letters op lichte achtergrond |
| `logo-light.svg`    | Variant — crème letters op donkere achtergrond (nav, footer) |
| `beeldmerk.svg`     | Beeldmerk (vierkant met punt) op licht       |
| `beeldmerk-coral.svg` | Coral beeldmerk, voor accenten             |

### Regels
- Wordmark altijd **kleine letters** — `emma.` met coral punt
- Nooit hoofdletters, geen capslock
- Nooit verlopen, schaduwen of outlines op het logo
- Tagline staat **nooit ín het logo**
- Verhoudingen nooit wijzigen
- Clearspace: minimaal de hoogte van de `e` aan alle zijden vrij
- Minimale grootte: 24px web, 16px favicon
- Logo altijd uit de SVG-bestanden — nooit zelf nabouwen

---

## 5. Tone of voice

- **Tutoyeren altijd** — je/jij, nooit u
- Korte zinnen, geen jargon
- **Geen uitroeptekens**
- Collegiaal, nooit onderdanig of pedant
- Payoff staat vast: **"Jij doet je werk. Emma de rest."** — geen varianten

### Voorbeeld
| ✕ Niet zo | ✓ Maar zo |
|-----------|-----------|
| "Hé Sandra! Geweldig nieuws — onze AI heeft een fantastische ontdekking gedaan! Klik hier om 23% meer omzet te halen!!!" | "Productverkoop loopt iets achter op je doel. Drie acties die volgens je eigen cijfers vorig jaar hielpen — wil je ze zien?" |

---

## 6. Layout-principes

- **Veel witruimte** — meer dan minder. Druk = stress, leeg = rust.
- **Links uitgelijnd** — bodytekst nooit gecentreerd; max ~65 tekens per regel
- **Eén accent per scherm** — de module-kleur is dominant; neutralen vullen aan
- **Donker op licht** — lichte modus is standaard
- Grid: 12 kolommen desktop, 8 tablet, 4 mobiel. Gutter 24px (desktop) / 16px
- Max contentbreedte: 1200–1280px (gebruik `min(1240px, 92vw)`)

### Spacing-scale
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64` px

---

## 7. Iconografie

- 1.5px lijn, afgeronde uiteinden (`stroke-linecap: round; stroke-linejoin: round`)
- Niet gevuld (`fill: none`)
- Één kleur — icoon erft de module-accentkleur
- Ze helpen oriëntatie — trekken geen aandacht

---

## 8. Beeldtaal

- Documentaire foto's van échte ondernemers in hun werkomgeving
- Rustige stillevens, natuurlijk licht, rustige composities
- **Vermijd:** handenschud-stock, mascottes, 3D-renders, neon
- Liever geen beeld dan een willekeurige illustratie

---

## 9. Modulesysteem

Emma heeft 8 modules — elke module is een Nederlands werkwoord. CamelCase: `Emma + werkwoord`.

| # | Module       | Accent    | Prijs  | Omschrijving (uit brandbook)                              |
|---|--------------|-----------|--------|-----------------------------------------------------------|
| 1 | EmmaBoekt    | `#16B79C` | €9/mnd | Boekhouden zonder boekhoudsoftware aan te raken           |
| 2 | EmmaWaakt    | `#FFB23E` | €9/mnd | Continu zicht op hoe je bedrijf ervoor staat              |
| 3 | EmmaLoont    | `#4D6BF5` | €19/mnd| Salaris, contracten en verlof zonder gedoe                |
| 4 | EmmaVindt    | `#EB5C43` | €9/mnd | Kandidaten en klanten ontdekken in je radius              |
| 5 | EmmaCoacht   | `#FF7FA3` | €9/mnd | Voortgang van je mensen op één plek                       |
| 6 | EmmaZiet     | `#9B6BE0` | €9/mnd | Markt en concurrenten in beeld zonder zoekwerk            |
| 7 | EmmaSchrijft | `#1FA4E0` | €19/mnd| Content schrijven en plannen met jouw stem                |
| 8 | EmmaPromoot  | `#FF4D2E` | €19/mnd| Advertenties die echt iets opleveren                      |

**Twee prijscategorieën:**
- Standaard-modules à **€9/mnd** — functioneel werk dat Emma overneemt
- Premium-modules à **€19/mnd** — werk dat anders door medewerker of bureau gedaan wordt
- Som van alle 8 losse: €102/mnd
- Prijzen exclusief BTW · 14 dagen gratis proefperiode · maandelijks opzegbaar · 15% korting bij jaarbetaling

**Geen module:** AI-chat (platform-feature, altijd beschikbaar) · Medewerker-view (rol/view)

---

## 10. Pakketten (Niveau 3 naamgeving)

Format: `Emma voor [branche]` — geen sub-merken, geen aparte logo's.

| Pakket              | Modules                                              | À la carte | Pakketprijs | Korting |
|---------------------|------------------------------------------------------|------------|-------------|---------|
| Emma voor Salons    | 7 — alles behalve EmmaPromoot                        | €83/mnd    | €59/mnd     | 29%     |
| Emma voor Zorg      | 5 — Boekt + Waakt + Loont + Vindt + Coacht           | €55/mnd    | €39/mnd     | 29%     |
| Emma voor ZZP'ers   | 4 — Boekt + Waakt + Vindt + Schrijft                 | €46/mnd    | €29/mnd     | 37%     |
| Emma Compleet       | Alle 8 modules                                       | €102/mnd   | €69/mnd     | 32%     |

Pakketten zijn marketing-bundels, geen aparte producten. Zelfde software, andere module-configuratie.

---

## 11. Naamgevingsregels

- Master brand: `emma` (kleine letters)
- Modules: CamelCase, Nederlands werkwoord — `EmmaBoekt`, `EmmaWaakt`, etc.
- Pakketten: `Emma voor [branche]`
- Geen Engels, geen afkortingen, geen versienummers in namen
- Uitbreiding: `EmmaPlant`, `EmmaLeest`, `EmmaRekent` — zelfde patroon

---

## 12. Tien merkregels (uit brandbook §19)

1. Wordmark altijd kleine letters — met de coral ronde punt. Nooit hoofdletters.
2. Logo uit de echte SVG-bestanden — crème op donker, inkt op licht. Nooit zelf nabouwen.
3. Payoff staat vast — "Jij doet je werk. Emma de rest." Geen varianten.
4. Eén domein — altijd www.emmastudio.nl, consequent gevoerd.
5. Eén accent per scherm — de module bepaalt de kleur. Geen regenboog.
6. RGB is de bron — digitaal RGB, druk CMYK uit de codes. Niet zelf omrekenen.
7. Respecteer de clearspace — minimaal de hoogte van de `e` rondom het logo.
8. Tutoyeren, altijd — je/jij, warm en helder, zonder jargon.
9. Ruimte boven volheid — liever wit dan een vol scherm. Rust is het merk.
10. Geen mascotte, geen sparkle — Emma is een rustige aanwezigheid, geen AI-cliché.

---

## 13. CSS-variabelen (globals.css — authoritative)

```css
--coral:       #EB5C43;
--coral-dark:  #E8462B;
--petrol:      #0E3D37;
--petrol-mid:  #15514A;
--inkt:        #1C1715;
--creme:       #FBF4EA;
--teal:        #16B79C;
--amber:       #FFB23E;

--m-boekt:    #16B79C;
--m-waakt:    #FFB23E;
--m-loont:    #4D6BF5;
--m-vindt:    #EB5C43;
--m-coacht:   #FF7FA3;
--m-ziet:     #9B6BE0;
--m-schrijft: #1FA4E0;
--m-promoot:  #FF4D2E;

--text:        #1C1715;
--text-muted:  #7C736A;
--border:      rgba(28,23,21,0.1);
--border-soft: rgba(28,23,21,0.06);
```

---

## 14. Projectstructuur

```
emmastudio/
├── public/
│   ├── logo-dark.svg       ← inkt op licht (primair)
│   ├── logo-light.svg      ← crème op donker (nav/footer)
│   ├── beeldmerk.svg
│   └── beeldmerk-coral.svg
├── src/app/
│   ├── globals.css         ← enige CSS-bron
│   ├── layout.tsx          ← metadata, viewport
│   └── page.tsx            ← homepage
```

GitHub: https://github.com/Toms-Ambitie/emmastudio-website  
Live: https://www.emmastudio.nl
