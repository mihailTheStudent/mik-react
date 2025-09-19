import { logError } from './logger.service';

import type { TIngredient, TOrder } from '@/utils/types';

export type TMakeOrderBody = {
  ingredients: string[];
};

export type TOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type TMakeOrderRequest = TIngredient['_id'][];

const POST_MAKE_ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export function makeOrderApi(ingredients: TMakeOrderRequest): Promise<TOrder> {
  const body: TMakeOrderBody = { ingredients };
  return fetch(POST_MAKE_ORDER_URL, { method: 'POST', body: JSON.stringify(body) })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Ошибка ${response.status}`));
    })
    .then((response: TOrderResponse) => {
      if (response.success) {
        const order: TOrder = {
          name: response.name,
          number: response.order.number,
        };
        return order;
      }
      return Promise.reject(new Error(`Ошибка: makeOrder -> success = false`));
    })
    .catch((e: Error) => {
      logError(e);
      throw e;
    });
}
