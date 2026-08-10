import { MODULES, MODULE_ORDER, MODULE_STATUS, MODULE_PRICE, LAUNCHED, APP_URL, SIGNUP_URL } from '@/data/modules';
import { PACKAGES } from '@/data/packages';
import { FAQ, SECURITY } from '@/data/home';
import { ARTICLES } from '@/data/articles';
import { BEDRIJF, ADRES_KORT } from '@/data/bedrijf';
import { MAANDEN_PRAKTIJK } from '@/data/proof';
import { GEDRAG } from './gedrag';
import { SUPPORT } from './support';

/* ── KENNISBASIS ────────────────────────────────────────────────────────────
   Alles wat de chatbot mag weten, als één stuk tekst.

   HET ONTWERPPRINCIPE: afleiden, niet overtypen. Elke modulenaam, prijs,
   status, functie en FAQ hieronder komt uit dezelfde bestanden die de
   modulepagina's renderen. Werk ik volgende week een modulepagina bij, dan
   weet de chatbot het meteen -- er is geen tweede plek die kan verouderen.
   Dat was deze hele week het terugkerende probleem: documenten die iets
   beweerden wat de code niet deed.

   Met de hand geschreven is alleen wat NERGENS anders staat: het gedrag
   (gedrag.ts) en de support-antwoorden over de randen van het product
   (support.ts).

   WAT ER BEWUST NIET IN ZIT. De interne documenten in de app-repo
   (FUNCTIES.md, MODULE-ATLAS-v6.md) bevatten regels als "Gebruik op prod is
   nog minimaal: 2 tenants". Waar zou de chatbot dat gebruiken? Bij de vraag
   "hoeveel klanten hebben jullie?" -- en dan antwoordt hij eerlijk: twee. Op
   je eigen verkooppagina. Daarom wordt hier niets geïmporteerd uit die
   documenten; wat eruit moest, staat overgeschreven in support.ts.

   VOLGORDE IS NIET WILLEKEURIG. Prompt caching werkt op een prefix-match:
   verandert er één byte, dan vervalt de cache voor alles daarna. Daarom
   staat het stabielste bovenaan (gedrag) en het meest veranderlijke onderaan
   (kennisbank-artikelen). */

/** Verwijdert HTML uit databronnen die het toevallig bevatten (zachte
 *  afbreekstreepjes, vignet-markup). De chatbot leest platte tekst. */
function plat(s: string): string {
  return s.replace(/<[^>]*>/g, '').replace(/­/g, '').trim();
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Modules: naam, prijs, status, wat het doet, functies en de eigen FAQ. */
function modulesBlok(): string {
  const regels: string[] = ['# De modules', ''];

  const live = MODULE_ORDER.filter(id => MODULE_STATUS[id].live);
  const komt = MODULE_ORDER.filter(id => !MODULE_STATUS[id].live);

  regels.push(
    `Er zijn acht modules. ${live.length} zijn nu te gebruiken: ` +
    `${live.map(id => `Emma${cap(id)}`).join(', ')}. ` +
    `${komt.length} bestaan nog niet: ${komt.map(id => `Emma${cap(id)}`).join(', ')}. ` +
    `Die kun je niet afnemen en er is geen datum voor.`,
    '',
    'Je neemt de modules los af. Je kunt er één nemen of meerdere; je betaalt alleen',
    'voor wat je aanzet. Elke module begint met 14 dagen gratis.',
    '',
  );

  for (const id of MODULE_ORDER) {
    const m = MODULES[id];
    if (!m) continue;
    const st = MODULE_STATUS[id];

    regels.push(`## Emma${m.name} (€${m.price} per maand, exclusief btw)`);
    regels.push(`Pagina: /modules/${id}`);
    regels.push(st.live ? 'Status: nu te gebruiken.' : `Status: ${st.when}. Bestaat nog niet, niet af te nemen, geen datum.`);
    regels.push('');
    regels.push(plat(m.head));
    regels.push(plat(m.intro));
    regels.push('');

    if (st.live && m.does.feats.length) {
      regels.push('Wat het doet:');
      for (const f of m.does.feats) {
        regels.push(`- **${f.tag}**: ${plat(f.p)}`);
        for (const punt of f.list) regels.push(`  - ${plat(punt)}`);
      }
      regels.push('');
    }

    if (m.roadmap?.items.length) {
      regels.push(`Nog niet gebouwd, staat wel op de planning (${plat(m.roadmap.title)}):`);
      for (const punt of m.roadmap.items) regels.push(`- ${plat(punt)}`);
      regels.push('');
    }

    if (m.faq.length) {
      regels.push('Vragen over deze module:');
      for (const f of m.faq) regels.push(`- **${plat(f.q)}** ${plat(f.a)}`);
      regels.push('');
    }
  }

  return regels.join('\n');
}

/** Pakketten. De à-la-cartesom en de korting worden berekend, niet vastgelegd,
 *  zodat ze niet uit elkaar kunnen lopen met MODULE_PRICE. */
function pakkettenBlok(): string {
  const regels: string[] = [
    '# Pakketten',
    '',
    'Er zijn vier pakketten. **Geen enkel pakket is op dit moment te koop.**',
    'Ze staan op de site en op /pakketten, maar je kunt ze niet afnemen omdat er',
    'nog drie modules ontbreken. Wie nu wil beginnen, neemt de modules los.',
    'Noem een pakket dus nooit als iets dat iemand vandaag kan kopen.',
    '',
  ];

  for (const p of PACKAGES) {
    const som = p.modules.reduce((t, id) => t + (MODULE_PRICE[id] ?? 0), 0);
    const korting = som > 0 ? Math.round((1 - p.price / som) * 100) : 0;
    regels.push(
      `- **${p.name}**: €${p.price} per maand (${p.status}). ${p.desc} ` +
      `Bevat ${p.modules.length} modules: ${p.modules.map(id => `Emma${cap(id)}`).join(', ')}. ` +
      `Los zouden die €${som} kosten, dus ongeveer ${korting}% korting.`,
    );
  }

  regels.push('');
  return regels.join('\n');
}

function prijsBlok(): string {
  return [
    '# Prijzen',
    '',
    'Standaardmodules kosten €9 per maand, premiummodules €19 per maand.',
    'Alle prijzen zijn exclusief btw.',
    'Alle acht modules los zouden €' + MODULE_ORDER.reduce((t, id) => t + (MODULE_PRICE[id] ?? 0), 0) + ' per maand zijn.',
    '',
    '- 14 dagen gratis proberen, zonder creditcard.',
    '- Maandelijks opzegbaar.',
    '- 10% korting bij jaarbetaling.',
    '- Na de proefperiode wordt er niets afgeschreven. Zonder betaalgegevens',
    '  pauzeert het account; je hoeft niet op te zeggen en krijgt geen factuur.',
    '',
    /* PRICE_COMPARISON.foot hoort hier bewust NIET bij. Die voetnoot ("gebaseerd
       op marktprijzen 2026") gaat over de vergelijkingstabel met losse apps en
       bureaus, niet over Emma's eigen prijzen, hier zou hij lezen alsof Emma zijn
       tarief op een marktonderzoek is gebaseerd. Bovendien staat er "EUR 9" in
       plaats van "€9", wat de chatbot zou overnemen. */
  ].join('\n');
}

function bedrijfBlok(): string {
  return [
    '# Het bedrijf',
    '',
    `EmmaStudio is een handelsnaam van de eenmanszaak ${BEDRIJF.naam}, ${ADRES_KORT}.`,
    `KvK ${BEDRIJF.kvk}, btw-identificatienummer ${BEDRIJF.btw}. E-mail: ${BEDRIJF.email}.`,
    '',
    `Emma begon bij kapsalon Blondes Incognito in Heeten, waar de bedrijfslogica`,
    `inmiddels ${MAANDEN_PRAKTIJK} maanden dagelijks draait. Daarop is het platform gebouwd.`,
    '',
    'Let op: op een factuur en op een bankafschrift verschijnt "Toms Ambitie",',
    'niet "Emma". Dat is dezelfde onderneming.',
    '',
    'Nuttige pagina\'s: /over, /contact, /veiligheid, /privacy,',
    '/algemene-voorwaarden, /cookiebeleid, /verwerkersovereenkomst.',
    '',
  ].join('\n');
}

function veiligheidBlok(): string {
  const regels = ['# Veiligheid en privacy', '', plat(SECURITY.intro), ''];
  for (const c of SECURITY.cards) regels.push(`- **${plat(c.title)}**: ${plat(c.desc)}`);
  regels.push(
    '',
    'Aanvullend, uit de privacyverklaring en de verwerkersovereenkomst:',
    '- Bedrijfsdata staat op servers binnen de EU (Frankfurt), bij Supabase.',
    '- Betalingen lopen via Stripe, e-mail via Resend, hosting via Vercel.',
    '- Bonnen, facturen en financiële overzichten worden uitgelezen door',
    '  Anthropic en Google, onder voorwaarden die training op klantdata uitsluiten.',
    '- De verwerkersovereenkomst staat online op /verwerkersovereenkomst en geldt',
    '  automatisch; klanten hoeven er niet om te vragen en niets te tekenen.',
    '- Bij een datalek meldt Toms Ambitie dat binnen 24 uur bij de klant.',
    '- Gegevens zijn te exporteren; stopt een klant, dan blijft de administratie',
    '  in zijn eigen boekhoudpakket staan.',
    '',
  );
  return regels.join('\n');
}

function platformFaqBlok(): string {
  const regels = ['# Algemene vragen over Emma', ''];
  for (const f of FAQ.items) regels.push(`- **${plat(f.q)}** ${plat(f.a)}`);
  regels.push('');
  return regels.join('\n');
}

function kennisbankBlok(): string {
  const regels = [
    '# Artikelen in de kennisbank',
    '',
    'Op /kennisbank staan deze artikelen. Verwijs ernaar als iemand meer diepgang wil.',
    '',
  ];
  for (const a of ARTICLES) {
    regels.push(`- **${plat(a.title)}** (/kennisbank/${a.slug}): ${plat(a.dek)}`);
  }
  regels.push('');
  return regels.join('\n');
}

function beginnenBlok(): string {
  return [
    '# Beginnen',
    '',
    LAUNCHED
      ? `Aanmelden kan via ${SIGNUP_URL}. Je kiest je modules, probeert ze 14 dagen ` +
        'gratis en hoeft geen creditcard op te geven.'
      : 'De aanmelding staat nog niet open. Bezoekers kunnen hun e-mailadres ' +
        'achterlaten via het wachtlijstformulier op de homepage.',
    `Inloggen doen bestaande klanten op ${APP_URL}.`,
    '',
    'Voor EmmaBoekt is een account bij e-Boekhouden.nl nodig; die koppel je',
    'eenmalig. De andere modules werken zonder boekhoudkoppeling.',
    '',
  ].join('\n');
}

/* ── ZELFCONTROLE ───────────────────────────────────────────────────────────
   De waarde van dit bestand zit in wat er NIET in staat. Dat mag niet afhangen
   van wie er toevallig meeleest. Deze controle draait bij elke build; faalt
   hij, dan faalt de build. Luid falen is hier goedkoper dan stil publiceren.

   Voeg een regel toe zodra je een nieuwe bron aansluit. */
const MAG_NIET: { naam: string; patroon: RegExp }[] = [
  { naam: 'aantal tenants op productie', patroon: /\b\d+ tenants\b|twee tenants|gebruik (op prod )?is nog minimaal/i },
  { naam: 'HTML uit een databron', patroon: /<[a-zA-Z/][^>]*>/ },
  { naam: 'interne bestandspaden', patroon: /src\/data|supabase\/functions|edge function/i },
  { naam: 'inloggegevens', patroon: /wachtwoord|password|api[_-]?key|service[_ ]role/i },
  { naam: 'btw-aangifte als belofte', patroon: /bereidt (je |de )?btw-aangifte voor(?! niet)/i },
  { naam: 'digitaal ondertekenen als functie', patroon: /(kun je|kan je|laat) contracten digitaal (laten )?(onder)?tekenen(?!\.? Nog niet)/i },
  /* Gedachtestreepjes. Huisstijlregel, en een die ik zelf al eens heb
     overtreden: ik schoonde mijn eigen tekst en vergat dat de kennisbasis uit
     twintig andere bestanden wordt samengesteld. Eén em-dash in een moduletekst
     of een FAQ-antwoord en de chatbot neemt het patroon over in elk antwoord.
     Vandaar hier en niet alleen in gedrag.ts. */
  { naam: 'een em-dash of en-dash', patroon: /[—–]/ },
];

/** Dingen die er juist wél in moeten. Verdwijnt er een bron, dan valt dit op. */
const MOET_WEL = [
  'vraag_doorzetten',
  'Geen enkel pakket is op dit moment te koop',
  'exclusief btw',
  'e-Boekhouden.nl',
];

function keurKennisbasis(tekst: string): void {
  const fouten: string[] = [];

  for (const { naam, patroon } of MAG_NIET) {
    /* Alle treffers tonen, niet alleen de eerste, en met de tekst eromheen.
       Een melding als `bevat een em-dash: "—"` is waardeloos: de kennisbasis
       wordt uit twintig bestanden samengesteld en je weet dan niet welk. Met
       de context ernaast zie je meteen om welke zin het gaat. */
    const alle = [...tekst.matchAll(new RegExp(patroon.source, patroon.flags + 'g'))];
    for (const m of alle.slice(0, 8)) {
      const i = m.index ?? 0;
      const context = tekst.slice(Math.max(0, i - 45), i + m[0].length + 45).replace(/\s+/g, ' ');
      fouten.push(`bevat ${naam}: "...${context}..."`);
    }
    if (alle.length > 8) fouten.push(`  (nog ${alle.length - 8} keer ${naam})`);
  }
  for (const zin of MOET_WEL) {
    if (!tekst.includes(zin)) fouten.push(`mist verplichte regel: "${zin}"`);
  }
  // Onder de cachedrempel van elk model is caching stil uit; boven de 200k
  // tokens past het niet meer comfortabel. Beide zijn hier ver weg, maar een
  // bron die per ongeluk een heel document meeneemt valt zo op.
  if (tekst.length < 5_000) fouten.push(`verdacht kort: ${tekst.length} tekens`);
  if (tekst.length > 400_000) fouten.push(`verdacht lang: ${tekst.length} tekens`);

  if (fouten.length) {
    throw new Error(
      'De kennisbasis van de chatbot is afgekeurd. Dit zou naar bezoekers gaan:\n' +
      fouten.map(f => `  - ${f}`).join('\n'),
    );
  }
}

/**
 * Bouwt de volledige kennisbasis als één string.
 *
 * Deterministisch: dezelfde invoer levert byte-voor-byte dezelfde uitvoer, wat
 * een voorwaarde is voor prompt caching. Geen datums, geen willekeur, geen
 * objectiteratie in ongedefinieerde volgorde, alles loopt via MODULE_ORDER en
 * de vaste arrays.
 *
 * Gooit als de zelfcontrole hierboven iets vindt.
 */
export function bouwKennisbasis(): string {
  const tekst = [
    GEDRAG,
    '',
    '---',
    '',
    '# Feiten over EmmaStudio',
    '',
    'Alles hieronder is de bron van waarheid. Staat het er niet, dan bestaat het niet.',
    '',
    bedrijfBlok(),
    prijsBlok(),
    modulesBlok(),
    pakkettenBlok(),
    beginnenBlok(),
    veiligheidBlok(),
    platformFaqBlok(),
    SUPPORT,
    '',
    kennisbankBlok(),
  ].join('\n');

  keurKennisbasis(tekst);
  return tekst;
}
