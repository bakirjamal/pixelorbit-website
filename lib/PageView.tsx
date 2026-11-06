import Script from 'next/script';
import { getPage, PageKey } from './pages';

export default function PageView({ pageKey }: { pageKey: PageKey }) {
  const p = getPage(pageKey);
  return (
    <>
      {p.css && <style dangerouslySetInnerHTML={{ __html: p.css }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: p.jsonLd }} />
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: p.html }} />
      <Script id={`page-${pageKey}`} strategy="afterInteractive">{p.js}</Script>
    </>
  );
}
