import { z } from 'zod';

export const ACCENTS = ['#8a8fc4', '#7ea0c0', '#a88fc0', '#7faaa0'] as const;
export const accentSchema = z.enum(ACCENTS);
export type Accent = z.infer<typeof accentSchema>;

export const settingsSchema = z.object({
  /** Wind-down time as "HH:MM" (24h). */
  bedtime: z.string().regex(/^\d{1,2}:\d{2}$/),
  accent: accentSchema,
});
export type Settings = z.infer<typeof settingsSchema>;

export const persistedStateSchema = z.object({
  version: z.literal(1),
  settings: settingsSchema,
});
export type PersistedState = z.infer<typeof persistedStateSchema>;

export type Phase = 'home' | 'waiting' | 'ritual';
