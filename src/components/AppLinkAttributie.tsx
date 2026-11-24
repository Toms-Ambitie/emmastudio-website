'use client';

import { useEffect } from 'react';
import { APP_URL } from '@/data/modules';

/**
 * Geeft elke link naar de app zijn herkomst mee, zodat een aanmelding te
 * koppelen is aan de campagne en de advertentie die hem veroorzaakte. Drie
 * soorten parameters, elk met een eigen voorwaarde:
 *
 *   mkt=<GA4 client_id>     als de _ga-cookie er is. Die zet GA4 pas na
 *                           toestemming voor analytics, dus dat is de poort.
 *   utm_source … utm_content  alleen met CookieYes-toestemming voor analytics.
 *   gclid, gbraid, wbraid,    alleen met CookieYes-toestemming voor
 *   fbclid, ttclid,           advertenties.
 *   li_fat_id, msclkid
 *
 * Zonder toestemming wordt er niets bewaard en niets meegegeven. De app vangt
 * mkt op in src/lib/marketing.ts; de utm's en klik-ID's horen bij de
 * meetopdracht v2 aan de app-kant. Namen worden letterlijk doorgegeven.
 *
 * FIRST-TOUCH, PER GROEP. De utm-waarden en de klik-ID's van de pagina waarop
 * iemand binnenkwam, gaan in sessionStorage. Komt hij in dezelfde sessie via
 * een tweede campagne terug, dan blijft de eerste staan. Elke groep wordt in
 * zijn geheel bewaard, niet per veld: anders kan utm_source van campagne A
 * naast utm_term van campagne B komen te staan, en dat is een herkomst die
 * nooit bestond.
 *
 * WANNEER ER BEWAARD WORDT. Op drie momenten, steeds met de toestemming van
 * dat moment: als de pagina laadt (terugkerende bezoeker, toestemming al
 * gegeven), als de bezoeker in de banner kiest (het `cookieyes_consent_update`-
 * event, de gewone eerste bezoek), en bij de klik op de link zelf, als
 * vangnet. Valt de toestemming voor een groep weg, dan wordt wat er van die
 * groep bewaard was meteen gewist. Er wordt nooit iets in het geheugen
 * vastgehouden voor later: zonder toestemming blijft het bij wat al in de
 * adresbalk staat.
 *
 * Gevolg, bewust zo: wie zonder te kiezen doorklikt naar een tweede pagina en
 * pas daar toestemming geeft, verliest de utm's van de landingspagina. De
 * adresbalk heeft ze dan niet meer, en ze vasthouden zonder toestemming is
 * precies wat niet mag.
 *
 * HOE DE TOESTEMMING GELEZEN WORDT. Uit de cookie `cookieyes-consent`, met
 * waarden als `consentid:…,consent:yes,action:yes,necessary:yes,
 * functional:no,analytics:yes,performance:no,advertisement:yes`. Synchroon
 * leesbaar, ook voordat het CookieYes-script geladen is, en dezelfde aanpak
 * als postpilot-website (site.js, forwardAttribution). Ontbreekt de cookie of
 * staat een categorie niet op `yes`, dan geldt dat als geen toestemming.
 * Bij elke klik wordt hij opnieuw gelezen. Bij het banner-event wordt de
 * keuze uit het event zelf genomen, zodat het niet uitmaakt of CookieYes de
 * cookie al geschreven heeft op het moment dat het event afgaat.
 *
 * WAAROM OP HET KLIKMOMENT EN NIET BIJ HET RENDEREN. Cookies en sessionStorage
 * bestaan alleen in de browser; de pagina's zijn statisch geprerenderd, dus de
 * server kan niets invullen. Hrefs herschrijven na hydration werkt ook niet:
 * Nav is een clientcomponent die opnieuw rendert zodra het mobiele menu open-
 * of dichtgaat, en React zet de href dan terug naar de kale waarde. Op het
 * klikmoment speelt dat niet. De browser leest de href pas ná de listeners,
 * dus het aanpassen hier bepaalt waar hij heen gaat.
 *
 * WAAROM EEN GEDELEGEERDE LISTENER EN GEEN COMPONENT PER LINK. De links staan
 * in zes bestanden, waarvan vier servercomponenten (Footer, /over, /pakketten,
 * /modules/[id]). Die allemaal naar client omzetten kost onnodig veel. Zo pakt
 * één listener ook elke link die er later bij komt.
 *
 * BESTAANDE PARAMETERS BLIJVEN STAAN. Heeft een link al een utm_campaign of
 * een mkt, dan is die door iemand met opzet gezet en wordt hij niet
 * overschreven.
 *
 * BEKENDE BEPERKING, bewust zo gelaten: rechtermuisknop en "link-adres
 * kopiëren" leveren de kale URL op. De parameters komen er pas bij tijdens
 * echt navigeren.
 */

const APP_HOST = new URL(APP_URL).hostname;

/** Langer dan dit is geen campagnewaarde meer maar rommel; afkappen. */
const MAX_LENGTE = 200;

type Toestemming = { analytics: boolean; advertenties: boolean };
type Velden = Record<string, string>;

const GROEPEN: ReadonlyArray<{
  velden: readonly string[];
  opslag: string;
  vereist: keyof Toestemming;
}> = [
  {
    velden: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'],
    opslag: 'emma_attr_utm',
    vereist: 'analytics',
  },
  {
    velden: ['gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid', 'li_fat_id', 'msclkid'],
    opslag: 'emma_attr_klik',
    vereist: 'advertenties',
  },
];

const GEEN_TOESTEMMING: Toestemming = { analytics: false, advertenties: false };

/** De toestemming zoals CookieYes hem in zijn cookie heeft gezet. */
function toestemmingUitCookie(): Toestemming {
  const match = document.cookie.match(/(?:^|;\s*)cookieyes-consent=([^;]*)/);
  if (!match) return GEEN_TOESTEMMING;
  let waarde: string;
  try {
    waarde = decodeURIComponent(match[1]);
  } catch {
    return GEEN_TOESTEMMING;
  }
  const ja = (categorie: string) =>
    new RegExp(`(?:^|,)\\s*${categorie}:yes\\s*(?:,|$)`).test(waarde);
  return { analytics: ja('analytics'), advertenties: ja('advertisement') };
}

/**
 * De toestemming uit het `cookieyes_consent_update`-event. Het detail heeft de
 * vorm `{ accepted: string[], rejected: string[] }`. Klopt de vorm niet, dan
 * terugvallen op de cookie.
 */
function toestemmingUitEvent(event: Event): Toestemming {
  const detail = (event as CustomEvent<{ accepted?: unknown }>).detail;
  const accepted = detail?.accepted;
  if (!Array.isArray(accepted)) return toestemmingUitCookie();
  return {
    analytics: accepted.includes('analytics'),
    advertenties: accepted.includes('advertisement'),
  };
}

/** De waarden van één groep uit de huidige adresbalk. */
function uitAdres(velden: readonly string[]): Velden {
  const zoek = new URLSearchParams(window.location.search);
  const uit: Velden = {};
  for (const veld of velden) {
    const waarde = zoek.get(veld);
    if (waarde) uit[veld] = waarde.slice(0, MAX_LENGTE);
  }
  return uit;
}

/**
 * Wat er van één groep bewaard is, teruggebracht tot de velden die bij die
 * groep horen. sessionStorage is door de bezoeker te bewerken, dus alleen
 * bekende velden met een tekstwaarde komen erdoor.
 */
function uitOpslag(sleutel: string, velden: readonly string[]): Velden | null {
  let ruw: string | null;
  try {
    ruw = sessionStorage.getItem(sleutel);
  } catch {
    return null;
  }
  if (!ruw) return null;
  try {
    const data: unknown = JSON.parse(ruw);
    if (!data || typeof data !== 'object') return null;
    const uit: Velden = {};
    for (const veld of velden) {
      const waarde = (data as Record<string, unknown>)[veld];
      if (typeof waarde === 'string' && waarde) uit[veld] = waarde.slice(0, MAX_LENGTE);
    }
    return Object.keys(uit).length ? uit : null;
  } catch {
    return null;
  }
}

/**
 * Brengt sessionStorage in lijn met de toestemming: per groep bewaren als het
 * mag en er nog niets staat (first-touch), wissen als het niet (meer) mag.
 * Is sessionStorage geblokkeerd, dan gebeurt er niets en werkt de klik
 * hieronder met de adresbalk.
 */
function bijwerken(toestemming: Toestemming) {
  for (const groep of GROEPEN) {
    try {
      if (!toestemming[groep.vereist]) {
        sessionStorage.removeItem(groep.opslag);
        continue;
      }
      if (uitOpslag(groep.opslag, groep.velden)) continue; // eerste wint
      const nu = uitAdres(groep.velden);
      if (Object.keys(nu).length) sessionStorage.setItem(groep.opslag, JSON.stringify(nu));
    } catch {
      // geen sessionStorage: niets bewaren, verder niets aan de hand
    }
  }
}

/**
 * De GA4 client_id uit de _ga-cookie.
 *
 * De cookie heeft de vorm `GA1.<domeindiepte>.<client_id>`, bijvoorbeeld
 * `GA1.1.1124092002.1788384047`. Het cijfer na GA1 is het aantal domeindelen
 * en kan per domein verschillen (GA1.2, GA1.3). Daarom worden de eerste twee
 * delen weggegooid in plaats van een vaste prefix "GA1.1." te strippen.
 *
 * Ziet de uitkomst er niet uit als <cijfers>.<cijfers>, dan gaat er niets mee.
 * Er wordt bewust géén eigen id verzonnen als vervanging: een waarde die GA
 * niet kent maakt de koppeling stuk in plaats van hem te redden.
 */
function gaClientId(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]*)/);
  if (!match) return null;
  let waarde: string;
  try {
    waarde = decodeURIComponent(match[1]);
  } catch {
    return null;
  }
  const clientId = waarde.split('.').slice(2).join('.');
  return /^\d+\.\d+$/.test(clientId) ? clientId : null;
}

/** Alles wat er op dit moment mee mag naar de app. */
function herkomst(): Velden {
  const toestemming = toestemmingUitCookie();
  bijwerken(toestemming);

  const mee: Velden = {};
  for (const groep of GROEPEN) {
    if (!toestemming[groep.vereist]) continue;
    // Bewaard gaat voor de adresbalk (first-touch). Lukte bewaren niet, dan
    // in elk geval wat er nu in de adresbalk staat.
    Object.assign(mee, uitOpslag(groep.opslag, groep.velden) ?? uitAdres(groep.velden));
  }

  const clientId = gaClientId();
  if (clientId) mee.mkt = clientId;
  return mee;
}

export default function AppLinkAttributie() {
  useEffect(() => {
    // Terugkerende bezoeker met toestemming: de landings-URL meteen vastleggen,
    // vóór een interne link hem uit de adresbalk haalt.
    bijwerken(toestemmingUitCookie());

    function opKeuze(event: Event) {
      bijwerken(toestemmingUitEvent(event));
    }

    function tag(event: Event) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return; // geen bruikbare URL, met rust laten
      }
      if (url.hostname !== APP_HOST) return;

      let gewijzigd = false;
      for (const [veld, waarde] of Object.entries(herkomst())) {
        if (url.searchParams.has(veld)) continue; // bestaande waarde blijft
        url.searchParams.set(veld, waarde);
        gewijzigd = true;
      }
      if (gewijzigd) anchor.setAttribute('href', url.toString());
    }

    // Capture-fase: zo draait dit vóór handlers op de link zelf (het mobiele
    // menu sluit zichzelf in een onClick) en vóór iets de gebeurtenis kan
    // tegenhouden. auxclick vangt de middelklik, die geen click-event geeft.
    document.addEventListener('cookieyes_consent_update', opKeuze);
    document.addEventListener('click', tag, true);
    document.addEventListener('auxclick', tag, true);
    return () => {
      document.removeEventListener('cookieyes_consent_update', opKeuze);
      document.removeEventListener('click', tag, true);
      document.removeEventListener('auxclick', tag, true);
    };
  }, []);

  return null;
}
