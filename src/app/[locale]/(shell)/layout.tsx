import LeftRail from '@organisms/LeftRail';
import RightRail from '@organisms/RightRail';
import TriPaneTemplate from '@templates/TriPaneTemplate';
import { setRequestLocale } from 'next-intl/server';

export default async function ShellLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const year = new Date().getFullYear();

  const navItems = [
    { id: 'learn', label: 'LEARN', href: '/learn', active: true, icon: '🏠' },
    { id: 'leaderboards', label: 'LEADERBOARDS', href: '/leaderboards', icon: '🏆' },
    { id: 'quests', label: 'QUESTS', href: '/quests', icon: '🗺️' },
    { id: 'shop', label: 'SHOP', href: '/shop', icon: '🎁' },
    { id: 'profile', label: 'PROFILE', href: '/profile', icon: '👤', badge: 1 },
    { id: 'more', label: 'MORE', href: '/more', icon: '⋯' },
  ];

  const leaderboardsCard = (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0b1419] text-xl">🔒</span>
      <p className="text-sm text-[#b8c7cf]">Complete 10 more lessons to start competing</p>
    </div>
  );

  const dailyQuestCard = (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#eaf2f5]">
          <span className="text-xl">⚡</span>
          <span>Earn 10 XP</span>
        </div>
        <button type="button" className="text-xs font-semibold tracking-wide text-[#1cb0f6] uppercase hover:text-[#7fd31e]">View All</button>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full bg-[#22313a]">
          <div className="h-2 w-0 rounded-full bg-[#1cb0f6]" />
        </div>
        <span className="text-xs font-semibold text-[#7f95a1]">0 / 10</span>
      </div>
    </div>
  );

  const profileCard = (
    <div className="space-y-3">
      <p className="text-sm text-[#b8c7cf]">Save progress and sync across devices.</p>
      <div className="grid gap-2">
        <button
          type="button"
          className="h-12 rounded-full bg-[#58cc02] text-sm font-bold tracking-wide text-[#0f1a20] uppercase transition hover:bg-[#7fd31e]"
        >
          Create a profile
        </button>
        <button
          type="button"
          className="h-12 rounded-full bg-[#1cb0f6] text-sm font-bold tracking-wide text-[#0f1a20] uppercase transition hover:bg-[#1aa6e6]"
        >
          Sign in
        </button>
      </div>
    </div>
  );

  return (
    <TriPaneTemplate
      header={(
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-[#58cc02]">iruka</span>
            <span className="rounded-full bg-[#1cb0f6]/20 px-2 py-1 text-xs font-semibold text-[#1cb0f6] uppercase">edu</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold text-[#b8c7cf]">
            <span className="flex items-center gap-2 rounded-full bg-[#16232b] px-3 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
              <span className="text-xl">🔥</span>
              0
            </span>
            <span className="flex items-center gap-2 rounded-full bg-[#16232b] px-3 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
              <span className="text-xl">💎</span>
              500
            </span>
            <span className="flex items-center gap-2 rounded-full bg-[#16232b] px-3 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
              <span className="text-xl">❤️</span>
              5
            </span>
          </div>
        </div>
      )}
      toolbar={(
        <div className="flex w-full items-center justify-between gap-3 rounded-[18px] bg-[#16232b] px-6 py-3 text-sm text-[#b8c7cf] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-3">
            <span className="text-lg">📅</span>
            <div>
              <p className="text-xs tracking-wide text-[#7f95a1] uppercase">Today&apos;s Focus</p>
              <p className="font-semibold text-[#eaf2f5]">Introduce yourself • Section 1</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#7f95a1]">
            <span>
              ©
              {year}
              {' '}
              Iruka
            </span>
            <span aria-hidden>·</span>
            <span>Stay curious</span>
          </div>
        </div>
      )}
      leftSlot={(
        <LeftRail
          items={navItems}
          footer={<span>Daily streak • 0 days</span>}
        />
      )}
      rightSlot={(
        <RightRail
          sections={[
            {
              id: 'leaderboards',
              title: 'Unlock Leaderboards!',
              description: 'Complete 10 more lessons to start competing',
              content: leaderboardsCard,
            },
            {
              id: 'daily-quests',
              title: 'Daily Quests',
              content: dailyQuestCard,
            },
            {
              id: 'profile-cta',
              title: 'Create a profile to save your progress!',
              content: profileCard,
            },
          ]}
        />
      )}
      mainSlot={props.children}
      ariaMainLabel="Primary content"
    />
  );
}
