import type { RightRailSection } from '@/components/organisms/RightRail';
import { setRequestLocale } from 'next-intl/server';
import LessonToast from '@/components/LessonToast';
import LearnLanding from '@/components/organisms/LearnLanding';
import ScrollButton from '@/components/ScrollButton';
import WithRightRailTemplate from '@/components/templates/WithRightRailTemplate';
import { RightRailProvider } from '@/context';

export const metadata = {
  title: 'Learn',
  description: 'Your learning home with progress, quests, and profile actions.',
};

export const dynamic = 'force-static';

const rightCards: Exclude<RightRailSection, 'action'>[] = [
  {
    id: 'promo',
    title: 'Super Promo',
    description: 'Unlock premium features with 50% off!',
    content: <div>Promo content</div>,
  },
  {
    id: 'unlock',
    title: 'Unlock Leaderboards',
    description: 'Compete with friends!',
    content: <div>Unlock content</div>,
  },
  {
    id: 'quest',
    title: 'Daily Quests',
    description: 'Complete tasks to earn points',
    content: <div>Quest progress: 40%</div>,
  },
];

export default async function LearnHomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const { mockPath } = await import('@/features/path/mock');

  return (
    <RightRailProvider initialSections={rightCards}>
      <WithRightRailTemplate stickyTop={0} railWidth={352}>
        <div className="relative h-full min-h-0">
          <div className="fixed top-6 z-[50] w-fit">
            <LessonToast />
          </div>
          <LearnLanding pathData={mockPath} />
          <div className="fixed bottom-8 z-[50] flex w-full justify-end">
            <ScrollButton />
          </div>
        </div>
      </WithRightRailTemplate>
    </RightRailProvider>
  );
}
