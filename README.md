# Pixel Orbit — Vercel-ready source

This is the Pixel Orbit portfolio source, prepared as a statically exported Next.js 16 site. The home pixel-scroll animation and project-card drag interaction run in the browser. The Contact page opens email and WhatsApp links; it does not collect or store form submissions.

## Deploy through GitHub and Vercel

1. Unzip this archive. Create a private GitHub repository, and upload the contents of the `pixel-orbit-vercel` folder (including `package.json`, `app`, `components`, and `public`) to its root. Do not upload `node_modules`, `.next`, `out`, or `dist`.
2. In Vercel, select **Add New → Project**, connect GitHub, and **Import** the repository.
3. Vercel should detect **Next.js**. Leave the Root Directory at `./` if you put the files at the repository root. The build command is `pnpm build` (runs `next build`); default settings should work.
4. Select **Deploy**. Check `/`, `/work`, project pages, and `/contact` on the resulting URL.
5. To use your domain, open the Vercel project **Settings → Domains**, add the domain, then follow Vercel's displayed DNS instructions at your domain registrar. DNS changes can take time.

## Local preview

Use Node.js 22 or newer and pnpm 11: `corepack pnpm install --frozen-lockfile`, then `pnpm dev`. To verify a production build, run `pnpm build`.
