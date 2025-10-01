'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';

export type PathMascotProps = {
  readonly label?: string;
  readonly className?: string;
};

export default function PathMascot({ label = 'Keep going!', className }: PathMascotProps) {
  return (
    <div className={cn('pointer-events-none absolute z-[12] flex flex-col items-center gap-2', className)}>
      <span className="inline-flex h-[140px] w-[132px] scale-75 items-center justify-center rounded-[44px] bg-[#58cc02] text-6xl shadow-[0_12px_0_rgba(0,0,0,0.35)]">
        🦉
      </span>
      <span className="rounded-full bg-[#1cb0f6]/20 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#f2e6ff] uppercase shadow-[0_4px_0_rgba(0,0,0,0.25)]">
        {label}
      </span>
    </div>
  );
}
