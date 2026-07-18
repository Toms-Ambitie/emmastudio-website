'use client';

import Script from 'next/script';
import { useState } from 'react';

/**
 * Consent Mode v2 (Advanced) — geketende laadvolgorde.
 *
 * Consently (CMP) laadt eerst en zet de consent-defaults en de tag-blokkering.
 * Pas ná Consently's `onLoad` mounten we de GTM-container. Zo start GTM
 * gegarandeerd nadat Consently klaar is — geen enkele tag kan te vroeg vuren,
 * want de GTM-container bestaat simpelweg nog niet vóór dat moment.
 *
 * `afterInteractive` (na hydration) is hier correct: bij Advanced Consent Mode
 * telt de volgorde, niet hoe vroeg. Laadt Consently niet (bv. offline), dan
 * mount GTM bewust niet — consent-first: geen CMP betekent geen tracking.
 *
 * De GTM <noscript>-iframe staat NIET hier maar server-rendered in layout.tsx,
 * direct na <body>, zodat bezoekers zonder JavaScript die fallback ook krijgen.
 */
export default function Analytics() {
  const [consentReady, setConsentReady] = useState(false);

  return (
    <>
      <Script
        src="https://app.consently.net/consently.js"
        data-bannerid="6a5b92331f0ff60f232cf9e6"
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
