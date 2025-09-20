import type { TIngredient } from './types';

export const INGREDIENT_ADD = 'INGREDIENT_ADD';
export type TIngredientAddItem = {
  ingredient: TIngredient;
};

export const INGREDIENT_SORT = 'INGREDIENT_SORT';
export type TIngredientSortItem = {
  index: number;
};
