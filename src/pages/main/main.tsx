import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { ErrorMessage } from '@/components/common/error-message/error-message';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { getIngredients, isLoading, isError } from '@/services/store/ingredients.store';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLayoutEffect } from 'react';

import styles from './main.module.css';

export const MainPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    void dispatch(getIngredients());
  }, []);

  const _isLoading = useAppSelector(isLoading);
  const _isError = useAppSelector(isError);

  return (
    <section className={styles.main_page}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {_isLoading ? (
        <Preloader />
      ) : _isError ? (
        <ErrorMessage />
      ) : (
        <div className={`${styles.main} pl-5 pr-5 text text_type_main-default`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      )}
    </section>
  );
};
