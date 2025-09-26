import * as React from 'react';

export default function ExerciseViewport({ children }: { children: React.ReactNode }) {
  return <div className="min-h-64 rounded-[--radius-lg] border border-[--border] p-4">{children}</div>;
}
