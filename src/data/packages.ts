import { MODULE_ORDER } from './modules';

/** Pakketten. Bron: briefing v2 §4.2/§6.2 (prijzen en modulesamenstelling
 *  al gecontroleerd, niet wijzigen). Alle vier hebben nu status 'Binnenkort':
 *  geen enkel pakket is koopbaar, dus geen 'Aanrader'-label en geen
 *  coral-highlight op één kaart (dat suggereert een keuze die er nog niet
 *  is). Prijs = pakketprijs; de som van losse modules en het kortings-
 *  percentage worden bewust NIET hier vastgelegd, maar afgeleid uit
 *  MODULE_PRICE bij het renderen, zo kunnen de twee getallen nooit uit
 *  elkaar lopen. */
export type Package = {
  name: string;
  price: number;
  desc: string;
  /** Module-id's zoals in MODULE_ORDER (niet de displaynamen). */
  modules: string[];
  status: string;
};

export const PACKAGES: Package[] = [
  {
    name: "Emma voor ZZP'ers",
    price: 37,
    desc: 'Voor de zelfstandige zonder personeel.',
    modules: ['boekt', 'waakt', 'vindt', 'schrijft'],
    status: 'Binnenkort',
  },
  {
    name: 'Emma voor Zorg',
    price: 44,
    desc: 'Voor de praktijkhouder met personeel.',
    modules: ['boekt', 'waakt', 'loont', 'vindt', 'coacht'],
    status: 'Binnenkort',
  },
  {
    name: 'Emma voor Salons',
    price: 66,
    desc: 'Voor de salon die alles wil behalve adverteren.',
    modules: ['boekt', 'waakt', 'loont', 'vindt', 'coacht', 'ziet', 'schrijft'],
    status: 'Binnenkort',
  },
  {
    name: 'Emma Compleet',
    price: 77,
    desc: 'Voor wie niets meer wil missen.',
    modules: MODULE_ORDER,
    status: 'Binnenkort',
  },
];
