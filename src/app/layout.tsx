import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollReset from '@/components/ScrollReset';

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
    <html lang="nl">
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
      </body>
    </html>
  );
}
