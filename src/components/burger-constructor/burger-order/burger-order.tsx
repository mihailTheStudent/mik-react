import { Modal } from '@/components/common/modal/modal';
import { Price } from '@/components/common/price/price';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { burgerIngredients, clean } from '@/services/store/burger-constructor.store';
import {
  isError,
  isLoading,
  makeOrder,
  clean as cleanOrder,
} from '@/services/store/order.store';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';

import { OrderDetails } from '../order-details/order-details';

import styles from './burger-order.module.css';

export const BurgerOrder = (): React.JSX.Element => {
  const [isOrderVisible, setIsOrderVisible] = useState(false);

  const dispatch = useAppDispatch();
  const _burgerIngredients = useAppSelector(burgerIngredients);
  const loading = useAppSelector(isLoading);
  const error = useAppSelector(isError);

  const onCloseModal = useCallback(() => {
    if (loading) {
      return;
    }
    setIsOrderVisible(false);
    if (!error) {
      dispatch(clean());
      dispatch(cleanOrder());
    }
  }, []);

  const onOrderSubmitHandler = useCallback(() => {
    void dispatch(makeOrder(_burgerIngredients.map((i) => i._id)));
    setIsOrderVisible(true);
  }, [_burgerIngredients]);

  const getTotalPrice = useCallback(() => {
    return _burgerIngredients.reduce((sum, ingredient) => (sum += ingredient.price), 0);
  }, [_burgerIngredients]);

  const totalPrice = getTotalPrice();

  return (
    <section className={styles.order}>
      <Price price={totalPrice} size="m" />
      <Button
        disabled={loading}
        type="primary"
        htmlType="submit"
        extraClass="ml-10"
        onClick={onOrderSubmitHandler}
      >
        Оформить заказ
      </Button>
      {isOrderVisible && (
        <Modal onClose={onCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
