'use client';

import Button from '@atoms/Button';
import { Diamond, Flame, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export type RightRailSection = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly action?: {
    readonly label: string;
    readonly onClick: () => void;
  };
  readonly content: React.ReactNode;
};

export type RightRailProps = {
  readonly sections: RightRailSection[];
};

export default function RightRail({ sections }: RightRailProps) {
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-between rounded-lg bg-[#2a3f4a] px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded bg-[#1e3a8a] px-2 py-1 text-xs font-medium text-white">
            <Star className="h-3 w-3" />
            US
          </div>
          <div className="flex items-center gap-1 text-sm text-[#7f95a1]">
            <Flame className="h-4 w-4" />
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-medium text-[#1cb0f6]">
            <Diamond className="h-4 w-4" />
            <span>500</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-[#ff4b4b]">
            <Heart className="h-4 w-4" />
            <span>5</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map(section => (
          <section
            key={section.id}
            className="rounded-[18px] border border-[#24333d] bg-[#16232b] p-5 text-[#eaf2f5] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          >
            <header className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-[#eaf2f5]">{section.title}</h3>
                {section.description
                  ? <p className="mt-1 text-xs font-medium text-[#7f95a1]">{section.description}</p>
                  : null}
              </div>
              {section.action
                ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={section.action.onClick}
                    className="rounded-full border border-[#24333d] bg-[#0f1a20]/60 px-3 text-xs font-semibold tracking-wide text-[#1cb0f6] uppercase hover:bg-[#1a2a33]"
                  >
                    {section.action.label}
                  </Button>
                )
                : null}
            </header>
            <div className="text-sm text-[#b8c7cf]">{section.content}</div>
          </section>
        ))}
      </div>

      <div className="mt-auto space-y-3 border-t border-[#24333d] pt-4">
        <div className="grid grid-cols-3 gap-2 text-xs font-medium tracking-wide text-[#7f95a1] uppercase">
          <Link href="/about" className="transition-colors hover:text-[#1cb0f6]">Giới thiệu</Link>
          <Link href="/store" className="transition-colors hover:text-[#1cb0f6]">Cửa hàng</Link>
          <Link href="/efficiency" className="transition-colors hover:text-[#1cb0f6]">Tính hiệu quả</Link>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs font-medium tracking-wide text-[#7f95a1] uppercase">
          <Link href="/careers" className="transition-colors hover:text-[#1cb0f6]">Công việc</Link>
          <Link href="/investors" className="transition-colors hover:text-[#1cb0f6]">Nhà đầu tư</Link>
          <Link href="/terms" className="transition-colors hover:text-[#1cb0f6]">Điều khoản</Link>
        </div>
        <div className="flex justify-center">
          <Link href="/privacy" className="text-xs font-medium tracking-wide text-[#7f95a1] uppercase transition-colors hover:text-[#1cb0f6]">
            Quyền riêng tư
          </Link>
        </div>
      </div>
    </div>
  );
}
