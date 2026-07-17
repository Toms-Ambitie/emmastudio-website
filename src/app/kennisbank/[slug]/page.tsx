import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ICONS } from '@/data/modules';
import { ARTICLES } from '@/data/articles';
import type { Article, ArticleBlock } from '@/data/articles';

const SITE = 'https://www.emmastudio.nl';

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return {};
  const url = `${SITE}/kennisbank/${article.slug}`;
  return {
    title: `${article.title} · Emma Kennisbank`,
    description: article.dek,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.dek,
      publishedTime: dutchDateToISO(article.date),
      authors: [article.author],
      images: [{ url: '/og-card.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.dek,
      images: ['/og-card.png'],
    },
  };
}

/** "28 mei 2026" → "2026-05-28". Alleen herformattering van de bestaande
 *  datum uit de datalaag; er wordt niets verzonnen. Faalt de parse, dan
 *  geen datePublished (liever weglaten dan een fout getal). */
function dutchDateToISO(date: string): string | undefined {
  const MONTHS: Record<string, string> = {
    januari: '01', februari: '02', maart: '03', april: '04', mei: '05', juni: '06',
    juli: '07', augustus: '08', september: '09', oktober: '10', november: '11', december: '12',
  };
  const m = date.trim().match(/^(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/);
  if (!m) return undefined;
  const mm = MONTHS[m[2].toLowerCase()];
  if (!mm) return undefined;
  return `${m[3]}-${mm}-${m[1].padStart(2, '0')}`;
}

function Glyph({ id, size = 40 }: { id: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[id] || '' }}
    />
  );
}

function Check({ color }: { color: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

function renderBlock(block: ArticleBlock, accent: string, i: number) {
  switch (block.t) {
    case 'p':
      return <p key={i} className="mt-5 text-lg leading-relaxed text-emma-ink-2">{block.v}</p>;
    case 'h2':
      return <h2 key={i} className="mt-12 mb-1 font-display text-2xl font-bold tracking-tight text-emma-ink">{block.v}</h2>;
    case 'h3':
      return <h3 key={i} className="mt-8 mb-1 font-display text-xl font-bold text-emma-ink">{block.v}</h3>;
    case 'pull':
      return (
        <blockquote key={i} className="my-10 border-l-2 pl-6 font-display text-xl font-semibold leading-snug text-emma-ink md:text-2xl" style={{ borderColor: accent }}>
          {block.v}
        </blockquote>
      );
    case 'note':
      return (
        <div key={i} className="my-8 rounded-emma-card border border-emma-line bg-emma-paper p-5 text-base leading-relaxed text-emma-ink-2 [&_b]:font-semibold [&_b]:text-emma-ink" dangerouslySetInnerHTML={{ __html: block.v }} />
      );
    case 'ul':
      return (
        <ul key={i} className="mt-5 space-y-2.5">
          {block.v.map((item, j) => (
            <li key={j} className="flex gap-3 text-lg leading-relaxed text-emma-ink-2">
              <Check color={accent} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

function jsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    datePublished: dutchDateToISO(article.date),
    inLanguage: 'nl-NL',
    author: { '@type': 'Organization', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'Emma',
      url: SITE,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/kennisbank/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) notFound();

  const others = ARTICLES.filter(a => a.slug !== article.slug);
  const accent = article.accent;

  return (
    <main id="main-content" className="pb-24 md:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(article)) }} />

      {/* Kop */}
      <section className="px-5 pt-28 md:px-8 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/kennisbank" className="inline-flex items-center gap-1.5 text-sm font-medium text-emma-subtext transition-colors hover:text-emma-ink">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            Kennisbank
          </Link>
          <div className="mt-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
            <span className="em-label text-emma-subtext">{article.cat}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-emma-ink md:text-5xl">{article.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-emma-ink-2">{article.dek}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-emma-subtext">
            <span className="font-medium text-emma-ink-2">{article.author}</span>
            <span className="h-1 w-1 rounded-full bg-emma-line" />
            <span>{article.date}</span>
            <span className="h-1 w-1 rounded-full bg-emma-line" />
            <span>{article.read} lezen</span>
          </div>
        </div>
      </section>

      {/* Cover (gekleurde placeholder tot er foto's zijn) */}
      <section className="px-5 pt-10 md:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-emma-card md:h-72" style={{ backgroundColor: accent }}>
            <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 30%, #fff 0%, transparent 60%)' }} aria-hidden="true" />
            <div className="flex h-16 w-16 items-center justify-center rounded-emma-squircle bg-white/15 text-white" aria-hidden="true">
              <Glyph id={article.glyph} size={34} />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="px-5 pt-10 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl">
          {article.body.map((block, i) => renderBlock(block, accent, i))}
        </div>
      </article>

      {/* Einde-markering */}
      <div className="mx-auto mt-14 flex max-w-2xl items-center gap-3 px-5 md:px-8 lg:px-10">
        <span className="h-px flex-1 bg-emma-line" />
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
        <span className="h-px flex-1 bg-emma-line" />
      </div>

      {/* Gerelateerd */}
      {others.length > 0 && (
        <section className="px-5 pt-16 md:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-emma-ink md:text-3xl">Meer uit de Kennisbank</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
              {others.map(other => (
                <Link
                  key={other.slug}
                  href={`/kennisbank/${other.slug}`}
                  className="group flex flex-col overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper transition-all hover:shadow-emma-hover hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: other.accent }}>
                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 30%, #fff 0%, transparent 60%)' }} aria-hidden="true" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-emma-squircle bg-white/15 text-white" aria-hidden="true">
                      <Glyph id={other.glyph} size={22} />
                    </div>
                    <div className="absolute left-4 bottom-4">
                      <span className="rounded-emma-pill bg-black/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">{other.cat}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-xs text-emma-subtext">
                      <span>{other.date}</span>
                      <span className="h-1 w-1 rounded-full bg-emma-line" />
                      <span>{other.read} lezen</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-emma-ink">{other.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-emma-ink-2">{other.dek}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
