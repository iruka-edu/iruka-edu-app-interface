'use client';

import type { PathLessonKind } from '@/features/path/types';
import { Key, Medal, Star } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/utils/cn';

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
  readonly unitTitle?: string;
  readonly locked?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// styles nền cho các trạng thái khác (không phải START)
const lockedClasses = 'bg-[#2c3b45] text-[#8ca0ad] border border-[#1a2a33] cursor-not-allowed';
const availableLessonClasses = 'bg-[#22313a] text-[#eaf2f5] border border-[#334651] hover:bg-[#2c3b45]';
const completedClasses
  = 'bg-[#1cb0f6] text-[#0f1a20] border border-transparent shadow-[0_12px_24px_rgba(28,176,246,0.35)]';
const iconClasses = 'aspect-square size-9';
const iconClassesVariant = {
  yellow: `${iconClasses} text-yellow-500`,
  gray: `${iconClasses} text-gray-500`,
  white: `${iconClasses} text-white`,
};

const StartChip = () => {
  return (
    <span
      className={cn(
        'absolute top-1/2 -translate-y-[64px] inline-flex items-center rounded-lg bg-[#1d2a33] px-4 pt-[6px] pb-[10px] border border-gray-500',
        'text-xs font-extrabold uppercase  text-[#58cc02] z-[10]',
        'after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:z-[10]',
        // caret tam giác nhỏ
        'after:border-x-[6px] after:border-t-[8px] after:border-x-transparent after:border-t-[#1d2a33]',
      )}
      aria-hidden
    >
      START
    </span>
  );
};

const Ring = ({ children, disabled }: { children: React.ReactNode; disabled: boolean }) => {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div className={cn('relative flex items-center justify-center rounded-full p-1 ring-6 ring-[#1e2c35]')} aria-hidden>
      <StartChip />
      {children}
    </div>
  );
};

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
  // Prevent leaking custom props to DOM
  unitTitle: _unitTitle,
  locked: _locked,
  jumpAvailable: _jumpAvailable,
  ...rest
}: PathNodeButtonProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isDisabled = disabled ?? false;
  const isInteractable = !isLocked && !isDisabled;

  const isStart = kind === 'start';

  // icon mặc định cho các loại node (giữ dạng 1 dòng để không bị multi-line ternary)
  const computedIcon
    = icon
      ?? (kind === 'checkpoint'
        ? (
          <Key className={iconClassesVariant.gray} />
        )
        : kind === 'badge'
          ? (
            <Medal className={iconClassesVariant.gray} />
          )
          : (
            <Star className={iconClassesVariant.gray} />
          ));

  let appearanceClass = availableLessonClasses;
  if (isStart) {
    appearanceClass = 'bg-[#58cc02] text-white border-0';
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
    ? (
      <Star className={iconClassesVariant.white} />
    )
    : (
      <span className="text-2xl" aria-hidden>
        {computedIcon}
      </span>
    );

  return (
    <Ring disabled={!isStart}>
      <button
        type="button"
        aria-label={isStart ? 'Start lesson' : label}
        aria-disabled={isInteractable ? undefined : true}
        className={cn(
          // Kích thước lõi nút ~88px (như ảnh)
          'inline-flex size-[57px] aspect-square select-none items-center justify-center rounded-full',
          'text-center text-sm font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a9e34b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a20]',
          // hover/active chung
          isInteractable ? 'hover:brightness-[1.02] active:translate-y-[1px] active:scale-[0.98]' : 'opacity-60',
          appearanceClass,
          className,
        )}
        disabled={!isInteractable}
        onClick={(event) => {
          if (isInteractable) {
            onSelect?.();
            onClick?.(event);
          }
        }}
        {...rest}
      >
        {/* Icon giữa */}
        {centerIcon}
      </button>
    </Ring>
  );
}
