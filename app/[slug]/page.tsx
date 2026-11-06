import { notFound } from 'next/navigation';
import PageView from '@/lib/PageView';
import { buildMetadata } from '@/lib/metadata';
import { CASE_STUDIES } from '@/lib/pages';

type Slug = (typeof CASE_STUDIES)[number];
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return CASE_STUDIES.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return CASE_STUDIES.includes(slug as Slug) ? buildMetadata(slug as Slug) : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  if (!CASE_STUDIES.includes(slug as Slug)) notFound();
  return <PageView pageKey={slug as Slug} />;
}
