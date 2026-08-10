import Anthropic from '@anthropic-ai/sdk';
import { bouwKennisbasis } from '@/data/kennis';
import { BEDRIJF } from '@/data/bedrijf';
import { ipVan, leesGesprek, teVaak, MAX_VRAAG_TEKENS } from './gedeeld';

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
   voor wie hem vindt. Elk getal hier is een plafond, geen streefwaarde. De
   grenzen op het gesprek zelf staan in gedeeld.ts, want de doorzetroute
   hanteert dezelfde. */
const MAX_ANTWOORD_TOKENS = 1_024;
const MAX_PER_VENSTER = 12;

/** Het enige gereedschap dat Emma heeft. Bewust een tool en geen instructie in
 *  de tekst: een tool is afdwingbaar en meetbaar, "zeg dat je het doorzet" is
 *  dat niet.
 *
 *  De beschrijving noemt eerst wanneer je hem NIET gebruikt. Dat is met opzet:
 *  in de eerste versie heette hij `vraag_doorzetten`, verstuurde hij zelf de
 *  mail, en greep het model ernaar bij zowat elke vraag, ook bij vragen die
 *  gewoon in de kennisbasis stonden. Een gereedschap dat klaarligt wordt
 *  gebruikt. Nu is het een aanbod, en de drempel staat in de beschrijving. */
const DOORZET_TOOL: Anthropic.Tool = {
  name: 'doorzetten_voorstellen',
  description:
    'Laat bij de bezoeker een knop verschijnen waarmee hij zijn vraag zelf naar ' +
    'Tom kan sturen. Er gaat hierdoor nog niets weg; de bezoeker beslist. ' +
    'Gebruik dit NIET voor vragen over het product, de modules, de prijzen, de ' +
    'pakketten, het bedrijf, de naam of welke cao ondersteund wordt: die staan ' +
    'in de kennisbasis en beantwoord je zelf, ook als het antwoord nee is. ' +
    'Gebruik het WEL bij vragen over iemands eigen account of cijfers, bij een ' +
    'klacht of storing, bij een verzoek om een demo, offerte of samenwerking, ' +
    'bij investeringsvragen, bij een cao die er nog niet in zit, en verder ' +
    'alleen als het antwoord echt nergens in de kennisbasis staat.',
  input_schema: {
    type: 'object',
    properties: {
      vraag: {
        type: 'string',
        description: 'De vraag in de woorden van de bezoeker.',
      },
      waarom: {
        type: 'string',
        description:
          'In één zin: waarom kun je dit niet zelf beantwoorden? Dit leest Tom, ' +
          'niet de bezoeker.',
      },
    },
    required: ['vraag', 'waarom'],
    additionalProperties: false,
  },
};


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

  if (teVaak('chat:' + ipVan(req), MAX_PER_VENSTER)) {
    return Response.json(
      { error: 'Je stelt vragen sneller dan ik ze kan beantwoorden. Probeer het zo nog eens.' },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  /* De client stuurt alleen beurten, nooit een systeemprompt, nooit een model,
     nooit instellingen. Alles wat het gedrag bepaalt staat op de server. */
  const gesprek = leesGesprek(body?.gesprek);
  if (!gesprek.length || gesprek[gesprek.length - 1].rol !== 'gebruiker') {
    return Response.json({ error: 'Ongeldig verzoek.' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  /* Beurten van dezelfde rol achter elkaar samenvoegen. Dat gebeurt zodra een
     verzoek mislukt: de vraag van de bezoeker blijft staan zonder antwoord, hij
     probeert het nog eens, en dan staan er twee vragen achter elkaar. De
     Messages API wil rollen om en om, dus dat zou een tweede storing bovenop
     de eerste zijn, precies wanneer iemand aan het herstellen is. */
  const messages: Anthropic.MessageParam[] = [];
  for (const b of gesprek) {
    const rol = b.rol === 'gebruiker' ? 'user' : 'assistant';
    const vorige = messages[messages.length - 1];
    if (vorige && vorige.role === rol) {
      vorige.content = `${vorige.content}\n\n${b.tekst}`;
    } else {
      messages.push({ role: rol, content: b.tekst });
    }
  }

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

      /* Na een toolaanroep begint het model aan een nieuw stuk tekst. Zonder
         scheiding plakt dat aan de vorige zin vast, en dan las de bezoeker
         "...ik weet daar niets over.Wil je het aan hem voorleggen". Eén lege
         regel ertussen, en alleen als er daadwerkelijk nog tekst komt: een
         ronde die niets meer zegt hoort geen witregel achter te laten. */
      let scheidingNodig = false;
      const stuurTekst = (t: string) => {
        if (scheidingNodig) {
          stuur('tekst', '\n\n');
          scheidingNodig = false;
        }
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
            const invoer = a.input as { vraag?: string; waarom?: string };
            const vraag = String(invoer.vraag ?? '').slice(0, MAX_VRAAG_TEKENS);
            const waarom = String(invoer.waarom ?? '').slice(0, MAX_VRAAG_TEKENS);

            /* Hier gaat GEEN mail uit. Er verschijnt alleen een kaartje bij de
               bezoeker met een knop. Of er iets verstuurd wordt, beslist hij,
               op /api/chat/doorzetten.

               Zo stond het niet: eerst verstuurde het model de mail zelf, met
               een e-mailadres dat het opvroeg in het gesprek. Dat werkte, maar
               het maakte doorzetten iets dat Emma dóét in plaats van aanbiedt,
               en ze bood het overal aan. Het aanbod is nu goedkoop en de
               verzending een bewuste klik. */
            stuur('voorstel', { vraag, waarom });

            resultaten.push({
              type: 'tool_result',
              tool_use_id: a.id,
              content:
                'Het voorstel staat nu bij de bezoeker in beeld, met een invulveld ' +
                'voor zijn e-mailadres en een knop om te versturen. Heb je de knop ' +
                'hiervoor al genoemd, zeg dan niets meer; anders één korte zin dat ' +
                'hij het er zelf mee naar Tom kan sturen. Vraag zelf niet om zijn ' +
                'e-mailadres en dring niet aan.',
            });
          }
          messages.push({ role: 'user', content: resultaten });
          if (ietsGezegd) scheidingNodig = true;
        }
        if (!ietsGezegd) {
          // Het model bleef gereedschap aanroepen tot de lus op was. Zeg dan
          // iets bruikbaars in plaats van niets.
          stuur(
            'tekst',
            `Ik kom er even niet uit. Mail je vraag gerust naar ${BEDRIJF.email}, dan kijkt Tom ernaar.`,
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
