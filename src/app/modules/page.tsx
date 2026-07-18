import type { Metadata } from 'next';
import Link from 'next/link';
import { MODULES, ICONS, MODULE_TAGS, MODULE_PRICE, MODULE_ORDER, MODULE_STATUS } from '@/data/modules';
import { MODULES_SECTION } from '@/data/home';

const SITE = 'https://www.emmastudio.nl';

export const metadata: Metadata = {
  title: 'Modules · Emma',
  description: MODULES_SECTION.intro,
  alternates: { canonical: `${SITE}/modules` },
  openGraph: {
    type: 'website',
    url: `${SITE}/modules`,
    title: 'Modules · Emma',
    description: MODULES_SECTION.intro,
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

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

export default function Modules() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="px-5 pb-4 pt-28 md:px-8 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">{MODULES_SECTION.eyebrow}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">
            {MODULES_SECTION.title1} {MODULES_SECTION.title2}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emma-ink-2">{MODULES_SECTION.intro}</p>
        </div>
      </section>

      {/* Modulegrid */}
      <section className="px-5 pb-24 pt-8 md:px-8 md:pb-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {MODULE_ORDER.map((id) => {
              const mc = `var(--m-${id})`;
              const status = MODULE_STATUS[id];
              return (
                <Link
                  key={id}
                  href={`/modules/${id}`}
                  className="group flex flex-col rounded-emma-card border border-emma-line bg-emma-paper p-6 transition-all hover:shadow-emma-hover hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-emma-squircle" style={{ backgroundColor: `color-mix(in srgb, ${mc} 10%, transparent)`, color: mc }}>
                      <Glyph id={id} size={22} />
                    </span>
                    <span className="font-display text-lg font-bold text-emma-ink">Emma{MODULES[id].name}</span>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-emma-ink-2">{MODULE_TAGS[id]}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-emma-line pt-4">
                    <span className="text-xs text-emma-subtext">
                      {status.live
                        ? <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emma-success" aria-hidden="true" />Live</span>
                        : 'Binnenkort'}
                      <span className="mx-1.5">·</span>
                      <b className="text-emma-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>€{MODULE_PRICE[id]}/mnd</b>
                    </span>
                    <span className="text-sm font-semibold text-emma-coral transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-emma-subtext">
            Elke module is los te gebruiken. Pakketten volgen zodra alle acht er zijn. <Link href="/pakketten" className="font-semibold text-emma-coral hover:underline">Bekijk de pakketten</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
