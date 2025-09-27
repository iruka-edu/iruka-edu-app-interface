'use client';

import ProgressTrack from '@atoms/ProgressTrack';
import EnergyMeter from '@molecules/EnergyMeter';
import StreakFlame from '@molecules/StreakFlame';
import XPChip from '@molecules/XPChip';
import * as React from 'react';
import { useSessionStore } from '@/state/stores/session';

type LessonHeaderProps = {
  title?: string;
  progress?: number;
  hearts?: number;
  onExit?: () => void;
};

export default function LessonHeader(props: LessonHeaderProps) {
  const { xp, streak, energy } = useSessionStore();
  const displayHearts = props.hearts ?? energy;

  return (
    <div className="flex items-center justify-between gap-6">
      <button
        type="button"
        aria-label="Exit"
        onClick={props.onExit}
        className="grid h-12 w-12 place-items-center rounded-[12px] bg-[#0c171d] text-xl text-[#4b5d67]"
      >
        ✖
      </button>

      <div className="w-full max-w-[900px]">
        <ProgressTrack value={props.progress ?? 0} />
      </div>

      <div className="flex items-center gap-3">
        <EnergyMeter value={displayHearts} regenLabel="+1 in 4m" />
        <XPChip value={xp} />
        <StreakFlame days={streak} />
      </div>
    </div>
  );
}
