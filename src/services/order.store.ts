import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { makeOrderApi } from './order.service';

import type { TMakeOrderRequest } from './order.service';
import type { TOrder } from '@/utils/types';

type TOrderStore = {
  isLoading: boolean;
  isError: boolean;
  order: TOrder | null;
};

const initialState: TOrderStore = {
  isLoading: false,
  isError: false,
  order: null,
};

export const makeOrder = createAsyncThunk(
  'order/make-order',
  async (ingredients: TMakeOrderRequest) => {
    return makeOrderApi(ingredients);
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    isLoading: (store) => store.isLoading,
    isError: (store) => store.isError,
    order: (store) => store.order,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(makeOrder.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { isLoading, isError, order } = orderSlice.selectors;
