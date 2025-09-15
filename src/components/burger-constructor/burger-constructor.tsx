import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useLayoutEffect, useState } from 'react';

import { BurgerOrder } from './burger-order/burger-order';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  chosenIngredients: TIngredient[];
};

export const BurgerConstructor = ({
  chosenIngredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [bun, setBun] = useState<TIngredient>();
  const [ingredientsBetween, setIngredientsBetween] = useState<TIngredient[]>([]);

  useLayoutEffect(() => {
    let ingredientsBetweenList: TIngredient[] = [];
    let bun: TIngredient | undefined;
    if (chosenIngredients?.length > 0) {
      bun = chosenIngredients.find((ingredient) => ingredient.type === 'bun');
      ingredientsBetweenList = chosenIngredients.filter(
        (ingredient) => ingredient.type !== 'bun'
      );
    }
    setBun(bun);
    setIngredientsBetween(ingredientsBetweenList);
  }, [chosenIngredients]);

  return (
    <section className={`${styles.burger_constructor} pt-4 pl-4 pr-4`}>
      {bun && (
        <ConstructorElement
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          isLocked={true}
          type="top"
        />
      )}
      <div className={styles.burger_ingredients_between}>
        {ingredientsBetween.map(({ name, price, image_mobile }, index) => {
          return (
            <ConstructorElement
              key={index}
              text={name}
              price={price}
              thumbnail={image_mobile}
            />
          );
        })}
      </div>
      {bun && (
        <ConstructorElement
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          isLocked={true}
          type="bottom"
        />
      )}
      <BurgerOrder ingredients={ingredientsBetween} />
    </section>
  );
};
