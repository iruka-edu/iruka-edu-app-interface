'use client';

import EnergyMeter from '@molecules/EnergyMeter';
import StreakFlame from '@molecules/StreakFlame';
import XPChip from '@molecules/XPChip';
import * as React from 'react';
import { useSessionStore } from '@/state/stores/session';

export default function LessonHeader() {
  const { xp, streak, energy } = useSessionStore();
  return (
    <div className="flex items-center gap-3">
      <EnergyMeter value={energy} regenLabel="+1 in 4m" />
      <XPChip value={xp} />
      <StreakFlame days={streak} />
    </div>
  );
}
