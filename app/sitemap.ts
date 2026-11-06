import type { MetadataRoute } from 'next';
import { CASE_STUDIES, SITE } from '@/lib/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...CASE_STUDIES.map((s) => ({ url: `${SITE}/${s}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
