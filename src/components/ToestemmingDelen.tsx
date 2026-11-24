'use client';

import { useEffect } from 'react';

/**
 * Zet de cookiekeuze van de bezoeker in een eigen cookie op het hoofddomein,
 * zodat app.emmastudio.nl hem kan lezen.
 *
 * WAAROM. CookieYes zet `cookieyes-consent` alleen op www.emmastudio.nl
 * (`_rootDomain:""` in het CookieYes-script). Delen met subdomeinen kan bij
 * CookieYes alleen met het betaalde Pro-abonnement. Zonder deze cookie ziet de
 * app geen toestemming en zet hij elke aanmelding op `geen_toestemming`.
 *
 * DE COOKIE.
 *   emma_toestemming=analytics:yes,advertisement:no
 *   Domain=.emmastudio.nl; Path=/; SameSite=Lax; Secure; 365 dagen
 * Alleen de keuze, geen id en geen gedrag: daarom valt hij onder Noodzakelijk
 * en wordt hij in CookieYes ook zo opgegeven. De app leest hem eerst en valt
 * terug op `cookieyes-consent` (meetopdracht v2, app-kant). Verander je de
 * naam of de indeling, verander dan de app tegelijk.
 *
 * WANNEER.
 *   - Bij elke keuze in de banner (`cookieyes_consent_update`), ook bij
 *     intrekken: dan wordt hij `no`, hij blijft niet op `yes` staan.
 *   - Bij het laden van een pagina, als er al een keuze is. Zo krijgen ook
 *     bezoekers die kozen vóór deze cookie bestond hem alsnog.
 *   - Nog geen keuze gemaakt: geen cookie. Staat er dan toch nog een (de
 *     CookieYes-keuze is verlopen of gewist), dan wordt hij verwijderd. Een
 *     oude `yes` mag niet blijven staan als CookieYes zelf niets meer weet.
 *
 * LOOPTIJD. 365 dagen, gelijk aan de CookieYes-toestemming. Bij het laden van
 * een pagina wordt hij alleen opnieuw geschreven als de waarde verschilt; zo
 * schuift de vervaldatum niet bij elk bezoek een jaar op en loopt hij niet
 * ver voorbij de CookieYes-keuze waarop hij gebaseerd is.
 *
 * BRON. `getCkyConsent()`, de documentatie-API van CookieYes. Die bestaat pas
 * als de banner geladen is, en het CookieYes-script kan klaar zijn vóór of na
 * dit component. Daarom: meteen proberen bij mount, en anders op het
 * banner-load-event. CookieYes documenteert dat event onder twee spellingen
 * (`cookieyes_banner_load` en `cookieyes_banner_loaded`); beide worden
 * gevolgd. Bij een keuze wordt de categorieënlijst uit het event zelf
 * gebruikt, zodat het niet uitmaakt of `getCkyConsent()` op dat moment al
 * bijgewerkt is.
 */

const NAAM = 'emma_toestemming';
const LOOPTIJD_SECONDEN = 365 * 24 * 60 * 60;
const HOOFDDOMEIN = 'emmastudio.nl';

type Keuze = { analytics: boolean; advertisement: boolean };

type CkyConsent = {
  isUserActionCompleted?: boolean;
  categories?: Partial<Record<string, boolean>>;
};

declare global {
  interface Window {
    getCkyConsent?: () => CkyConsent;
  }
}

/**
 * `Domain=.emmastudio.nl` op www en het kale domein. Op een Vercel-preview of
 * localhost zou de browser dat domein weigeren; daar krijgt de cookie geen
 * Domain-attribuut, zodat het gedrag daar ook te testen is.
 */
function domeinAttribuut(): string {
  const host = window.location.hostname;
  return host === HOOFDDOMEIN || host.endsWith(`.${HOOFDDOMEIN}`) ? `; Domain=.${HOOFDDOMEIN}` : '';
}

function huidigeWaarde(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${NAAM}=([^;]*)`));
  return match ? match[1] : null;
}

function waardeVan(keuze: Keuze): string {
  const jn = (ja: boolean) => (ja ? 'yes' : 'no');
  return `analytics:${jn(keuze.analytics)},advertisement:${jn(keuze.advertisement)}`;
}

function schrijf(waarde: string) {
  document.cookie = `${NAAM}=${waarde}${domeinAttribuut()}; Path=/; Max-Age=${LOOPTIJD_SECONDEN}; SameSite=Lax; Secure`;
}

function verwijder() {
  if (huidigeWaarde() === null) return;
  document.cookie = `${NAAM}=${domeinAttribuut()}; Path=/; Max-Age=0; SameSite=Lax; Secure`;
}

/**
 * De keuze volgens `getCkyConsent()`: `undefined` als CookieYes nog niet
 * geladen is (niets doen), `null` als er nog geen keuze gemaakt is.
 */
function keuzeUitCookieYes(): Keuze | null | undefined {
  if (typeof window.getCkyConsent !== 'function') return undefined;
  let consent: CkyConsent;
  try {
    consent = window.getCkyConsent();
  } catch {
    return undefined;
  }
  if (!consent?.isUserActionCompleted) return null;
  return {
    analytics: consent.categories?.analytics === true,
    advertisement: consent.categories?.advertisement === true,
  };
}

/** Bij het laden: alleen schrijven als er iets verandert. */
function bijLaden() {
  const keuze = keuzeUitCookieYes();
  if (keuze === undefined) return; // CookieYes nog niet klaar; het event volgt
  if (keuze === null) {
    verwijder();
    return;
  }
  const waarde = waardeVan(keuze);
  if (huidigeWaarde() !== waarde) schrijf(waarde);
}

/** Bij een keuze in de banner: altijd schrijven, met een verse looptijd. */
function bijKeuze(event: Event) {
  const accepted = (event as CustomEvent<{ accepted?: unknown }>).detail?.accepted;
  if (Array.isArray(accepted)) {
    schrijf(
      waardeVan({
        analytics: accepted.includes('analytics'),
        advertisement: accepted.includes('advertisement'),
      }),
    );
    return;
  }
  const keuze = keuzeUitCookieYes();
  if (keuze) schrijf(waardeVan(keuze));
}

export default function ToestemmingDelen() {
  useEffect(() => {
    bijLaden();
    document.addEventListener('cookieyes_banner_load', bijLaden);
    document.addEventListener('cookieyes_banner_loaded', bijLaden);
    document.addEventListener('cookieyes_consent_update', bijKeuze);
    return () => {
      document.removeEventListener('cookieyes_banner_load', bijLaden);
      document.removeEventListener('cookieyes_banner_loaded', bijLaden);
      document.removeEventListener('cookieyes_consent_update', bijKeuze);
    };
  }, []);

  return null;
}
