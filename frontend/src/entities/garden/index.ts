import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

const LIST_LIMITS = { saved: 100, compare: 3, checked: 1000 };
const schema = z.object({
  saved: z.array(z.string()).max(LIST_LIMITS.saved),
  compare: z.array(z.string()).max(LIST_LIMITS.compare),
  checked: z.array(z.string()).max(LIST_LIMITS.checked),
});
export type GardenState = z.infer<typeof schema>;
export const GARDEN_KEY = 'planto:garden';
const emptyGarden = (): GardenState => ({ saved: [], compare: [], checked: [] });

export const loadGarden = (): GardenState => {
  try {
    const result = schema.safeParse(JSON.parse(localStorage.getItem(GARDEN_KEY) ?? 'null'));
    return result.success ? result.data : emptyGarden();
  } catch {
    return emptyGarden();
  }
};
export const saveGarden = (state: GardenState): void => {
  try {
    localStorage.setItem(GARDEN_KEY, JSON.stringify(state));
  } catch {
    return;
  }
};
export const gardenSlice = createSlice({
  name: 'garden',
  initialState: emptyGarden,
  reducers: {
    replaced: (state, action: PayloadAction<{ previous: string; next: string }>) => {
      const index = state.compare.indexOf(action.payload.previous);
      if (index >= 0 && !state.compare.includes(action.payload.next))
        state.compare[index] = action.payload.next;
    },
    toggled: (state, action: PayloadAction<{ list: 'saved' | 'compare'; id: string }>) => {
      const { list, id } = action.payload;
      const items = state[list];
      const index = items.indexOf(id);
      if (index >= 0) {
        items.splice(index, 1);
        return;
      }
      if (items.length < LIST_LIMITS[list]) items.push(id);
    },
    checked: (state, action: PayloadAction<string>) => {
      const index = state.checked.indexOf(action.payload);
      if (index >= 0) {
        state.checked.splice(index, 1);
        return;
      }
      state.checked.push(action.payload);
      if (state.checked.length > LIST_LIMITS.checked) state.checked.shift();
    },
    cleared: (state, action: PayloadAction<'saved' | 'compare'>) => {
      state[action.payload] = [];
    },
  },
});
export const gardenActions = gardenSlice.actions;
export const selectGarden = (state: { garden: GardenState }): GardenState => state.garden;
