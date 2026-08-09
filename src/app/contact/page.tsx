import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { BEDRIJF } from '@/data/bedrijf';

const SITE = 'https://www.emmastudio.nl';

export const metadata: Metadata = {
  title: 'Contact · Emma',
  description: 'Neem contact op met het team achter Emma. We horen graag van je.',
  alternates: { canonical: `${SITE}/contact` },
  openGraph: {
    type: 'website',
    url: `${SITE}/contact`,
    title: 'Contact · Emma',
    description: 'Neem contact op met het team achter Emma. We horen graag van je.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

function PointIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-emma-squircle bg-emma-coral-soft text-emma-coral-strong" aria-hidden="true">
      {children}
    </span>
  );
}

export default function Contact() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="px-5 pb-4 pt-28 md:px-8 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">Contact</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">Even contact.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emma-ink-2">Een vraag over Emma, een idee, of gewoon kennismaken? Laat een bericht achter, we lezen alles zelf.</p>
        </div>
      </section>

      {/* Inhoud */}
      <section className="px-5 py-16 md:px-8 md:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-emma-ink md:text-3xl">Stuur een bericht</h2>
            <p className="mt-3 text-base leading-relaxed text-emma-ink-2">Vul het formulier in en we komen zo snel mogelijk bij je terug. Liever direct mailen? Dat kan ook.</p>
            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3.5">
                <PointIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>
                </PointIcon>
                <div className="text-sm">
                  <b className="block font-semibold text-emma-ink">E-mail</b>
                  <a href="mailto:info@emmastudio.nl" className="text-emma-coral hover:underline">info@emmastudio.nl</a>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <PointIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                </PointIcon>
                <div className="text-sm">
                  <b className="block font-semibold text-emma-ink">Reactietijd</b>
                  <span className="text-emma-ink-2">Meestal binnen een paar werkdagen</span>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <PointIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </PointIcon>
                <div className="text-sm">
                  <b className="block font-semibold text-emma-ink">Op de hoogte blijven</b>
                  <Link href="/#wachtlijst" className="text-emma-coral hover:underline">Zet je op de wachtlijst →</Link>
                </div>
              </div>
              {/* Identiteitsgegevens (art. 3:15d BW). Ook hier, niet alleen in de
                  footer: /contact is de pagina waar iemand ze komt halen. */}
              <div className="flex items-start gap-3.5">
                <PointIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V9l8-5 8 5v11" /><path d="M9 20v-6h6v6" /></svg>
                </PointIcon>
                <div className="text-sm">
                  <b className="block font-semibold text-emma-ink">Toms Ambitie</b>
                  <span className="text-emma-ink-2">
                    {BEDRIJF.straat}<br />
                    {BEDRIJF.postcode} {BEDRIJF.plaats}<br />
                    KvK {BEDRIJF.kvk} · Btw {BEDRIJF.btw}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
