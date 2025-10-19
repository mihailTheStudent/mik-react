import { configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './store/burger-constructor.store';
import { ingredientsSlice } from './store/ingredients.store';
import { isTabActiveSlice } from './store/is-tab-active.store';
import { orderSlice } from './store/order.store';
import { selectedIngredientSlice } from './store/selected-ingredient.store';
import { userSlice } from './store/user.store';

import type { Reducer } from '@reduxjs/toolkit';

const rootReducer: Record<string, Reducer> = {
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  [selectedIngredientSlice.reducerPath]: selectedIngredientSlice.reducer,
  [isTabActiveSlice.reducerPath]: isTabActiveSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
