import { create } from 'zustand';
import { repository } from '@/lib/repository';
import type { Accent, Settings } from '@/types/domain';

interface WindState {
  settings: Settings;
  setBedtime: (bedtime: string) => void;
  setAccent: (accent: Accent) => void;
}

const initial = repository.getState();

export const useWindStore = create<WindState>((set) => ({
  settings: initial.settings,
  setBedtime: (bedtime) => set({ settings: repository.setSettings({ bedtime }).settings }),
  setAccent: (accent) => set({ settings: repository.setSettings({ accent }).settings }),
}));
