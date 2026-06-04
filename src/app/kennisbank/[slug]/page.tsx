import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/data/articles';
import type { ArticleBlock } from '@/data/articles';

const KB_ICONS: Record<string, string> = {
  waakt:    '<path d="M12 3l7 2.8v5.2c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8V5.8L12 3Z"/><path d="m9 11.8 2 2 4-4"/>',
  vindt:    '<circle cx="10.5" cy="10.5" r="6.4"/><path d="m20 20-4.8-4.8"/>',
  schrijft: '<path d="M12.5 19.5H21"/><path d="M16.6 4.4a2.05 2.05 0 0 1 2.9 2.9L7.8 19 3.5 20.5 5 16.2Z"/>',
};

const TK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>';

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} · Emma Kennisbank`,
    description: article.dek,
  };
}

function renderBlock(block: ArticleBlock, ac: string, i: number) {
  switch (block.t) {
    case 'p':
      return <p key={i}>{block.v}</p>;
    case 'h2':
      return <h2 key={i}>{block.v}</h2>;
    case 'h3':
      return <h3 key={i}>{block.v}</h3>;
    case 'pull':
      return (
        <div key={i} className="artpull">
          <p>{block.v}</p>
        </div>
      );
    case 'note':
      return (
        <div key={i} className="artnote" dangerouslySetInnerHTML={{ __html: block.v }}></div>
      );
    case 'ul':
      return (
        <ul key={i}>
          {block.v.map((item, j) => (
            <li key={j}>
              <span className="tk" dangerouslySetInnerHTML={{ __html: TK_SVG }}></span>
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) notFound();

  const others = ARTICLES.filter(a => a.slug !== article.slug);

  return (
    <main className="art lightpage" style={{ ['--ac' as string]: article.accent }}>
      <div className="arthero">
        <div className="arthero__in">
          <Link className="artback" href="/kennisbank">
            <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            Kennisbank
          </Link>
          <div className="arthero__cat">{article.cat}</div>
          <h1>{article.title}</h1>
          <p className="arthero__dek">{article.dek}</p>
          <div className="arthero__meta">
            <span className="who">{article.author}</span>
            <span className="dot"></span>
            <span>{article.date}</span>
            <span className="dot"></span>
            <span>{article.read} leestijd</span>
          </div>
        </div>
      </div>

      <div className="artcover">
        <div className="artcover__inner">
          <div className="glyph">
            <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: KB_ICONS[article.glyph] || '' }}></svg>
          </div>
        </div>
      </div>

      <div className="artbody">
        {article.body.map((block, i) => renderBlock(block, article.accent, i))}
      </div>

      <div className="artend">
        <div className="artend__line"></div>
        <div className="artend__dot"></div>
        <div className="artend__line"></div>
      </div>

      {others.length > 0 && (
        <section className="related">
          <div className="related__in">
            <h2>Meer uit de Kennisbank</h2>
            <div className="related__grid">
              {others.map(other => (
                <Link
                  key={other.slug}
                  className="kbcard"
                  href={`/kennisbank/${other.slug}`}
                  style={{ ['--ac' as string]: other.accent }}
                >
                  <div className="kbcard__media">
                    <div className="glyph">
                      <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: KB_ICONS[other.glyph] || '' }}></svg>
                    </div>
                  </div>
                  <div className="kbcard__body">
                    <div className="kbcard__cat">{other.cat}</div>
                    <h3>{other.title}</h3>
                    <p>{other.dek}</p>
                    <div className="kbcard__meta">
                      <span>{other.date}</span>
                      <span className="dot"></span>
                      <span>{other.read}</span>
                    </div>
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
