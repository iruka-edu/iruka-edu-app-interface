import QuestsDrawer from '@molecules/QuestsDrawer';
import RewardsTray from '@molecules/RewardsTray';
import LessonHeader from '@organisms/LessonHeader';
import * as React from 'react';
import AppShell from './AppShell';

export default function LearnTemplate({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={(
        <div className="flex items-center gap-3">
          <LessonHeader />
          <QuestsDrawer />
          <RewardsTray />
        </div>
      )}
      footer={<span className="text-xs text-[--muted]">Keep the streak alive</span>}
    >
      {children}
    </AppShell>
  );
}
