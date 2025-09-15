import { getIngredients } from '@/services/ingredents.service';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { ErrorMessage } from '../common/error-message/error-message';

import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

type IngredientsResponse = {
  isLoading: boolean;
  isError: boolean;
  ingredients: TIngredient[];
};

export const App = (): React.JSX.Element => {
  const [ingredientsResult, setIngredientsResult] = useState<IngredientsResponse>({
    isLoading: true,
    isError: false,
    ingredients: [],
  });

  useEffect(() => {
    setIngredientsResult({ ...ingredientsResult, isLoading: true });
    getIngredients()
      .then((ingredients) => {
        setIngredientsResult({
          isLoading: false,
          isError: false,
          ingredients,
        });
      })
      .catch(() => {
        setIngredientsResult({
          isLoading: false,
          isError: true,
          ingredients: [],
        });
      });
  }, []);

  const { isLoading, isError, ingredients } = ingredientsResult;

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {isLoading ? (
        <Preloader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <main className={`${styles.main} pl-5 pr-5 text text_type_main-default`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor chosenIngredients={ingredients} />
        </main>
      )}
    </div>
  );
};

export default App;
