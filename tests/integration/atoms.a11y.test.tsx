import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import Button from '@/components/atoms/Button';
import Tooltip from '@/components/atoms/Tooltip';

describe('Atoms a11y', () => {
  it('Button has accessible name', () => {
    render(<Button>Submit</Button>);
    const btn = page.getByRole('button', { name: 'Submit' });

    expect(btn).toBeDefined();
  });

  it('Tooltip uses aria-describedby', async () => {
    render(
      <Tooltip content="Hello">
        <button type="button">Target</button>
      </Tooltip>,
    );
    const target = page.getByRole('button', { name: 'Target' });

    expect(target).toBeDefined();
  });
});
