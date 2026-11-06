import type { Metadata } from 'next';
import { getPage, PageKey, SITE } from './pages';

export function buildMetadata(key: PageKey): Metadata {
  const { meta } = getPage(key);
  const url = key === 'index' ? SITE : `${SITE}/${key}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: key === 'index' ? 'website' : 'article', siteName: 'Pixelorbits',
      title: meta.title, description: meta.description, url, images: [meta.image],
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description, images: [meta.image] },
  };
}
