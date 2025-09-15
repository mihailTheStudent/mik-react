import type { TIngredientType } from '@/utils/types';

export const getGroupName = (type: TIngredientType): string => {
  if (type === 'bun') return 'Булки';
  else if (type === 'main') return 'Начинки';
  else if (type === 'sauce') return 'Соусы';
  return '';
};
