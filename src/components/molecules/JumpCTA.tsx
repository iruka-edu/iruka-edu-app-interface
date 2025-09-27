// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import * as React from 'react';

export type JumpCTAProps = {
  readonly onClick: () => void;
  readonly label?: string;
  readonly helperText?: string;
};

export default function JumpCTA({ onClick, label = 'Jump here?', helperText = 'Skip ahead with a quick review.' }: JumpCTAProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-[#eaf2f5]">
      <span className="rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[#2b3340] px-4 py-2 text-sm font-extrabold tracking-[0.24em] text-[#cfaaff] uppercase shadow-[0_2px_0_rgba(0,0,0,0.4)]">
        {label}
      </span>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#c37dff] text-[28px] text-[#f2e6ff] shadow-[0_10px_0_rgba(0,0,0,0.35)] transition-transform duration-150 hover:translate-y-[-4px] focus-visible:ring-2 focus-visible:ring-[#a9e34b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a20] focus-visible:outline-none active:translate-y-[2px]"
        aria-label="Jump to this skill"
      >
        ⏭️
      </button>
      <p className="max-w-[12rem] text-center text-xs font-medium text-[#7f95a1]">{helperText}</p>
    </div>
  );
}
