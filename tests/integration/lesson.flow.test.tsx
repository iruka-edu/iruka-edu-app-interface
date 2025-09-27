import type { Exercise } from '@/components/organisms/ExerciseRenderer';
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import ExerciseRenderer from '@/components/organisms/ExerciseRenderer';

describe('Lesson flow', () => {
  it('TypeAnswer marks correct', async () => {
    const exercise: Exercise = { id: 'e', type: 'TypeAnswer', prompt: 'Hi', answer: 'a' };
    let result: boolean | null = null;
    render(<ExerciseRenderer exercise={exercise} onSubmit={ok => (result = ok)} />);
    const input = page.getByRole('textbox');
    await input.type('a');
    const btn = page.getByRole('button', { name: 'Check' });
    await btn.click();

    expect(result).toBe(true);
  });
});
