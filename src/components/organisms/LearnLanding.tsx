// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import type { PathProgressSection } from '@organisms/PathProgressMap';
import type { PathData, PathLessonKind } from '@/features/path/types';
import PathProgressMap from '@organisms/PathProgressMap';
import * as React from 'react';
import { useLessonNavigator } from '@/hooks/useLessonNavigator';
import LessonToast from '../LessonToast';
import PathMascot from '../molecules/PathMascot';
import ScrollButton from '../ScrollButton';

type LessonNodeMeta = {
  readonly locked: boolean;
  readonly progress?: number;
  readonly unitTitle?: string;
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
      const curveUpwards = unitIndex % 2 !== 0; // Every other unit curves upwards
      return {
        level,
        title: `Level ${level}`,
        description: `${unit.title} • ${totalLessons} lesson${totalLessons === 1 ? '' : 's'}`,
        curveUpwards,
        nodes: unit.lessons.map((lesson, lessonIndex) => {
          const status: LessonNode['status'] = lesson.locked
            ? 'locked'
            : lesson.progress === 100
              ? 'completed'
              : 'available';

          return {
            id: lesson.id,
            label: lesson.title,
            level,
            status,
            description:
              !lesson.locked && typeof lesson.progress === 'number' ? `${lesson.progress}% complete` : undefined,
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

  return (
    <div className="h-full">
      <LessonToast className="sticky top-6 right-0 left-0 z-[50]" title="Phần 1" description="Cửa 1" />
      <PathProgressMap
        sections={sections}
        // renderNode={node => renderLessonNode(node as LessonNode)}
        onJumpToLesson={lessonId => navigateToLesson(lessonId)}
      />
      <PathMascot className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="sticky right-0 bottom-4 left-0 z-[50] flex w-full justify-end">
        <ScrollButton />
      </div>
    </div>
  );
}
