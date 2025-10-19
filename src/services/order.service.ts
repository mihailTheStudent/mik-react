import { request } from './api.service';

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

const POST_MAKE_ORDER_URL = 'orders';

export function makeOrderApi(ingredients: TMakeOrderRequest): Promise<TOrder> {
  const body: TMakeOrderBody = { ingredients: ingredients };
  return request<TOrderResponse>(POST_MAKE_ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }).then((response: TOrderResponse) => {
    if (response.success) {
      const order: TOrder = {
        name: response.name,
        number: response.order.number,
      };
      return order;
    }
    return Promise.reject(new Error(`Ошибка: makeOrder -> success = false`));
  });
}
