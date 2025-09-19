import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsApi } from './ingredents.service';

import type { TIngredient } from '@/utils/types';

type TIngredientsStore = {
  isLoading: boolean;
  isError: boolean;
  ingredients: TIngredient[];
};

const initialState: TIngredientsStore = {
  isLoading: true,
  isError: false,
  ingredients: [],
};

export const getIngredients = createAsyncThunk(
  'ingredients/get-ingredients',
  async () => {
    return getIngredientsApi();
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredients: (store) => store.ingredients,
    isLoading: (store) => store.isLoading,
    isError: (store) => store.isError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { isLoading, isError, ingredients } = ingredientsSlice.selectors;
