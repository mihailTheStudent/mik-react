import { getGroupName } from '@/utils/naming-functions';

import { IngredientItem } from '../ingredient-item/ingredient-item';

import type { TIngredient } from '@/utils/types';

import styles from './ingredients-group.module.css';

type TBurgerIngredientsGroupProps = {
  ingredients: TIngredient[];
};

export const IngredientsGroup = ({
  ingredients,
}: TBurgerIngredientsGroupProps): React.JSX.Element => {
  const groupName = getGroupName(ingredients[0].type);

  return (
    <section className="mb-10">
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
};

// TODO - add somehow propTypes to check if all ingredients are in the same group
