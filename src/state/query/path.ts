import type { PathData } from '@/features/path/types';
import { mockPath } from '@/features/path/mock';

export const fetcher = async (): Promise<PathData> => {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 50));
  return mockPath;
};
