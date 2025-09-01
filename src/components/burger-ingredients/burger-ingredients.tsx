import { Tab } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { getGroupName } from '../../utils/naming-functions';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const buns = [],
    mains = [],
    sauces = [];

  for (let ingredient of ingredients) {
    let type = ingredient.type;
    if (type === "bun") {
      buns.push(ingredient);
    } else if (type === "main") {
      mains.push(ingredient);
    } else if (type === "sauce") {
      sauces.push(ingredient);
    }
  }

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
            {getGroupName("bun")}
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            {getGroupName("sauce")}
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            {getGroupName("main")}
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
