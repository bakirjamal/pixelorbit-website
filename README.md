# Pixelorbits website (Next.js)

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy (Vercel, recommended)
1. Push this folder to a GitHub repo.
2. Import it on vercel.com → Deploy.
3. Add the domain `pixelorbits.com` in Vercel → Settings → Domains.

## After it is live (indexing)
1. Google Search Console → add `pixelorbits.com` → verify.
2. Submit `https://pixelorbits.com/sitemap.xml`.
3. URL Inspection → "Request indexing" for `/` and each case study.
4. Do the same in Bing Webmaster Tools (it also feeds ChatGPT search).

## Structure
- `app/` — routes: `/` and `/[slug]` (fasto, crm, resume, audio, vehicles, whatsapp, fashion), plus `sitemap.ts` and `robots.ts`
- `content/` — each page's HTML, page CSS, page script, JSON-LD and `meta.json` (titles and descriptions)
- `public/` — images, scenes and `llms.txt` (for AI search)
- To edit text: change `content/<page>.html`. To change SEO titles/descriptions: `content/meta.json`. 
