import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { SITE, CASE_STUDIES, getPage } from '@/lib/pages';

type Props = { params: Promise<{ slug?: string[] }> };
const archive = projects.filter(p => p.slug !== 'fasto');
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [] }, ...archive.map(p => ({ slug: [p.slug] }))];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const project = archive.find(p => p.slug === slug[0]);
  if (slug.length > 1 || (slug.length && !project)) return {};
  const title = project ? `${project.name} — ${project.category} | Pixelorbits` : 'Design & Development Projects | Pixelorbits';
  const description = project?.overview ?? 'Explore Pixelorbits app, website and SaaS case studies, plus earlier product design projects with original screens and project scope.';
  const url = `${SITE}/work${project ? `/${project.slug}` : ''}`;
  const image = `${SITE}${project?.cover ?? '/assets/scenes/fasto-phones.jpg'}`;
  return { title, description, alternates: { canonical: url }, robots: { index: true, follow: true },
    openGraph: { title, description, url, type: project ? 'article' : 'website', siteName: 'Pixelorbits', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] } };
}
const css = `
.archive{max-width:1200px;margin:auto;padding:0 24px;color:var(--ink)}
.archive-nav{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;padding:24px 0;border-bottom:1px solid var(--divider)}
.archive-nav nav{display:flex;gap:24px;flex-wrap:wrap}.archive-nav a{font-weight:700}
.archive-hero{padding:72px 0 48px}.archive-hero h1{font-size:clamp(44px,8vw,104px);line-height:1;letter-spacing:-.05em;margin:20px 0 28px;overflow-wrap:anywhere}
.archive-hero p{max-width:740px;font-size:19px}.archive-hero .eyebrow{font-size:12px}
.archive-section{padding:40px 0;border-top:1px solid var(--divider)}.archive-section h2{font-size:clamp(28px,4vw,46px);line-height:1.1;margin-bottom:24px;letter-spacing:-.035em}
.archive-section p{max-width:760px}.archive-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}
.archive-card{padding:24px;background:var(--lime-soft);display:block}.archive-card h3{font-size:26px;margin:12px 0}.archive-card p{color:var(--muted)}
.archive-card img{width:100%;aspect-ratio:1.5;object-fit:contain;margin-bottom:12px}.archive-screen img{display:block;max-width:100%;max-height:800px;width:auto;height:auto;margin:0 auto 16px}.archive-screen{margin-bottom:40px}.archive-screen figcaption{color:var(--muted);text-align:center}
.archive-list{display:flex;gap:12px;flex-wrap:wrap;list-style:none;margin:24px 0}.archive-list li{padding:6px 12px;border:1px solid var(--divider)}
.archive-footer{padding:40px 0 48px;border-top:1px solid var(--divider);display:flex;gap:24px;flex-wrap:wrap}.archive a:focus-visible{outline:2px solid currentColor;outline-offset:5px}
@media(max-width:700px){.archive-grid{grid-template-columns:1fr}.archive-hero{padding-top:44px}.archive-card{padding:20px}.archive-nav nav{gap:16px}}
`;
export default async function ProjectArchive({ params }: Props) {
  const { slug = [] } = await params;
  const project = archive.find(p => p.slug === slug[0]);
  if (slug.length > 1 || (slug.length && !project)) notFound();
  const current = CASE_STUDIES.map(key => ({ key, ...getPage(key).meta }));
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/work` },
    ...(project ? [{ '@type': 'ListItem', position: 3, name: project.name, item: `${SITE}/work/${project.slug}` }] : []),
  ] };
  return <div className="archive">
    <style>{css}</style>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
    <header className="archive-nav"><a href="/" className="wordmark" aria-label="Pixelorbits home">pixelorbits</a><nav aria-label="Project navigation"><a href="/#work">Selected work</a><a href="/work">Project archive</a><a href="/#contact">Start a project ↗</a></nav></header>
    <main>
      {project ? <>
        <section className="archive-hero"><a href="/work">← All projects</a><p className="eyebrow">{project.category}</p><h1>{project.name}</h1><p>{project.tagline}</p></section>
        <section className="archive-section"><h2>Project overview</h2><p>{project.overview}</p><ul className="archive-list">{project.services.map(s => <li key={s}>{s}</li>)}</ul><p><strong>Role:</strong> {project.role}</p></section>
        <section className="archive-section"><h2>{project.briefHeading ?? 'The brief'}</h2><p>{project.brief}</p></section>
        <section className="archive-section"><h2>The design approach</h2><p>{project.solution}</p></section>
        {project.screens.length > 0 && <section className="archive-section"><h2>Project screens</h2>{project.screens.map(s => <figure className="archive-screen" key={s.src}><img src={s.src} alt={`${project.name}: ${s.label}`} loading="lazy" decoding="async" /><figcaption>{s.label}</figcaption></figure>)}</section>}
        <section className="archive-section"><h2>{project.studyHeading ?? 'Design decisions'}</h2><div className="archive-grid">{project.study.map(s => <article className="archive-card" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
        {project.source && <section className="archive-section"><a className="btn" href={project.source.url} target="_blank" rel="noopener noreferrer">View original designs ↗</a></section>}
        <section className="archive-section"><h2>More projects</h2><ul className="archive-list">{archive.filter(p => p.slug !== project.slug).map(p => <li key={p.slug}><a href={`/work/${p.slug}`}>{p.name} ↗</a></li>)}</ul><a href="/fasto">Fasto delivery app case study ↗</a></section>
      </> : <>
        <section className="archive-hero"><p className="eyebrow">Pixelorbits / Projects</p><h1>Work, past and present.</h1><p>Explore our current case studies and earlier design projects. Each project describes the scope and evidence available for that work.</p></section>
        <section className="archive-section"><h2>Case studies</h2><div className="archive-grid">{current.map(p => <a className="archive-card" key={p.key} href={`/${p.key}`}><h3>{p.title.split(' — ')[0].split(' Case Study')[0]}</h3><p>{p.description}</p><p>View case study ↗</p></a>)}</div></section>
        <section className="archive-section"><h2>Earlier design projects</h2><div className="archive-grid">{archive.map(p => <a className="archive-card" key={p.slug} href={`/work/${p.slug}`}>{p.cover && <img src={p.cover} alt={`${p.name} design preview`} loading="lazy" decoding="async" />}<span className="eyebrow">{p.category}</span><h3>{p.name}</h3><p>{p.tagline}</p><p>View project ↗</p></a>)}</div></section>
      </>}
    </main>
    <footer className="archive-footer"><a href="mailto:hello@pixelorbits.com">hello@pixelorbits.com</a><a href="https://wa.me/917017812904">WhatsApp +91 70178 12904</a><a href="/#contact">Tell us about your project ↗</a></footer>
  </div>;
}
