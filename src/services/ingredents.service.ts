import { logError } from './logger.service';

import type { TIngredient } from '@/utils/types';

const GET_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

type TGetIngredientsReponse = {
  data: TIngredient[];
  success: boolean;
};

export function getIngredients(): Promise<TIngredient[]> {
  return fetch(GET_INGREDIENTS_URL)
    .then((response) => response.json())
    .then((response: TGetIngredientsReponse) => response.data)
    .catch((e: Error) => {
      logError(e);
      throw e;
    });
}
