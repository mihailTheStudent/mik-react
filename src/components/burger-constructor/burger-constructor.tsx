import { BurgerStructureItem } from './burger-structure-item/burger-structure-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

const getBunIndex = (ingredients: TIngredient[]): number =>
  ingredients.findIndex((ingredient) => ingredient.type === 'bun');

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bunIndex = getBunIndex(ingredients);
  const bun = ingredients[bunIndex];
  const otherIngredients = ingredients
    .slice(0, bunIndex)
    .concat(ingredients.slice(bunIndex + 1));
  // if (getBunIndex(otherIngredients) !== -1) {
  //   throw new Error('Булка может быть только одна!');
  // }

  const burgerItems = [bun, ...otherIngredients, bun];

  return (
    <section className={styles.burger_constructor}>
      {burgerItems.map((burgerItem, index) => {
        const isTopBun = index === 0;
        const isBottomBun = index === burgerItems.length - 1;
        return (
          <BurgerStructureItem
            key={index}
            ingredient={burgerItem}
            isTopBun={isTopBun}
            isBottomBun={isBottomBun}
          />
        );
      })}
    </section>
  );
};
