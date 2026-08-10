/** Social proof. Bron: briefing v2 §4.3.
 *
 *  Het Ilze-citaat zelf is ongewijzigd, Tom heeft bevestigd dat zij dit
 *  letterlijk heeft gezegd. De bijbehorende cijfers zijn wel gecorrigeerd:
 *  "7/8 modules bewezen in de praktijk" en "1 salon, ons startpunt, nu voor
 *  iedereen" suggereerden dat EmmaStudio zelf al zo lang draait en zo breed
 *  bewezen is. Dat klopt niet: het is de bedrijfslogica áchter Emma die bij
 *  Blondes Incognito bewezen is, niet het platform zelf. */
export const ILZE_QUOTE = {
  quote: 'Ik wil gewoon lekker kunnen knippen. Met Emma zie ik hoe het gaat met mijn salon en mijn team, zonder elke avond in een spreadsheet te duiken.',
  name: 'Ilze Spannenberg',
  role: 'Eigenaar, Blondes Incognito, Heeten',
  stats: [
    { value: '18+ mnd', label: 'dagelijks in productie' },
    { value: '1 salon', label: 'waar de logica is bewezen' },
    { value: '5 modules', label: 'nu beschikbaar op het platform' },
  ],
};

export type StatItem = {
  value: number;
  label: string;
  suffix?: string;
  display?: string;
};

/** De STATS-strip. "35+ leads gevonden via KvK" is geschrapt: niet te
 *  onderbouwen, EmmaVindt bestaat nog niet en de Blondes Incognito-
 *  voorloper had geen KvK-zoeker. Vervangen door "6 concurrenten
 *  gemonitord", wat wél uit die praktijk komt. */
/* ── HOE LANG DRAAIT HET AL ─────────────────────────────────────────────────
   Stond op vijf plekken hardcoded als "18 maanden", naast "sinds eind 2024".
   Die twee liepen uit elkaar: in augustus 2026 zijn het er twintig. Een getal
   dat je met de hand moet bijhouden, houdt niemand bij, en op een pagina die
   over eerlijkheid gaat is dat precies het verkeerde getal om fout te hebben.

   Dus afgeleid van de startdatum. Naar beneden afgerond op hele maanden, zodat
   het nooit méér claimt dan waar is. De waarde wordt bij de build berekend,
   dus hij loopt hooguit tot de eerstvolgende deploy achter, de veilige kant. */
const START_PRAKTIJK = new Date(2024, 11, 1); // december 2024, "eind 2024"

export function maandenPraktijk(nu: Date = new Date()): number {
  const m = (nu.getFullYear() - START_PRAKTIJK.getFullYear()) * 12
          + (nu.getMonth() - START_PRAKTIJK.getMonth());
  return Math.max(0, m);
}

/** "20 maanden": voor lopende tekst. */
export const MAANDEN_PRAKTIJK = maandenPraktijk();

export const STATS: StatItem[] = [
  { value: MAANDEN_PRAKTIJK, suffix: '+', label: 'Maanden dagelijks in gebruik bij Blondes Incognito' },
  { value: 1200, suffix: '+', label: 'Reviews geanalyseerd in de voorloper-tool' },
  { value: 6, label: 'Concurrenten gemonitord', display: '6' },
  { value: 8, label: 'Uur per week bespaard', display: '6-8' },
];

/** Hero-badge. Was (in de export): "Bewezen in productie sinds eind 2024".
 *  Onjuist voor EmmaStudio zelf, dat draait pas sinds circa mei 2026. Geldt
 *  de Blondes Incognito-voorloper, niet het platform. */
export const HERO_BADGE = `Gebouwd op ${MAANDEN_PRAKTIJK} maanden praktijk`;

/** Omkadering van de proof-sectie. "Niet uit een pitch deck" (uit de export)
 *  is bewust weggelaten: dat is een variant van eerlijkheid-als-USP
 *  (briefing §3.5), het bewijs staat er al, het hoeft er niet nog eens
 *  bij gezegd te worden dat het bewijs is.
 *  Kleine afwijking van de letterlijke briefing-tekst: het em-dash-teken
 *  vóór "als platform voor elke ondernemer" is vervangen door een komma,
 *  conform de projectregel "geen em-dashes als leesteken". De woorden zijn
 *  ongewijzigd. */
export const PROOF_INTRO = 'De bedrijfslogica achter Emma draait sinds eind 2024 dagelijks bij Blondes Incognito, een kapsalon in Heeten. Op dat fundament is emma gebouwd, als platform voor elke ondernemer.';
