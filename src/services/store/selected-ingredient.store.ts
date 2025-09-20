import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

type TSelectedIngredientStore = {
  ingredient: TIngredient | null;
};

type TSelectIngredintAction = {
  ingredient: TIngredient;
};

const initialState: TSelectedIngredientStore = {
  ingredient: null,
};

export const selectedIngredientSlice = createSlice({
  name: 'selected-ingredient',
  initialState,
  selectors: {
    selectedIngredient: (store) => store.ingredient,
  },
  reducers: {
    select: (state, action: PayloadAction<TSelectIngredintAction>) => {
      state.ingredient = action.payload.ingredient;
    },
    unselect: (state) => {
      state.ingredient = null;
    },
  },
});

export const { select, unselect } = selectedIngredientSlice.actions;
export const { selectedIngredient } = selectedIngredientSlice.selectors;
