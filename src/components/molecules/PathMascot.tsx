// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import * as React from 'react';

export type PathMascotProps = {
  readonly label?: string;
};

export default function PathMascot({ label = 'Keep going!' }: PathMascotProps) {
  return (
    <div className="pointer-events-none absolute top-[28px] right-[-160px] z-10 flex flex-col items-center gap-2">
      <span className="inline-flex h-[140px] w-[132px] items-center justify-center rounded-[44px] bg-[#58cc02] text-6xl shadow-[0_12px_0_rgba(0,0,0,0.35)]">
        🦉
      </span>
      <span className="rounded-full bg-[#1cb0f6]/20 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#f2e6ff] uppercase shadow-[0_4px_0_rgba(0,0,0,0.25)]">
        {label}
      </span>
    </div>
  );
}
