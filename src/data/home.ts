/* ============================================================
   Homepage-inhoud die niet in modules.ts / packages.ts / proof.ts /
   articles.ts zit. Eén plek zodat elke claim auditbaar is (afgesproken
   in ronde 2, briefing v3 stap 3a). Presentatie staat in
   src/components/emma/HomePage.tsx; hier alleen tekst en cijfers.

   Herkomst per blok en de correcties tegen de Higgsfield-export staan
   in de comments. Dwingende correcties (briefing v3):
   - Eerlijkheid-als-USP schrappen (§3.5): "Niet uit een pitch deck",
     "Open over hoe we bouwen" — verwijderd.
   - Onware serverclaim (§3.5): "servers in Amsterdam en Frankfurt" in de
     FAQ gecorrigeerd naar de vastgestelde Frankfurt-tekst.
   - Security-sectie: de drie live kaarten uit §3.5, verbatim.
   - Blog-preview: de zes verzonnen BLOG_POSTS vervallen; de sectie toont
     de drie echte artikelen uit articles.ts (§5.4).
   ============================================================ */

/* ── HERO ──
   Copy verbatim uit de export, met twee correcties:
   - De assurance-regel "Bewezen in productie sinds eind 2024" (onwaar voor
     EmmaStudio zelf) is vervangen door HERO_BADGE uit proof.ts
     ("Gebouwd op 18 maanden praktijk", §3.2/§4.3) — die wordt in de
     component uit proof.ts gehaald, niet hier gedupliceerd.
   - De CTA ging naar {APP_URL}/register (dode funnel, signup dicht). In de
     component schakelt de CTA met LAUNCHED: nu wachtlijst, straks signup. */
export const HERO = {
  eyebrow: 'Compleet softwareplatform',
  titleLine1: 'Jij doet je werk.',
  titleLine2: 'Emma de rest.',
  intro: 'Acht modules die het saaie werk van ondernemen overnemen. Boekhouden, monitoring, personeel, marketing. Voor elke zelfstandige ondernemer in Nederland.',
  // assurances: eerste komt uit HERO_BADGE (proof.ts), rest verbatim
  assurances: ['Vanaf EUR 9/mnd', 'Geen lock-in'],
};

/* ── HET PROBLEEM ──
   THREE_PROBLEMS verbatim uit de export (emma-data.ts). Ware copy, geen
   claim die correctie behoeft. In stap 2 niet aangeraakt omdat er niets
   te corrigeren viel; met akkoord van Tom (ronde 2) hier meegenomen. */
export const THREE_PROBLEMS = [
  { num: '01', title: 'Boekhouding vreet tijd', desc: 'Iedere avond cijfers invullen in plaats van bij je gezin zitten. Zes tabbladen open, geen idee van je marge. Emma houdt het bij.', solution: 'EmmaBoekt + EmmaWaakt' },
  { num: '02', title: 'Loonadministratie is een ramp', desc: 'Contracten, verlof, salaris. Een fout en de Belastingdienst staat voor je deur. Een loonbureau kost EUR 100 tot 300 per maand.', solution: 'EmmaLoont' },
  { num: '03', title: 'Klanten vinden kost handen en voeten', desc: 'Verspreid over zes losse tools, niemand die overzicht heeft. Marketing gebeurt niet of slecht. Leads komen niet binnen.', solution: 'EmmaVindt + EmmaPromoot + EmmaSchrijft' },
];
export const PROBLEM_PULL = {
  stat: '8 tot 12 uur per week aan administratieve handelingen die voor 70% geautomatiseerd kunnen worden.',
  sub: 'De grootste klacht van ondernemers: geen rust.',
};

/* ── MANIFESTO ── inline copy, verbatim. */
export const MANIFESTO = 'Emma is een rustige copiloot. Geen vervanger voor je vak, maar een schil eromheen die het saaie werk overneemt.';

/* ── PRODUCT SHOWCASE ── inline copy. De screenshots komen per module-id
   uit /assets/app/{id}.jpg (waaks → waakt hernoemd, §3.3), plus overzicht. */
export const SHOWCASE = {
  eyebrow: 'Het product',
  title1: 'Software zo slim,',
  title2: 'dat het simpel voelt.',
  intro: 'Eén overzicht plus acht modules. Elke module doet een specifiek stuk van je bedrijf. Klik door en zie wat er in EmmaStudio zit.',
  overzicht: { src: '/assets/app/overzicht.jpg', label: 'Overzicht', desc: 'De dag in een blik. Signalen die Emma ziet, geprioriteerd op urgentie.' },
};

/* ── SOLUTION ── inline copy, verbatim. Punt 3 "Geen AI-product, wel slim"
   blijft bewust staan (briefing §9: dit doet de export goed, behouden). */
export const SOLUTION = {
  title1: 'Een plek waar',
  title2: 'alles samenkomt.',
  intro: 'Emma is een rustige copiloot. Geen vervanger voor je vak, maar een schil eromheen die het saaie werk overneemt. Kies wat je nodig hebt.',
  points: [
    { icon: 'shield', title: 'Geen lock-in', text: 'Je data blijft van jou. Geen kooi. Stop wanneer je wilt, je administratie staat gewoon in je eigen pakket.' },
    { icon: 'link', title: 'Echt verbonden', text: 'Modules praten live met elkaar. Een waarheid per gegeven. Geen dubbele cijfers die uit elkaar lopen.' },
    { icon: 'chat', title: 'Rustig slim', text: 'Slimme functies overal ingebed. Geen AI-product, wel slim. Emma doet het zware werk, jij bevestigt.' },
  ],
};

/* ── MODULES-sectie kop ── inline copy. Kaarten komen uit modules.ts. */
export const MODULES_SECTION = {
  eyebrow: 'Acht modules',
  title1: 'Acht modules.',
  title2: 'Een platform.',
  intro: 'Elke module is zelfstandig levensvatbaar. Koppel er een, koppel er acht. Los verkrijgbaar vanaf EUR 9 per maand.',
};

/* ── HOE HET WERKT ── inline copy, verbatim. */
export const HOW_IT_WORKS = {
  title: 'Hoe Emma werkt',
  steps: [
    { num: '01', title: 'Kies je modules', desc: 'Elke module staat zelfstandig. Begin met een, voeg er later meer toe.' },
    { num: '02', title: 'Koppel je data', desc: 'Emma leest live uit je boekhouding, je kassa, je reviews. Een waarheid per gegeven.' },
    { num: '03', title: 'Emma doet het werk', desc: 'Facturen, loonstroken, content, concurrent-analyse. Jij bevestigt, Emma regelt.' },
    { num: '04', title: 'Vraag Emma', desc: 'De copiloot kent je cijfers. Een antwoord, geen zoektocht door zes systemen.' },
  ],
};

/* ── PRIJSVERGELIJKING ── inline rijen, verbatim. Voettekst gecorrigeerd
   volgens §6.2 (was: "Emma Compleet (EUR 77/mnd) bevat alles ..."). */
export const PRICE_COMPARISON = {
  eyebrow: 'Vergelijking',
  title: 'Emma vs. losse tools vs. bureau',
  intro: 'Zes tot acht losse systemen, of een bureau dat niet alles dekt. Emma brengt het samen, voor een fractie van de prijs.',
  rows: [
    { need: 'Boekhouding', loose: 'Losse app EUR 9-15/mnd', bureau: 'Inbegrepen, maar traag' },
    { need: 'Loonadministratie', loose: 'Loonbureau EUR 100-300/mnd', bureau: 'Meerprijs' },
    { need: 'Marketing & ads', loose: 'Marketingbureau EUR 500-2.000/mnd', bureau: 'Niet inbegrepen' },
    { need: 'Klanten vinden', loose: 'Extra tool nodig', bureau: 'Niet inbegrepen' },
    { need: 'Slimme assistent', loose: null, bureau: null },
    { need: 'Alles onder een dak', loose: null, bureau: null },
  ],
  foot: 'Gebaseerd op marktprijzen 2026. Losse modules zijn nu beschikbaar vanaf EUR 9 per maand. De pakketten volgen zodra alle acht modules live zijn.',
};

/* ── MODULE-PRIJZEN ── benefits verbatim uit de export. */
export const MODULE_PRICES = {
  eyebrow: 'Prijs',
  title: 'Een module, een eerlijke prijs.',
  intro: 'Je start met een module en betaalt alleen daarvoor. Komt er een module bij die je wilt gebruiken, dan zet je die los aan. Geen pakket verplicht, geen verrassingen achteraf.',
  benefits: [
    'Nieuwe modules zet je los aan: EUR 9 of EUR 19 per maand',
    'De instapprijs is de prijs. Geen verhogingen achteraf',
    '10% korting als je per jaar betaalt',
    'Zodra alle acht modules live zijn: Emma Compleet voor EUR 77 per maand',
  ],
};

/* ── PAKKETTEN ── kop verbatim; data uit packages.ts. Voettekst verbatim.
   §6.2/§6.3: alle kaarten "Binnenkort" (geen coral/recommended), één
   wachtlijstformulier onder de kaarten. */
export const PACKAGES_SECTION = {
  title: 'Straks kies je een pakket.',
  intro: 'Zodra alle modules live zijn, bundelen we ze per branche met flinke korting. Wie eerder instapt, houdt de instapprijs.',
  foot: 'Tot die tijd is elke module los te gebruiken: standaard EUR 9/mnd, premium EUR 19/mnd, excl. BTW en maandelijks opzegbaar.',
  waitlist: {
    heading: 'Wil je weten wanneer de pakketten er zijn?',
    sub: 'Laat je e-mailadres achter. Je hoort het als eerste, en je krijgt de instapprijs.',
    button: 'Houd me op de hoogte',
  },
};

/* ── HET BEWIJS ── kop; stats + intro uit proof.ts (STATS, PROOF_INTRO).
   "Niet uit een pitch deck" (eerlijkheid-USP) verwijderd, §4.3. */
export const PROOF_SECTION = {
  eyebrow: 'Het bewijs',
  title: 'Bewezen in productie.',
};

/* ── VEILIGHEID ── de DRIE live kaarten uit briefing §3.5, verbatim. De
   vierde export-kaart ("Open over hoe we bouwen") vervalt (eerlijkheid-USP).
   De onware "servers in Amsterdam en Frankfurt" is in kaart 3 al gecorrigeerd. */
export const SECURITY = {
  eyebrow: 'Veiligheid & privacy',
  title: 'Je gegevens zijn van jou.',
  intro: 'Emma verwerkt gevoelige bedrijfsdata. Dat doen we met respect: opgeslagen in de EU, minimale rechten, transparante aanpak.',
  cards: [
    { title: 'Jouw data, jouw eigendom', desc: 'Je gegevens worden alleen verwerkt om de modules te laten werken. Geen verkoop, geen tracking, AVG-conform.' },
    { title: 'Versleuteld gekoppeld', desc: 'Koppel je Emma aan een externe dienst, dan wordt je sleutel versleuteld opgeslagen en nooit getoond.' },
    { title: 'Opgeslagen in de EU', desc: 'Je bedrijfsdata staat binnen de Europese Unie, op servers in Frankfurt. Onze website en e-mailverzending lopen via Amerikaanse dienstverleners onder Europese standaardcontractbepalingen. Meer daarover lees je in ons privacybeleid.' },
  ],
};

/* ── FAQ ── zes vragen verbatim uit de export, met één correctie:
   vraag 6 bevatte "servers in Amsterdam en Frankfurt" — dezelfde onware
   claim die op prod is gecorrigeerd (commit b5295a0). Vervangen door de
   vastgestelde Frankfurt-tekst uit §3.5 (server- en SCC-zin verbatim uit
   security-kaart 3), gevolgd door de bestaande FAQ-staart. Zie rapport. */
export const FAQ = {
  eyebrow: 'Vragen',
  title: 'Goede vragen.',
  items: [
    { q: 'Moet ik mijn boekhoudsoftware vervangen?', a: 'Nee. EmmaBoekt is een schil rond je bestaande pakket (e-Boekhouden, SnelStart, Moneybird). Het onderliggende pakket blijft de bron van waarheid. Stop je met Emma? Dan staat je volledige administratie gewoon in je eigen pakket.' },
    { q: 'Kan ik met een module beginnen en later uitbreiden?', a: 'Ja. Elke module is zelfstandig levensvatbaar. Begin met EmmaBoekt voor EUR 9 per maand. Voeg er later andere modules aan toe. Een module aanzetten is een rij toevoegen, geen code schrijven.' },
    { q: 'Wat als ik stop met Emma?', a: 'Je verliest geen data. Alles wat je via Emma doet, landt ook in je onderliggende pakket. Emma is een schil, geen kooi. Je data blijft van jou.' },
    { q: 'Wat kost Emma?', a: 'Standaard-modules kosten EUR 9 per maand, premium-modules EUR 19 per maand. Excl. BTW. Je start met 14 dagen gratis en kunt maandelijks opzeggen. Betaal je per jaar, dan krijg je 10% korting.' },
    { q: 'Doet Emma ook de loonaangifte bij de Belastingdienst?', a: 'EmmaLoont rekent, maakt loonstroken en boekt de loonjournaalpost. De loonaangifte zelf doe je via Mijn Belastingdienst Zakelijk (toegestaan bij 10 of minder werknemers) of via je administratiekantoor.' },
    { q: 'Hoe zit het met privacy en beveiliging?', a: 'Je bedrijfsdata staat binnen de Europese Unie, op servers in Frankfurt. Onze website en e-mailverzending lopen via Amerikaanse dienstverleners onder Europese standaardcontractbepalingen. Je gegevens worden alleen verwerkt om Emma te laten werken: geen verkoop aan derden, geen tracking. De koppeling met je boekhouding is versleuteld en voldoet aan de AVG.' },
  ],
};

/* ── KENNISBANK-PREVIEW ── (was "Blog" in de export). De zes verzonnen
   BLOG_POSTS vervallen; de sectie toont de drie echte artikelen uit
   articles.ts en linkt naar /kennisbank (§5.4). Kop hier, kaarten uit data. */
export const KB_PREVIEW = {
  eyebrow: 'Kennisbank',
  title: 'Inzichten voor ondernemers',
  link: 'Naar de kennisbank',
};

/* ── STICKY CTA ── inline. CTA schakelt met LAUNCHED (component). */
export const STICKY_CTA = {
  text: 'Klaar om Emma te ontmoeten?',
};
