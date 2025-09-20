import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import {
  addIngredient,
  burgerIngredients,
  draggingCache,
  isBunChosen,
} from '@/services/store/burger-constructor.store';
import { INGREDIENT_ADD } from '@/utils/dnd.const';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';

import { BurgerOrder } from './burger-order/burger-order';
import { ConstructorElementWrapper } from './constructor-element-wrapper/constructor-element-wrapper';

import type { TIngredientAddItem } from '@/utils/dnd.const';
import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const _addIngredient = useCallback((ingredient: TIngredient) => {
    dispatch(addIngredient({ ingredient }));
  }, []);

  const [, addDropRef] = useDrop<TIngredientAddItem>(
    () => ({
      accept: INGREDIENT_ADD,
      drop({ ingredient }): void {
        _addIngredient(ingredient);
      },
    }),
    []
  );

  const _draggingCache = useAppSelector(draggingCache);
  const _burgerIngredients = useAppSelector(burgerIngredients);
  const ingredients = _draggingCache ?? _burgerIngredients;

  const hasBun = useAppSelector(isBunChosen);
  const bun = hasBun ? ingredients[0] : null;

  return (
    <section
      className={`${styles.burger_constructor} pt-4 pl-4`}
      ref={(ref) => {
        addDropRef(ref);
      }}
    >
      {bun && (
        <div className="pr-4">
          <ConstructorElementWrapper ingredient={bun} type="bun-top" index={0} />
        </div>
      )}
      <div className={`${styles.burger_ingredients_between} custom-scroll`}>
        {(hasBun ? ingredients.slice(1, -1) : ingredients).map((ingredient, index) => (
          <ConstructorElementWrapper
            ingredient={ingredient}
            key={index}
            index={index + 1}
          />
        ))}
      </div>
      {bun && (
        <div className="pr-4">
          <ConstructorElementWrapper
            ingredient={bun}
            type="bun-bottom"
            index={ingredients.length - 1}
          />
        </div>
      )}
      <div className={styles.total_price}>
        <BurgerOrder />
      </div>
    </section>
  );
};
