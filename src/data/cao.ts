/* ── CAO-DEKKING ────────────────────────────────────────────────────────────
   Welke cao's een klant vandaag echt kan gebruiken.

   Dit bestand bestaat omdat de site iets anders beweerde dan de database.
   Er stond "Kappers is de eerste, en er staan er inmiddels tientallen klaar".
   Sindsdien is dit de ene plek die site én chatbot lezen.

   Gemeten op productie op 2 september 2026, tegen `cao_regelset` (de bron
   waarmee Emma rekent) en de celverificatie per branche:

     branche                                cellen geverifieerd / afwijkingen
     182  Horeca                            792 / 0
     405  Kappers                           530 / 0
     721  Huisartsenzorg                    452 / 0
     759  Schilders                         215 / 0
     823  Motorvoertuigen en tweewielers  1.890 / 0
     2297 Technisch installatiebedrijf      660 / 0

   Alle zes rekenen op prod, alle zes hebben een vastgesteld pensioenfonds,
   en er staat in geen enkele branche nog een actieve weigering. Zie
   `emmastudio-app/docs/branchestand.md` voor de volledige meting.

   LET OP: `cao_versie` (de AVV-inleespijplijn, met tientallen concepten) is
   NIET de maat. Die zegt wat Emma in de Staatscourant heeft gezien, niet wat
   zij kan uitrekenen. Tot 10 augustus las dit bestand de verkeerde as en
   stond hier "1 cao"; de werkelijke maat is de vertaalde regelset.

   BIJWERKEN: komt er een branche bij op prod (regelset die rekent, cellen
   geverifieerd), dan hoort hij hieronder. Zowel de modulepagina als de
   chatbot lezen deze lijst, dus één plek. */

/** Branches met een gecontroleerde, rekenende regelset op productie. */
export const CAO_GEVALIDEERD = [
  'Kappers',
  'Horeca',
  'Huisartsenzorg',
  'Schilders',
  'Motorvoertuigen en tweewielers',
  'Technisch installatiebedrijf',
] as const;

/** Ingelezen via de AVV-pijplijn maar nog niet vertaald en gecontroleerd,
 *  dus nog niet te kiezen. */
export const CAO_IN_VOORBEREIDING = 27;

export const CAO_GEMETEN_OP = '2 september 2026';

/** Eén zin over de dekking, voor site en chatbot. Enkelvoud en meervoud
 *  worden hier afgehandeld zodat er straks niet "1 cao's" komt te staan. */
export function caoDekkingZin(): string {
  const n: number = CAO_GEVALIDEERD.length;
  const lijst = CAO_GEVALIDEERD.join(', ');
  const telwoord = ['nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht'][n] ?? String(n);
  return n === 1
    ? `Op dit moment is er één cao volledig ingelezen en gecontroleerd: ${lijst}.`
    : `Op dit moment zijn ${telwoord} cao's volledig ingelezen en gecontroleerd: ${lijst}.`;
}

/** De regel waar het op neerkomt, in de woorden die we ook in de chat gebruiken. */
export const CAO_REGEL =
  'EmmaLoont past bij je als je geen cao volgt, of als je cao hierboven staat. ' +
  'Volg je een andere cao, vraag dan eerst of die toegevoegd kan worden. ' +
  'Zonder gecontroleerde cao mist de loonschaal naast je contract.';
