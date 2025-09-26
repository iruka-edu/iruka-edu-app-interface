// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import type { PathProgressSection } from '@organisms/PathProgressMap';
import type { PathData, PathLessonKind } from '@/features/path/types';
import PathNodeButton from '@atoms/PathNodeButton';
import PathMascot from '@molecules/PathMascot';
import LearnTooltip from '@organisms/LearnTooltip';
import PathProgressMap from '@organisms/PathProgressMap';
import * as React from 'react';
import { useLessonNavigator } from '@/hooks/useLessonNavigator';

type LessonNodeMeta = {
  readonly locked: boolean;
  readonly progress?: number;
  readonly unitTitle: string;
  readonly order: number;
  readonly kind?: PathLessonKind;
  readonly icon?: string;
  readonly jumpAvailable?: boolean;
};

type LessonNode = PathProgressSection['nodes'][number] & LessonNodeMeta;

export type LearnLandingProps = {
  readonly pathData: PathData;
};

export default function LearnLanding({ pathData }: LearnLandingProps) {
  const { navigateToLesson } = useLessonNavigator();

  const sections = React.useMemo<PathProgressSection[]>(() => {
    return pathData.units.map((unit, unitIndex) => {
      const level = unitIndex + 1;
      const totalLessons = unit.lessons.length;

      return {
        level,
        title: `Level ${level}`,
        description: `${unit.title} • ${totalLessons} lesson${totalLessons === 1 ? '' : 's'}`,
        nodes: unit.lessons.map((lesson, lessonIndex) => {
          const status: LessonNode['status']
            = lesson.locked ? 'locked' : lesson.progress === 100 ? 'completed' : 'available';

          return {
            id: lesson.id,
            label: lesson.title,
            level,
            status,
            description: !lesson.locked && typeof lesson.progress === 'number'
              ? `${lesson.progress}% complete`
              : undefined,
            locked: Boolean(lesson.locked),
            progress: lesson.progress,
            unitTitle: unit.title,
            order: lessonIndex + 1,
            kind: lesson.kind ?? (lessonIndex === 0 ? 'start' : 'lesson'),
            icon: lesson.icon,
            jumpAvailable: lesson.jumpAvailable,
          } satisfies LessonNode;
        }),
      } as PathProgressSection;
    });
  }, [pathData.units]);

  const renderLessonNode = React.useCallback((node: LessonNode) => {
    const lockedMessage = 'Complete the previous lesson to unlock this activity.';
    const progressLabel = typeof node.progress === 'number' ? `${node.progress}% complete` : undefined;
    const primaryLabel = node.status === 'completed' ? 'Review lesson' : 'Start lesson';

    return (
      <LearnTooltip
        id={node.id}
        hoverMode="toggle"
        tooltipContent={{
          title: node.label,
          description: node.locked ? lockedMessage : `Unit ${node.level} • Lesson ${node.order}`,
          children: (
            <div className="space-y-2">
              <p className="text-sm text-[#b8c7cf]">
                {node.locked ? 'Unlock this lesson by progressing through the path.' : 'Get ready to practice and introduce yourself with new phrases!'}
              </p>
              {progressLabel
                ? (
                    <p className="text-xs font-semibold text-[#7f95a1]">
                      Progress:
                      {progressLabel}
                    </p>
                  )
                : null}
            </div>
          ),
          primaryAction: node.locked
            ? undefined
            : {
                id: 'primary-start',
                label: primaryLabel,
                onClick: () => navigateToLesson(node.id),
              },
          secondaryAction: undefined,
        }}
        children={() => (
          <PathNodeButton
            label={node.label}
            level={node.level}
            status={node.status}
            description={progressLabel}
            aria-label={`${node.label} lesson, level ${node.level}`}
            data-lesson-id={node.id}
            className="shadow-[0_18px_36px_rgba(0,0,0,0.35)]"
          />
        )}
      />
    );
  }, [navigateToLesson]);

  return (
    <div className="relative flex flex-col gap-10">
      <header className="flex flex-col gap-3 rounded-[24px] bg-[#58cc02] px-6 py-5 text-[#0f1a20] shadow-[0_12px_32px_rgba(88,204,2,0.35)]">
        <div className="flex items-center gap-2 text-xs font-extrabold tracking-[0.28em] uppercase opacity-70">
          <span>Section 1</span>
          <span aria-hidden>•</span>
          <span>Unit 1</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">Introduce yourself</h1>
        <p className="max-w-2xl text-sm font-semibold opacity-80">
          Follow the path to complete each lesson. Hover nodes for tips, tap start when you are ready.
        </p>
      </header>

      <div className="relative max-h-[calc(100dvh-18rem)] overflow-y-auto rounded-[24px] bg-[#0f1a20] px-4 py-8 shadow-[inset_0_0_0_1px_rgba(36,51,61,0.6)]">
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen" style={{ background: 'radial-gradient(circle at top, rgba(88,204,2,0.25), transparent 55%)' }} />
        <div className="relative">
          <PathProgressMap
            sections={sections}
            renderNode={node => renderLessonNode(node as LessonNode)}
            onJumpToLesson={lessonId => navigateToLesson(lessonId)}
          />
          <PathMascot />
        </div>
        <div className="sticky bottom-6 flex justify-end pr-6">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#12222b] text-2xl text-[#46d5ff] shadow-[0_10px_0_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#a9e34b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a20] focus-visible:outline-none"
            aria-label="Back to top"
          >
            ⬆️
          </button>
        </div>
      </div>
    </div>
  );
}
