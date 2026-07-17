import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MODULES, ICONS, MODULE_TAGS, MODULE_PRICE, MODULE_ORDER, MODULE_STATUS,
  APP_URL, LAUNCHED, VIGNETTES,
} from '@/data/modules';
import WaitlistForm from '@/components/WaitlistForm';
import ModuleFaq from '@/components/ModuleFaq';

const SITE = 'https://www.emmastudio.nl';

export async function generateStaticParams() {
  return MODULE_ORDER.map(id => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const mod = MODULES[id];
  if (!mod) return {};
  const url = `${SITE}/modules/${id}`;
  return {
    title: `Emma${mod.name} · ${mod.head}`,
    description: mod.intro,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `Emma${mod.name} · ${mod.head}`,
      description: mod.intro,
      images: [{ url: '/og-card.png', width: 1200, height: 630 }],
    },
  };
}

function Glyph({ id, size = 22 }: { id: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[id] || '' }}
    />
  );
}

function Check({ color }: { color: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mod = MODULES[id];
  if (!mod) notFound();

  const others = MODULE_ORDER.filter(k => k !== id);
  const status = MODULE_STATUS[id];
  const mc = `var(--m-${id})`;
  const tint = (pct: number) => `color-mix(in srgb, ${mc} ${pct}%, transparent)`;

  /* Drie assen (briefing §4.1):
     - draait      = status.live  (technisch feit uit MODULE_STATUS)
     - koopbaar    = LAUNCHED      (publieke signup-schakelaar; nu false → niets koopbaar)
     - roadmap     = !status.live
     Alleen bij draait ÉN signup-open tonen we de echte signup-CTA naar
     app.emmastudio.nl. Anders wachtlijst — nooit een dode /register-funnel.
     Zodra Tom LAUNCHED aanzet, schakelen live-modules mee zonder herbouw. */
  const canSignup = status.live && LAUNCHED;

  return (
    <main id="main-content" style={{ ['--mc' as string]: mc }}>
      {/* Hero */}
      <section className="px-5 pt-28 md:px-8 md:pt-36 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-emma-pill border border-emma-line bg-emma-paper px-3 py-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: tint(10), color: mc }}>
                <Glyph id={id} size={15} />
              </span>
              <span className="text-sm font-semibold text-emma-ink">Emma{mod.name}</span>
              <span className="h-1 w-1 rounded-full bg-emma-line" aria-hidden="true" />
              {status.live ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emma-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-emma-success" aria-hidden="true" />Live
                </span>
              ) : (
                <span className="text-sm font-medium text-emma-subtext">Binnenkort</span>
              )}
            </div>

            <h1 className="mt-5 break-words font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-emma-ink sm:text-4xl md:text-5xl lg:text-6xl">
              {mod.head.replace(/\.$/, '')}<span style={{ color: mc }}>.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-emma-ink-2">{mod.intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {canSignup ? (
                <>
                  <a href={APP_URL} className="group inline-flex items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-6 py-3 text-base font-semibold text-white transition-all hover:bg-emma-coral-deep active:translate-y-px">
                    Start 14 dagen gratis
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </a>
                  <Link href="/#hoe" className="inline-flex items-center justify-center gap-2 rounded-emma-btn border border-emma-line px-6 py-3 text-base font-semibold text-emma-ink transition-colors hover:bg-emma-line/40">Bekijk hoe het werkt</Link>
                </>
              ) : (
                <>
                  <Link href="#melden" className="group inline-flex items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-6 py-3 text-base font-semibold text-white transition-all hover:bg-emma-coral-deep active:translate-y-px">
                    Houd me op de hoogte
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                  <Link href="/#modules" className="inline-flex items-center justify-center gap-2 rounded-emma-btn border border-emma-line px-6 py-3 text-base font-semibold text-emma-ink transition-colors hover:bg-emma-line/40">Bekijk alle modules</Link>
                </>
              )}
            </div>

            <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-2xl font-bold text-emma-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>€{mod.price}/mnd</span>
              <span className="text-sm text-emma-subtext">excl. btw{canSignup ? ' · maandelijks opzegbaar' : ' · prijs bij lancering'}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-2 text-sm text-emma-subtext">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mc }} aria-hidden="true" />
                {status.live ? 'Draait dagelijks in de praktijk' : 'Op de roadmap'}
              </span>
              <span className="flex items-center gap-2 text-sm text-emma-subtext">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mc }} aria-hidden="true" />
                {mod.chip}
              </span>
            </div>
          </div>

          {/* Impressie-kaart (vignette) */}
          <div className="relative min-w-0">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[32px] opacity-40 blur-2xl" style={{ background: `radial-gradient(circle at 60% 40%, ${tint(45)} 0%, transparent 70%)` }} aria-hidden="true" />
            <div className="overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper p-5 shadow-emma-pop" style={{ ['--mc' as string]: mc }}>
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-emma-squircle" style={{ backgroundColor: tint(12), color: mc }}>
                  <Glyph id={id} size={18} />
                </span>
                <span className="text-sm font-semibold text-emma-ink">Emma{mod.name}</span>
                <span className="ml-auto rounded-emma-pill bg-emma-creme px-2.5 py-1 text-xs font-medium text-emma-subtext">impressie</span>
              </div>
              <div className="vig__body" dangerouslySetInnerHTML={{ __html: VIGNETTES[mod.heroVig] || '' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Wat het doet */}
      <section className="px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: mc }} aria-hidden="true" />
              <span className="em-label" style={{ color: mc }}>Wat het doet</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">{mod.does.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-emma-ink-2">{mod.does.sub}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
            {mod.does.feats.map((feat, i) => (
              <div key={i} className="rounded-emma-card border border-emma-line bg-emma-paper p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-emma-squircle" style={{ backgroundColor: tint(10), color: mc }}>
                    <Glyph id={id} size={20} />
                  </span>
                  <span className="em-label" style={{ color: mc }}>{feat.tag}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-emma-ink">{feat.h}</h3>
                <p className="mt-2 text-base leading-relaxed text-emma-ink-2">{feat.p}</p>
                <ul className="mt-5 space-y-2.5">
                  {feat.list.map((item, j) => (
                    <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-emma-ink-2">
                      <Check color={mc} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Op de roadmap (alleen als de module er een heeft, bijv. EmmaZiet) */}
      {mod.roadmap && (
        <section className="px-5 pb-20 md:px-8 md:pb-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-emma-card border border-emma-line bg-emma-creme p-6 md:p-10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emma-subtext" aria-hidden="true" />
                <span className="em-label text-emma-subtext">{mod.roadmap.title}</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-emma-ink md:text-3xl">Dit komt er nog aan.</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-emma-ink-2">
                Nog niet beschikbaar — we noemen bewust geen datum. Deze functies staan op de roadmap, gescheiden van wat Emma{mod.name} vandaag al doet.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mod.roadmap.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-emma-squircle border border-emma-line bg-emma-paper px-4 py-3">
                    <span className="rounded-emma-pill bg-emma-creme px-2 py-0.5 text-xs font-medium text-emma-subtext">Binnenkort</span>
                    <span className="text-sm font-medium text-emma-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Hoe het werkt */}
      <section className="border-y border-emma-line bg-emma-paper px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: mc }} aria-hidden="true" />
              <span className="em-label" style={{ color: mc }}>Hoe het werkt</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">{mod.steps.title}</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            {mod.steps.items.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-base font-bold" style={{ backgroundColor: tint(12), color: mc }}>{i + 1}</span>
                <div>
                  <div className="em-label text-emma-subtext">{step.n}</div>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-emma-ink">{step.h}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-emma-ink-2">{step.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: mc }} aria-hidden="true" />
              <span className="em-label" style={{ color: mc }}>FAQ</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">Veelgestelde vragen</h2>
            <p className="mt-4 text-base leading-relaxed text-emma-ink-2">Staat je vraag er niet bij? Stuur ons een bericht.</p>
            <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emma-coral hover:underline" href="mailto:hallo@emmastudio.nl">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>
              hallo@emmastudio.nl
            </a>
          </div>
          <ModuleFaq items={mod.faq.map(f => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      {/* CTA */}
      <section id="melden" className="px-5 pb-20 md:px-8 md:pb-28 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-emma-card border border-emma-line bg-emma-paper p-8 text-center shadow-emma-card md:p-12" style={{ scrollMarginTop: '7rem' }}>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-emma-pill px-3 py-1.5" style={{ backgroundColor: tint(10), color: mc }}>
            <Glyph id={id} size={16} />
            <span className="em-label" style={{ color: mc }}>Emma{mod.name}</span>
          </div>
          {canSignup ? (
            <>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">Begin zonder gedoe<span style={{ color: mc }}>.</span></h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-emma-ink-2">Maak een account op app.emmastudio.nl en start meteen. De eerste 14 dagen zijn gratis.</p>
              <div className="mt-7 flex justify-center">
                <a className="group inline-flex items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-emma-coral-deep active:translate-y-px" href={APP_URL}>
                  Start 14 dagen gratis
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">
                {status.live ? <>Draait al — aanmelding opent binnenkort<span style={{ color: mc }}>.</span></> : <>Binnenkort beschikbaar<span style={{ color: mc }}>.</span></>}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-emma-ink-2">
                {status.live
                  ? `Emma${mod.name} draait al in de praktijk, maar de aanmelding staat nog niet open. Laat je e-mail achter en je hoort het als eerste zodra je kunt starten.`
                  : `Emma${mod.name} staat op de roadmap. Laat je e-mail achter en je hoort het als eerste zodra de module live gaat.`}
              </p>
              <div className="mx-auto mt-7 max-w-md">
                <WaitlistForm dark={false} note={`Emma${mod.name} · €${mod.price}/mnd${status.live ? '' : ' · op de roadmap'}`} />
              </div>
            </>
          )}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-emma-subtext">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mc }} aria-hidden="true" />14 dagen gratis proberen</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mc }} aria-hidden="true" />Maandelijks opzegbaar</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mc }} aria-hidden="true" />Excl. btw</span>
          </div>
        </div>
      </section>

      {/* Meer van Emma */}
      <section className="border-t border-emma-line px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
              <span className="em-label text-emma-coral">Meer van Emma</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">Emma doet meer.</h2>
            <p className="mt-4 text-lg leading-relaxed text-emma-ink-2">Combineer modules in een pakket of voeg ze stuk voor stuk toe.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(k => {
              const kmc = `var(--m-${k})`;
              const kstatus = MODULE_STATUS[k];
              return (
                <Link key={k} href={`/modules/${k}`} className="group flex flex-col rounded-emma-card border border-emma-line bg-emma-paper p-5 transition-all hover:shadow-emma-hover hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-emma-squircle" style={{ backgroundColor: `color-mix(in srgb, ${kmc} 10%, transparent)`, color: kmc }}>
                      <Glyph id={k} size={20} />
                    </span>
                    <span className="font-display text-base font-bold text-emma-ink">Emma{MODULES[k].name}</span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-emma-ink-2">{MODULE_TAGS[k]}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-emma-subtext">
                      {kstatus.live
                        ? <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emma-success" aria-hidden="true" />Live</span>
                        : 'Binnenkort'}
                      <span className="mx-1.5">·</span>
                      <b className="text-emma-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>€{MODULE_PRICE[k]}/mnd</b>
                    </span>
                    <span className="text-sm font-semibold text-emma-coral transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
