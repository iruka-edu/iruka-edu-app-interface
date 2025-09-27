import PathRail from '@organisms/PathRail';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';

export default async function LearnPathPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // Temporary: use client cache pre-render by SWR with mock; fallback render
  const { mockPath } = await import('@/features/path/mock');
  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Learning Path</h1>
      <PathRail data={mockPath} />
    </div>
  );
}
