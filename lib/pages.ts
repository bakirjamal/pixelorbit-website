import fs from 'node:fs';
import path from 'node:path';
import meta from '@/content/meta.json';

export const SITE = 'https://pixelorbits.com';
export const CASE_STUDIES = ['fasto', 'crm', 'resume', 'audio', 'vehicles', 'whatsapp', 'fashion'] as const;
export type PageKey = 'index' | (typeof CASE_STUDIES)[number];

const dir = path.join(process.cwd(), 'content');
const read = (f: string) => fs.readFileSync(path.join(dir, f), 'utf8');

export function getPage(key: PageKey) {
  return {
    html: read(`${key}.html`),
    css: read(`${key}.css`),
    js: read(`${key}.js`),
    jsonLd: read(`${key}.ld.json`),
    meta: (meta as Record<string, { title: string; description: string; image: string }>)[key],
  };
}
