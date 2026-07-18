import type { Metadata } from 'next';
import Link from 'next/link';
import { SECURITY } from '@/data/home';
import { IconShield, IconArrow } from '@/components/emma/icons';

const SITE = 'https://www.emmastudio.nl';

const META_TITLE = 'Veiligheid · Je data in de EU, AVG-conform, van jou';
const META_DESC = 'Emma verwerkt je bedrijfsdata met zo min mogelijk rechten, opgeslagen in de EU en AVG-conform. Je data blijft van jou. Lees hoe we ermee omgaan.';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESC,
  alternates: { canonical: `${SITE}/veiligheid` },
  openGraph: {
    type: 'website',
    url: `${SITE}/veiligheid`,
    title: META_TITLE,
    description: META_DESC,
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

export default function Veiligheid() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="px-5 pb-4 pt-28 md:px-8 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">{SECURITY.eyebrow}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{SECURITY.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emma-ink-2">{SECURITY.intro}</p>
        </div>
      </section>

      {/* Kaarten (petrol, gelijk aan de homepage-sectie) */}
      <section className="px-5 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-emma-card bg-emma-petrol p-6 md:p-12">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {SECURITY.cards.map((item, i) => (
              <div key={i} className="rounded-emma-card bg-emma-petrol-light p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-emma-squircle bg-emma-creme/10 text-emma-creme" aria-hidden="true"><IconShield size={20} /></div>
                <h2 className="mt-4 font-display text-lg font-bold text-emma-creme">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-emma-creme/70">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-emma-creme/60">
            Emma verwerkt gevoelige bedrijfsdata. Wat we precies bewaren, waarom, en welke rechten je hebt, staat in het privacybeleid.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/privacy" className="group inline-flex items-center gap-1.5 rounded-emma-btn bg-emma-creme px-5 py-2.5 text-sm font-semibold text-emma-ink transition-all hover:bg-white">
              Lees het privacybeleid
              <IconArrow size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/algemene-voorwaarden" className="inline-flex items-center gap-1.5 rounded-emma-btn border border-emma-creme/25 px-5 py-2.5 text-sm font-semibold text-emma-creme transition-colors hover:bg-emma-creme/10">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
