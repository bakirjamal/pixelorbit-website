import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://pixelorbits.com'),
  icons: {
    icon: [{ url: '/favicon.svg?v=2', type: 'image/svg+xml', sizes: 'any' }],
    shortcut: '/favicon.svg?v=2',
  },
};
export const viewport: Viewport = { themeColor: '#DCE87A', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap"
        />
      </head>
      <body>
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
