import PageView from '@/lib/PageView';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata('index');
export default function Home() { return <PageView pageKey="index" />; }
