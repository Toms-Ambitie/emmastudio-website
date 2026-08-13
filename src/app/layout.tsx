import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, Spline_Sans_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollReset from '@/components/ScrollReset';
import ChatKnop from '@/components/ChatKnop';

/* Fonts self-hosted via next/font (was: een render-blokkerende @import naar
   fonts.googleapis.com boven in globals.css). next/font haalt de fonts bij de
   build op, host ze op ons eigen domein, injecteert een <link rel=preload> en
   zet font-display:swap — geen externe Google-request meer bij de bezoeker, en
   niets dat de eerste weergave blokkeert. Variabele fonts: de volledige
   gewichts-as zit in één bestand per familie. De klassenamen dragen alleen de
   CSS-variabelen (--ff-*); de font-family-tokens in globals.css wijzen daarnaar. */
/* Bricolage laadt mét de breedte-as (wdth). Zonder die as pint next/font de
   breedte op 100% — de bréédste snit — terwijl het merk de SemiCondensed
   voert (zie het logo, CLAUDE.md §3). De koppen staan daarom in globals.css
   op font-stretch:semi-condensed. */
const fontDisplay = Bricolage_Grotesque({ subsets: ['latin'], display: 'swap', axes: ['wdth'], variable: '--ff-display' });
const fontBody = Hanken_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--ff-body' });
const fontMono = Spline_Sans_Mono({ subsets: ['latin'], display: 'swap', variable: '--ff-mono' });

export const metadata: Metadata = {
  title: 'Emma · Jij doet je werk. Emma de rest.',
  description: 'Emma neemt het saaie werk van ondernemen over: boekhouden, cijfers, personeel en marketing in één platform. Voor zelfstandige ondernemers en kleine bedrijven in Nederland.',
  metadataBase: new URL('https://www.emmastudio.nl'),
  openGraph: {
    type: 'website',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-card.png'],
  },
  icons: {
    icon: [{ url: '/beeldmerk-coral.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body>
        {/* GEEN GTM-noscript-iframe hier. Die stond er wel, server-rendered direct
            na <body>, als fallback voor bezoekers zonder JavaScript. Maar hij laadde
            onvoorwaardelijk: buiten Consently om, dus vóór en zonder toestemming.
            Dat is precies wat Analytics.tsx belooft te voorkomen ("geen CMP betekent
            geen tracking"), en het is een verzoek naar Google bij élke paginaweergave.

            De fallback was bovendien weinig waard: zonder JavaScript kan GTM geen
            enkele tag uitvoeren, dus de iframe leverde hooguit een ruwe hit op.
            Een consent-keten die op één plek lekt is geen consent-keten. Weg dus.

            Consent Mode v2 (Advanced): Consently eerst, GTM geketend erná. Zie Analytics.tsx. */}
        <Analytics />

        <ScrollReset />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-emma-btn focus:bg-emma-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-emma-pop focus:outline-2 focus:outline-offset-2 focus:outline-emma-boekt"
        >
          Naar de inhoud
        </a>
        <Nav />
        {children}
        <Footer />
        <ScrollReveal />
        {/* De assistent, op elke pagina bereikbaar. Onderaan gemonteerd zodat
            hij als laatste in de DOM staat en de tabvolgorde van de pagina
            niet onderbreekt. Gaat nooit vanzelf open — zie ChatKnop.tsx. */}
        <ChatKnop />
      </body>
    </html>
  );
}
