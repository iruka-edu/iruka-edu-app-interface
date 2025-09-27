// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import type { PathNodeButtonProps } from '@atoms/PathNodeButton';
import PathNodeButton from '@atoms/PathNodeButton';
import * as React from 'react';

export type PathNodeDescriptor = PathNodeButtonProps & { readonly id: string };

export type PathNodeColumnProps = {
  readonly title: string;
  readonly description?: string;
  readonly nodes: PathNodeDescriptor[];
  readonly renderNode?: (node: PathNodeDescriptor) => React.ReactNode;
};

export default function PathNodeColumn({ title, description, nodes, renderNode }: PathNodeColumnProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <header className="text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#7f95a1] uppercase">{title}</p>
        {description ? <p className="mt-2 max-w-[12rem] text-sm font-medium text-[#b8c7cf]">{description}</p> : null}
      </header>
      <ol className="flex flex-col items-center gap-8" aria-label={`${title} lessons`}>
        {nodes.map(node => (
          <li key={node.id} className="flex flex-col items-center gap-2">
            {renderNode ? renderNode(node) : <PathNodeButton {...node} />}
          </li>
        ))}
      </ol>
    </div>
  );
}
