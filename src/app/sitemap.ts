import type { MetadataRoute } from 'next';
import { MODULE_ORDER } from '@/data/modules';
import { ARTICLES } from '@/data/articles';

const BASE = 'https://www.emmastudio.nl';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                   priority: 1.0, changeFrequency: 'weekly'  },
    { url: `${BASE}/kennisbank`,   priority: 0.8, changeFrequency: 'weekly'  },
    { url: `${BASE}/over`,         priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`,      priority: 0.5, changeFrequency: 'yearly'  },
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
