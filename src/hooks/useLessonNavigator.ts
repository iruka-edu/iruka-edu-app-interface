// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

export type UseLessonNavigatorResult = {
  readonly navigateToLesson: (lessonId: string) => void;
};

export function useLessonNavigator(): UseLessonNavigatorResult {
  const router = useRouter();

  const navigateToLesson = React.useCallback((lessonId: string) => {
    if (!lessonId) {
      return;
    }
    router.push(`/learn/lesson/${lessonId}`);
  }, [router]);

  return { navigateToLesson };
}
