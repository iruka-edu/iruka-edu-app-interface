// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import type { PathNodeColumnProps, PathNodeDescriptor } from '@molecules/PathNodeColumn';
import PathNodeButton from '@atoms/PathNodeButton';
import JumpCTA from '@molecules/JumpCTA';
import PathNodeColumn from '@molecules/PathNodeColumn';
import * as React from 'react';

export type PathProgressSection = PathNodeColumnProps & { readonly level: number };

export type PathProgressMapProps = {
  readonly sections: PathProgressSection[];
  readonly onSelectLesson?: (id: string) => void;
  readonly renderNode?: (node: PathNodeDescriptor) => React.ReactNode;
  readonly onJumpToLesson?: (id: string) => void;
};

export default function PathProgressMap({ sections, onSelectLesson, renderNode, onJumpToLesson }: PathProgressMapProps) {
  return (
    <section className="relative flex flex-col items-stretch">
      <div className="flex flex-col items-center gap-2 py-4 text-center text-[#b8c7cf]">
        <h1 className="text-xl font-extrabold tracking-tight text-[#eaf2f5]">Your learning path</h1>
        <p className="text-sm font-medium opacity-80">Progress downward from Level 1 to unlock checkpoints and new skills.</p>
      </div>

      <div className="relative flex flex-col items-center gap-14 pb-16">
        <div className="pointer-events-none absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-[#1cb0f6]/10 via-[#22313a] to-[#58cc02]/10" aria-hidden />
        {sections
          .sort((a, b) => a.level - b.level)
          .map((section, index) => (
            <div key={section.level} className="relative flex flex-col items-center gap-6">
              <PathNodeColumn
                {...section}
                nodes={section.nodes}
                renderNode={(node) => {
                  const enhanced: PathNodeDescriptor = {
                    ...node,
                    onSelect: () => onSelectLesson?.(node.id),
                  };
                  return renderNode ? renderNode(enhanced) : <DefaultNode {...enhanced} />;
                }}
              />

              {section.nodes.some(node => (node as PathNodeDescriptor & { jumpAvailable?: boolean }).jumpAvailable)
                ? (
                  <div className="mt-4">
                    <JumpCTA
                      onClick={() => {
                        const target = section.nodes.find(node => (node as PathNodeDescriptor & { jumpAvailable?: boolean }).jumpAvailable);
                        if (target) {
                          onJumpToLesson?.(target.id);
                        }
                      }}
                    />
                  </div>
                )
                : null}

              <ProgressConnector level={section.level} hasNext={index < sections.length - 1} />
            </div>
          ))}
      </div>
    </section>
  );
}

function DefaultNode(props: PathNodeDescriptor) {
  return <PathNodeButton {...props} />;
}

function ProgressConnector({ level, hasNext }: { readonly level: number; readonly hasNext: boolean }) {
  if (!hasNext) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2" aria-hidden>
      <div className="h-20 w-px bg-gradient-to-b from-[#58cc02]/30 via-[#1cb0f6]/20 to-[#22313a]" />
      <span className="rounded-full bg-[#1a2a33] px-3 py-1 text-xs font-semibold tracking-wide text-[#7f95a1] uppercase">
        Next • Level
        {level + 1}
      </span>
    </div>
  );
}
