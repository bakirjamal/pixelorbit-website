/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Preserve links to older HTML exports and the moved Fasto case study.
      ...['fasto','crm','resume','audio','vehicles','whatsapp','fashion'].map(slug => ({
        source: `/${slug}.html`, destination: `/${slug}`, permanent: true,
      })),
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/work/fasto', destination: '/fasto', permanent: true },
      // These sections now live on the homepage; use the current contact form.
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ];
  },
};
export default nextConfig;
