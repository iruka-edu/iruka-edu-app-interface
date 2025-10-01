import { create } from 'zustand';

export type SessionState = {
  xp: number;
  streak: number;
  energy: number; // 0..5
  incrementXp: (delta: number) => void;
  incrementStreak: (delta?: number) => void;
  decrementEnergy: (delta?: number) => void;
  resetEnergy: (value?: number) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  xp: 0,
  streak: 0,
  energy: 5,
  incrementXp: (delta) => set((s) => ({ xp: Math.max(0, s.xp + delta) })),
  incrementStreak: (delta = 1) => set((s) => ({ streak: Math.max(0, s.streak + delta) })),
  decrementEnergy: (delta = 1) => set((s) => ({ energy: Math.max(0, s.energy - delta) })),
  resetEnergy: (value = 5) => set({ energy: value }),
}));
