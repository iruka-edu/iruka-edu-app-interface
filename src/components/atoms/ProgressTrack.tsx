// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import * as React from 'react';

export type ProgressTrackProps = {
  readonly value: number; // 0..1
  readonly ariaLabel?: string;
};

export default function ProgressTrack({ value, ariaLabel = 'Lesson progress' }: ProgressTrackProps) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div
      className="h-4 w-full rounded-full bg-[#2a3a43]"
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
    >
      <div className="h-full rounded-full bg-[#6ac21a]" style={{ width: `${clamped * 100}%` }} />
    </div>
  );
}
