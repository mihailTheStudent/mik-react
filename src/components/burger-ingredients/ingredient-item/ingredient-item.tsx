import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details/ingredient-details';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-item.module.css';

type TBurgerIngredientItemProps = {
  ingredient: TIngredient;
  count?: number;
};

export const IngredientItem = ({
  ingredient,
  count,
}: TBurgerIngredientItemProps): React.JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { name, price, image } = ingredient;

  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <article className={`${styles.item} pb-4`} onClick={openModal}>
        <img src={image} className="pl-4 pr-4" />
        {count ? <Counter count={count} /> : null}
        <p className={`${styles.price} pt-1 pb-1`}>
          <span className="mr-2 text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={styles.name}>{name}</p>
      </article>
      {isModalVisible && (
        <IngredientDetails ingredient={ingredient} onClose={onCloseModal} />
      )}
    </>
  );
};
