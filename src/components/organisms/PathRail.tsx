'use client';

import type { PathData } from '@/features/path/types';
import Badge from '@atoms/Badge';
import Link from 'next/link';
import * as React from 'react';

export default function PathRail({ data, onSelect }: { data: PathData; onSelect?: (lessonId: string) => void }) {
  return (
    <div className="flex snap-x gap-4 overflow-x-auto py-2">
      {data.units.map((u) => (
        <div key={u.id} className="min-w-64 snap-center rounded-[--radius-md] border border-[--border] p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{u.title}</h3>
            <Badge variant="outline">{u.lessons.length} lessons</Badge>
          </div>
          <ul className="grid gap-2">
            {u.lessons.map((l) => (
              <li key={l.id}>
                <Link
                  className="block w-full rounded-[--radius-sm] border border-[--border] px-3 py-2 hover:bg-white/5 aria-disabled:opacity-50"
                  aria-disabled={l.locked}
                  href={l.locked ? '#' : `/learn/lesson/${l.id}`}
                  onClick={(e) => {
                    if (l.locked) {
                      e.preventDefault();
                    }
                    onSelect?.(l.id);
                  }}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>{l.title}</span>
                    {l.progress != null ? <span className="text-xs text-[--muted]">{l.progress}%</span> : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
