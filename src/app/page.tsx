import type { Metadata } from 'next';
import HomePage from '@/components/emma/HomePage';
import { FAQ } from '@/data/home';
import { ARTICLES, nieuwsteEerst } from '@/data/articles';
import { metBeeld } from '@/data/coverbeeld';

const SITE = 'https://www.emmastudio.nl';

export const metadata: Metadata = {
  title: 'Emma · Software voor ondernemers, van boekhouden tot marketing',
  description: 'Emma neemt het saaie werk van ondernemen over: boekhouden, cijfers, personeel en marketing in één platform. Vanaf €9 per maand. Bekijk de modules.',
  alternates: { canonical: 'https://www.emmastudio.nl' },
};

/** JSON-LD (doc 08 / SEO-plan): Organization + WebSite identificeren het merk,
 *  FAQPage maakt de homepage-FAQ machineleesbaar (kans op rich snippets).
 *  Eén script met @graph i.p.v. drie losse blokken. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Emma',
      legalName: 'Toms Ambitie',
      url: SITE,
      logo: `${SITE}/logo-dark.svg`,
      address: { '@type': 'PostalAddress', addressLocality: 'Zwolle', addressCountry: 'NL' },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'Emma',
      url: SITE,
      inLanguage: 'nl-NL',
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}/#faq`,
      mainEntity: FAQ.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

export default function Page() {
  // De kennisbank-preview op de homepage toonde de eerste drie uit de array en
  // zonder coverbeeld. Hier gekozen en niet in HomePage zelf, want dat is een
  // client component en de bestandscontrole van metBeeld draait op de server.
  const kbPosts = nieuwsteEerst(ARTICLES).slice(0, 3).map(metBeeld);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage kbPosts={kbPosts} />
    </>
  );
}
