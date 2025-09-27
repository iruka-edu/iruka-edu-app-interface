import LearnLanding from '@organisms/LearnLanding';
import { setRequestLocale } from 'next-intl/server';

export const metadata = {
  title: 'Learn',
  description: 'Your learning home with progress, quests, and profile actions.',
};

export const dynamic = 'force-static';

export default async function LearnHomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const { mockPath } = await import('@/features/path/mock');

  return (
    <div className="flex flex-col">
      <LearnLanding pathData={mockPath} />
    </div>
  );
}
