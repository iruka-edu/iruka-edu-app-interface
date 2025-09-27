// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import type { PathLessonKind } from '@/features/path/types';
import * as React from 'react';

export type PathNodeStatus = 'locked' | 'available' | 'completed';

export type PathNodeButtonProps = {
  readonly label: string; // Với START: thường không render dưới icon
  readonly level: number; // Ẩn với START theo UI gốc
  readonly status?: PathNodeStatus;
  readonly description?: string;
  readonly onSelect?: () => void;
  readonly className?: string;
  readonly icon?: React.ReactNode;
  readonly kind?: PathLessonKind; // 'start' | 'lesson' | 'checkpoint' | 'badge'
  readonly jumpAvailable?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// styles nền cho các trạng thái khác (không phải START)
const lockedClasses = 'bg-[#2c3b45] text-[#8ca0ad] border border-[#1a2a33] cursor-not-allowed';
const availableLessonClasses = 'bg-[#22313a] text-[#eaf2f5] border border-[#334651] hover:bg-[#2c3b45]';
const completedClasses = 'bg-[#1cb0f6] text-[#0f1a20] border border-transparent shadow-[0_12px_24px_rgba(28,176,246,0.35)]';

function StarSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M12 2.5l2.77 5.61 6.19.9-4.48 4.37 1.06 6.17L12 16.97 6.46 19.5l1.06-6.17L3.04 9.01l6.19-.9L12 2.5z"
      />
    </svg>
  );
}

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
  const isCompleted = status === 'completed';
  const isDisabled = disabled ?? false;
  const isInteractable = !isLocked && !isDisabled;

  const isStart = kind === 'start';

  // icon mặc định cho các loại node (giữ dạng 1 dòng để không bị multi-line ternary)
  const computedIcon = icon ?? (kind === 'checkpoint' ? '🗝️' : (kind === 'badge' ? '🏆' : '⭐'));

  // --- START styles: lõi xanh + hai vòng ---
  const startCore
    = 'bg-[radial-gradient(ellipse_at_center,_#7fe318_0%,_#58cc02_70%,_#49b000_100%)] text-white border-0 '
      + 'shadow-[0_0_0_8px_rgba(127,227,24,0.35)]'; // glow nhẹ

  let appearanceClass = availableLessonClasses;
  if (isStart) {
    appearanceClass = startCore;
  } else if (kind === 'checkpoint') {
    appearanceClass = 'bg-[#2c3b45] text-[#b8c7cf] border border-[#1a2a33]';
  } else if (kind === 'badge') {
    appearanceClass = 'bg-[#2c3b45] text-[#cfaaff] border border-[#1a2a33]';
  }
  if (isLocked) {
    appearanceClass = lockedClasses;
  }
  if (isCompleted && kind !== 'checkpoint' && !isStart) {
    appearanceClass = completedClasses;
  }

  // Precompute pieces to avoid JSX multiline ternaries
  const centerIcon = isStart
    ? <StarSVG className="h-7 w-7 text-white" />
    : <span className="text-2xl" aria-hidden>{computedIcon}</span>;

  const rings = isStart
    ? (
      <>
        <span className="pointer-events-none absolute inset-[-8px] rounded-full border-[8px] border-[#1e2c35]" aria-hidden />
        <span className="pointer-events-none absolute inset-[-18px] rounded-full border-[8px] border-[#334651] opacity-90" aria-hidden />
      </>
    )
    : (
      <span className="pointer-events-none absolute inset-0 rounded-full border border-[#1e2c35]/50" aria-hidden />
    );

  return (
    <button
      type="button"
      aria-label={isStart ? 'Start lesson' : label}
      aria-disabled={isInteractable ? undefined : true}
      className={[
        // Kích thước lõi nút ~88px (như ảnh)
        'relative inline-flex h-[88px] w-[88px] select-none items-center justify-center rounded-full',
        'text-center text-sm font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a9e34b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a20]',
        // hover/active chung
        isInteractable ? 'hover:brightness-[1.02] active:translate-y-[1px] active:scale-[0.98]' : 'opacity-60',
        appearanceClass,
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
      {/* Chip START dạng speech-bubble */}
      {isStart && (
        <span
          className={[
            'absolute -top-[54px] inline-flex items-center rounded-[10px] bg-[#1d2a33] px-4 py-[6px]',
            'text-xs font-extrabold uppercase tracking-[0.32em] text-[#9bf244]',
            'shadow-[0_2px_0_rgba(0,0,0,0.35)]',
            'after:absolute after:left-1/2 after:top-full after:-translate-x-1/2',
            // caret tam giác nhỏ
            'after:border-x-[6px] after:border-t-[8px] after:border-x-transparent after:border-t-[#1d2a33]',
          ].join(' ')}
          aria-hidden
        >
          START
        </span>
      )}

      {/* Icon giữa */}
      {centerIcon}

      {/* Hai RING đồng tâm bao ngoài lõi */}
      {rings}

      {/* Ẩn level/label/description đối với START để giống UI gốc */}
      {!isStart && (
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] leading-tight font-black whitespace-nowrap text-[#eaf2f5]/90">
          {label}
        </span>
      )}

      {!isStart && (
        <span className="sr-only">
          Level
          {' '}
          {level}
          .
          {' '}
          {description ?? ''}
        </span>
      )}
    </button>
  );
}
