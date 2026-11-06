import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/pages';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'], allow: '/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
