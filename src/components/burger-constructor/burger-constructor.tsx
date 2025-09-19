import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import {
  burgerIngredients,
  isBunChosen,
  removeIngredient,
} from '@/services/burger-constructor.store';
import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import { BurgerOrder } from './burger-order/burger-order';

import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const _removeIngredient = useCallback((ingredient: TIngredient) => {
    dispatch(removeIngredient({ ingredient }));
  }, []);

  const _burgerIngredients = useAppSelector(burgerIngredients);
  const hasBun = useAppSelector(isBunChosen);
  const bun = hasBun ? _burgerIngredients[0] : null;

  return (
    <section className={`${styles.burger_constructor} pt-4 pl-4 pr-4`}>
      {bun && (
        <ConstructorElement
          extraClass={styles.burger_ingredient}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          isLocked={true}
          type="top"
        />
      )}
      <div className={styles.burger_ingredients_between}>
        {(hasBun ? _burgerIngredients.slice(1, -1) : _burgerIngredients).map(
          (ingredient, index) => {
            const { name, price, image_mobile } = ingredient;
            return (
              <ConstructorElement
                extraClass={styles.burger_ingredient}
                key={index}
                text={name}
                price={price}
                thumbnail={image_mobile}
                handleClose={() => _removeIngredient(ingredient)}
              />
            );
          }
        )}
      </div>
      {bun && (
        <ConstructorElement
          extraClass={styles.burger_ingredient}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          isLocked={true}
          type="bottom"
        />
      )}
      <div className={styles.total_price}>
        <BurgerOrder />
      </div>
    </section>
  );
};
