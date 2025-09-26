// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import type { PathLessonKind } from '@/features/path/types';
import * as React from 'react';

export type PathNodeStatus = 'locked' | 'available' | 'completed';

export type PathNodeButtonProps = {
  readonly label: string;
  readonly level: number;
  readonly status?: PathNodeStatus;
  readonly description?: string;
  readonly onSelect?: () => void;
  readonly className?: string;
  readonly icon?: React.ReactNode;
  readonly kind?: PathLessonKind;
  readonly jumpAvailable?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children' | 'className'>;

const lockedClasses = 'bg-[#2c3b45] text-[#8ca0ad] border border-[#1a2a33] cursor-not-allowed';
const availableLessonClasses = 'bg-[#22313a] text-[#eaf2f5] border border-[#334651] hover:bg-[#2c3b45]';
const completedClasses = 'bg-[#1cb0f6] text-[#0f1a20] border border-transparent shadow-[0_12px_24px_rgba(28,176,246,0.35)]';

export default function PathNodeButton({
  label,
  level,
  status = 'available',
  description,
  onSelect,
  className,
  icon,
  kind,
  disabled,
  onClick,
  ...rest
}: PathNodeButtonProps) {
  const isLocked = status === 'locked';
  const isDisabled = disabled ?? false;
  const isInteractable = !isLocked && !isDisabled;
  const isCompleted = status === 'completed';

  const computedIcon = icon
    ?? (kind === 'checkpoint'
      ? '🗝️'
      : kind === 'badge'
        ? '🏆'
        : kind === 'lesson'
          ? '⭐'
          : '⭐');

  let appearanceClass = availableLessonClasses;
  if (kind === 'start') {
    appearanceClass
      = 'bg-[#7fe318] text-[#0f1a20] border border-transparent shadow-[0_12px_24px_rgba(127,227,24,0.35)] animate-[pulse_1100ms_ease-in-out_infinite] hover:bg-[#9bf244]';
  } else if (kind === 'checkpoint') {
    appearanceClass = 'bg-[#2c3b45] text-[#b8c7cf] border border-[#1a2a33]';
  } else if (kind === 'badge') {
    appearanceClass = 'bg-[#2c3b45] text-[#cfaaff] border border-[#1a2a33]';
  }

  if (isLocked) {
    appearanceClass = lockedClasses;
  }

  if (isCompleted && kind !== 'checkpoint') {
    appearanceClass = completedClasses;
  }

  return (
    <button
      type="button"
      aria-disabled={isInteractable ? undefined : true}
      className={[
        'relative inline-flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full text-center text-sm font-semibold transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a9e34b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a20]',
        appearanceClass,
        isInteractable ? '' : 'opacity-60',
        className,
      ].filter(Boolean).join(' ')}
      disabled={!isInteractable}
      onClick={(event) => {
        if (isInteractable) {
          onSelect?.();
          onClick?.(event);
        }
      }}
      {...rest}
    >
      {kind === 'start'
        ? (
          <span className="absolute -top-[54px] inline-flex items-center gap-2 rounded-[10px] bg-[#1d2a33] px-4 py-2 text-xs font-extrabold tracking-[0.32em] text-[#9bf244] uppercase shadow-[0_2px_0_rgba(0,0,0,0.35)]">
            <span aria-hidden>START</span>
          </span>
        )
        : null}
      <span className="text-[11px] tracking-[0.2em] text-[#0f1a20]/70 uppercase">
        Lv
        {level}
      </span>
      <span className="text-2xl" aria-hidden>{computedIcon}</span>
      <span className="mt-1 text-base leading-tight font-black">{label}</span>
      {description ? <span className="mt-1 text-[11px] font-semibold text-[#0f1a20]/70">{description}</span> : null}
      {kind === 'start'
        ? <span className="pointer-events-none absolute inset-0 rounded-full border-[8px] border-[#334651]" aria-hidden />
        : <span className="pointer-events-none absolute inset-0 rounded-full border border-[#1e2c35]/50" aria-hidden />}
    </button>
  );
}
