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
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);

  useLayoutEffect(() => {
    let ingredientsList: TIngredient[] = [];
    if (chosenIngredients?.length > 0) {
      const bun = chosenIngredients.find((ingredient) => ingredient.type === 'bun');
      const otherIngredients = chosenIngredients.filter(
        (ingredient) => ingredient.type !== 'bun'
      );
      ingredientsList = bun ? [bun, ...otherIngredients, bun] : otherIngredients;
    }
    setIngredients(ingredientsList);
  }, [chosenIngredients]);

  return (
    <section className={`${styles.burger_constructor} pt-4 pl-4 pr-4`}>
      <div className={styles.burger_structure}>
        {ingredients.map(({ name, price, image_mobile }, index) => {
          const isTopBun = index === 0;
          const isBottomBun = index === ingredients.length - 1;
          return (
            <ConstructorElement
              key={index}
              text={name}
              price={price}
              thumbnail={image_mobile}
              isLocked={isTopBun || isBottomBun}
              type={isTopBun ? 'top' : isBottomBun ? 'bottom' : undefined}
            />
          );
        })}
      </div>
      <BurgerOrder ingredients={ingredients} />
    </section>
  );
};
