import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** Staat het coverbeeld er echt?
 *
 *  De artikelen dragen een `image`-pad, maar een pad is nog geen bestand. Zonder
 *  deze controle rendert `next/image` een verwijzing naar iets dat niet bestaat:
 *  de foto laadt niet, het verloop eroverheen wél, en de kaart wordt een leeg
 *  donker vlak. Dat is slechter dan het gekleurde vlak met watermerk dat we al
 *  hadden.
 *
 *  Door hier te kijken of het bestand bestaat, kiest de kaart automatisch de
 *  juiste weergave. Een artikel zonder foto ziet er dus altijd goed uit, en
 *  beeld toevoegen is niets meer dan een bestand in /public/kennisbank zetten.
 *
 *  Alleen aanroepen vanuit een server component. Deze pagina's zijn statisch,
 *  dus dit draait tijdens de build en nooit in de browser. */
export function metBeeld<T extends { image?: string }>(artikel: T): T {
  if (!artikel.image) return artikel;
  const bestaat = existsSync(join(process.cwd(), 'public', artikel.image));
  return bestaat ? artikel : { ...artikel, image: undefined };
}
