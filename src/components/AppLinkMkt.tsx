'use client';

import { useEffect } from 'react';
import { APP_URL } from '@/data/modules';

/**
 * Hangt ?mkt=<GA4 client_id> aan elke link naar de app, zodat een aanmelding
 * gekoppeld kan worden aan de campagne die hem veroorzaakte. De app leest die
 * parameter in src/lib/marketing.ts.
 *
 * WAAROM OP HET KLIKMOMENT EN NIET BIJ HET RENDEREN. De client_id staat in een
 * cookie en is dus alleen in de browser bekend; de pagina's zijn statisch
 * geprerenderd, dus de server kan hem niet invullen. Hrefs herschrijven na
 * hydration werkt ook niet: Nav is een clientcomponent die opnieuw rendert
 * zodra het mobiele menu open- of dichtgaat, en React zet de href dan terug
 * naar de kale waarde. Op het klikmoment speelt dat niet. De browser leest de
 * href pas ná de listeners, dus het aanpassen hier bepaalt waar hij heen gaat.
 *
 * WAAROM EEN GEDELEGEERDE LISTENER EN GEEN COMPONENT PER LINK. De links staan
 * in zes bestanden, waarvan vier servercomponenten (Footer, /over, /pakketten,
 * /modules/[id]) die geen cookie kunnen lezen. Die allemaal naar client
 * omzetten kost onnodig veel. Zo pakt één listener ook elke link die er later
 * bij komt, zonder dat iemand daaraan hoeft te denken.
 *
 * BEKENDE BEPERKING, bewust zo gelaten: rechtermuisknop en "link-adres
 * kopiëren" leveren de kale URL op. De parameter komt er pas bij tijdens echt
 * navigeren. Dat dichttimmeren vraagt een MutationObserver die tegen React's
 * re-renders in blijft herstellen, en dat weegt niet op tegen dat kleine
 * aandeel verkeer.
 *
 * GEEN COOKIE IS GEEN PROBLEEM. GA4 zet _ga pas na toestemming voor analytics
 * (zie de consent-keten in Analytics.tsx en de denied-defaults in layout.tsx).
 * Weigert iemand, of klikt hij door voordat GA geladen is, dan blijft de link
 * onveranderd werken. Er wordt bewust géén eigen id verzonnen als vervanging:
 * een waarde die GA niet kent maakt de koppeling stuk in plaats van hem te
 * redden, en dan is geen parameter beter dan een verkeerde.
 */

const APP_HOST = new URL(APP_URL).hostname;

/**
 * De GA4 client_id uit de _ga-cookie.
 *
 * De cookie heeft de vorm `GA1.<domeindiepte>.<client_id>`, bijvoorbeeld
 * `GA1.1.1124092002.1788384047`. Het cijfer na GA1 is het aantal domeindelen
 * en kan dus per domein verschillen (GA1.2, GA1.3). Daarom worden de eerste
 * twee delen weggegooid in plaats van een vaste prefix "GA1.1." te strippen:
 * dat laatste zou op een ander domein stilletjes de verkeerde waarde geven.
 *
 * De uitkomst wordt gecontroleerd op de vorm <cijfers>.<cijfers>. Ziet het er
 * niet uit als een client_id, dan gaat er niets mee.
 */
function gaClientId(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]*)/);
  if (!match) return null;
  const clientId = decodeURIComponent(match[1]).split('.').slice(2).join('.');
  return /^\d+\.\d+$/.test(clientId) ? clientId : null;
}

export default function AppLinkMkt() {
  useEffect(() => {
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
      // Een bestaande querystring blijft staan; searchParams.set raakt alleen
      // mkt aan. Staat mkt er al op, dan is die van iemand anders en blijft hij.
      if (url.searchParams.has('mkt')) return;

      const clientId = gaClientId();
      if (!clientId) return;

      url.searchParams.set('mkt', clientId);
      anchor.setAttribute('href', url.toString());
    }

    // Capture-fase: zo draait dit vóór handlers op de link zelf (het mobiele
    // menu sluit zichzelf in een onClick) en vóór iets de gebeurtenis kan
    // tegenhouden. auxclick vangt de middelklik, die geen click-event geeft.
    document.addEventListener('click', tag, true);
    document.addEventListener('auxclick', tag, true);
    return () => {
      document.removeEventListener('click', tag, true);
      document.removeEventListener('auxclick', tag, true);
    };
  }, []);

  return null;
}
