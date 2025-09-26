'use client';

import Button from '@atoms/Button';
import dynamic from 'next/dynamic';
import * as React from 'react';

export type ExerciseType = 'TypeAnswer' | 'SelectChoice' | 'MatchPairs' | 'ListenSpeak';

export type Exercise = {
  id: string;
  type: ExerciseType;
  prompt: string;
  choices?: string[];
  answer?: string;
};

const ListenSpeak = dynamic(() => import('../heavy/ListenSpeak'), { ssr: false, loading: () => <div>Loading audio…</div> });

export default function ExerciseRenderer({ exercise, onSubmit }: { exercise: Exercise; onSubmit: (correct: boolean) => void }) {
  if (exercise.type === 'TypeAnswer') {
    return <TypeAnswer exercise={exercise} onSubmit={onSubmit} />;
  }
  if (exercise.type === 'SelectChoice') {
    return <SelectChoice exercise={exercise} onSubmit={onSubmit} />;
  }
  if (exercise.type === 'MatchPairs') {
    return <div>MatchPairs (coming soon)</div>;
  }
  return <ListenSpeak exercise={exercise} onSubmit={onSubmit} />;
}

function TypeAnswer({ exercise, onSubmit }: { exercise: Exercise; onSubmit: (correct: boolean) => void }) {
  const [value, setValue] = React.useState('');
  return (
    <div className="grid gap-3">
      <p className="text-lg">{exercise.prompt}</p>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        className="rounded-[--radius-sm] border border-[--border] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-[--ring]"
      />
      <Button onClick={() => onSubmit(value.trim().toLowerCase() === (exercise.answer ?? '').toLowerCase())}>Check</Button>
    </div>
  );
}

function SelectChoice({ exercise, onSubmit }: { exercise: Exercise; onSubmit: (correct: boolean) => void }) {
  return (
    <div className="grid gap-3">
      <p className="text-lg">{exercise.prompt}</p>
      <div className="grid grid-cols-2 gap-2">
        {exercise.choices?.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => onSubmit(c === exercise.answer)}
            className="rounded-[--radius-sm] border border-[--border] px-3 py-2 hover:bg-white/5"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
