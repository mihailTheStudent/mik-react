import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TSelectedIngredientStore = {
  ingredient: TIngredient | null;
};

type TSelectIngredintAction = {
  payload: {
    ingredient: TIngredient;
  };
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
    select: (state, action: TSelectIngredintAction) => {
      state.ingredient = action.payload.ingredient;
    },
    unselect: (state) => {
      state.ingredient = null;
    },
  },
});

export const { select, unselect } = selectedIngredientSlice.actions;
export const { selectedIngredient } = selectedIngredientSlice.selectors;
