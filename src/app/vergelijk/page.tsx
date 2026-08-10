import type { Metadata } from 'next';
import Link from 'next/link';
import { PRICE_COMPARISON } from '@/data/home';
import { MODULES, MODULE_ORDER, MODULE_PRICE, MODULE_STATUS } from '@/data/modules';
import { MODULE_VERGELIJK, VERGELIJK_VOETNOOT } from '@/data/vergelijk';
import { IconArrow } from '@/components/emma/icons';
import { EmmaKolom } from '@/components/emma/EmmaKolom';

const SITE = 'https://www.emmastudio.nl';
const { rows, foot } = PRICE_COMPARISON;

/* Alleen modules die live zijn ÉN waar vergelijkdata voor bestaat krijgen een
   blok. Gaat er een module live zonder dat MODULE_VERGELIJK is bijgewerkt,
   dan verschijnt er dus geen half blok; dat valt de lanceringsroutine op. */
const VERGELIJK_MODULES = MODULE_ORDER.filter(
  id => MODULE_STATUS[id]?.live && MODULE_VERGELIJK[id],
);

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const META_TITLE = 'Emma vergelijken · Wat zou je anders kopen, per module';
const META_DESC = 'Per module: waar Emma echt mee concurreert, wat dat kost, en wat die ander wél kan. Eerlijk vergeleken, met peildatum. Vanaf €9 per module per maand.';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESC,
  alternates: { canonical: `${SITE}/vergelijk` },
  openGraph: {
    type: 'website',
    url: `${SITE}/vergelijk`,
    title: META_TITLE,
    description: META_DESC,
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
                <div className="text-xs text-emma-subtext">vanaf €9/mnd</div>
              </div>
              <div className="px-6 py-5">
                <div className="font-display text-lg font-bold text-emma-ink">Losse tools</div>
                <div className="text-xs text-emma-subtext">€60-300+/mnd</div>
              </div>
              <div className="px-6 py-5">
                <div className="font-display text-lg font-bold text-emma-ink">Bureau</div>
                <div className="text-xs text-emma-subtext">€200-2.000+/mnd</div>
              </div>
            </div>
            {rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 border-b border-emma-line last:border-b-0 ${i % 2 === 0 ? '' : 'bg-emma-creme/30'}`}>
                <div className="px-6 py-4"><span className="text-sm font-semibold text-emma-ink">{row.need}</span></div>
                <div className="px-6 py-4 bg-emma-coral-soft/40">
                  <EmmaKolom modules={row.modules} />
                </div>
                <div className="px-6 py-4">
                  {row.loose ? <span className="text-sm text-emma-ink-2">{row.loose}</span> : <span className="text-xs text-emma-subtext">niet beschikbaar</span>}
                </div>
                <div className="px-6 py-4">
                  {row.bureau ? <span className="text-sm text-emma-ink-2">{row.bureau}</span> : <span className="text-xs text-emma-subtext">niet beschikbaar</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Mobiel */}
          <div className="divide-y divide-emma-line md:hidden">
            {rows.map((row, i) => (
              <div key={i} className="p-5">
                <h2 className="font-display text-base font-bold text-emma-ink">{row.need}</h2>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between rounded-lg bg-emma-coral-soft/40 px-3 py-2">
                    <span className="text-xs font-semibold text-emma-coral">Emma</span>
                    <EmmaKolom modules={row.modules} klein />
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-xs text-emma-subtext">Losse tools</span>
                    {row.loose ? <span className="text-sm text-emma-ink-2">{row.loose}</span> : <span className="text-xs text-emma-subtext">niet beschikbaar</span>}
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-xs text-emma-subtext">Bureau</span>
                    {row.bureau ? <span className="text-sm text-emma-ink-2">{row.bureau}</span> : <span className="text-xs text-emma-subtext">niet beschikbaar</span>}
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

      {/* Per module: het prijsanker en de status quo.

          Het kader: per module precies twee soorten concurrent. Het product
          waar we tegen afgezet willen worden (met prijs en peildatum), en wat
          de klant nu werkelijk doet, want dat is meestal geen software. Plus
          één eerlijke grens per module; zonder die grens is de vergelijking
          misleidend en dat kost meer dan hij oplevert. */}
      <section className="px-5 pt-16 md:px-8 md:pt-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
              <span className="em-label text-emma-coral">Per module</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">
              Wat zou je anders kopen?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-emma-ink-2">
              Elke module concurreert met iets anders. Hieronder per module het product waar je
              Emma echt mee moet vergelijken, en wat je nu waarschijnlijk doet.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-8">
            {VERGELIJK_MODULES.map(id => {
              const v = MODULE_VERGELIJK[id];
              const accent = `var(--m-${id})`;
              return (
                <article
                  key={id}
                  className="overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper"
                  style={{ borderLeftWidth: 4, borderLeftColor: accent }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                      <span className="em-label text-emma-subtext">
                        Emma{cap(MODULES[id].name)} · €{MODULE_PRICE[id]} p/mnd
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-emma-ink md:text-2xl">
                      {v.kop}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-emma-ink-2">{v.emma}</p>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="em-label text-emma-subtext">Waar je ons mee moet vergelijken</h4>
                        <ul className="mt-3 flex flex-col gap-3">
                          {v.ankers.map(a => (
                            <li key={a.naam} className="flex items-baseline justify-between gap-4 border-b border-emma-line/70 pb-3 last:border-b-0 last:pb-0">
                              <span className="text-sm font-semibold text-emma-ink">{a.naam}</span>
                              <span className="text-right text-sm text-emma-ink-2">
                                {a.prijs}
                                {a.toelichting && (
                                  <span className="block text-xs text-emma-subtext">{a.toelichting}</span>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-emma-card bg-emma-creme/60 p-5">
                        <h4 className="em-label text-emma-subtext">Wat je nu waarschijnlijk doet</h4>
                        <p className="mt-3 text-sm leading-relaxed text-emma-ink-2">{v.statusQuo}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 border-t border-emma-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-2xl text-xs leading-relaxed text-emma-subtext">{v.grens}</p>
                      <Link
                        href={`/modules/${id}`}
                        className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-emma-ink"
                      >
                        <span className="border-b-2 border-emma-line pb-0.5 transition-colors group-hover:border-emma-coral">
                          Bekijk Emma{cap(MODULES[id].name)}
                        </span>
                        <IconArrow size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-emma-subtext">
            {VERGELIJK_VOETNOOT}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-emma-card border border-emma-line bg-emma-paper p-8 text-center shadow-emma-card md:flex-row md:justify-between md:p-10 md:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-emma-ink">Begin met één module.</h2>
            <p className="mt-2 text-base leading-relaxed text-emma-ink-2">Los verkrijgbaar vanaf €9 per maand. Pakketten volgen zodra alle acht live zijn.</p>
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
