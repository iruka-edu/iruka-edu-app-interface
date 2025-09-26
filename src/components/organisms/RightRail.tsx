'use client';

import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import { useTriPaneContext } from '@templates/TriPaneTemplate';
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
  const { collapsible, toggleRight } = useRightRailControls();

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b8c7cf]">Insights</h2>
        {collapsible
          ? (
            <Button
              size="sm"
              variant="ghost"
              aria-label="Collapse insights panel"
              onClick={toggleRight}
              className="h-9 w-9 rounded-full border border-[#24333d] bg-[#0f1a20]/70 text-[#b8c7cf] hover:bg-[#1a2a33]"
            >
              <Icon name="x" />
            </Button>
          )
          : null}
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
                    className="rounded-full border border-[#24333d] bg-[#0f1a20]/60 px-3 text-xs font-semibold uppercase tracking-wide text-[#1cb0f6] hover:bg-[#1a2a33]"
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
    </div>
  );
}

function useRightRailControls() {
  const { collapsible, toggleRight } = useTriPaneContext();
  return {
    collapsible,
    toggleRight,
  } as const;
}
