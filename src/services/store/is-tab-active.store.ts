import { createSlice } from '@reduxjs/toolkit';

import type { TIngredientType } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TDOMRectTopBottomBorders = Pick<DOMRect, 'top' | 'bottom'>;

type TIsTabActiveStore = {
  parent: TDOMRectTopBottomBorders | null;
  tabs: Record<TIngredientType, TDOMRectTopBottomBorders | null>;
  activeTab: TIngredientType | null;
};

const initialState: TIsTabActiveStore = {
  parent: null,
  tabs: {
    bun: null,
    sauce: null,
    main: null,
  },
  activeTab: null,
};

type TSetParentAndTabsAction = {
  parent: TDOMRectTopBottomBorders;
  tabs: Record<TIngredientType, TDOMRectTopBottomBorders>;
};

export const isTabActiveSlice = createSlice({
  name: 'is-tab-active',
  initialState,
  selectors: {
    activeTab: (store) => store.activeTab,
  },
  reducers: {
    calculateActiveTab: (state, action: PayloadAction<TSetParentAndTabsAction>) => {
      const {
        parent,
        tabs: { bun, sauce, main },
      } = action.payload;
      const topBorder = parent.top;
      const tabs: [TIngredientType, TDOMRectTopBottomBorders][] = [
        ['bun', bun],
        ['sauce', sauce],
        ['main', main],
      ];
      for (const [key, tabEl] of tabs) {
        const { top: tabTop, bottom: tabBottom } = tabEl;
        if (tabTop <= topBorder && tabBottom >= topBorder) {
          state.activeTab = key;
          return;
        }
      }
      state.activeTab = 'bun';
    },
  },
});

export const { calculateActiveTab } = isTabActiveSlice.actions;
export const { activeTab } = isTabActiveSlice.selectors;
