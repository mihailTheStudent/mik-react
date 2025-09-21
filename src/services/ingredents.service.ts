import { request } from './api.service';

import type { TIngredient } from '@/utils/types';

const GET_INGREDIENTS_URL = `ingredients`;

type TGetIngredientsReponse = {
  data: TIngredient[];
  success: boolean;
};

export function getIngredientsApi(): Promise<TIngredient[]> {
  return request<TGetIngredientsReponse>(GET_INGREDIENTS_URL).then(
    (response: TGetIngredientsReponse) => {
      if (response.success) {
        return response.data;
      }
      return Promise.reject(new Error(`Ошибка: getIngredients -> success = false`));
    }
  );
}
