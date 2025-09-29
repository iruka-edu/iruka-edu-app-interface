// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import type { PathProgressSection } from '@organisms/PathProgressMap';
import type { PathData, PathLessonKind } from '@/features/path/types';
import PathNodeButton from '@atoms/PathNodeButton';
import LearnTooltip from '@organisms/LearnTooltip';
import PathProgressMap from '@organisms/PathProgressMap';
import * as React from 'react';
import { useLessonNavigator } from '@/hooks/useLessonNavigator';
import PathMascot from '../molecules/PathMascot';

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
                {node.locked
                  ? 'Unlock this lesson by progressing through the path.'
                  : 'Get ready to practice and introduce yourself with new phrases!'}
              </p>
              {progressLabel
                ? (
                  <p className="text-xs font-semibold text-[#7f95a1]">
                    Progress:
                    {' '}
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
      >
        {triggerProps => (
          <span {...triggerProps} className="inline-block">
            <PathNodeButton
              label={node.label}
              level={node.level}
              status={node.status}
              description={progressLabel}
              aria-label={`${node.label} lesson, level ${node.level}`}
              data-lesson-id={node.id}
              className="shadow-[0_18px_36px_rgba(0,0,0,0.35)]"
            />
          </span>
        )}
      </LearnTooltip>
    );
  }, [navigateToLesson]);

  return (
    <div className="relative h-full w-full">
      <PathProgressMap
        sections={sections}
        renderNode={node => renderLessonNode(node as LessonNode)}
        onJumpToLesson={lessonId => navigateToLesson(lessonId)}
      />
      <PathMascot />
    </div>
  );
}
