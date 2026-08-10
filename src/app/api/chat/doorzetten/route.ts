import { EMAIL_RE, ipVan, leesGesprek, stuurDoor, teVaak } from '../gedeeld';

/* ── DOORZETTEN ─────────────────────────────────────────────────────────────
   De knop onder een voorstel van Emma komt hier uit.

   Waarom dit een aparte route is en niet iets dat het model zelf doet: het
   versturen hoort een keuze van de bezoeker te zijn, niet van de assistent.
   Emma stelt alleen voor. Pas als iemand zijn adres invult en op versturen
   drukt, gaat er een mail. Dat scheelt Tom een postvak vol vragen die Emma
   eigenlijk had kunnen beantwoorden, en het scheelt de bezoeker het gevoel
   dat hij ergens ingeduwd wordt.

   Ook hier geen database en geen sleutel behalve die van Resend. */

export const runtime = 'nodejs';

// Lager dan de chatlimiet: hier hoort een mens één keer op een knop te drukken.
const MAX_PER_VENSTER = 3;

export async function POST(req: Request) {
  if (teVaak('doorzet:' + ipVan(req), MAX_PER_VENSTER)) {
    return Response.json(
      { error: 'Je hebt net al iets doorgestuurd. Probeer het zo nog eens.' },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? '').trim();
  const vraag = String(body?.vraag ?? '').trim();
  const waarom = String(body?.waarom ?? '').trim();
  const gesprek = leesGesprek(body?.gesprek);

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'Vul een geldig e-mailadres in.' }, { status: 400 });
  }
  if (!vraag) {
    return Response.json({ error: 'Er is geen vraag om door te sturen.' }, { status: 400 });
  }

  const uitkomst = await stuurDoor({ email, vraag, waarom }, gesprek);
  if (!uitkomst.gelukt) {
    return Response.json({ error: uitkomst.fout }, { status: 502 });
  }
  return Response.json({ ok: true });
}
