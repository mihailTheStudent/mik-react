import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { getIngredients, isError, isLoading } from '@/services/store/ingredients.store';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLayoutEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { ErrorMessage } from '../common/error-message/error-message';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    void dispatch(getIngredients());
  }, []);

  const _isLoading = useAppSelector(isLoading);
  const _isError = useAppSelector(isError);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {_isLoading ? (
        <Preloader />
      ) : _isError ? (
        <ErrorMessage />
      ) : (
        <main className={`${styles.main} pl-5 pr-5 text text_type_main-default`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </div>
  );
};

export default App;
