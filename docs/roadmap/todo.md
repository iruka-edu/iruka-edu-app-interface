# TODO

## Duolingo-style UI Architecture Roadmap

1) Define Product Pillars & UX Outcomes
- [ ] Write 1-pager on pillars (Path, Gamification, Brand)
- [ ] List success metrics (DAU lesson starts, path progress, retention)
- [ ] Approve celebratory UX guidelines (confetti, streak flame)

2) Bootstrap Next.js (App Router) Project
- [ ] Create Next.js app with TS + App Router
- [ ] Install Tailwind; add base config and `globals.css`
- [ ] Add import aliases: `@atoms`, `@molecules`, `@organisms`, `@templates`, `@/lib`
- [ ] Commit CI checks (typecheck, lint, test)

3) Establish Design Tokens & Theming
- [ ] Create `src/design-system/tokens.ts` and `theme.css` (CSS vars)
- [ ] Map brand colors + feedback states (correct/incorrect)
- [ ] Set typography scale; export Tailwind theme extensions
- [ ] Document usage in `README-design-system.md`

4) Scaffold Atomic Folders & App Shell
- [ ] Create `src/components/{atoms,molecules,organisms,templates}`
- [ ] Add `app/(shell)/layout.tsx` with header/footer placeholders
- [ ] Add `src/components/templates/AppShell.tsx` if needed
- [ ] Add lint rule/doc to forbid margins/positioning in atoms

5) Build Core Atoms
- [ ] Implement `Button`, `Icon`, `Badge`, `ProgressBar`, `Avatar`, `Tooltip`
- [ ] Add typed variants (e.g., `variant: 'primary'|'secondary'|'ghost'`)
- [ ] Add keyboard & ARIA defaults
- [ ] Write Storybook stories for each atom

6) Build Key Molecules
- [ ] Implement `Field` (label+input+helper+error)
- [ ] Implement `EnergyMeter` (value + regen label)
- [ ] Implement `XPChip` and `StreakFlame`
- [ ] Stories: default, error/empty, loading states

7) Build Core Organisms
- [ ] Implement `PathRail` (scrollable progress, locked/unlocked)
- [ ] Implement `LessonHeader` (Energy, Streak) and `LessonFooter` (CTA)
- [ ] Implement `ExerciseViewport` wrapper
- [ ] Stories with realistic data fixtures

8) Templates & Routing
- [ ] Implement `ShopTemplate`/`LearnTemplate`
- [ ] Wire `app/(learn)/path/page.tsx` to use template
- [ ] Wire `app/(learn)/lesson/[id]/page.tsx` for player route
- [ ] Keep templates free of data fetching

9) Learning Path Page (UI + Mock Data)
- [ ] Create `features/path` with mappers and mock data
- [ ] Render `PathRail` + `UnitOverview`
- [ ] Add locked/unlocked states and checkpoint markers
- [ ] Add empty/loading placeholders

10) Lesson Player & Exercise Renderer
- [ ] Implement `LessonFrame` organism using header/body/footer composition
- [ ] Add `ExerciseRenderer` for `TypeAnswer`, `SelectChoice`, `MatchPairs`, `ListenSpeak`
- [ ] Implement feedback states and retry flow
- [ ] Dynamic import heavy exercises (listen/speak)

11) State & Data Boundaries
- [ ] Add `state/stores` for session UI (Zustand/Redux)
- [ ] Add `state/query` (React Query) for progress/path/lesson
- [ ] Define selectors/hooks for header widgets
- [ ] Document “no fetching below Page” rule

12) Gamification Widgets Integration
- [ ] Mount `EnergyMeter`, `XPChip`, `StreakFlame` in header
- [ ] Create `QuestsDrawer`/`RewardsTray` side sheets
- [ ] Add optimistic XP/streak updates; reconcile on success
- [ ] Respect reduced-motion preference

13) Brand & Copy System
- [ ] Import brand assets; align tokens with brand guide
- [ ] Create `copy/strings.ts` with message keys
- [ ] Set up i18n scaffold and formatter helpers
- [ ] Review microcopy for brevity and encouragement

14) Accessibility & Quality Gates
- [ ] Add tests for atoms roles/labels/states
- [ ] Add tests for exercise flows
- [ ] Add axe checks in Storybook or tests
- [ ] Add PR checklist (a11y, stories, tests, tokens)

15) Performance & DX
- [ ] Route-level code splitting; dynamic imports per exercise
- [ ] Tailwind `@apply` for repeated patterns
- [ ] Analyze bundle with bundle analyzer
- [ ] Enforce import aliases via ESLint

16) Analytics & Experiments
- [ ] Add analytics events (lesson start/complete, XP, energy)
- [ ] Create `useExperiment(flag)` and gate UI variants
- [ ] Wire dashboards or logs for KPIs
- [ ] Add experiment off-switch and fallbacks

17) Release a Vertical Slice
- [ ] Path → pick lesson → complete 3 exercises → XP/streak update
- [ ] Include energy decrement and one celebration
- [ ] Run a11y/perf checks; fix blockers
- [ ] Tag v0.1 and write release notes

## Housekeeping
- [ ] Standardize on one package manager (npm or pnpm)
- [ ] Fill content for `sections` page
- [ ] Prune unused i18n keys from `src/locales/*`
- [ ] Add architectural diagrams
- [ ] Add unit/e2e tests for new features
