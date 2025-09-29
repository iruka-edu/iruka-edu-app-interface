'use client';

import Celebration from '@atoms/Celebration';
import LessonFrame from '@organisms/LessonFrame';
import MathQuestionScreen from '@organisms/MathQuestionScreen';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { capture } from '@/libs/Analytics';
import { useSessionStore } from '@/state/stores/session';

export type Exercise = {
  id: string;
  type: 'TypeAnswer' | 'SelectChoice' | 'MatchPairs' | 'ListenSpeak';
  prompt: string;
  choices?: string[];
  answer?: string;
};

export default function LessonClient({ id, exercises }: { id: string; exercises: Exercise[] }) {
  const [index, setIndex] = React.useState(0);
  const { incrementXp, incrementStreak, decrementEnergy } = useSessionStore();
  const searchParams = useSearchParams();
  const kindParam = searchParams.get('kind');

  React.useEffect(() => {
    capture({ name: 'lesson_start', props: { lessonId: id } });
  }, [id]);

  // const exercise = exercises[index];
  const onSubmit = (correct: boolean) => {
    if (correct) {
      incrementXp(10);
    } else {
      decrementEnergy(1);
    }
    const next = index + 1;
    if (next >= exercises.length) {
      incrementStreak(1);
    }
    setIndex(next);
  };

  const finished = index >= exercises.length;
  return (
    <LessonFrame title={`Lesson ${id}`}>
      {finished
        ? (
          <Celebration />
        )
        : (
          <div className="grid gap-6">
            {(!kindParam || kindParam === 'tap_count') && (
              <MathQuestionScreen
                progress={Math.min(1, index / Math.max(1, exercises.length))}
                title="How many apples?"
                kind="tap_count"
                grid={{ items: [{ id: 'g1', icon: 'apple', count: 4 }] }}
                choices={[3, 4, 5]}
                answer={4}
                onCheck={correct => onSubmit(correct)}
              />
            )}

            {kindParam === 'number_line_pick' && (
              <MathQuestionScreen
                progress={Math.min(1, index / Math.max(1, exercises.length))}
                title="Tap the number six on the line."
                kind="number_line_pick"
                numberLine={{ min: 0, max: 10 }}
                answer={6}
                onCheck={correct => onSubmit(correct)}
              />
            )}

            {kindParam === 'drag_to_bucket' && (
              <MathQuestionScreen
                progress={Math.min(1, index / Math.max(1, exercises.length))}
                title="Drag all groups with four dots into the box with number four."
                kind="drag_to_bucket"
                buckets={{
                  items: [
                    { id: 'g1', label: '•••' },
                    { id: 'g2', label: '••••' },
                    { id: 'g3', label: '•••••' },
                  ],
                  buckets: [{ id: 'n4', label: '4' }],
                }}
                onCheck={correct => onSubmit(correct)}
              />
            )}

            {kindParam === 'tracing' && (
              <MathQuestionScreen
                progress={Math.min(1, index / Math.max(1, exercises.length))}
                title="Trace the number five."
                kind="tracing"
                tracing={{ glyph: '5', thresholdPct: 0.7 }}
                onCheck={correct => onSubmit(correct)}
              />
            )}
          </div>
        )}
    </LessonFrame>
  );
}
