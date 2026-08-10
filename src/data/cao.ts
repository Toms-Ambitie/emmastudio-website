/* ── CAO-DEKKING ────────────────────────────────────────────────────────────
   Welke cao's een klant vandaag echt kan gebruiken.

   Dit bestand bestaat omdat de site iets anders beweerde dan de database.
   Er stond "Kappers is de eerste, en er staan er inmiddels tientallen klaar".
   Gemeten op productie (Supabase, `cao_versie`) op 10 augustus 2026:

     status actief    :  1   <- alleen deze is bruikbaar
     status concept   : 28   <- ingelezen, niet gecontroleerd, niet te kiezen
     status verouderd : 16
     cao's met loonregels in cao_loon_actueel: 1

   "Klaarstaan" en "te gebruiken" zijn dus twee verschillende dingen, en het
   verschil is 1 tegen 28. Een bakker die op die zin afgaat, neemt de module
   en ontdekt in week één dat zijn cao er niet in zit.

   De regel die Tom hanteert: EmmaLoont is interessant voor ondernemingen
   zonder cao, of voor ondernemingen met een cao die hier gevalideerd is.
   Die twee groepen, meer niet.

   BIJWERKEN: zodra een cao op prod op `actief` staat, hoort hij hieronder.
   Zowel de modulepagina als de chatbot lezen deze lijst, dus één plek. */

/** Cao's met een actieve, gecontroleerde versie op productie. */
export const CAO_GEVALIDEERD = ['Kappersbedrijf'] as const;

/** Ingelezen maar nog niet gecontroleerd, dus nog niet te kiezen. */
export const CAO_IN_VOORBEREIDING = 28;

export const CAO_GEMETEN_OP = '10 augustus 2026';

/** Eén zin over de dekking, voor site en chatbot. Enkelvoud en meervoud
 *  worden hier afgehandeld zodat er straks niet "1 cao's" komt te staan. */
export function caoDekkingZin(): string {
  const n = CAO_GEVALIDEERD.length;
  const lijst = CAO_GEVALIDEERD.join(', ');
  return n === 1
    ? `Op dit moment is er één cao volledig ingelezen en gecontroleerd: ${lijst}.`
    : `Op dit moment zijn deze ${n} cao's volledig ingelezen en gecontroleerd: ${lijst}.`;
}

/** De regel waar het op neerkomt, in de woorden die we ook in de chat gebruiken. */
export const CAO_REGEL =
  'EmmaLoont past bij je als je geen cao volgt, of als je cao hierboven staat. ' +
  'Volg je een andere cao, vraag dan eerst of die toegevoegd kan worden. ' +
  'Zonder gecontroleerde cao mist de loonschaal naast je contract.';
