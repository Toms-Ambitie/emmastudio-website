import type { MetadataRoute } from 'next';
import { MODULE_ORDER } from '@/data/modules';
import { ARTICLES } from '@/data/articles';

const BASE = 'https://www.emmastudio.nl';

/* Regel: wat op `noindex` staat, hoort NIET in de sitemap. Die twee tegen
   elkaar in laten werken is een tegenstrijdig signaal aan Google — je vraagt
   om indexering van een pagina die je tegelijk verbiedt te indexeren.

   Daarom staan /privacy, /algemene-voorwaarden, /cookiebeleid en
   /verwerkersovereenkomst hier niet in: die hebben alle vier
   `robots: { index: false }`. Ze zijn gewoon bereikbaar via de footer, en dat
   is waar ze thuishoren.

   Wat er wél bij moest: /modules, /pakketten, /vergelijk en /veiligheid. Die
   ontbraken, terwijl het echte landingspagina's zijn. */

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                   priority: 1.0,  changeFrequency: 'weekly'  },
    { url: `${BASE}/modules`,      priority: 0.9,  changeFrequency: 'weekly'  },
    { url: `${BASE}/pakketten`,    priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/vergelijk`,    priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/kennisbank`,   priority: 0.8,  changeFrequency: 'weekly'  },
    { url: `${BASE}/veiligheid`,   priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${BASE}/over`,         priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${BASE}/contact`,      priority: 0.5,  changeFrequency: 'yearly'  },
    ...MODULE_ORDER.map(id => ({
      url: `${BASE}/modules/${id}`,
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    })),
    ...ARTICLES.map(a => ({
      url: `${BASE}/kennisbank/${a.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
  ];
}
