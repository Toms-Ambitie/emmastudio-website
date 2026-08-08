import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ICONS } from '@/data/modules';
import { ARTICLES, nieuwsteEerst } from '@/data/articles';
import { metBeeld } from '@/data/coverbeeld';

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

/** Coverlaag met terugval. Is er een foto, dan die, met een verloop eroverheen
 *  zodat de categoriechip en het glyph-icoon leesbaar blijven op elk beeld.
 *  Ontbreekt de foto, dan blijft het gekleurde vlak met watermerk staan zoals
 *  het was. De accentkleur staat er in beide gevallen onder, dus tijdens het
 *  laden valt er nooit een wit gat. */
function CoverLayer({ article, decorSize, sizes, priority = false }: {
  article: { image?: string; glyph: string; title: string };
  decorSize: number;
  sizes: string;
  priority?: boolean;
}) {
  if (!article.image) return <CoverDecor glyph={article.glyph} size={decorSize} />;
  return (
    <>
      {/* alt is leeg: de kaart draagt de titel al als tekst, dus een beschrijving
          hier zou een schermlezer de kop twee keer laten voorlezen. */}
      <Image src={article.image} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" aria-hidden="true" />
    </>
  );
}

/** Cover-decoratie: gelaagde radials + een groot, subtiel glyph-watermerk in
 *  de module-eigen lijn. Geeft de gekleurde header een bewuste, merk-eigen
 *  uitstraling in plaats van een vlak placeholder-vlak. */
function CoverDecor({ glyph, size = 150 }: { glyph: string; size?: number }) {
  return (
    <>
      <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 22% 18%, #fff 0%, transparent 55%)' }} aria-hidden="true" />
      <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(120% 120% at 100% 105%, rgba(0,0,0,.30) 0%, transparent 55%)' }} aria-hidden="true" />
      <div className="absolute -bottom-5 -right-4 rotate-[8deg] text-white/[0.14]" aria-hidden="true"><Glyph id={glyph} size={size} /></div>
    </>
  );
}

export default function Kennisbank() {
  // metBeeld zet `image` terug op undefined als het bestand er niet is, zodat de
  // kaart terugvalt op het gekleurde vlak in plaats van een leeg donker gat.
  const featured = ARTICLES.filter(a => a.featured).map(metBeeld)[0];
  const rest = nieuwsteEerst(ARTICLES.filter(a => !a.featured)).map(metBeeld);

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
                <CoverLayer article={featured} decorSize={200} priority
                            sizes="(max-width: 768px) 100vw, 50vw" />
                <div className={`absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-emma-squircle text-white ${featured.image ? 'bg-black/30 backdrop-blur-sm' : 'bg-white/15'}`} aria-hidden="true">
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
                  <CoverLayer article={article} decorSize={128}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-emma-squircle text-white ${article.image ? 'bg-black/30 backdrop-blur-sm' : 'bg-white/15'}`} aria-hidden="true">
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
