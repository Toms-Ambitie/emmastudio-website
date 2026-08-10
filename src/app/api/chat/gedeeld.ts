import { BEDRIJF } from '@/data/bedrijf';

/* ── GEDEELD ────────────────────────────────────────────────────────────────
   Wat de chatroute en de doorzetroute allebei nodig hebben.

   Waarom dit uit route.ts gehaald is: het versturen van de mail gebeurt nu op
   een ander moment dan het gesprek. Emma stelt alleen nog voor om door te
   zetten; de bezoeker drukt daarna zelf op de knop. Dat is een tweede verzoek,
   dus een tweede route, en die twee delen deze code. */

export type Beurt = { rol: 'gebruiker' | 'emma'; tekst: string };

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_VRAAG_TEKENS = 2_000;
export const MAX_BEURTEN = 30;
export const MAX_GESPREK_TEKENS = 24_000;

/* Snelheidsbegrenzing per IP. In het geheugen van de draaiende instantie:
   Vercel geeft geen gedeelde opslag zonder er een dienst bij te nemen, en dat
   is deze functie nog niet waard. Wat dit betekent: bij meerdere instanties
   telt elk zijn eigen bezoekers, dus de echte limiet ligt hoger dan het getal
   hieronder. Het houdt een script tegen, geen botnet. */
const VENSTER_MS = 60_000;
const tellers = new Map<string, { tot: number; aantal: number }>();

export function teVaak(sleutel: string, max: number): boolean {
  const nu = Date.now();
  const t = tellers.get(sleutel);
  if (!t || nu > t.tot) {
    tellers.set(sleutel, { tot: nu + VENSTER_MS, aantal: 1 });
    if (tellers.size > 5_000) {
      for (const [k, v] of tellers) if (nu > v.tot) tellers.delete(k);
    }
    return false;
  }
  t.aantal += 1;
  return t.aantal > max;
}

/* Een tweede rem, en een andere dan de vorige.

   De limiet per IP houdt één bezoeker tegen. Hij houdt niets tegen als iemand
   met honderd adressen aanklopt, en juist dat is het scenario waarin een
   publieke chatendpoint geld kost: elke vraag is een betaald verzoek aan het
   model. Deze teller kijkt daarom niet naar wie er belt maar naar hoeveel er
   in totaal binnenkomt op deze instantie, per uur.

   Bewust ruim gezet. Bij het huidige verkeer haalt niemand dit; het is een
   noodrem tegen een script dat losgaat in een weekend, niet een quotum voor
   bezoekers. Merk je hem in de praktijk, dan is dat het signaal dat er echt
   verkeer is en dat gedeelde opslag (Vercel KV of Upstash) de volgende stap
   is, want ook dit plafond geldt per draaiende instantie. */
const UUR_MS = 3_600_000;
const MAX_PER_UUR = 400;
let uurvenster = { tot: 0, aantal: 0 };

export function teDruk(): boolean {
  const nu = Date.now();
  if (nu > uurvenster.tot) {
    uurvenster = { tot: nu + UUR_MS, aantal: 1 };
    return false;
  }
  uurvenster.aantal += 1;
  if (uurvenster.aantal === MAX_PER_UUR + 1) {
    console.error('[chat] uurplafond geraakt:', MAX_PER_UUR, 'verzoeken op deze instantie');
  }
  return uurvenster.aantal > MAX_PER_UUR;
}

export function ipVan(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'onbekend'
  );
}

/** Leest het gesprek uit een verzoek en knipt het op de afgesproken grenzen.
 *  Lege beurten vallen weg, wat ook meteen de lege Emma-beurt opruimt die
 *  achterblijft als een eerder verzoek halverwege misging. */
export function leesGesprek(ruw: unknown): Beurt[] {
  if (!Array.isArray(ruw)) return [];
  const gesprek: Beurt[] = [];
  let totaal = 0;
  for (const b of ruw.slice(-MAX_BEURTEN)) {
    const rol = b?.rol === 'emma' ? 'emma' : 'gebruiker';
    const tekst = String(b?.tekst ?? '').slice(0, MAX_VRAAG_TEKENS).trim();
    if (!tekst) continue;
    totaal += tekst.length;
    if (totaal > MAX_GESPREK_TEKENS) break;
    gesprek.push({ rol, tekst });
  }
  return gesprek;
}

/** Kort de vraag in voor de onderwerpregel. Een harde slice(0, 60) hakt midden
 *  in een woord en laat een losse haak of komma achter; de eerste echte
 *  doorzetmail had als onderwerp "... hoe kan dat? (" staan. */
export function kort(vraag: string): string {
  const v = vraag.replace(/\s+/g, ' ').trim();
  if (v.length <= 60) return v;
  const afgekapt = v.slice(0, 60);
  const spatie = afgekapt.lastIndexOf(' ');
  return (spatie > 30 ? afgekapt.slice(0, spatie) : afgekapt).replace(/[\s([{,;:.-]+$/, '') + '...';
}

/** Verstuurt de doorgezette vraag. Het hele gesprek gaat mee: zonder de
 *  aanloop is "klopt dat wel?" onbeantwoordbaar, en Tom moet kunnen zien
 *  waar Emma vastliep zonder terug te hoeven vragen. */
export async function stuurDoor(
  invoer: { email: string; vraag: string; waarom: string },
  gesprek: Beurt[],
): Promise<{ gelukt: boolean; fout?: string }> {
  const sleutel = process.env.RESEND_API_KEY ?? '';
  if (!EMAIL_RE.test(invoer.email)) {
    return { gelukt: false, fout: 'Dat e-mailadres ziet er niet geldig uit.' };
  }
  if (!sleutel) {
    // Luid falen in het log, zacht falen naar de bezoeker: die kan er niets mee.
    console.error('[chat] doorzetten mislukt: RESEND_API_KEY ontbreekt');
    return { gelukt: false, fout: 'Versturen lukt op dit moment niet. Mail gerust naar ' + BEDRIJF.email + '.' };
  }

  const transcript = gesprek
    .map(b => `${b.rol === 'gebruiker' ? 'Bezoeker' : 'Emma'}: ${b.tekst}`)
    .join('\n\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${sleutel}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Emma <noreply@emmastudio.nl>',
      to: [BEDRIJF.email],
      reply_to: invoer.email,
      subject: `Vraag via de chat: ${kort(invoer.vraag)}`,
      text:
        `Een bezoeker heeft zijn vraag via de chat naar je doorgestuurd.\n\n` +
        `Van: ${invoer.email}\n` +
        `Vraag: ${invoer.vraag}\n\n` +
        `Waarom Emma het niet zelf kon (haar eigen woorden):\n${invoer.waarom}\n\n` +
        `--- Het gesprek tot nu toe ---\n\n${transcript}\n`,
    }),
  });

  if (!res.ok) {
    console.error('[chat] doorzetten mislukt:', res.status, await res.text().catch(() => ''));
    return { gelukt: false, fout: 'Versturen lukt op dit moment niet. Mail gerust naar ' + BEDRIJF.email + '.' };
  }
  return { gelukt: true };
}
