import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { ICONS } from '@/data/modules';

export const metadata: Metadata = {
  title: 'Kennisbank · Emma',
  description: 'Eerlijke artikelen over ondernemen. Geen verzonnen cijfers, geen marketingpraatjes.',
};

const KB_ICONS: Record<string, string> = {
  waakt:    '<path d="M12 3l7 2.8v5.2c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8V5.8L12 3Z"/><path d="m9 11.8 2 2 4-4"/>',
  vindt:    '<circle cx="10.5" cy="10.5" r="6.4"/><path d="m20 20-4.8-4.8"/>',
  schrijft: '<path d="M12.5 19.5H21"/><path d="M16.6 4.4a2.05 2.05 0 0 1 2.9 2.9L7.8 19 3.5 20.5 5 16.2Z"/>',
};

export default function Kennisbank() {
  const featured = ARTICLES.find(a => a.featured);
  const rest = ARTICLES.filter(a => !a.featured);

  return (
    <main className="lightpage" data-page="kennisbank">
      <header className="phero">
        <div className="phero__in">
          <div className="phero__eyebrow eyebrow"><span className="tick"></span> Kennisbank</div>
          <h1>Eerlijk over ondernemen.</h1>
          <p>Geen hype, geen verzonnen cijfers. Wat we weten, wat we leren, en hoe we Emma bouwen.</p>
        </div>
      </header>

      <section className="kb">
        <div className="kb__in">
          {featured && (
            <Link
              className="kbfeat"
              href={`/kennisbank/${featured.slug}`}
              style={{ ['--ac' as string]: featured.accent }}
            >
              <div>
                <div className="kbfeat__cat">{featured.cat}</div>
                <h2>{featured.title}</h2>
                <p>{featured.dek}</p>
                <div className="kbfeat__meta">
                  <span>{featured.author}</span>
                  <span className="dot"></span>
                  <span>{featured.date}</span>
                  <span className="dot"></span>
                  <span>{featured.read} leestijd</span>
                </div>
                <span className="kbfeat__link">Lees artikel <span className="arr">→</span></span>
              </div>
              <div className="kbfeat__media">
                <span className="tagimg">{featured.cat}</span>
                <div className="glyph">
                  <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: KB_ICONS[featured.glyph] || '' }}></svg>
                </div>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="kbgrid">
              {rest.map(article => (
                <Link
                  key={article.slug}
                  className="kbcard"
                  href={`/kennisbank/${article.slug}`}
                  style={{ ['--ac' as string]: article.accent }}
                >
                  <div className="kbcard__media">
                    <div className="glyph">
                      <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: KB_ICONS[article.glyph] || '' }}></svg>
                    </div>
                  </div>
                  <div className="kbcard__body">
                    <div className="kbcard__cat">{article.cat}</div>
                    <h3>{article.title}</h3>
                    <p>{article.dek}</p>
                    <div className="kbcard__meta">
                      <span>{article.date}</span>
                      <span className="dot"></span>
                      <span>{article.read}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
