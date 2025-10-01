# Design System

- Tokens live in `src/styles/theme.css` and `src/design-system/tokens.ts`.
- Use Tailwind utilities with CSS variables, e.g. `bg-[--color-primary]`.
- Respect `prefers-reduced-motion` for celebratory effects.
- Atoms must not include margins/positioning; spacing belongs to parents.

## Typography

Use Tailwind sizes or CSS vars: `text-[--text-sm]`, `text-[--text-xl]`.

## Feedback States

- Correct: `bg-[--color-correct]`
- Incorrect: `bg-[--color-incorrect]`
