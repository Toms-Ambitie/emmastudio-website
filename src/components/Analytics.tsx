'use client';

import Script from 'next/script';
import { useState } from 'react';

/**
 * Consent Mode v2 (Advanced) — geketende laadvolgorde.
 *
 * De consent-DEFAULTS (alles denied) staan NIET hier maar server-rendered en
 * inline in layout.tsx, zodat ze bij het parsen draaien: gegarandeerd vóór dit
 * component, dat pas na hydration mount. Dat is bewust de eerste verdedigings-
 * linie en niet iets dat aan de CMP wordt overgelaten.
 *
 * Hier stond eerder dat de CMP zelf "de consent-defaults zet". Dat was onjuist
 * en het kostte de site zijn consent: zonder expliciete default gaat Google uit
 * van GRANTED, dus zodra de CMP niet initialiseerde vertrok GTM met gcs=G111.
 * Zet die defaults dus nooit terug in de CMP alleen — ongeacht welke CMP.
 *
 * CookieYes (CMP) laadt eerst; pas ná zijn `onLoad` mount de GTM-container, dus
 * GTM bestaat niet voordat de CMP er is. Wordt CookieYes hard geblokkeerd, dan
 * mount GTM bewust helemaal niet. Komt er een leeg antwoord terug (wat ad-
 * blockers vaak doen), dan mount GTM wél, maar dankzij de denied-defaults in
 * layout.tsx blijft alles geblokkeerd tot de bezoeker kiest.
 *
 * CookieYes verving in augustus 2026 de vorige CMP. Die had een verlopen
 * abonnement: het script kwam nog wel binnen, maar initialiseerde niet meer —
 * precies de "leeg antwoord"-situatie hierboven, waardoor er een maand lang
 * zonder banner is gemeten. Het client-ID zit in de URL en is omgevingsloos:
 * één ID voor preview en productie. Wisselt het ID, dan is dit de enige plek.
 *
 * `afterInteractive` is hier correct: bij Advanced Consent Mode telt de volgorde
 * ten opzichte van de defaults, niet hoe vroeg de container laadt.
 *
 * Er is bewust GEEN GTM <noscript>-iframe (zie de toelichting in layout.tsx):
 * die laadde onvoorwaardelijk, buiten de CMP om.
 */
export default function Analytics() {
  const [consentReady, setConsentReady] = useState(false);

  return (
    <>
      <Script
        id="cookieyes"
        src="https://cdn-cookieyes.com/client_data/7e6a2f80d6d54df29d71857763b07b13/script.js"
        strategy="afterInteractive"
        onLoad={() => setConsentReady(true)}
      />
      {consentReady && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PL387HVM');`}
        </Script>
      )}
    </>
  );
}
