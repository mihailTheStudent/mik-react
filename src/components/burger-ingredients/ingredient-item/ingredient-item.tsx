import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details/ingredient-details';
import { Modal } from '@/components/common/modal/modal';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useModal } from '@/hooks/useModal';
import {
  addIngredient,
  ingredientsCount,
} from '@/services/store/burger-constructor.store';
import {
  select,
  selectedIngredient,
  unselect,
} from '@/services/store/selected-ingredient.store';
import { INGREDIENT_ADD } from '@/utils/dnd.const';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import { useDrag } from 'react-dnd';

import type { TIngredientAddItem } from '@/utils/dnd.const';
import type { TIngredient } from '@/utils/types';

import styles from './ingredient-item.module.css';

type TBurgerIngredientItemProps = {
  ingredient: TIngredient;
};

export const IngredientItem = ({
  ingredient,
}: TBurgerIngredientItemProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(ingredientsCount)[ingredient._id];

  const [, dragRef] = useDrag<TIngredientAddItem>(
    () => ({
      type: INGREDIENT_ADD,
      item: { ingredient },
    }),
    []
  );

  const { name, price, image } = ingredient;

  const _addIngredient = useCallback(() => {
    dispatch(addIngredient({ ingredient }));
  }, [ingredient]);

  const selectIngredientToCheckDetails = useCallback(() => {
    dispatch(select({ ingredient }));
  }, [ingredient]);

  const onCloseModal = useCallback(() => {
    closeModal();
    dispatch(unselect());
  }, []);

  const { isModalOpen, openModal, closeModal } = useModal();
  const _selectedIngredient = useAppSelector(selectedIngredient);
  useEffect(() => {
    if (_selectedIngredient?._id === ingredient._id) {
      openModal();
    }
  }, [_selectedIngredient]);

  return (
    <>
      <article
        className={`${styles.item} pb-4`}
        ref={(ref) => {
          dragRef(ref);
        }}
      >
        <img
          src={image}
          className={`${styles.image} pl-4 pr-4`}
          alt={name}
          onClick={_addIngredient}
        />
        {count ? <Counter count={count} /> : null}
        <p className={`${styles.price} pt-1 pb-1`}>
          <span className="mr-2 text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={styles.name} onClick={selectIngredientToCheckDetails}>
          {name}
        </p>
      </article>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={onCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
