import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Emma · Jij doet je werk. Emma de rest.',
  description: 'Het ecosysteem dat de saaie kant van ondernemen overneemt. Boekhouding, HR, content en meer, voor élke zelfstandige ondernemer in NL & BE.',
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
        <Nav />
        {children}
        <Footer />
        <CookieBanner />
        <ScrollReveal />
      </body>
    </html>
  );
}
