import { MODULE_ORDER, MODULE_PRICE } from './modules';

/** Pakketten. Herzien augustus 2026, gelijk met de app en Stripe (prod, live):
 *  de oude indeling (ZZP, Zorg, Salons, Compleet) is vervangen door drie
 *  branchepakketten plus Compleet.
 *
 *  ZZP is vervallen omdat de focus van zzp'ers naar MKB is verschoven. Zorg is
 *  vervallen omdat de cao- en pensioenfondsstructuur daar voorlopig te complex
 *  is voor EmmaLoont, en het geen actieve focusbranche is.
 *
 *  PRIJS. `price` is de prijs zoals die in Stripe staat en is dus leidend: dat
 *  is wat er daadwerkelijk wordt afgerekend. De prijslogica is de som van de
 *  losse modules maal 0,9, maar die som wordt hier bewust NIET als formule
 *  uitgerekend. Wijzigt iemand later een moduleprijs, dan zou de site een
 *  bedrag tonen dat Stripe niet in rekening brengt. Het kortingsPERCENTAGE
 *  wordt wel afgeleid (zie `packageDiscount`), zodat die claim nooit los kan
 *  lopen van de getallen die ernaast staan.
 *
 *  `price: null` betekent: nog niet verkoopbaar, toon geen bedrag. Dat geldt
 *  voor Emma Compleet, dat pas een prijs krijgt als alle acht modules gebouwd
 *  zijn.
 *
 *  NAAMGEVING. "Emma voor [Branche]", zoals een ondernemer zichzelf noemt:
 *  "Emma voor Salons" (dekt kappers, barbershops en schoonheidssalons), niet
 *  "Emma voor Haarverzorging" of "Emma voor Kapsalons".
 *
 *  STATUS. Alle kaarten staan op 'Binnenkort'. Dat is geen slordigheid: de
 *  signup staat site-breed dicht (LAUNCHED=false) en elk pakket bevat
 *  EmmaLoont, dat volgens MODULE_STATUS nog niet live is. */
export type Package = {
  name: string;
  /** Maandprijs excl. btw zoals in Stripe. `null` = nog niet verkoopbaar. */
  price: number | null;
  desc: string;
  /** Module-id's zoals in MODULE_ORDER (niet de displaynamen). */
  modules: string[];
  status: string;
};

/** Som van de losse modules in een pakket, per maand. */
export function packageListPrice(modules: string[]): number {
  return modules.reduce((sum, id) => sum + (MODULE_PRICE[id] ?? 0), 0);
}

/** Kortingspercentage, afgeleid uit de losse modules en de pakketprijs, zodat
 *  het nooit een los onderhouden getal is. Null als er geen prijs is. */
export function packageDiscount(pkg: Package): number | null {
  if (pkg.price === null) return null;
  const list = packageListPrice(pkg.modules);
  if (!list) return null;
  return Math.round((1 - pkg.price / list) * 100);
}

/** Bedrag in Nederlandse notatie: 49.5 -> "49,50", 41.4 -> "41,40". Pakket-
 *  prijzen zijn sinds de herziening niet meer rond, dus altijd twee decimalen;
 *  anders zou er "€ 49,5" op de kaart staan. */
export function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',');
}

export const PACKAGES: Package[] = [
  {
    name: 'Emma voor Salons',
    price: 49.5,
    desc: 'Voor de salon met personeel: kappers, barbershops en schoonheidssalons.',
    modules: ['boekt', 'waakt', 'loont', 'vindt', 'ziet'],
    status: 'Binnenkort',
  },
  {
    name: 'Emma voor Horeca',
    price: 41.4,
    desc: 'Voor de zaak met een team in de keuken en de bediening.',
    modules: ['boekt', 'waakt', 'loont', 'ziet'],
    status: 'Binnenkort',
  },
  {
    name: 'Emma voor Installateurs',
    price: 49.5,
    desc: 'Voor het installatiebedrijf: zonnepanelen, warmtepompen en thuisbatterijen.',
    modules: ['boekt', 'waakt', 'loont', 'vindt', 'ziet'],
    status: 'Binnenkort',
  },
  {
    name: 'Emma Compleet',
    price: null,
    desc: 'Voor wie niets meer wil missen. De prijs volgt zodra alle acht modules er zijn.',
    modules: MODULE_ORDER,
    status: 'Binnenkort',
  },
];
