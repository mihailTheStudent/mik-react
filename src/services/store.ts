import { configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burger-constructor.store';
import { ingredientsSlice } from './ingredients.store';
import { isTabActiveSlice } from './is-tab-active.store';
import { orderSlice } from './order.store';
import { selectedIngredientSlice } from './selected-ingredient.store';

import type { Reducer } from '@reduxjs/toolkit';

const rootReducer: Record<string, Reducer> = {
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  [selectedIngredientSlice.reducerPath]: selectedIngredientSlice.reducer,
  [isTabActiveSlice.reducerPath]: isTabActiveSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
