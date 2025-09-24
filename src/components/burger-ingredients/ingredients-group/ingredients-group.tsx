import { getGroupName } from '@/utils/naming-functions';
import { forwardRef } from 'react';

import { IngredientItem } from '../ingredient-item/ingredient-item';

import type { TIngredient } from '@/utils/types';

import styles from './ingredients-group.module.css';

type TBurgerIngredientsGroupProps = {
  ingredients: TIngredient[];
};

export const IngredientsGroup = forwardRef(
  (
    { ingredients }: TBurgerIngredientsGroupProps,
    ref: React.ForwardedRef<HTMLElement>
  ): React.JSX.Element => {
    const groupName = getGroupName(ingredients[0].type);

    return (
      <section className="mb-10" ref={ref}>
        <header>
          <h2>{groupName}</h2>
        </header>
        <div className={styles['items-group']}>
          {ingredients.map((ingredient, key) => (
            <IngredientItem ingredient={ingredient} key={key} />
          ))}
        </div>
      </section>
    );
  }
);
IngredientsGroup.displayName = 'IngredientsGroup';
