import Anthropic from '@anthropic-ai/sdk';
import { bouwKennisbasis } from '@/data/kennis';
import { BEDRIJF } from '@/data/bedrijf';

/* ── CHAT-ROUTE ─────────────────────────────────────────────────────────────
   De assistent op de website. Beantwoordt vragen over EmmaStudio uit een
   vaste kennisbasis, en zet door naar info@emmastudio.nl wat ze niet weet.

   WAT DEZE ROUTE NIET HEEFT, EN DAT IS HET PUNT: geen databaseverbinding.
   Geen Supabase-sleutel, geen tenant-context, geen enkel pad naar klantdata.
   De scheiding tussen wat een bezoeker mag zien en wat een klant heeft is
   hier geen instructie in een prompt maar een eigenschap van de code, er is
   niets om te lekken, ook niet als iemand het model perfect ompraat. Wil je
   een assistent die wél over iemands eigen cijfers praat, dan hoort die in
   de app te staan, achter een login, met RLS eronder.

   Model: Claude Opus 5 op laag effort. Laag omdat de taak simpel is
   (antwoord geven uit een vast document) en latency in een chat telt.
   Thinking blijft AAN: met thinking uit schrijft het model een toolaanroep
   soms als gewone tekst in plaats van als toolaanroep, en dan draait de
   doorzetting stil niet, precies de storing die je nooit ziet gebeuren. */

export const runtime = 'nodejs';
export const maxDuration = 60;

const MODEL = 'claude-opus-5';

/* Eén keer bouwen, bij het laden van de module, niet bij elk verzoek.

   Twee redenen, en de tweede is de belangrijke. Een: de kennisbasis is
   deterministisch, hem per verzoek opnieuw samenstellen is werk voor niets.
   Twee: bouwKennisbasis() gooit als de zelfcontrole iets afkeurt. Stond die
   aanroep in de request-lus, dan viel dat pas om als een bezoeker een vraag
   stelde, met een 500 voor hem en een regel in een log die niemand leest.
   Hier valt het om tijdens `next build`, en dan gaat het deploy niet door. */
const KENNISBASIS = bouwKennisbasis();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? '';
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';

/* Grenzen. Zonder deze is een publieke chat-endpoint een gratis Claude-proxy
   voor wie hem vindt. Elk getal hier is een plafond, geen streefwaarde. */
const MAX_VRAAG_TEKENS = 2_000;
const MAX_BEURTEN = 30;
const MAX_GESPREK_TEKENS = 24_000;
const MAX_ANTWOORD_TOKENS = 1_024;

/* Snelheidsbegrenzing per IP. In het geheugen van de draaiende instantie:
   Vercel geeft geen gedeelde opslag zonder er een dienst bij te nemen, en
   dat is deze functie nog niet waard. Wat dit betekent: bij meerdere
   instanties telt elk zijn eigen bezoekers, dus de echte limiet ligt hoger
   dan het getal hieronder. Het houdt een script tegen, geen botnet. Merken
   we misbruik, dan is Vercel KV of Upstash de volgende stap. */
const VENSTER_MS = 60_000;
const MAX_PER_VENSTER = 12;
const tellers = new Map<string, { tot: number; aantal: number }>();

function teVaak(ip: string): boolean {
  const nu = Date.now();
  const t = tellers.get(ip);
  if (!t || nu > t.tot) {
    tellers.set(ip, { tot: nu + VENSTER_MS, aantal: 1 });
    // Opruimen zodat de map niet oneindig groeit op een langlevende instantie.
    if (tellers.size > 5_000) {
      for (const [k, v] of tellers) if (nu > v.tot) tellers.delete(k);
    }
    return false;
  }
  t.aantal += 1;
  return t.aantal > MAX_PER_VENSTER;
}

type Beurt = { rol: 'gebruiker' | 'emma'; tekst: string };

/** Het enige gereedschap dat Emma heeft. Bewust een tool en geen instructie
 *  in de tekst: een tool is afdwingbaar en meetbaar, "zeg dat je het doorzet"
 *  is dat niet. Zo kan ze niet gokken zonder dat er iets gebeurt. */
const DOORZET_TOOL: Anthropic.Tool = {
  name: 'vraag_doorzetten',
  description:
    'Zet een vraag door naar Tom, die hem met de hand beantwoordt. Gebruik dit ' +
    'wanneer het antwoord niet in de kennisbasis staat, wanneer de vraag over ' +
    "iemands eigen account, factuur, loonstrook of cijfers gaat, bij een klacht " +
    'of storing, of bij een verzoek om een demo of gesprek. Vraag eerst om een ' +
    'e-mailadres. Bij twijfel: gebruik dit in plaats van te gokken.',
  input_schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'Het e-mailadres van de bezoeker, zodat Tom kan antwoorden.',
      },
      vraag: {
        type: 'string',
        description: 'De vraag in de woorden van de bezoeker.',
      },
      waarom: {
        type: 'string',
        description:
          'In één zin: waarom kon je dit niet zelf beantwoorden? Dit leest Tom, ' +
          'niet de bezoeker.',
      },
    },
    required: ['email', 'vraag', 'waarom'],
    additionalProperties: false,
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Verstuurt de doorgezette vraag. Het hele gesprek gaat mee: zonder de
 *  aanloop is "klopt dat wel?" onbeantwoordbaar, en Tom moet kunnen zien
 *  waar Emma vastliep zonder terug te hoeven vragen. */
async function stuurDoor(
  invoer: { email: string; vraag: string; waarom: string },
  gesprek: Beurt[],
): Promise<{ gelukt: boolean; voorModel: string }> {
  if (!EMAIL_RE.test(invoer.email)) {
    return {
      gelukt: false,
      voorModel: 'Dat e-mailadres ziet er niet geldig uit. Vraag het opnieuw en probeer daarna nog eens.',
    };
  }
  if (!RESEND_API_KEY) {
    // Luid falen in het log, zacht falen naar de bezoeker: die kan er niets mee.
    console.error('[chat] doorzetten mislukt: RESEND_API_KEY ontbreekt');
    return {
      gelukt: false,
      voorModel: 'Doorzetten lukt op dit moment niet. Verwijs de bezoeker naar het contactformulier op /contact.',
    };
  }

  const transcript = gesprek
    .map(b => `${b.rol === 'gebruiker' ? 'Bezoeker' : 'Emma'}: ${b.tekst}`)
    .join('\n\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Emma <noreply@emmastudio.nl>',
      to: [BEDRIJF.email],
      reply_to: invoer.email,
      subject: `Vraag via de chat, ${invoer.vraag.slice(0, 60)}`,
      text:
        `Emma kon deze vraag niet beantwoorden en zet hem door.\n\n` +
        `Van: ${invoer.email}\n` +
        `Vraag: ${invoer.vraag}\n\n` +
        `Waarom doorgezet (Emma's eigen woorden):\n${invoer.waarom}\n\n` +
        `--- Het gesprek tot nu toe ---\n\n${transcript}\n`,
    }),
  });

  if (!res.ok) {
    console.error('[chat] doorzetten mislukt:', res.status, await res.text().catch(() => ''));
    return {
      gelukt: false,
      voorModel: 'Doorzetten lukt op dit moment niet. Verwijs de bezoeker naar het contactformulier op /contact.',
    };
  }
  return {
    gelukt: true,
    voorModel: `Doorgezet naar Tom. Bevestig dat kort en zeg dat het antwoord meestal binnen een paar werkdagen op ${invoer.email} komt.`,
  };
}

/* Een GET op deze route zegt of de chat kán werken, zonder er een gesprek voor
   te hoeven voeren.

   Waarom dit er staat: we hebben een uur besteed aan "de chat is nu niet
   beschikbaar", en het antwoord was een omgevingsvariabele die op de ene
   omgeving wel en op de andere niet stond. Dat was van buitenaf niet te zien;
   je moest de runtime logs van Vercel erbij pakken. Eén GET beantwoordt dat nu
   direct, ook vanaf een telefoon.

   Er staat bewust geen sleutel in het antwoord, alleen of hij er is. */
export async function GET() {
  return Response.json({
    gereed: Boolean(ANTHROPIC_API_KEY) && Boolean(RESEND_API_KEY),
    antwoorden: Boolean(ANTHROPIC_API_KEY),
    doorzetten: Boolean(RESEND_API_KEY),
    model: MODEL,
    kennisbasisTekens: KENNISBASIS.length,
  });
}

export async function POST(req: Request) {
  if (!ANTHROPIC_API_KEY) {
    console.error('[chat] ANTHROPIC_API_KEY ontbreekt');
    return Response.json({ error: 'De chat is nu niet beschikbaar.' }, { status: 503 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'onbekend';
  if (teVaak(ip)) {
    return Response.json(
      { error: 'Je stelt vragen sneller dan ik ze kan beantwoorden. Probeer het zo nog eens.' },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const ruw = Array.isArray(body?.gesprek) ? body.gesprek : null;
  if (!ruw) return Response.json({ error: 'Ongeldig verzoek.' }, { status: 400 });

  /* De client stuurt alleen beurten, nooit een systeemprompt, nooit een model,
     nooit instellingen. Alles wat het gedrag bepaalt staat op de server. */
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
  if (!gesprek.length || gesprek[gesprek.length - 1].rol !== 'gebruiker') {
    return Response.json({ error: 'Ongeldig verzoek.' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
  const messages: Anthropic.MessageParam[] = gesprek.map(b => ({
    role: b.rol === 'gebruiker' ? 'user' : 'assistant',
    content: b.tekst,
  }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const stuur = (soort: string, waarde: unknown) =>
        controller.enqueue(encoder.encode(JSON.stringify({ soort, waarde }) + '\n'));

      /* Bijhouden of er überhaupt tekst naar de bezoeker ging. Zonder deze
         teller kan het gesprek eindigen met een leeg antwoordvak: als de lus
         op is terwijl het model nog een tool aanroept, is er niets gestreamd
         en staart de bezoeker naar niets. Stilte is hier de ergste uitkomst. */
      let ietsGezegd = false;
      const stuurTekst = (t: string) => {
        ietsGezegd = true;
        stuur('tekst', t);
      };

      try {
        /* Maximaal twee ronden: één antwoord, of één toolaanroep gevolgd door
           het antwoord daarop. Meer heeft deze assistent niet nodig, en een
           harde grens is beter dan een lus die op een slechte dag doorloopt. */
        for (let ronde = 0; ronde < 2; ronde++) {
          const antwoord = client.messages.stream({
            model: MODEL,
            max_tokens: MAX_ANTWOORD_TOKENS,
            output_config: { effort: 'low' },
            system: [
              {
                type: 'text',
                text: KENNISBASIS,
                // De kennisbasis is byte-voor-byte gelijk bij elk verzoek, dus
                // hij komt uit de cache tegen een tiende van de prijs. Daarom
                // staat hij hier en niet in de eerste gebruikersbeurt.
                cache_control: { type: 'ephemeral' },
              },
            ],
            tools: [DOORZET_TOOL],
            messages,
          });

          antwoord.on('text', stuurTekst);
          const bericht = await antwoord.finalMessage();

          if (bericht.stop_reason !== 'tool_use') break;

          const aanroepen = bericht.content.filter(
            (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
          );
          messages.push({ role: 'assistant', content: bericht.content });

          const resultaten: Anthropic.ToolResultBlockParam[] = [];
          for (const a of aanroepen) {
            const invoer = a.input as { email?: string; vraag?: string; waarom?: string };
            const uitkomst = await stuurDoor(
              {
                email: String(invoer.email ?? ''),
                vraag: String(invoer.vraag ?? ''),
                waarom: String(invoer.waarom ?? ''),
              },
              gesprek,
            );
            /* Het bevestigingsblokje pas NA een geslaagde verzending. Het stond
               hiervoor, en dan las de bezoeker "je vraag is doorgezet naar Tom"
               terwijl de mail was mislukt, een onwaarheid op het moment dat
               vertrouwen er het meest toe doet. Het model krijgt in dat geval
               een andere tekst terug en zegt zelf iets anders; die twee mochten
               niet uit elkaar lopen. */
            if (uitkomst.gelukt) stuur('doorgezet', { email: invoer.email ?? '' });
            resultaten.push({
              type: 'tool_result',
              tool_use_id: a.id,
              content: uitkomst.voorModel,
              is_error: !uitkomst.gelukt,
            });
          }
          messages.push({ role: 'user', content: resultaten });
        }
        if (!ietsGezegd) {
          // Het model bleef gereedschap aanroepen tot de lus op was. Zeg dan
          // iets bruikbaars in plaats van niets.
          stuur(
            'tekst',
            'Ik kom er even niet uit. Mail je vraag naar info@emmastudio.nl, dan kijkt Tom ernaar.',
          );
        }
        stuur('klaar', true);
      } catch (e) {
        console.error('[chat] fout tijdens antwoorden:', e);
        stuur('fout', 'Er ging iets mis. Probeer het nog eens, of mail naar info@emmastudio.nl.');
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
