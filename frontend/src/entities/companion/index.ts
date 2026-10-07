import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

const preferences = z.object({
  enabled: z.boolean(),
  personality: z.enum(['curious', 'cheerful', 'calm']),
  pot: z.enum(['terracotta', 'sage', 'cream']),
  animated: z.boolean(),
  position: z
    .object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) })
    .nullable()
    .default(null),
});
export type CompanionPreferences = z.infer<typeof preferences>;
export type CompanionReaction = 'idle' | 'peek' | 'cart' | 'studio' | 'water' | 'hello' | 'dance';
export interface CompanionState {
  preferences: CompanionPreferences;
  panelOpen: boolean;
  reaction: CompanionReaction;
  revision: number;
}
const defaults: CompanionPreferences = {
  enabled: true,
  personality: 'curious',
  pot: 'terracotta',
  animated: true,
  position: null,
};
const loadPreferences = (): CompanionPreferences => {
  try {
    const result = preferences.safeParse(
      JSON.parse(localStorage.getItem('planto:companion') ?? 'null'),
    );
    return result.success ? result.data : defaults;
  } catch {
    return defaults;
  }
};
export const loadCompanion = (): CompanionState => ({
  preferences: loadPreferences(),
  panelOpen: false,
  reaction: 'idle',
  revision: 0,
});
export const saveCompanion = (value: CompanionPreferences): void => {
  try {
    localStorage.setItem('planto:companion', JSON.stringify(value));
  } catch {
    return;
  }
};
export const companionSlice = createSlice({
  name: 'companion',
  initialState: (): CompanionState => ({
    preferences: defaults,
    panelOpen: false,
    reaction: 'idle',
    revision: 0,
  }),
  reducers: {
    configured: (state, action: PayloadAction<Partial<CompanionPreferences>>) => {
      Object.assign(state.preferences, action.payload);
    },
    opened: (state) => {
      state.preferences.enabled = true;
      state.panelOpen = true;
    },
    closed: (state) => {
      state.panelOpen = false;
    },
    hidden: (state) => {
      state.preferences.enabled = false;
      state.panelOpen = false;
      state.reaction = 'idle';
    },
    reacted: (state, action: PayloadAction<CompanionReaction>) => {
      if (!state.preferences.enabled) return;
      state.reaction = action.payload;
      state.revision += 1;
    },
    settled: (state) => {
      state.reaction = 'idle';
    },
  },
});
export const companionActions = companionSlice.actions;
export const selectCompanion = (state: { companion: CompanionState }): CompanionState =>
  state.companion;
