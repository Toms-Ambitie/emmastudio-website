/* ── VERGELIJKING PER MODULE ────────────────────────────────────────────────
   De inhoud van /vergelijk, en via de kennisbasis ook wat de chatbot over
   concurrenten mag zeggen. Eén bron, zodat site en chat nooit twee verhalen
   vertellen.

   HET KADER (met Tom vastgesteld, 10 augustus 2026): per module precies twee
   soorten concurrent. Het PRIJSANKER is het product waar we tegen afgezet
   willen worden; de STATUS QUO is wat de klant nu werkelijk doet, en van die
   tweede winnen we het vaakst. Niet vijf concurrenten per module: dat leest
   als een spreadsheet en verwatert de klap.

   Bij elke module hoort ook één eerlijke grens (btw-aangifte, loonaangifte).
   Die is verplicht: vergelijkende reclame moet juist en actueel zijn
   (art. 6:194a BW), en een boekhouder die de tabel leest moet hem heel laten.

   PRIJZEN VAN ANDEREN: openbare prijsinformatie, gepeild augustus 2026, per
   aanbieder gecheckt bij minstens twee bronnen (zie docs/CONCURRENTIE-
   ANALYSE.md voor bron en verificatiestatus). Bewust afgerond en met "±" waar
   bronnen uiteenliepen. Verander een bedrag hier nooit zonder de peildatum
   bij te werken. e-Boekhouden.nl, Moneybird en SnelStart horen hier NIET als
   concurrent in: dat zijn motoren waar EmmaBoekt bovenop werkt. */

export const PEILDATUM = 'augustus 2026';

export const VERGELIJK_VOETNOOT =
  `Prijzen van andere aanbieders zijn openbare prijsinformatie, gepeild in ${PEILDATUM}, ` +
  'exclusief btw en waar nodig afgerond. Klopt er iets niet meer? Mail info@emmastudio.nl, dan passen we het aan.';

export type VergelijkAnker = {
  naam: string;
  prijs: string;
  toelichting?: string;
};

export type ModuleVergelijk = {
  /** De invalshoek boven het blok. */
  kop: string;
  /** Onze opstelling in één regel, inclusief prijs. */
  emma: string;
  /** Productankers: waar we tegen afgezet willen worden. Maximaal twee-drie. */
  ankers: VergelijkAnker[];
  /** Wat de klant nu werkelijk doet. */
  statusQuo: string;
  /** De verplichte eerlijke grens. */
  grens: string;
};

export const MODULE_VERGELIJK: Record<string, ModuleVergelijk> = {
  boekt: {
    kop: 'Premium boekhouden, zonder premium prijs',
    emma:
      'Jouw boekhoudpakket als motor plus EmmaBoekt à €9: samen vanaf ongeveer €23 per maand. ' +
      'Vandaag werkt EmmaBoekt met e-Boekhouden.nl; koppelingen met Moneybird en SnelStart staan op de planning.',
    ankers: [
      { naam: 'Exact Online', prijs: '€48 tot €159 p/mnd', toelichting: 'Plus, het middelste pakket, kost €99' },
      { naam: 'Twinfield', prijs: '± €44 tot €114 p/mnd', toelichting: 'meestgekozen versie rond €61' },
      { naam: 'AFAS SB', prijs: '€59 p/mnd vast', toelichting: 'alleen boekhouden' },
    ],
    statusQuo:
      'Alles bij de boekhouder laten: reken op €100 tot €250 per maand, en je wacht op je cijfers in plaats van dat je ze ziet. ' +
      'Met Emma houd je je boekhouder voor het jaarwerk en doe je het dagelijkse werk zelf, in minuten.',
    grens:
      'Eerlijk: de btw-aangifte dien je in via je boekhoudpakket of je boekhouder, niet via Emma.',
  },
  waakt: {
    kop: 'Elke week weten hoe je ervoor staat',
    emma: 'EmmaWaakt à €9 per maand: doelen, prognoses, kostensignalen en een wekelijks advies op je eigen cijfers.',
    ankers: [
      { naam: 'SnelStart inZicht', prijs: '€54 p/mnd', toelichting: 'boekhouding met inzicht-laag' },
      { naam: 'Visionplanner', prijs: 'prijs op aanvraag', toelichting: 'rapportagetool, meestal via je accountant' },
    ],
    statusQuo:
      'Een spreadsheet op zondagavond, of de accountant die één keer per kwartaal belt als het al gebeurd is. ' +
      'Tussentijdse cijfers via je kantoor kosten al gauw €50 tot €150 per maand.',
    grens:
      'Eerlijk: Waakt is dag-tot-dag zicht, geen jaarrekening. Dat blijft werk voor je boekhouder.',
  },
  loont: {
    kop: 'Waarom betaal je per medewerker om je eigen mensen uit te betalen?',
    emma: 'EmmaLoont à €19 per maand, vast. Of je nu twee of twaalf mensen hebt.',
    ankers: [
      { naam: 'Employes', prijs: '€29,95 p/mnd + €7 per loonstrook', toelichting: 'bij vijf medewerkers ± €65 p/mnd' },
      { naam: 'Loket.nl', prijs: '€4,95 per medewerker p/mnd', toelichting: 'met een minimum van €49,50' },
      { naam: 'Salarisbureau', prijs: '€15 tot €25 per medewerker p/mnd', toelichting: 'bij vijf medewerkers €75 tot €125' },
    ],
    statusQuo:
      'Uitbesteden en elke maand betalen, ook in de maanden dat er niets verandert. ' +
      'Het verschil groeit met elke medewerker die je aanneemt.',
    grens:
      'Eerlijk: de loonaangifte bij de Belastingdienst doen zij wel en Emma niet. ' +
      'Die doe je zelf via Mijn Belastingdienst Zakelijk (mag tot tien werknemers) of via je kantoor.',
  },
  vindt: {
    kop: 'Kandidaten en klanten uit dezelfde bron als de dure tools',
    emma: 'EmmaVindt à €9 per maand: bedrijven en kandidaten in jouw radius uit het openbare KvK-register, met score en pipeline.',
    ankers: [
      { naam: 'Vainu', prijs: 'vanaf ± €292 p/mnd', toelichting: 'sales intelligence voor salesteams' },
      { naam: 'Indeed', prijs: '€120 p/mnd plus klikbudget', toelichting: 'standaard werkgeversabonnement' },
      { naam: 'Werving- en selectiebureau', prijs: '20 tot 35% van een jaarsalaris', toelichting: 'per aanname, al gauw duizenden euro\'s' },
    ],
    statusQuo:
      'Een vacature plaatsen en hopen, of een adressenbestand kopen dat veroudert in de la. ' +
      'Voor de fee van één bureau-aanname draait EmmaVindt tientallen jaren.',
    grens:
      'Eerlijk: Vindt levert namen om zelf te benaderen. Het is geen vacaturebank en voert het gesprek niet voor je.',
  },
  ziet: {
    kop: 'Weten wat er om je heen gebeurt, zonder groot-bedrijf-budget',
    emma: 'EmmaZiet à €9 per maand: concurrenten in je buurt, hun prijzen naast de jouwe, reviews-sentiment en een melding als er iemand bijkomt.',
    ankers: [
      { naam: 'Birdeye', prijs: 'vanaf ± $299 p/mnd per vestiging', toelichting: 'reputatiebeheer, gericht op grote ketens' },
      { naam: 'Semrush', prijs: 'vanaf ± $140 p/mnd', toelichting: 'online marketing intelligence' },
    ],
    statusQuo:
      'Niet weten. Zelf rondbellen, tabbladen bijhouden, of een eenmalige concurrentiescan van honderden euro\'s die meteen begint te verouderen.',
    grens:
      'Eerlijk: die grote tools doen ook SEO en advertenties, en dat doet Ziet niet. ' +
      'Ziet doet wat een lokale ondernemer echt wil weten: wie er om je heen zit, wat ze vragen en wat hun klanten vinden.',
  },
};
