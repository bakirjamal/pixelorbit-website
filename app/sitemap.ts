import type { MetadataRoute } from 'next';
import { CASE_STUDIES, SITE } from '@/lib/pages';
import { projects } from '@/lib/projects';

// Update this date only when page content changes, not on every unrelated deployment.
const CONTENT_UPDATED = '2026-11-06';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, lastModified: CONTENT_UPDATED },
    ...CASE_STUDIES.map(slug => ({ url: `${SITE}/${slug}`, lastModified: CONTENT_UPDATED })),
    { url: `${SITE}/work`, lastModified: CONTENT_UPDATED },
    ...projects.filter(p => p.slug !== 'fasto').map(p => ({
      url: `${SITE}/work/${p.slug}`, lastModified: CONTENT_UPDATED,
    })),
  ];
}
