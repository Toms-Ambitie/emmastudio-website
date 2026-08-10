/* ── BEDRIJFSGEGEVENS ──────────────────────────────────────────────────────
   Eén bron voor de wettelijk verplichte identiteitsgegevens (art. 3:15d BW).
   Ze staan op vier plekken op de site: footer, /contact, privacyverklaring
   en algemene voorwaarden. Dat zijn precies vier plekken waar ze uit
   elkaar kunnen gaan lopen. Hier dus, niet in de pagina's zelf.

   IBAN en BIC staan er bewust in maar worden NERGENS publiek getoond. Betalen
   loopt via Stripe; een rekeningnummer op een publieke pagina levert de klant
   niets op en nodigt wél uit tot betaalfraude ("wij hebben een nieuw
   rekeningnummer"). Ze staan hier voor facturen en correspondentie, zodat
   niemand ze hoeft op te zoeken. */

export const BEDRIJF = {
  naam: 'Toms Ambitie',
  /** Rechtsvorm. Toms Ambitie is een eenmanszaak, geen BV. Dat stond eerder
   *  wél in de algemene voorwaarden ("de besloten vennootschap Toms Ambitie")
   *  en dat is onjuist: een verkeerde rechtsvorm in je eigen voorwaarden is
   *  een fout in het document dat je aansprakelijkheid regelt. Gaat EmmaStudio
   *  later in een aparte BV, dan wijzigt het hier, en op geen enkele
   *  andere plek. */
  rechtsvorm: 'eenmanszaak',
  /** EmmaStudio en Emma zijn handelsnamen van dezelfde onderneming, geen
   *  aparte rechtspersonen. Wie een factuur van "Toms Ambitie" krijgt voor
   *  iets wat hij bij "Emma" kocht, moet dat kunnen terugvinden. */
  handelsnamen: ['EmmaStudio', 'Emma'],
  straat: 'Cleyndertstraat 16',
  postcode: '8044 PP',
  plaats: 'Zwolle',
  land: 'Nederland',
  kvk: '70590907',
  btw: 'NL002010180B20',
  email: 'info@emmastudio.nl',
  website: 'www.emmastudio.nl',
  /** Niet publiek tonen, zie de toelichting hierboven. */
  iban: 'NL84 KNAB 0257 0110 48',
  bic: 'KNABNL2H',
} as const;

/** "Cleyndertstraat 16, 8044 PP Zwolle": voor lopende tekst en één regel. */
export const ADRES_KORT = `${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}`;

/** "KvK 70590907 · Btw NL002010180B20": voor de footer en colofonregels. */
export const NUMMERS_KORT = `KvK ${BEDRIJF.kvk} · Btw ${BEDRIJF.btw}`;
