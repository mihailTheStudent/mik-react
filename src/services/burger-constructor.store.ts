import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction, WritableDraft } from '@reduxjs/toolkit';

type TBurgerConstructorStore = {
  burgerIngredients: TIngredient[];
  ingredientsCount: Record<string, number>;
};

type TIngredientChangeAction = {
  ingredient: TIngredient;
  index?: number;
};

type TIngredientChangeCount = {
  ingredient: TIngredient;
  change: number;
};

const initialState: TBurgerConstructorStore = {
  burgerIngredients: [],
  ingredientsCount: {},
};

const changeIngredientCount = (
  state: WritableDraft<TBurgerConstructorStore>,
  { ingredient: { _id }, change }: TIngredientChangeCount
): void => {
  if (!state.ingredientsCount[_id]) {
    state.ingredientsCount[_id] = 0;
  }
  state.ingredientsCount[_id] += change;
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  selectors: {
    burgerIngredients: (store) => store.burgerIngredients,
    isBunChosen: (store) => store.burgerIngredients.some((i) => i.type === 'bun'),
    ingredientsCount: (store) => store.ingredientsCount,
  },
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredientChangeAction>) => {
      const { ingredient, index = state.burgerIngredients.length - 1 } = action.payload;
      if (ingredient.type === 'bun') {
        if (burgerConstructorSlice.selectors.isBunChosen.unwrapped(state)) {
          const previousBun = state.burgerIngredients.pop();
          state.burgerIngredients.shift();
          changeIngredientCount(state, { ingredient: previousBun!, change: -2 });
        }
        state.burgerIngredients.push(ingredient);
        state.burgerIngredients.unshift(ingredient);
        changeIngredientCount(state, { ingredient, change: 2 });
      } else {
        state.burgerIngredients.splice(index, 0, ingredient);
        changeIngredientCount(state, { ingredient, change: 1 });
      }
    },
    removeIngredient: (state, action: PayloadAction<TIngredientChangeAction>) => {
      const {
        ingredient,
        index = state.burgerIngredients.findIndex((i) => i._id === ingredient._id),
      } = action.payload;
      if (ingredient.type === 'bun') {
        return;
      }
      state.burgerIngredients.splice(index, 1);
      changeIngredientCount(state, { ingredient, change: -1 });
    },
    clean: () => initialState,
  },
});

export const { burgerIngredients, isBunChosen, ingredientsCount } =
  burgerConstructorSlice.selectors;
export const { addIngredient, removeIngredient, clean } = burgerConstructorSlice.actions;
