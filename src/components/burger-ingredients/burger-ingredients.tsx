import { useAppSelector } from '@/hooks/store-hooks';
import { ingredients } from '@/services/ingredients.store';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import { getGroupName } from '../../utils/naming-functions';
import { IngredientsGroup } from './ingredients-group/ingredients-group';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
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
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            {getGroupName('bun')}
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            {getGroupName('sauce')}
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            {getGroupName('main')}
          </Tab>
        </ul>
      </nav>
      <div className={`${styles.ingredients} custom-scroll`}>
        <IngredientsGroup ingredients={buns} />
        <IngredientsGroup ingredients={sauces} />
        <IngredientsGroup ingredients={mains} />
      </div>
    </section>
  );
};
