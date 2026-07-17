import type { Metadata } from 'next';
import Link from 'next/link';
import { PRICE_COMPARISON } from '@/data/home';
import { IconCheck, IconArrow } from '@/components/emma/icons';

const SITE = 'https://www.emmastudio.nl';
const { rows, foot } = PRICE_COMPARISON;

export const metadata: Metadata = {
  title: 'Vergelijk · Emma',
  description: PRICE_COMPARISON.intro,
  alternates: { canonical: `${SITE}/vergelijk` },
  openGraph: {
    type: 'website',
    url: `${SITE}/vergelijk`,
    title: 'Vergelijk · Emma',
    description: PRICE_COMPARISON.intro,
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

export default function Vergelijk() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="px-5 pb-4 pt-28 md:px-8 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">{PRICE_COMPARISON.eyebrow}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{PRICE_COMPARISON.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emma-ink-2">{PRICE_COMPARISON.intro}</p>
        </div>
      </section>

      {/* Vergelijkingstabel */}
      <section className="px-5 pt-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper">
          {/* Desktop */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 border-b border-emma-line">
              <div className="px-6 py-5"><span className="em-label text-emma-subtext">Wat heb je nodig?</span></div>
              <div className="relative px-6 py-5 bg-emma-coral-soft/40">
                <div className="absolute left-0 right-0 top-0 h-1 bg-emma-coral" aria-hidden="true" />
                <div className="font-display text-lg font-bold text-emma-ink">Emma</div>
                <div className="text-xs text-emma-subtext">vanaf EUR 9/mnd</div>
              </div>
              <div className="px-6 py-5">
                <div className="font-display text-lg font-bold text-emma-ink">Losse tools</div>
                <div className="text-xs text-emma-subtext">EUR 60-300+/mnd</div>
              </div>
              <div className="px-6 py-5">
                <div className="font-display text-lg font-bold text-emma-ink">Bureau</div>
                <div className="text-xs text-emma-subtext">EUR 200-2.000+/mnd</div>
              </div>
            </div>
            {rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 border-b border-emma-line last:border-b-0 ${i % 2 === 0 ? '' : 'bg-emma-creme/30'}`}>
                <div className="px-6 py-4"><span className="text-sm font-semibold text-emma-ink">{row.need}</span></div>
                <div className="px-6 py-4 bg-emma-coral-soft/40">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emma-coral" aria-label="Inbegrepen bij Emma">
                    <IconCheck size={16} className="text-white" />
                  </div>
                </div>
                <div className="px-6 py-4">
                  {row.loose ? <span className="text-sm text-emma-ink-2">{row.loose}</span> : <span className="text-emma-line text-2xl" aria-label="Niet beschikbaar">&mdash;</span>}
                </div>
                <div className="px-6 py-4">
                  {row.bureau ? <span className="text-sm text-emma-ink-2">{row.bureau}</span> : <span className="text-emma-line text-2xl" aria-label="Niet beschikbaar">&mdash;</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Mobiel */}
          <div className="divide-y divide-emma-line md:hidden">
            {rows.map((row, i) => (
              <div key={i} className="p-5">
                <h2 className="font-display text-base font-bold text-emma-ink">{row.need}</h2>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-emma-coral-soft/40 px-3 py-2">
                    <span className="text-xs font-semibold text-emma-coral">Emma</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emma-coral" aria-label="Inbegrepen bij Emma">
                      <IconCheck size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-xs text-emma-subtext">Losse tools</span>
                    {row.loose ? <span className="text-sm text-emma-ink-2">{row.loose}</span> : <span className="text-emma-line text-xl">&mdash;</span>}
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-xs text-emma-subtext">Bureau</span>
                    {row.bureau ? <span className="text-sm text-emma-ink-2">{row.bureau}</span> : <span className="text-emma-line text-xl">&mdash;</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-emma-line bg-emma-creme/50 px-6 py-4 text-center">
            <p className="text-xs text-emma-subtext">{foot}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-emma-card border border-emma-line bg-emma-paper p-8 text-center shadow-emma-card md:flex-row md:justify-between md:p-10 md:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-emma-ink">Begin met één module.</h2>
            <p className="mt-2 text-base leading-relaxed text-emma-ink-2">Los verkrijgbaar vanaf EUR 9 per maand. Pakketten volgen zodra alle acht live zijn.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/modules" className="group inline-flex items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emma-coral-deep active:translate-y-px">
              Bekijk de modules
              <IconArrow size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/pakketten" className="inline-flex items-center justify-center gap-2 rounded-emma-btn border border-emma-line px-6 py-3 text-sm font-semibold text-emma-ink transition-colors hover:bg-emma-line/40">
              Naar de pakketten
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
