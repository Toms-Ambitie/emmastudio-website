import type { Metadata } from 'next';
import Link from 'next/link';
import { ICONS } from '@/data/modules';
import { ARTICLES } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Kennisbank · Emma',
  description: 'Eerlijke artikelen over ondernemen. Geen verzonnen cijfers, geen marketingpraatjes.',
  alternates: { canonical: 'https://www.emmastudio.nl/kennisbank' },
  openGraph: {
    type: 'website',
    url: 'https://www.emmastudio.nl/kennisbank',
    title: 'Kennisbank · Emma',
    description: 'Eerlijke artikelen over ondernemen. Geen verzonnen cijfers, geen marketingpraatjes.',
  },
};

/** Lokale glyph — zelfde stroked stijl als de homepage (ICONS uit de datalaag). */
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

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" />
    </svg>
  );
}

export default function Kennisbank() {
  const featured = ARTICLES.find(a => a.featured);
  const rest = ARTICLES.filter(a => !a.featured);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">Kennisbank</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">
            Eerlijk over ondernemen.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emma-ink-2">
            Geen hype, geen verzonnen cijfers. Wat we weten, wat we leren, en hoe we Emma bouwen.
          </p>
        </div>
      </section>

      {/* Uitgelicht artikel */}
      {featured && (
        <section className="px-5 md:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/kennisbank/${featured.slug}`}
              className="group grid overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper transition-all hover:shadow-emma-hover hover:-translate-y-0.5 md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[340px]" style={{ backgroundColor: featured.accent }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 30%, #fff 0%, transparent 60%)' }} aria-hidden="true" />
                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-emma-squircle bg-white/15 text-white" aria-hidden="true">
                  <Glyph id={featured.glyph} size={26} />
                </div>
                <div className="absolute left-5 bottom-5">
                  <span className="rounded-emma-pill bg-black/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">{featured.cat}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <span className="em-label text-emma-subtext">Uitgelicht</span>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-emma-ink md:text-3xl">{featured.title}</h2>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-emma-ink-2">{featured.dek}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-emma-subtext">
                  <span>{featured.author}</span>
                  <span className="h-1 w-1 rounded-full bg-emma-line" />
                  <span>{featured.date}</span>
                  <span className="h-1 w-1 rounded-full bg-emma-line" />
                  <span>{featured.read} lezen</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emma-coral">
                  Lees artikel
                  <span className="transition-transform group-hover:translate-x-1"><ArrowRight size={15} /></span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Overige artikelen */}
      {rest.length > 0 && (
        <section className="px-5 pb-24 pt-6 md:px-8 md:pb-32 md:pt-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {rest.map(article => (
              <Link
                key={article.slug}
                href={`/kennisbank/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper transition-all hover:shadow-emma-hover hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: article.accent }}>
                  <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 30%, #fff 0%, transparent 60%)' }} aria-hidden="true" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-emma-squircle bg-white/15 text-white" aria-hidden="true">
                    <Glyph id={article.glyph} size={22} />
                  </div>
                  <div className="absolute left-4 bottom-4">
                    <span className="rounded-emma-pill bg-black/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">{article.cat}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-emma-subtext">
                    <span>{article.date}</span>
                    <span className="h-1 w-1 rounded-full bg-emma-line" />
                    <span>{article.read} lezen</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-emma-ink">{article.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-emma-ink-2">{article.dek}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
