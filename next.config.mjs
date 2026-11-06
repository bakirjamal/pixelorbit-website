/** @type {import('next').NextConfig} */
const nextConfig = {
  // Old .html links keep working (and pass SEO value to the new URLs)
  async redirects() {
    return ['fasto','crm','resume','audio','vehicles','whatsapp','fashion'].map((s) => ({
      source: `/${s}.html`, destination: `/${s}`, permanent: true,
    })).concat([{ source: '/index.html', destination: '/', permanent: true }]);
  },
};
export default nextConfig;
