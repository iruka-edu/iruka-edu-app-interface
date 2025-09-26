'use client';

import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import { useTriPaneContext } from '@templates/TriPaneTemplate';
import Link from 'next/link';
import * as React from 'react';

export type LeftRailNavItem = {
  readonly id: string;
  readonly label: string;
  readonly icon?: React.ReactNode;
  readonly href?: string;
  readonly active?: boolean;
  readonly badge?: number;
  readonly onSelect?: () => void;
};

export type LeftRailProps = {
  readonly items: LeftRailNavItem[];
  readonly footer?: React.ReactNode;
};

export default function LeftRail({ items, footer }: LeftRailProps) {
  const { collapsible, toggleLeft } = useLeftRailControls();

  return (
    <div className="flex h-full flex-col gap-8 rounded-[18px] bg-[#16232b] px-5 py-6 text-[#eaf2f5] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-[#58cc02]">iruka</span>
          <span className="rounded-full bg-[#1cb0f6]/10 px-2 py-1 text-[11px] font-semibold uppercase text-[#1cb0f6]">edu</span>
        </div>
        {collapsible
          ? (
            <Button
              size="sm"
              variant="ghost"
              aria-label="Collapse navigation"
              onClick={toggleLeft}
              className="h-9 w-9 rounded-full border border-[#24333d] bg-[#0f1a20]/70 text-[#b8c7cf] transition hover:bg-[#1a2a33] hover:text-[#eaf2f5]"
            >
              <Icon name="x" />
            </Button>
          )
          : null}
      </div>

      <nav className="flex-1 overflow-y-auto" aria-label="Primary navigation">
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id}>
              <NavButton item={item} />
            </li>
          ))}
        </ul>
      </nav>

      {footer
        ? (
          <div className="border-t border-[#24333d] pt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7f95a1]">
            {footer}
          </div>
        )
        : null}
    </div>
  );
}

function NavButton({ item }: { item: LeftRailNavItem }) {
  const className = [
    'group relative flex h-14 items-center gap-3 rounded-[18px] px-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a9e34b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a20]',
    item.active ? 'bg-[#0b1419] text-[#eaf2f5]' : 'text-[#7f95a1] hover:bg-[#1a2a33] hover:text-[#eaf2f5]',
  ].join(' ');

  const content = (
    <>
      {item.active ? <span aria-hidden className="absolute left-3 h-9 w-1 rounded-full bg-[#58cc02]" /> : null}
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0b1419] text-lg shadow-[0_4px_10px_rgba(0,0,0,0.35)]">
        {item.icon ?? <Icon name="star" />}
      </span>
      <span className="truncate">{item.label}</span>
      {typeof item.badge === 'number'
        ? (
          <span className="ml-auto rounded-full bg-[#ff7bac] px-2 py-0.5 text-[11px] font-bold text-[#0f1a20]">
            {item.badge}
          </span>
        )
        : null}
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={className}
        onClick={item.onSelect}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={item.onSelect}
    >
      {content}
    </button>
  );
}

function useLeftRailControls() {
  const { collapsible, toggleLeft } = useTriPaneContext();
  return {
    collapsible,
    toggleLeft,
  } as const;
}
