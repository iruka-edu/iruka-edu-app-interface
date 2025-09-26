// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import * as React from 'react';

export type NumberLineProps = {
  readonly min: number;
  readonly max: number;
  readonly onSelect?: (value: number) => void;
  readonly selected?: number;
};

export default function NumberLine({ min, max, selected, onSelect }: NumberLineProps) {
  const values = React.useMemo(() => {
    const arr: number[] = [];
    for (let i = min; i <= max; i++) arr.push(i);
    return arr;
  }, [min, max]);

  return (
    <div className="rounded-[20px] bg-[#132129] p-6 text-[#f5fafd]" style={{ boxShadow: '0 16px 0 rgba(0,0,0,0.35)' }}>
      <div className="relative h-16">
        <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#2a3a43]" />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {values.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onSelect?.(v)}
              className={[
                'grid h-14 w-14 place-items-center rounded-full border text-xl font-black transition',
                selected === v ? 'bg-[#7fe318] text-[#0f1a20] border-transparent' : 'bg-[#0f1a20] text-[#f5fafd] border-[#2a3a43] hover:-translate-y-0.5',
              ].join(' ')}
              aria-pressed={selected === v}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

