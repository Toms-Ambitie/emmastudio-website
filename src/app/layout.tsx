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
        {/* Google Tag Manager (noscript) — server-rendered, direct na opening
            <body>, los van de JS-keten zodat bezoekers zonder JavaScript de
            fallback-iframe ook krijgen. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PL387HVM" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />

        {/* Consent Mode v2 (Advanced): Consently eerst, GTM geketend erná. Zie Analytics.tsx. */}
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
