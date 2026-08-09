export type ModuleVignette = {
  type: 'factuur' | 'inlezen' | 'schil' | 'doel' | 'prognose' | 'signaal' |
        'strook' | 'contract' | 'verlof' | 'pipeline' | 'score' | 'klant' |
        'scorecard' | 'checkin' | 'vraag' | 'prijs' | 'review' | 'concurrent' |
        'kanban' | 'kanalen' | 'stem' | 'campagnes' | 'attributie' | 'budget';
};

export type ModuleFeat = {
  tag: string;
  h: string;
  p: string;
  list: string[];
  vig: string;
};

export type ModuleStep = {
  n: string;
  h: string;
  p: string;
};

export type ModuleFaq = {
  q: string;
  a: string;
};

export type ModuleData = {
  id: string;
  name: string;
  num: string;
  price: number;
  accentVar: string;
  chip: string;
  head: string;
  intro: string;
  heroVig: string;
  does: { title: string; sub: string; feats: ModuleFeat[] };
  /** Optioneel: functies die nog niet bestaan maar wel op de roadmap staan,
   *  apart van `does.feats` (dat alleen aantoonbare, live functies bevat).
   *  Briefing v2 §4.1: voor EmmaZiet moeten prijsvergelijking, reviews-
   *  analyse en sentiment-over-tijd hier staan, niet bij `does.feats`. */
  roadmap?: { title: string; items: string[] };
  steps: { title: string; items: ModuleStep[] };
  faq: ModuleFaq[];
};

export const ICONS: Record<string, string> = {
  boekt:    '<path d="M4 5A1.6 1.6 0 0 1 5.6 3.4H12v17.2H5.6A1.6 1.6 0 0 0 4 22.2Z"/><path d="M20 5A1.6 1.6 0 0 0 18.4 3.4H12v17.2h6.4A1.6 1.6 0 0 1 20 22.2Z"/>',
  waakt:    '<path d="M12 3l7 2.8v5.2c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8V5.8L12 3Z"/><path d="m9 11.8 2 2 4-4"/>',
  loont:    '<circle cx="12" cy="12" r="8.2"/><path d="M14.8 9.2a3.6 3.6 0 1 0 .2 5.7M8.4 11.2h4.8M8.4 13.2h4.8"/>',
  vindt:    '<circle cx="10.5" cy="10.5" r="6.4"/><path d="m20 20-4.8-4.8"/>',
  coacht:   '<circle cx="12" cy="8.2" r="3.4"/><path d="M5.6 20a6.4 6.4 0 0 1 12.8 0"/>',
  ziet:     '<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.6"/><path d="M7 15l3.2-3.2 2.4 2.4L17.2 9"/>',
  schrijft: '<path d="M12.5 19.5H21"/><path d="M16.6 4.4a2.05 2.05 0 0 1 2.9 2.9L7.8 19 3.5 20.5 5 16.2Z"/>',
  promoot:  '<path d="m4 10 14-5.5v15L4 14Z"/><path d="M8 14v2.8a2 2 0 0 0 4 0v-1.4"/><path d="M19 9.2a3 3 0 0 1 0 5.6"/>',
};

export const MODULE_TAGS: Record<string, string> = {
  boekt:    'Boekhouden zonder je boekhoudsoftware aan te raken.',
  waakt:    'Het financiële brein van je zaak.',
  loont:    'Loon en contracten, zonder gedoe.',
  vindt:    'Vind klanten en kandidaten die passen.',
  coacht:   'Coaching en voortgang voor jou en je team.',
  ziet:     'Weet wat je concurrenten in de buurt doen.',
  schrijft: 'Teksten die klinken als jij.',
  promoot:  'Zie welke euro écht omzet oplevert.',
};

export const MODULE_PRICE: Record<string, number> = {
  boekt:9, waakt:9, loont:19, vindt:9, coacht:9, ziet:9, schrijft:19, promoot:19,
};

/** SEO-metadata per modulepagina (doc 08 / SEO-plan). Los van `head`/`intro`
 *  zodat de <title> en meta-description zoekwoorden dragen zonder de merk-H1
 *  of de hero-tekst te veranderen. `title` mikt kort (<60 tekens) met het
 *  zoekwoord vooraan; `desc` ~150-160 tekens. Gebruikt in generateMetadata
 *  van modules/[id]/page.tsx. */
export const MODULE_SEO: Record<string, { title: string; desc: string }> = {
  boekt: {
    title: 'EmmaBoekt · e-Boekhouden makkelijker, facturen in een klik',
    desc: 'EmmaBoekt legt een rustige schil over e-Boekhouden.nl. Facturen maken, bonnetjes scannen, offertes versturen. Sneller werken, je boekhouding blijft waar hij is.',
  },
  waakt: {
    title: 'EmmaWaakt · Financieel dashboard en advies op je cijfers',
    desc: 'EmmaWaakt is je financiële dashboard: doelen, prognoses en wekelijks advies op je eigen cijfers. Zie hoe je bedrijf ervoor staat, zonder Excel. Vanaf €9.',
  },
  loont: {
    title: 'EmmaLoont · Loonadministratie zonder loonbureau, vanaf €19',
    desc: 'EmmaLoont doet je loonadministratie: loon berekenen conform cao, loonstroken, contracten en verlof. De loonkosten belanden direct in je boekhouding.',
  },
  vindt: {
    title: 'EmmaVindt · Personeel en klanten vinden in je eigen regio',
    desc: 'EmmaVindt zoekt personeel of klanten in je regio via het openbare KvK-register, met een fit-score per match. Lokaal, licht, zonder dure recruitmenttool.',
  },
  coacht: {
    title: 'EmmaCoacht · Medewerkers coachen met structuur en cijfers',
    desc: 'EmmaCoacht maakt coaching consistent: scorecards per medewerker, gesprekken vastgelegd en een aanzet op echte cijfers. Jij voert het gesprek, Emma denkt mee.',
  },
  ziet: {
    title: 'EmmaZiet · Concurrenten in de buurt in beeld, automatisch',
    desc: 'EmmaZiet vindt je concurrenten in de buurt via het KvK-register, zet ze op de kaart en meldt het als er een bijkomt. Weet wat er om je heen gebeurt. Vanaf €9.',
  },
  schrijft: {
    title: 'EmmaSchrijft · Content en blogs schrijven in je eigen stem',
    desc: 'EmmaSchrijft schrijft je blogs, e-mails en posts in je eigen stem, SEO-geoptimaliseerd. Van idee tot gepubliceerd, met een planner. Content die eindelijk gebeurt.',
  },
  promoot: {
    title: 'EmmaPromoot · Zelf adverteren op Google en Meta, op omzet',
    desc: 'EmmaPromoot maakt je advertenties compleet: beeld, tekst, campagne en meting op je echte omzet. Adverteren op Google en Meta zonder marketingbureau.',
  },
};

/** Contextuele interne links per modulepagina (doc 08 / SEO-plan, Deel 3 punt 4
 *  en briefing punt 5: minimaal 3 beschrijvende links per pagina). Elke anchor
 *  is een beschrijvende zin, geen "lees meer". Gerenderd als prose-alinea in de
 *  body van modules/[id]/page.tsx, los van het "Meer van Emma"-kaartenraster. */
export const MODULE_RELATED: Record<string, { lead: string; links: { href: string; anchor: string }[] }> = {
  boekt: { lead: 'EmmaBoekt werkt goed samen met', links: [
    { href: '/modules/waakt', anchor: 'EmmaWaakt om je cijfers in de gaten te houden' },
    { href: '/modules/loont', anchor: 'EmmaLoont voor je loonadministratie' },
    { href: '/vergelijk', anchor: 'de vergelijking met losse boekhoudtools' },
  ] },
  waakt: { lead: 'EmmaWaakt werkt goed samen met', links: [
    { href: '/modules/boekt', anchor: 'EmmaBoekt als bron voor je cijfers' },
    { href: '/modules/coacht', anchor: 'EmmaCoacht om je team te begeleiden' },
    { href: '/modules/promoot', anchor: 'EmmaPromoot om je advertenties op omzet te meten' },
  ] },
  loont: { lead: 'EmmaLoont werkt goed samen met', links: [
    { href: '/modules/boekt', anchor: 'EmmaBoekt zodat de loonkosten in je boekhouding landen' },
    { href: '/modules/coacht', anchor: 'EmmaCoacht om je mensen te begeleiden' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om nieuw personeel te vinden' },
  ] },
  vindt: { lead: 'EmmaVindt werkt goed samen met', links: [
    { href: '/modules/schrijft', anchor: 'EmmaSchrijft om je aanbod te schrijven' },
    { href: '/modules/coacht', anchor: 'EmmaCoacht om nieuwe mensen in te werken' },
    { href: '/modules/ziet', anchor: 'EmmaZiet om je marktgebied te kennen' },
  ] },
  coacht: { lead: 'EmmaCoacht werkt goed samen met', links: [
    { href: '/modules/waakt', anchor: 'EmmaWaakt voor de cijfers onder je gesprekken' },
    { href: '/modules/loont', anchor: 'EmmaLoont voor je personeelsadministratie' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om nieuwe mensen te vinden' },
  ] },
  ziet: { lead: 'EmmaZiet werkt goed samen met', links: [
    { href: '/modules/vindt', anchor: 'EmmaVindt om nieuwe klanten te vinden' },
    { href: '/modules/schrijft', anchor: 'EmmaSchrijft om je content te plannen' },
    { href: '/pakketten', anchor: 'een branchepakket waarin EmmaZiet zit' },
  ] },
  schrijft: { lead: 'EmmaSchrijft werkt goed samen met', links: [
    { href: '/modules/promoot', anchor: 'EmmaPromoot voor je betaalde advertenties' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om klanten te vinden' },
    { href: '/modules/ziet', anchor: 'EmmaZiet om te weten wat de buurt doet' },
  ] },
  promoot: { lead: 'EmmaPromoot werkt goed samen met', links: [
    { href: '/modules/schrijft', anchor: 'EmmaSchrijft voor je organische content' },
    { href: '/modules/waakt', anchor: 'EmmaWaakt om op je echte omzet te meten' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om nieuwe klanten te vinden' },
  ] },
};

/** Natuurlijke/canonieke modulevolgorde (nummering 01-08). Voor de weergave
 *  gebruiken we niet deze array maar MODULE_ORDER hieronder, die live modules
 *  vooraan zet. */
const MODULE_BASE_ORDER = ['boekt','waakt','loont','vindt','coacht','ziet','schrijft','promoot'];

/** DE LANCEERSCHAKELAAR. Zet op true zodra de boekhoudmodule live is op
 *  app.emmastudio.nl. Alle teksten en CTA's op de site schakelen dan mee
 *  van "lanceert in juli" naar "nu live" met directe aanmeldknoppen. */
export const LAUNCHED = true;

/** Lanceerstatus per module. `live: true` = de software draait (bevestigd
 *  in Supabase-prod); `when` is de roadmap-aanduiding voor wat nog niet
 *  draait. Eén bron van waarheid voor homepage, modulepagina's en footer.
 *
 *  Stand 8 augustus 2026, gemeten en vastgelegd in emmastudio-app/docs/
 *  FUNCTIES.md: vijf modules draaien en staan op `plans.purchasable = true`
 *  op prod (boekt, waakt, ziet, vindt, loont). EmmaLoont stond hier ten
 *  onrechte op "Binnenkort" terwijl hij op prod al te koop was: loonrun,
 *  loonstroken, proforma's, contracten, verlof, verzuim, declaraties,
 *  journaalpost en cao-beheer zijn alle gebouwd en op dev gedraaid.
 *  EmmaZiet is niet langer "gedeeltelijk": prijsvergelijking, reviews en
 *  sentiment-over-tijd draaien ook, dus het roadmap-blok is vervallen.
 *  Coacht, Schrijft en Promoot bestaan niet: geen scherm, geen tabel, geen
 *  edge function. Die blijven "Binnenkort" zonder datum (briefing: "Geen
 *  datums. [...] Een gemiste datum doet meer schade dan geen datum.").
 *
 *  `live` staat hier bewust LOS van `LAUNCHED`. `live` beschrijft of de
 *  software draait (een technisch feit — Supabase toont actieve tabellen
 *  en een draaiende tenant voor boekt/waakt/ziet). `LAUNCHED` beschrijft
 *  of de publieke signup open staat (een marketingbeslissing). Dat zijn
 *  onafhankelijke assen; ze aan elkaar knopen zou betekenen dat het
 *  omzetten van de signup-knop ook de modulestatus verandert, of andersom.
 *  `when` optioneel maken (`when?: string`) breekt de typecheck van
 *  `JourneySection.tsx` (regel 74, `return st.when;` met retourtype
 *  `string`) — een component, dus dit rondje niet aan te passen. Daarom
 *  blijft `when: string` verplicht en wordt het een lege string voor
 *  boekt/waakt/ziet: een module die draait heeft geen "komt in ...", en
 *  elke huidige plek die `.when` gebruikt doet dat al alleen wanneer
 *  `!live` (geverifieerd), dus deze lege string wordt nergens zichtbaar
 *  geïnterpoleerd. */
export type ModuleStatus = { live: boolean; when: string };
/** Echte afdrukken uit de app, per module. Alleen voor wat er draait: een
 *  modulepagina is de belangrijkste pagina om te beslissen, en daar hoort het
 *  echte scherm te staan in plaats van een tekening. Staat een module hier
 *  niet in, dan valt de pagina terug op de gestileerde impressie-kaart.
 *
 *  Zelfde bestanden als de showcase op de homepage. Nieuwe afdruk maken: zie
 *  emmastudio-app/docs/DEMO-OMGEVING.md, en let op dat de demo-tenant geen
 *  echte klantgegevens toont. */
export const MODULE_SHOT: Record<string, string> = {
  boekt: '/assets/app/boekt.jpg',
  waakt: '/assets/app/waakt.jpg',
  loont: '/assets/app/loont.jpg',
  vindt: '/assets/app/vindt.jpg',
  ziet:  '/assets/app/ziet.jpg',
};

export const MODULE_STATUS: Record<string, ModuleStatus> = {
  boekt:    { live: true, when: '' },
  waakt:    { live: true, when: '' },
  loont:    { live: true, when: '' },
  vindt:    { live: true, when: '' },
  coacht:   { live: false, when: 'Binnenkort' },
  ziet:     { live: true, when: '' },
  schrijft: { live: false, when: 'Binnenkort' },
  promoot:  { live: false, when: 'Binnenkort' },
};

/** DE weergavevolgorde overal op de site (homepage-grid + slider, /modules-
 *  grid, nav, footer, "meer van Emma"). Regel: LIVE modules altijd vóór de
 *  "binnenkort"-modules, met binnen elke groep de canonieke volgorde. Dit is
 *  een STABIELE sortering op MODULE_BASE_ORDER, dus zodra een module live gaat
 *  (MODULE_STATUS[...].live = true) schuift die vanzelf naar voren. Nu:
 *  Boekt · Waakt · Vindt · Ziet · Loont · Coacht · Schrijft · Promoot. */
export const MODULE_ORDER = [...MODULE_BASE_ORDER].sort(
  (a, b) => Number(MODULE_STATUS[b].live) - Number(MODULE_STATUS[a].live)
);

export const APP_URL = 'https://app.emmastudio.nl';

/** De publieke aanmeldpagina. Eén generieke URL voor álle "Start 14 dagen
 *  gratis"-CTA's (hero, nav, module-PDP's, footer, /over, sticky). APP_URL
 *  blijft voor "Inloggen". Geen module-specifieke parameter (besluit Tom). */
export const SIGNUP_URL = 'https://app.emmastudio.nl/signup';

/** Modules die 18 maanden dagelijks bij Blondes Incognito draaiden — alleen
 *  die mogen de badge "Draait dagelijks in de praktijk" tonen. Overige live
 *  modules (bv. EmmaVindt) tonen het neutrale, ware "Nu beschikbaar". */
export const PROVEN_IN_PRACTICE = ['boekt', 'waakt', 'ziet'];

export const MODULES: Record<string, ModuleData> = {
  boekt:{
    id:'boekt', name:'Boekt', num:'01', price:9, accentVar:'--m-boekt',
    chip:'Werkt bovenop e-Boekhouden.nl',
    head:'Boekhouden zonder je boekhoud­software aan te raken.',
    intro:'EmmaBoekt is de schil om e-Boekhouden.nl. Je boekhouding blijft daar staan, maar het werk doe je in Emma: bonnetjes doorsturen, facturen maken, offertes versturen. Je logt bijna nooit meer rechtstreeks in.',
    heroVig:'boekt_inlezen',
    does:{
      title:'Wat EmmaBoekt voor je doet.',
      sub:'De dagelijkse boekhouding, teruggebracht tot een paar handelingen. Emma doet het typewerk, jij bevestigt.',
      feats:[
        { tag:'Slim inboeken', h:'Bonnetjes en facturen leest Emma zelf.',
          p:'Stuur een bon of inkomende factuur naar je inbox. Emma herkent de leverancier, het bedrag en de BTW, stelt de juiste grootboekrekening voor en legt uit waarom. Jij controleert en klikt op Boeken. Niets wordt automatisch geboekt.',
          list:['Leverancier, bedrag en BTW automatisch herkend','Grootboekrekening voorgesteld, met de reden erbij','Jij bevestigt elke boeking zelf'],
          vig:'boekt_inlezen' },
        { tag:'Facturen & offertes', h:'Factureren in een paar klikken.',
          p:'Maak en verstuur facturen en offertes vanuit één rustig scherm. Emma onthoudt je klanten en je tarieven, en een geaccepteerde offerte zet je met één klik om naar een factuur. Facturen die elke maand of elk kwartaal terugkomen, zet je één keer klaar.',
          list:['Facturen en offertes in je eigen stijl','Offerte geaccepteerd? Eén klik naar factuur','Terugkerende facturen, met de volgende datum erbij'],
          vig:'boekt_factuur' },
        { tag:'Klanten', h:'Je klantenbestand bijgehouden.',
          p:'Elke klant op één kaart: adresgegevens, contactpersonen en wat er openstaat. Vul een KvK-nummer in en Emma haalt de bedrijfsgegevens erbij, zodat je ze niet overtypt.',
          list:['Adres en contactpersonen per klant','Gegevens opgehaald uit het KvK-register','Betaalgedrag en openstaand bedrag in beeld'],
          vig:'boekt_factuur' },
        { tag:'Openstaande posten', h:'Zie wie er nog moet betalen.',
          p:'Debiteuren en crediteuren live uit je boekhouding, met per klant het openstaande bedrag en de betaalgeschiedenis. Loopt een factuur te ver achter, dan zegt Emma dat, en verstuur je met een paar klikken een herinnering.',
          list:['Debiteuren en crediteuren live uit je boekhouding','Openstaand bedrag en betaalgedrag per klant','Herinnering en laatste aanmaning vanuit Emma'],
          vig:'boekt_openstaand' },
        { tag:'e-Boekhouden.nl blijft', h:'De motor blijft waar hij is.',
          p:'EmmaBoekt werkt bovenop e-Boekhouden.nl. Alles wat je in Emma doet, staat gewoon in je boekhouding. Geen migratie, geen dubbel werk, en je accountant houdt toegang zoals altijd. SnelStart en Moneybird staan op de planning.',
          list:['Koppeling in een paar minuten, sleutel versleuteld','Geen migratie, geen dubbel werk','Je accountant houdt gewoon toegang'],
          vig:'boekt_schil' },
      ],
    },
    steps:{ title:'Zo werkt het.', items:[
      { n:'01 · KOPPEL', h:'Verbind e-Boekhouden.nl', p:'Koppel je boekhouding in een paar minuten. Je sleutel wordt versleuteld opgeslagen en nooit getoond.' },
      { n:'02 · STUUR DOOR', h:'Bonnen naar je inbox', p:'Stuur bonnetjes en inkomende facturen door of sleep ze in je inbox. Emma leest ze en zet een voorstel klaar.' },
      { n:'03 · BEVESTIG', h:'Jij houdt de regie', p:'Controleer het voorstel van Emma, pas aan waar nodig en klik op Boeken. Niets gebeurt zonder jou.' },
      { n:'04 · KLAAR', h:'Alles staat in je boekhouding', p:'Elke boeking en factuur staat direct goed in e-Boekhouden.nl. Je btw-aangifte doe je daar of bij je boekhouder, zoals je gewend bent.' },
    ] },
    faq:[
      { q:'Vervangt EmmaBoekt e-Boekhouden.nl?', a:'Nee, juist niet. e-Boekhouden.nl blijft de motor van je boekhouding en alles blijft daar netjes staan. Emma is de schil eromheen die het dagelijkse werk makkelijker, sneller en leuker maakt. Je logt alleen bijna nooit meer rechtstreeks in.' },
      { q:'Boekt Emma dingen automatisch?', a:'Nee. Emma leest je bonnen en facturen, herkent de bedragen en stelt de juiste boeking voor, met de reden erbij. Jij controleert en bevestigt. Niets verdwijnt vanzelf in je administratie.' },
      { q:'Werkt het samen met mijn accountant?', a:'Ja. Je accountant houdt gewoon toegang tot e-Boekhouden.nl en blijft eindverantwoordelijk. Emma neemt het voorbereidende werk over, zodat er minder uren overblijven om te factureren.' },
      { q:'Ik gebruik SnelStart. Kan ik ook meedoen?', a:'Nog niet. EmmaBoekt werkt met e-Boekhouden.nl. De koppelingen met SnelStart en Moneybird staan op de planning, maar hebben nog geen datum. Laat je e-mail achter, dan hoor je het als ze er zijn.' },
      { q:'Wat kost EmmaBoekt?', a:'€9 per maand, exclusief btw. Je probeert Emma eerst 14 dagen gratis en je kunt maandelijks opzeggen. Betaal je per jaar, dan krijg je 10% korting.' },
      { q:'Kan ik de boekhoudmodule nu al gebruiken?', a: LAUNCHED
          ? 'Ja. De boekhoudmodule is de eerste module van Emma en is nu te gebruiken. Je probeert het 14 dagen gratis, zonder creditcard. Maak een account aan op app.emmastudio.nl/signup en je bent binnen een paar minuten gekoppeld.'
          : 'EmmaBoekt draait al, maar de aanmelding staat nog niet open. Laat je e-mail achter, dan hoor je het op de dag dat je kunt starten.' },
    ],
  },
  waakt:{
    id:'waakt', name:'Waakt', num:'02', price:9, accentVar:'--m-waakt',
    chip:'Werkt op je eigen cijfers',
    head:'Het financiële brein van je zaak.',
    intro:'EmmaWaakt is je financiële dashboard: doelen, prognoses en een wekelijks advies op je eigen cijfers. Emma kijkt mee en zegt het op tijd als iets afwijkt, zodat je stuurt in plaats van het achteraf te ontdekken bij de boekhouder.',
    heroVig:'waakt_doel',
    does:{
      title:'Wat EmmaWaakt voor je doet.',
      sub:'Je cijfers, vertaald naar richting. Geen dashboard om in te verdwalen, maar de dingen die er deze week toe doen, met advies erbij.',
      feats:[
        { tag:'Doelen', h:'Stel doelen, op elk niveau.', p:'Bepaal doelen voor je bedrijf en per medewerker. Emma houdt de voortgang bij en laat rustig zien waar je staat.',
          list:['Doelen op bedrijfs- en teamniveau','Voortgang automatisch bijgehouden','Altijd actueel, zonder bijwerken'], vig:'waakt_signaal' },
        { tag:'Prognoses', h:'Vooruitkijken op echte cijfers.', p:'Prognoses op basis van je werkelijke data en seizoenspatronen, zodat je weet wat eraan komt in plaats van het te gokken.',
          list:['Gebaseerd op je eigen historie','Houdt rekening met het seizoen','Zie verwachte omzet en kosten'], vig:'waakt_prognose' },
        { tag:'Kosten', h:'Zie waar je geld heen gaat.', p:'Je kosten per categorie en per maand, over het hele jaar. Zo zie je welke post oploopt voordat je het aan je resultaat merkt.',
          list:['Kosten per categorie en per maand','Jaaroverzicht in één beeld','Stijgende posten vallen op'], vig:'waakt_signaal' },
        { tag:'Teamprestaties', h:'Wie staat waar.', p:'Per medewerker de omzet van de maand, naast het doel dat je voor die persoon hebt gesteld. Bedoeld om het gesprek te voeren, niet om af te rekenen.',
          list:['Omzet per medewerker, per maand','Naast het doel dat jij hebt gesteld','Op basis van de cijfers die je aanlevert'], vig:'waakt_doel' },
        { tag:'Cijfers uploaden', h:'Ook zonder boekhoudkoppeling.', p:'Heb je EmmaBoekt niet? Dan upload je je omzet- en kostenoverzicht als screenshot, Excel of PDF. Emma leest het bedrag en de periode eruit, jij bevestigt. Uit één medewerkersexport haalt Emma tegelijk je omzet en de cijfers per medewerker.',
          list:['Screenshot, Excel of PDF uit je eigen systeem','Emma leest het voor, jij bevestigt of corrigeert','Eén medewerkersexport voedt omzet én teamcijfers'], vig:'waakt_prognose' },
        { tag:'Wekelijks advies', h:'Drie acties, elke week.', p:'Een rustig, kort advies op je cijfers. Geen alarmbellen, maar concrete stappen die je zelf kunt wegen.',
          list:['Kort advies op jouw situatie','Concrete acties, geen ruis','Jij beslist wat je doet'], vig:'waakt_doel' },
      ],
    },
    steps:{ title:'Zo houd je grip.', items:[
      { n:'01 · KOPPEL', h:'Verbind je cijfers', p:'Met EmmaBoekt leest Waakt je boekhouding direct mee. Heb je die niet, dan upload je je omzet- en kostenoverzicht zelf.' },
      { n:'02 · DOELEN', h:'Stel je doelen', p:'Bepaal waar je naartoe wilt, voor je bedrijf en je team. Emma vertaalt dat naar voortgang.' },
      { n:'03 · VOLG', h:'Volg de voortgang', p:'In één rustig overzicht zie je hoe je ervoor staat, zonder zelf cijfers te hoeven uitpluizen.' },
      { n:'04 · STUUR', h:'Stuur op tijd bij', p:'Elke week een kort advies met concrete acties. Jij beslist, Emma rekent het voor je uit.' },
    ] },
    faq:[
      { q:'Heb ik verstand van cijfers nodig?', a:'Nee. EmmaWaakt is juist bedoeld voor ondernemers die geen analist willen worden. Je krijgt de paar inzichten die ertoe doen in gewone taal, met een concrete suggestie erbij.' },
      { q:'Werkt EmmaWaakt samen met EmmaBoekt?', a:'Ja. Heb je EmmaBoekt, dan leest Waakt die cijfers direct mee. Heb je Boekt niet, dan upload je je omzet en kosten zelf. Waakt werkt allebei de manieren.' },
      { q:'Wat kost EmmaWaakt?', a:'€9 per maand, exclusief btw. Je probeert Emma eerst 14 dagen gratis en je kunt maandelijks opzeggen. Betaal je per jaar, dan krijg je 10% korting.' },
      { q:'Kan ik het nu al gebruiken?', a: LAUNCHED
          ? 'Ja. EmmaWaakt is nu te gebruiken. Je probeert het 14 dagen gratis, zonder creditcard. Maak een account aan op app.emmastudio.nl/signup.'
          : 'EmmaWaakt draait al, maar de aanmelding staat nog niet open. Laat je e-mail achter, dan hoor je het op de dag dat je kunt starten.' },
      { q:'Verzint Emma cijfers als er geen data is?', a:'Nee. Als er geen gegevens zijn, zie je dat. Geen nul waar niets staat, geen schatting die eruitziet als een meting. Emma rekent niet zelf: de database rekent, Emma vertelt wat eruit komt.' },
    ],
  },
  loont:{
    id:'loont', name:'Loont', num:'03', price:19, accentVar:'--m-loont',
    chip:'met CAO-engine voor jouw branche',
    head:'Loon en contracten, zonder gedoe.',
    intro:'De personeelsadministratie op één plek. Loonstroken, contracten, verlof, verzuim en declaraties, met de cao van jouw branche al ingelezen. De loonkosten landen daarna in je boekhouding.',
    heroVig:'loont_strook',
    does:{
      title:'Wat EmmaLoont voor je doet.',
      sub:'Alles rond je personeel, rustig geregeld. Van contract tot loonstrook, en de loonkosten belanden meteen in je boekhouding.',
      feats:[
        { tag:'Salaris', h:'Loonstroken die kloppen.', p:'Draai de loonronde met de cao van jouw branche als basis. Emma bereidt voor, jij controleert, en de loonstroken gaan als nette PDF naar je mensen. Werkgeverslasten rekent Emma mee.',
          list:['Loonronde voorbereiden, controleren, versturen','Loonstrook als PDF, per e-mail bij toestemming','Werkgeverslasten automatisch berekend'], vig:'loont_strook' },
        { tag:'Proforma', h:'Wat gaat het kosten, en wat houdt hij over?', p:'Reken een loonstrook door vóór iemand in dienst is. Handig in een sollicitatiegesprek: je laat zien wat er netto overblijft, en je weet zelf wat de werkgeverslasten worden.',
          list:['Doorrekenen zonder iemand in dienst te nemen','Netto voor de kandidaat, bruto en lasten voor jou','Bewaren en later teruglezen'], vig:'loont_strook' },
        { tag:'Cao', h:'De cao staat er al in.', p:'Emma leest de cao-loontabellen in en houdt de versies bij. Bij het vastleggen van een contract zie je de bijbehorende schaal ernaast staan, en een waarschuwing als je eronder gaat zitten.',
          list:['Cao-loontabellen ingelezen en per versie bewaard','De schaal staat naast je contract, als hulp','Waarschuwing onder de schaal, jij beslist'], vig:'loont_contract' },
        { tag:'Contracten', h:'Contracten vastgelegd op één plek.', p:'Leg per medewerker het contract vast met uren, functie en beloning. Elke wijziging wordt een nieuwe versie, zodat je altijd terug kunt zien wat er wanneer gold.',
          list:['Contract per medewerker, met versiehistorie','De cao-schaal ernaast als ondergrens','Alles netjes bewaard op één plek'], vig:'loont_contract' },
        { tag:'Verlof, verzuim & declaraties', h:'Bijgehouden zonder rekenwerk.', p:'Je medewerker vraagt verlof aan, jij keurt goed. Ziekmeldingen en declaraties lopen langs dezelfde weg: indienen, beoordelen, afhandelen.',
          list:['Verlof aanvragen en goedkeuren','Verzuim in- en uitmelden','Declaraties indienen, beoordelen en verwerken'], vig:'loont_verlof' },
        { tag:'Voor je medewerkers', h:'Je team regelt het zelf.', p:'Elke medewerker heeft een eigen scherm "Mijn loon". Daar staan zijn loonstroken, kan hij verlof aanvragen en een declaratie indienen met bon erbij. Jij krijgt het ter beoordeling binnen, in plaats van via een appje of een briefje.',
          list:['Eigen loonstroken openen en bewaren','Verlof aanvragen, met het saldo erbij','Declaratie indienen met bon of factuur'], vig:'loont_verlof' },
        { tag:'Boekhouding', h:'De loonkosten in je boekhouding.', p:'Na de loonronde zet Emma de loonjournaalpost klaar. Heb je EmmaBoekt, dan boekt hij door naar je boekhouding. Heb je die niet, dan krijg je een CSV voor je eigen pakket of je kantoor.',
          list:['Loonjournaalpost automatisch klaargezet','Grootboekrekeningen eenmalig gekoppeld','Zonder EmmaBoekt: export als CSV'], vig:'loont_strook' },
        { tag:'Wel en niet', h:'Wat EmmaLoont wel en niet doet.', p:'EmmaLoont rekent het loon, maakt de loonstroken, legt contracten vast, houdt verlof, verzuim en declaraties bij, en zet de loonkosten in je boekhouding. De loonaangifte bij de Belastingdienst doe je zelf via Mijn Belastingdienst Zakelijk, of via je administratiekantoor. Contracten worden vastgelegd, niet digitaal ondertekend.',
          list:['Loon, loonstroken, contracten en verlof: ja','Loonkosten in je boekhouding: ja','Loonaangifte en digitaal tekenen: nog niet'], vig:'loont_strook' },
      ],
    },
    steps:{ title:'Zo werkt het.', items:[
      { n:'01 · KIES CAO', h:'Stel je branche in', p:'Kies de cao die bij je past, of geef aan dat je er geen volgt. Emma zet de loontabellen klaar.' },
      { n:'02 · VOEG TOE', h:'Zet je team erin', p:'Voeg je medewerkers toe en leg per persoon het contract vast. De schaal uit de cao staat ernaast.' },
      { n:'03 · DRAAI', h:'Draai de loonronde', p:'Emma bereidt de ronde voor, jij controleert. De loonstroken gaan als PDF naar je mensen.' },
      { n:'04 · BOEK', h:'Loonkosten in je boekhouding', p:'De loonjournaalpost staat klaar. Met EmmaBoekt boekt hij door, anders krijg je een CSV.' },
    ] },
    faq:[
      { q:'Voor wie is EmmaLoont bedoeld?', a:'Voor ondernemers met één of meer medewerkers, in salons, zorgpraktijken en kleine teams. Werk je alleen, dan heb je deze module simpelweg niet nodig.' },
      { q:'Welke cao\'s ondersteunt het?', a:'Emma leest openbare cao-loontabellen in en bewaart ze per versie. Kappers is de eerste, en er staan er inmiddels tientallen klaar. Volg je geen cao, dan kan dat ook: je legt het contract dan gewoon vast zonder schaal ernaast. Twijfel je of jouw cao erbij zit, mail dan even naar info@emmastudio.nl.' },
      { q:'Vervangt het mijn loonbureau?', a:'Grotendeels, maar niet helemaal. EmmaLoont rekent het loon, maakt de loonstroken, legt contracten vast, houdt verlof, verzuim en declaraties bij en zet de loonkosten in je boekhouding. De loonaangifte bij de Belastingdienst doe je zelf via Mijn Belastingdienst Zakelijk, wat mag bij tien of minder werknemers, of je laat die bij je administratiekantoor.' },
      { q:'Krijgen mijn medewerkers zelf toegang?', a:'Als je dat wilt. Je nodigt ze uit met hun e-mailadres en de rol medewerker. Ze zien dan alleen hun eigen scherm: hun loonstroken, hun verlofsaldo en hun declaraties. Niet de cijfers van het bedrijf en niet het loon van collega\'s. Nodig je niemand uit, dan doe jij het werk en verstrek je de loonstroken zelf.' },
      { q:'Kan ik contracten digitaal laten ondertekenen?', a:'Nog niet. Je legt het contract vast in Emma, met alle afspraken en een versiehistorie, maar ondertekenen gebeurt buiten Emma om. Digitaal ondertekenen staat op de planning zonder datum.' },
      { q:'Wat als ik onder de cao-schaal wil betalen?', a:'Dat mag, en Emma houdt je niet tegen. Er zijn legitieme redenen voor, bijvoorbeeld een andere urenbasis of functie. Wat Emma wel doet: de schaal ernaast zetten en waarschuwen als je eronder gaat zitten, zodat je het bewust doet.' },
      { q:'Wat kost EmmaLoont en kan ik het nu gebruiken?', a: LAUNCHED
          ? 'Ja, EmmaLoont is nu te gebruiken. €19 per maand, exclusief btw, met 10% korting bij jaarbetaling. Je probeert het 14 dagen gratis, zonder creditcard. Maak een account aan op app.emmastudio.nl/signup.'
          : '€19 per maand, exclusief btw, met 10% korting bij jaarbetaling. EmmaLoont draait al, maar de aanmelding staat nog niet open. Laat je e-mail achter, dan hoor je het zodra je kunt starten.' },
    ],
  },
  vindt:{
    id:'vindt', name:'Vindt', num:'04', price:9, accentVar:'--m-vindt',
    chip:'recruitment én sales in één',
    head:'Vind wie bij je past.',
    intro:'Eén module met twee gezichten. Ontdek kandidaten als je personeel zoekt, of nieuwe klanten als je wilt groeien, allebei dichtbij en met een nette pipeline.',
    heroVig:'vindt_pipeline',
    does:{
      title:'Wat EmmaVindt voor je doet.',
      sub:'Of je nu mensen zoekt of klanten, het begint met de juiste in beeld krijgen. Rustig, gericht, en netjes vastgelegd.',
      feats:[
        { tag:'Recruitment', h:'Kandidaten in de buurt.', p:'Ontdek kandidaten binnen een straal die je zelf instelt, met een score die laat zien wie past, en een pipeline om het overzicht te houden.',
          list:['Straal zelf instelbaar, per kilometer','Score met de reden erbij, geen kaal cijfer','Pipeline van eerste contact tot match'], vig:'vindt_score' },
        { tag:'Sales', h:'Klanten die bij je passen.', p:'Ontdek potentiële klanten op basis van locatie en branche, met lead-scoring en een sales-pipeline.',
          list:['Leads op locatie en SBI-code','Lead-scoring die prioriteert','Sales-pipeline in één overzicht'], vig:'vindt_klant' },
        { tag:'Eerste contact', h:'Een bericht dat niet als sjabloon leest.', p:'Emma schrijft een concept voor het eerste bericht, op basis van wat er openbaar over iemand te vinden is. Jij leest het na, past het aan en verstuurt het. Wat je afspreekt en wanneer, leg je erbij vast.',
          list:['Berichtconcept op openbare informatie','Jij bewerkt en verstuurt, nooit Emma','Notities en volgende stap per contact'], vig:'vindt_pipeline' },
        { tag:'AVG-proof', h:'Netjes en navolgbaar.', p:'Een audit-log houdt bij wat er gebeurt, zodat je werving en acquisitie voldoen aan de privacyregels.',
          list:['Audit-log voor de AVG','Inzichtelijk wie je benadert','Rustig en verantwoord opgezet'], vig:'vindt_pipeline' },
      ],
    },
    steps:{ title:'Zo werkt het ontdekken.', items:[
      { n:'01 · KIES MODUS', h:'Mensen of klanten', p:'Bepaal of je kandidaten of nieuwe klanten zoekt. Emma stemt zich daarop af.' },
      { n:'02 · STEL IN', h:'Bepaal je straal', p:'Geef je werkgebied en wensen op. Emma zoekt binnen jouw buurt en branche.' },
      { n:'03 · SCOOR', h:'Zie wie past', p:'Profielen krijgen een score, zodat je je tijd steekt in wie er echt toe doet.' },
      { n:'04 · VOLG OP', h:'Houd je pipeline', p:'Van eerste contact tot match of klant, alles netjes en AVG-proof vastgelegd.' },
    ] },
    faq:[
      { q:'Is dit een vacaturebank?', a:'Nee. EmmaVindt helpt je actief ontdekken wie in jouw buurt past, in plaats van te wachten op reacties. In sales-modus werkt het net zo, maar dan voor potentiële klanten.' },
      { q:'Hoe zit het met privacy?', a:'De gegevens komen uit het openbare KvK-register en openbare bedrijfswebsites. Geen LinkedIn, geen social media. Dat mag niet volgens hun voorwaarden en brengt je account in gevaar. EmmaVindt werkt met de AVG als uitgangspunt en houdt met een audit-log bij wie je benadert.' },
      { q:'Voor wie is het handig?', a:'Voor ondernemers die personeel werven, zoals salons en zorgpraktijken, en voor wie nieuwe klanten zoekt, zoals ZZP\'ers en kleine teams.' },
      { q:'Verstuurt Emma zelf berichten?', a:'Nee. Emma schrijft een concept, jij leest het na en verstuurt het. Geeft iemand aan geen berichten te willen, dan legt Emma dat vast en houdt ze die persoon buiten je berichten.' },
      { q:'Vindt Emma ook mensen die niet op zoek zijn?', a:'Het uitgangspunt is het openbare KvK-register, dus je vindt vooral ondernemers en zelfstandigen in jouw vak. Dat is precies de groep die niet op vacaturebanken kijkt. Of iemand openstaat voor een gesprek, weet je pas als je het vraagt.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a: LAUNCHED
          ? '€9 per maand, exclusief btw, met 10% korting bij jaarbetaling. EmmaVindt is nu te gebruiken: je probeert het 14 dagen gratis, zonder creditcard. Maak een account aan op app.emmastudio.nl/signup.'
          : '€9 per maand, exclusief btw, met 10% korting bij jaarbetaling. EmmaVindt is nog in ontwikkeling. Laat je e-mail achter, dan hoor je het zodra je kunt starten.' },
    ],
  },
  coacht:{
    id:'coacht', name:'Coacht', num:'05', price:9, accentVar:'--m-coacht',
    chip:'gekoppeld aan EmmaWaakt',
    head:'Je team laten groeien, rustig.',
    intro:'Coaching-administratie die het makkelijk maakt om je mensen te ontwikkelen. Scorecards, gesprekken en voortgangsdoelen per persoon, met slimme suggesties voor je gesprekken.',
    heroVig:'coacht_scorecard',
    does:{
      title:'Wat EmmaCoacht voor je doet.',
      sub:'Goede gesprekken beginnen met goede voorbereiding. Emma houdt de lijn vast, zodat jij je op je mensen kunt richten.',
      feats:[
        { tag:'Scorecards', h:'Voortgang per persoon.', p:'Scorecards en voortgangsdoelen per medewerker, zodat je ziet hoe iemand zich ontwikkelt.',
          list:['Scorecards per medewerker','Voortgangsdoelen die je samen zet','Overzicht zonder spreadsheets'], vig:'coacht_scorecard' },
        { tag:'Check-ins', h:'Gesprekken die je niet vergeet.', p:'Periodieke check-ins met herinneringen en een log, zodat elk gesprek voortbouwt op het vorige.',
          list:['Gesprekslogs op één plek','Herinneringen voor je check-ins','Elk gesprek bouwt verder'], vig:'coacht_checkin' },
        { tag:'Slimme vragen', h:'Goed voorbereid het gesprek in.', p:'Suggesties voor coachvragen op basis van de cijfers uit EmmaWaakt, zodat je het over de juiste dingen hebt.',
          list:['Suggesties op basis van prestaties','Gericht op wat speelt','Jij voert het gesprek, Emma denkt mee'], vig:'coacht_vraag' },
      ],
    },
    steps:{ title:'Zo coach je rustiger.', items:[
      { n:'01 · ZET DOELEN', h:'Doelen per persoon', p:'Bepaal samen met je medewerker waar het naartoe gaat. Emma houdt de voortgang bij.' },
      { n:'02 · PLAN', h:'Plan je check-ins', p:'Zet periodieke gesprekken klaar. Emma herinnert je er op tijd aan.' },
      { n:'03 · BEREID VOOR', h:'Krijg suggesties', p:'Voor elk gesprek krijg je vragen voorgesteld op basis van de cijfers.' },
      { n:'04 · LEG VAST', h:'Houd de lijn vast', p:'Notities en afspraken blijven bewaard, zodat het volgende gesprek verder bouwt.' },
    ] },
    faq:[
      { q:'Voor wie is EmmaCoacht?', a:'Voor ondernemers met personeel dat ze willen ontwikkelen, zoals salons en zorgpraktijken. Werk je alleen, dan heb je deze module niet nodig.' },
      { q:'Waar komen de coachvragen vandaan?', a:'Uit de prestatiecijfers in EmmaWaakt. Loopt de productverkoop van iemand terug, dan stelt Emma voor daar het gesprek over te voeren. Jij bepaalt wat je ermee doet.' },
      { q:'Werkt het samen met de andere modules?', a:'Ja. EmmaCoacht leunt op EmmaWaakt voor de cijfers en sluit aan op EmmaLoont voor je personeelsadministratie. Je kunt ook met alleen Coacht beginnen.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a:'€9 per maand, exclusief btw, met 10% korting bij jaarbetaling. EmmaCoacht is nog in ontwikkeling. Laat je e-mail achter, dan hoor je het zodra je kunt starten.' },
    ],
  },
  ziet:{
    id:'ziet', name:'Ziet', num:'06', price:9, accentVar:'--m-ziet',
    chip:'Op basis van het KvK-register',
    head:'Weet wat je concurrenten in de buurt doen.',
    intro:'Emma zoekt in het KvK-register wie er in jouw vak binnen een straal om je heen zit, zet ze op de kaart, en zegt het als er iemand bijkomt. Jij bepaalt wie er op je lijst staat.',
    heroVig:'ziet_concurrent',
    does:{
      title:'Wat EmmaZiet voor je doet.',
      sub:'Emma zoekt, jij kiest. De lijst is een voorstel, geen oordeel.',
      feats:[
        { tag:'Concurrent-detectie', h:'Emma zoekt, jij kiest.',
          p:'Op basis van je SBI-code en een straal die je zelf instelt, zoekt Emma in het KvK-register wie er in jouw vak zit. Je krijgt een lijst en bepaalt zelf wie erop blijft staan.',
          list:['Zoekt op SBI-code binnen jouw straal','Straal zelf instelbaar, per kilometer','Jij bepaalt wie op je lijst staat'],
          vig:'ziet_concurrent' },
        { tag:'Kaartvisualisatie', h:'Zie in één blik waar ze zitten.',
          p:'Elke concurrent die je selecteert, staat op de kaart. Je ziet in één oogopslag wie er dichtbij zit en wie aan de rand van je gebied.',
          list:['Alle geselecteerde concurrenten op één kaart','Je eigen adres uitgesloten','Klik door naar wat Emma van ze weet'],
          vig:'ziet_concurrent' },
        { tag:'Prijsvergelijking', h:'Wat vragen ze verderop?',
          p:'Zet je eigen diensten en prijzen erin. Emma haalt de prijzen van de websites van je concurrenten op en legt ze ernaast. Alleen bij diensten die jij hebt gekoppeld, want een verzonnen vergelijking is erger dan geen vergelijking.',
          list:['Prijzen van concurrent-websites uitgelezen','Per dienst naast je eigen prijs gelegd','Niet gekoppeld is niet vergeleken, nooit gegokt'],
          vig:'ziet_prijs' },
        { tag:'Reviews & positie', h:'Hoe sta jij ervoor tegenover de buurt?',
          p:'Emma haalt de Google-reviews van je concurrenten op, haalt de thema\'s eruit en houdt bij of het sentiment beter of slechter wordt. Daarboven staat het antwoord op de vraag waar het echt om gaat: waar sta jij.',
          list:['Reviewscore en thema\'s per concurrent','Sentiment over tijd, verbetert of verslechtert het','Positie-update: waar sta jij in de buurt'],
          vig:'ziet_review' },
        { tag:'Wekelijkse monitoring', h:'Emma let op, ook als jij dat niet doet.',
          p:'Elke week kijkt Emma of er iemand nieuw is in jouw gebied. Zo ja, dan hoor je het. Niet elke week een mail, alleen als er echt iets verandert.',
          list:['Wekelijkse controle op nieuwe inschrijvingen','Melding alleen als er iets verandert','Komt binnen bij je andere signalen'],
          vig:'ziet_concurrent' },
      ],
    },
    steps:{ title:'Zo werkt het.', items:[
      { n:'01 · STEL IN', h:'Geef je werkgebied', p:'Bepaal je locatie en de radius waarbinnen Emma moet zoeken.' },
      { n:'02 · DETECTEER', h:'Emma zoekt automatisch', p:'Concurrenten in de buurt worden via KvK en SBI-codes automatisch gevonden.' },
      { n:'03 · KIES', h:'Jij kiest', p:'Wie hoort erbij, wie niet. Emma doet een voorstel op basis van het register, jij weet wie je echte concurrent is.' },
      { n:'04 · MONITORT', h:'Emma houdt bij', p:'Elke week een controle. Komt er iemand bij, dan hoor je het. En op de kaart zie je meteen waar.' },
    ] },
    faq:[
      { q:'Hoe komt Emma aan deze gegevens?', a:'De concurrenten komen uit het openbare KvK-register, op basis van je SBI-code en een straal die je zelf instelt. Reviews komen van Google. Geen social media, geen LinkedIn. Alleen openbare bronnen.' },
      { q:'Voor wie is het vooral nuttig?', a:'Voor lokale dienstverleners zoals salons en zorgpraktijken, die willen weten wie er in hun buurt actief is zonder daar zelf naar te hoeven zoeken.' },
      { q:'Word ik er niet onrustig van?', a:'Nee. EmmaZiet stuurt geen doorlopende alarmen, alleen een signaal als er daadwerkelijk een nieuwe concurrent bijkomt.' },
      { q:'Hoe betrouwbaar is de prijsvergelijking?', a:'Emma leest de prijzen van de websites van je concurrenten. Staat er geen prijslijst op een site, dan is er niets te vergelijken en zegt Emma dat ook. Je koppelt zelf welke dienst van jou bij welke dienst van hen hoort. Zonder die koppeling toont Emma geen vergelijking, want een gegokte match is erger dan een lege plek.' },
      { q:'Waar komen de reviews vandaan?', a:'Van Google. Emma haalt de reviews van je concurrenten op, haalt er de terugkerende thema\'s uit en houdt bij of het sentiment beter of slechter wordt. Je ziet ook je eigen positie ertegenover.' },
      { q:'Wat kost EmmaZiet?', a:'€9 per maand, exclusief btw. Je probeert het eerst 14 dagen gratis en je kunt maandelijks opzeggen. Betaal je per jaar, dan krijg je 10% korting.' },
      { q:'Kan ik EmmaZiet nu al gebruiken?', a: LAUNCHED
          ? 'Ja. EmmaZiet is nu te gebruiken. Je probeert het 14 dagen gratis, zonder creditcard. Maak een account aan op app.emmastudio.nl/signup.'
          : 'EmmaZiet draait al, maar de aanmelding staat nog niet open. Laat je e-mail achter, dan hoor je het op de dag dat je kunt starten.' },
    ],
  },
  schrijft:{
    id:'schrijft', name:'Schrijft', num:'07', price:19, accentVar:'--m-schrijft',
    chip:'in jouw eigen stem',
    head:'Teksten die klinken als jij.',
    intro:'Alles rond schrijven en plannen op één plek. Blogs, social, e-mail en SEO vanuit één planner, in de toon van je bedrijf, met jou aan het roer van de eindredactie.',
    heroVig:'schrijft_kanban',
    does:{
      title:'Wat EmmaSchrijft voor je doet.',
      sub:'Van leeg scherm naar geplande content, zonder dat het uren kost of klinkt als een ander. Jij houdt de eindredactie.',
      feats:[
        { tag:'Eén planner', h:'Al je content op één plek.', p:'Een centrale planner voor blogs, social en e-mail, zodat je overzicht houdt over wat wanneer uitgaat.',
          list:['Blog, social en e-mail samen','Kanban van idee tot gepland','Publiceert naar WordPress en Mailchimp, plant voor Instagram'], vig:'schrijft_kanban' },
        { tag:'Jouw stem', h:'Geschreven zoals jij praat.', p:'Emma leert de toon van je bedrijf, zodat concepten klinken als jij, niet als een willekeurige tekst.',
          list:['Leert de stem van je bedrijf','Concepten als startpunt','Jij doet de eindredactie'], vig:'schrijft_stem' },
        { tag:'SEO', h:'Gevonden worden.', p:'SEO-teksten op basis van echte zoekwoorddata, zodat je content ook gevonden wordt.',
          list:['Op basis van zoekwoorddata','Praktische SEO, geen trucs','Klaar om te plannen'], vig:'schrijft_kanalen' },
        { tag:'Organisch', h:'Schrijven, geen adverteren.', p:'EmmaSchrijft gaat over wat je onbetaald publiceert: blogs, e-mails en posts. Betaald adverteren, met advertentiebeelden en campagnes, is EmmaPromoot. En doorwrochte social-visuals horen er bewust niet bij: Emma maakt een eenvoudige visual bij je tekst, geen volledige beeldproductie.',
          list:['Blogs, e-mail en posts: ja','Betaald adverteren: dat is EmmaPromoot','Eenvoudige visuals, geen social-beeldproductie'], vig:'schrijft_stem' },
      ],
    },
    steps:{ title:'Zo plan je je content.', items:[
      { n:'01 · STEM', h:'Leer Emma je toon', p:'Geef een paar voorbeelden van je stijl. Emma leert hoe jouw bedrijf klinkt.' },
      { n:'02 · KIES', h:'Kies een onderwerp', p:'Blog, social-post of e-mail. Emma maakt een concept als startpunt.' },
      { n:'03 · REDIGEER', h:'Maak het van jou', p:'Schaaf het concept bij. Jij houdt de eindredactie, altijd.' },
      { n:'04 · PLAN', h:'Zet het klaar', p:'Plan het op het juiste kanaal en moment, vanuit één overzicht.' },
    ] },
    faq:[
      { q:'Schrijft Emma alles voor me?', a:'Emma maakt concepten als startpunt, in de stem van je bedrijf. Jij houdt altijd de eindredactie, zodat het klopt en klinkt als jij. Het neemt het lege scherm weg, niet je stem.' },
      { q:'Met welke kanalen werkt het?', a:'EmmaSchrijft publiceert naar WordPress en Mailchimp, met SEO op basis van zoekwoorddata. Social zoals Instagram plan je in de planner en publiceer je zelf. Welke koppelingen bij de lancering klaarstaan, communiceren we vooraf.' },
      { q:'Voor wie is het handig?', a:'Voor elke ondernemer die regelmatig content maakt maar er weinig tijd voor heeft, in alle branches en pakketten.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a:'€19 per maand, exclusief btw, met 10% korting bij jaarbetaling. EmmaSchrijft is nog in ontwikkeling. Laat je e-mail achter, dan hoor je het zodra je kunt starten.' },
    ],
  },
  promoot:{
    id:'promoot', name:'Promoot', num:'08', price:19, accentVar:'--m-promoot',
    chip:'gekoppeld aan je echte omzet',
    head:'Zie welke euro écht werkt.',
    intro:'Alles rond geld in marketing. Google en Meta Ads in één overzicht, gekoppeld aan je cijfers, zodat je ziet welke advertentie echt omzet oplevert en welke niet.',
    heroVig:'promoot_attributie',
    does:{
      title:'Wat EmmaPromoot voor je doet.',
      sub:'Adverteren hoeft geen blind budget te zijn. Emma laat zien wat werkt, gekoppeld aan je echte omzet.',
      feats:[
        { tag:'Eén overzicht', h:'Al je advertenties samen.', p:'Google Ads en Meta Ads in één scherm, zodat je niet langer tussen platforms hoeft te springen.',
          list:['Google en Meta naast elkaar','Resultaten per campagne en kanaal','Geen losse logins meer'], vig:'promoot_kanalen' },
        { tag:'Attributie', h:'Weet wat omzet oplevert.', p:'Resultaten gekoppeld aan je omzet, tot op de dienst, zodat je ziet welke euro echt iets doet.',
          list:['Toegerekend aan je omzet','Inzicht per dienst','Stop met gokken op gevoel'], vig:'promoot_attributie' },
        { tag:'Budgetadvies', h:'Zet je geld waar het werkt.', p:'Een advies voor je budgetverdeling, direct gekoppeld aan de cijfers uit EmmaWaakt.',
          list:['Advies voor je budgetverdeling','Gekoppeld aan EmmaWaakt','Jij beslist, Emma onderbouwt'], vig:'promoot_budget' },
        { tag:'Creatives', h:'Emma maakt de hele advertentie.', p:'Beeld én tekst, per platform op maat. Je kunt geen campagne draaien zonder creative, dus EmmaPromoot maakt ze: een advertentiebeeld en een pakkende tekst, klaar om te draaien op Google of Meta. Dat is het verschil met een dashboard dat alleen cijfers laat zien.',
          list:['Advertentiebeeld en -tekst','Per platform op maat','Klaar om te draaien op Google en Meta'], vig:'promoot_kanalen' },
      ],
    },
    steps:{ title:'Zo adverteer je gericht.', items:[
      { n:'01 · KOPPEL', h:'Verbind je kanalen', p:'Koppel Google en Meta Ads. Emma haalt je campagnes en resultaten op.' },
      { n:'02 · MEET', h:'Koppel aan omzet', p:'Resultaten worden toegerekend aan je echte omzet, tot op de dienst.' },
      { n:'03 · ZIE', h:'Zie wat werkt', p:'In één overzicht zie je welke campagne oplevert en welke geld kost.' },
      { n:'04 · VERDEEL', h:'Stuur je budget', p:'Volg het advies om je budget te zetten waar het rendeert, of kies zelf.' },
    ] },
    faq:[
      { q:'Is EmmaPromoot ook bewezen bij Blondes Incognito?', a:'EmmaPromoot is de enige module die nog niet 18 maanden in de praktijk draaide. De aanpak is beproefd, maar deze module bouwen we nu opnieuw op.' },
      { q:'Met welke platforms werkt het?', a:'EmmaPromoot is opgezet voor Google Ads en Meta Ads, met attributie op basis van je webstatistieken. Welke koppelingen bij de lancering klaarstaan, communiceren we vooraf.' },
      { q:'Voor wie is het bedoeld?', a:'Voor ondernemers met een actief advertentiebudget. Heb je dat niet, dan is dit niet de juiste module.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a:'€19 per maand, exclusief btw, met 10% korting bij jaarbetaling. Het advertentiebudget zelf betaal je rechtstreeks aan Google of Meta. EmmaPromoot is nog in ontwikkeling. Laat je e-mail achter, dan hoor je het zodra je kunt starten.' },
    ],
  },
};

export const VIGNETTES: Record<string, string> = {
  boekt_factuur:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Facturen &amp; offertes</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Factuur · Blondes Incognito</span><b class="vig__pill">verstuurd</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Offerte · nieuwe klant</span><b class="vig__pill">bekeken</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Concept · maandfactuur</span><b class="vig__pill vig__pill--w">opstellen…</b></div>`,
  boekt_inlezen:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Inkomende post</div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Leverancier · PDF</span><b class="vig__pill vig__pill--w">inlezen…</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Bedrag &amp; BTW herkend</span><b class="vig__pill">geboekt</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Emma stelt de <b>grootboekrekening</b> voor, jij bevestigt</div>`,
  boekt_openstaand:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Openstaand</div>
    <div class="vig__pay"><span>Debiteuren</span><i></i></div>
    <div class="vig__pay"><span>Waarvan te laat</span><i style="width:46%"></i></div>
    <div class="vig__bar"><span>Twee facturen langer dan 30 dagen open</span><i></i></div>`,
  boekt_schil:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Gekoppeld</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>eBoekhouden.nl</span><b class="vig__pill">verbonden</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>SnelStart</span><b class="vig__pill vig__pill--w">binnenkort</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Jij werkt in Emma. Je cijfers blijven <b>op hun plek</b></div>`,
  waakt_doel:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Omzet vs. doel</div>
    <div class="vig__chart"><i style="height:44%"></i><i style="height:58%"></i><i style="height:50%"></i><i style="height:71%"></i><i style="height:63%"></i><i style="height:84%"></i></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Je loopt iets achter op je doel. <b>Drie acties</b> voor deze week</div>`,
  waakt_prognose:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Prognose dit kwartaal</div>
    <div class="vig__pay"><span>Deze maand</span><i></i></div>
    <div class="vig__pay"><span>Verwacht</span><i style="width:62%"></i></div>
    <div class="vig__pay"><span>Doel</span><i style="width:70%"></i></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Op basis van je <b>werkelijke cijfers</b> en het seizoen</div>`,
  waakt_signaal:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Deze week</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Omzet op koers</span><b class="vig__pill">+ doel</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Kosten lopen op</span><b class="vig__pill vig__pill--w">let op</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Marge stabiel</span><b class="vig__pill">rustig</b></div>`,
  loont_strook:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Loonstrook</div>
    <div class="vig__pay"><span>Brutoloon</span><i></i></div>
    <div class="vig__pay"><span>Werkgeverslasten</span><i style="width:54%"></i></div>
    <div class="vig__pay"><span>Vakantiegeld · pro rata</span><i style="width:30%"></i></div>
    <div class="vig__li" style="margin-top:12px"><span class="vig__tick">✓</span><span>Loonstrook · PDF</span><b class="vig__pill">klaar</b></div>`,
  loont_contract:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Contract</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Arbeidsovereenkomst</span><b class="vig__pill">vastgelegd</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Versiehistorie</span><b class="vig__pill vig__pill--w">bewaard</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Met de <b>CAO van jouw branche</b> als basis</div>`,
  loont_verlof:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Verlof &amp; verzuim</div>
    <div class="vig__pay"><span>Opgenomen</span><i style="width:40%"></i></div>
    <div class="vig__pay"><span>Resterend saldo</span><i style="width:60%"></i></div>
    <div class="vig__li" style="margin-top:12px"><span class="vig__tick">✓</span><span>Saldo automatisch bijgewerkt</span></div>`,
  vindt_pipeline:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Pipeline</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Kandidaat · in de buurt</span><b class="vig__pill">match</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Lead · binnen 25 km</span><b class="vig__pill">gesprek</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Nieuw profiel gevonden</span><b class="vig__pill vig__pill--w">scoren…</b></div>`,
  vindt_score:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Match-score</div>
    <div class="vig__scale"><span class="vig__band"></span><span class="vig__me" style="left:74%">deze</span><span class="vig__avg" style="left:50%"></span></div>
    <div class="vig__legend"><span><i class="vig__lg vig__lg--me"></i> deze kandidaat</span><span><i class="vig__lg"></i> gemiddelde</span></div>
    <div class="vig__li" style="margin-top:6px"><span class="vig__tick">✓</span><span>Past bij je vacature</span></div>`,
  vindt_klant:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Klanten ontdekken</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Bedrijf · jouw werkgebied</span><b class="vig__pill">lead</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Gevonden op <b>locatie en branche</b> (SBI-code)</div>`,
  coacht_scorecard:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Scorecard · Eva</div>
    <div class="vig__pay"><span>Klanttevredenheid</span><i style="width:82%"></i></div>
    <div class="vig__pay"><span>Productverkoop</span><i style="width:54%"></i></div>
    <div class="vig__pay"><span>Stiptheid</span><i style="width:90%"></i></div>`,
  coacht_checkin:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Check-ins</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Gesprek vorige maand</span><b class="vig__pill">vastgelegd</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Volgende check-in</span><b class="vig__pill vig__pill--w">herinnering</b></div>`,
  coacht_vraag:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Voorbereiding</div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Suggestie: <b>vraag naar productverkoop</b>, die liep terug</div>
    <div class="vig__li" style="margin-top:8px"><span class="vig__tick">✓</span><span>Op basis van je eigen cijfers</span></div>`,
  ziet_concurrent:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> In de buurt</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Concurrenten in kaart</span><b class="vig__pill">2 km</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Wekelijkse update</span><b class="vig__pill">rustig</b></div>`,
  ziet_prijs:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Prijs per dienst</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Knippen</span><b class="vig__pill">gelijk</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Highlights</span><b class="vig__pill">8% onder</b></div>`,
  ziet_review:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Jouw positie</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Jouw score</span><b class="vig__pill">4,7</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Buurtgemiddelde</span><b class="vig__pill">4,4</b></div>`,
  schrijft_kanban:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Contentplanner</div>
    <div class="vig__kan">
      <div class="vig__col"><span class="vig__colh">Idee</span><i></i><i style="width:70%"></i></div>
      <div class="vig__col"><span class="vig__colh">Concept</span><i style="background:var(--sc);opacity:.9"></i><i style="width:60%"></i></div>
      <div class="vig__col"><span class="vig__colh">Gepland</span><i style="width:80%"></i></div>
    </div>`,
  schrijft_kanalen:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Klaar om te plannen</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Blog · WordPress</span><b class="vig__pill">concept</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Social · Instagram</span><b class="vig__pill">gepland</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>E-mail · Mailchimp</span><b class="vig__pill">klaar</b></div>`,
  schrijft_stem:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Jouw stem</div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Geschreven in de <b>toon van je bedrijf</b>, jij doet de eindredactie</div>
    <div class="vig__li" style="margin-top:8px"><span class="vig__tick">✓</span><span>SEO op je keywords</span></div>`,
  promoot_kanalen:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Advertenties</div>
    <div class="vig__pay"><span>Google Ads</span><i style="width:74%"></i></div>
    <div class="vig__pay"><span>Meta Ads</span><i style="width:48%"></i></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Eén overzicht, <b>alle kanalen</b></div>`,
  promoot_attributie:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Wat levert het op?</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Toegerekend aan omzet</span><b class="vig__pill">per dienst</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Zie welke euro <b>écht</b> iets oplevert</div>`,
  promoot_budget:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Budgetadvies</div>
    <div class="vig__pay"><span>Nu</span><i style="width:50%"></i></div>
    <div class="vig__pay"><span>Voorstel</span><i style="width:68%"></i></div>
    <div class="vig__li" style="margin-top:12px"><span class="vig__tick">✓</span><span>Gekoppeld aan je cijfers in EmmaWaakt</span></div>`,
};
