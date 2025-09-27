import * as React from 'react';

export default function ListenSpeak({ exercise, onSubmit }: { exercise: { prompt: string; answer?: string }; onSubmit: (correct: boolean) => void }) {
  return (
    <div className="grid gap-3">
      <p className="text-lg">{exercise.prompt}</p>
      <button type="button" className="rounded-[--radius-sm] border border-[--border] px-3 py-2" onClick={() => onSubmit(true)}>
        Simulate Listening Complete
      </button>
    </div>
  );
}
