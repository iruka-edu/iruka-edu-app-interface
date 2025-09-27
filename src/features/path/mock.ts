import type { PathData } from './types';

export const mockPath: PathData = {
  units: [
    {
      id: 'u1',
      title: 'Basics',
      lessons: [
        { id: 'l1', title: 'Greetings', progress: 100, kind: 'start' },
        { id: 'l2', title: 'Numbers', progress: 50, kind: 'lesson' },
        { id: 'l3', title: 'Checkpoint', locked: true, kind: 'checkpoint' },
        { id: 'l4', title: 'Ordering basics', locked: true, kind: 'lesson', jumpAvailable: true },
        { id: 'l5', title: 'Badge test', locked: true, kind: 'badge' },
      ],
    },
    {
      id: 'u2',
      title: 'Beginner',
      lessons: [
        { id: 'l6', title: 'Colors', locked: true, kind: 'lesson' },
        { id: 'l7', title: 'Checkpoint II', locked: true, kind: 'checkpoint' },
        { id: 'l8', title: 'Animals', locked: true, kind: 'lesson' },
      ],
    },
  ],
};
