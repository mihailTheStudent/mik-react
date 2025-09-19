import { logError } from './logger.service';

import type { TIngredient } from '@/utils/types';

const GET_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

type TGetIngredientsReponse = {
  data: TIngredient[];
  success: boolean;
};

export function getIngredientsApi(): Promise<TIngredient[]> {
  return fetch(GET_INGREDIENTS_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Ошибка ${response.status}`));
    })
    .then((response: TGetIngredientsReponse) => {
      if (response.success) {
        return response.data;
      }
      return Promise.reject(new Error(`Ошибка: getIngredients -> success = false`));
    })
    .catch((e: Error) => {
      logError(e);
      throw e;
    });
}
