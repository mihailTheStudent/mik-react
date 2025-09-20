import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { ingredients } from '@/services/ingredients.store';
import { activeTab, calculateActiveTab } from '@/services/is-tab-active.store';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useRef } from 'react';

import { getGroupName } from '../../utils/naming-functions';
import { IngredientsGroup } from './ingredients-group/ingredients-group';

import type { TDOMRectTopBottomBorders } from '@/services/is-tab-active.store';
import type { TIngredientType } from '@/utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ingredientsEl = useRef<HTMLDivElement>(null);
  const bunsEl = useRef<HTMLElement>(null);
  const mainsEl = useRef<HTMLElement>(null);
  const saucesEl = useRef<HTMLElement>(null);

  const handleOnScroll = useCallback(() => {
    const parent = getCoords(ingredientsEl.current);
    const bun = getCoords(bunsEl.current);
    const main = getCoords(mainsEl.current);
    const sauce = getCoords(saucesEl.current);
    dispatch(calculateActiveTab({ parent, tabs: { bun, main, sauce } }));
  }, []);

  const getCoords = useCallback(
    (coords: HTMLElement | HTMLDivElement | null): TDOMRectTopBottomBorders => {
      const { top, bottom } = coords?.getBoundingClientRect() ?? { top: 0, bottom: 0 };
      return { top, bottom };
    },
    []
  );

  useEffect(() => {
    handleOnScroll();
  }, [ingredientsEl, bunsEl, mainsEl, saucesEl]);

  const handleScrollTo = useCallback((scrollTo: TIngredientType) => {
    const scrollableContainer = ingredientsEl.current;

    if (scrollableContainer) {
      const toElementScroll =
        scrollTo === 'bun'
          ? bunsEl.current
          : scrollTo === 'main'
            ? mainsEl.current
            : scrollTo === 'sauce'
              ? saucesEl.current
              : null;
      const distance =
        getCoords(toElementScroll).top - getCoords(scrollableContainer).top;
      scrollableContainer.scroll({
        top: scrollableContainer.scrollTop + distance,
        behavior: 'smooth',
      });
    }
  }, []);

  const _activeTab = useAppSelector(activeTab);

  const _ingredients = useAppSelector(ingredients);

  const sortIngredients = useCallback(() => {
    const buns = [],
      mains = [],
      sauces = [];
    for (const ingredient of _ingredients) {
      const type = ingredient.type;
      if (type === 'bun') {
        buns.push(ingredient);
      } else if (type === 'main') {
        mains.push(ingredient);
      } else if (type === 'sauce') {
        sauces.push(ingredient);
      }
    }
    return { buns, mains, sauces };
  }, [_ingredients]);

  const { buns, mains, sauces } = sortIngredients();

  return (
    <section className={styles.burger_ingredients}>
      <nav className="mb-10">
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={_activeTab === 'bun'}
            onClick={() => handleScrollTo('bun')}
          >
            {getGroupName('bun')}
          </Tab>
          <Tab
            value="sauce"
            active={_activeTab === 'sauce'}
            onClick={() => handleScrollTo('sauce')}
          >
            {getGroupName('sauce')}
          </Tab>
          <Tab
            value="main"
            active={_activeTab === 'main'}
            onClick={() => handleScrollTo('main')}
          >
            {getGroupName('main')}
          </Tab>
        </ul>
      </nav>
      <div
        className={`${styles.ingredients} custom-scroll`}
        ref={ingredientsEl}
        onScroll={handleOnScroll}
      >
        <IngredientsGroup ingredients={buns} ref={bunsEl} />
        <IngredientsGroup ingredients={sauces} ref={saucesEl} />
        <IngredientsGroup ingredients={mains} ref={mainsEl} />
      </div>
    </section>
  );
};
