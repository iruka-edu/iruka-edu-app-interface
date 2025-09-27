import * as React from 'react';
import ExerciseViewport from './ExerciseViewport';
import LessonFooter from './LessonFooter';
import LessonHeader from './LessonHeader';

export default function LessonFrame(props: { title?: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">{props.title ?? 'Lesson'}</h1>
      <LessonHeader />
      <ExerciseViewport>{props.children}</ExerciseViewport>
      {props.footer ?? <LessonFooter />}
    </div>
  );
}
