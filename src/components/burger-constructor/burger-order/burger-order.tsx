import { Price } from '@/components/common/price/price';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';

import { OrderDetails } from '../order-details/order-details';

import type { TIngredient } from '@/utils/types';

import styles from './burger-order.module.css';

type TBurgerOrderProps = {
  ingredients: TIngredient[];
};

export const BurgerOrder = ({ ingredients }: TBurgerOrderProps): React.JSX.Element => {
  const [isBurgerModalVisible, setIsBurgerModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsBurgerModalVisible(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setIsBurgerModalVisible(false);
  }, []);
  const onOrderSubmitHandler = useCallback(() => {
    openModal();
  }, []);

  const totalPrice: number = ingredients.reduce(
    (sum, ingredient) => (sum += ingredient.price),
    0
  );

  return (
    <section className={`${styles.order} mt-10`}>
      <Price price={totalPrice} size="m" />
      <Button
        type="primary"
        htmlType="submit"
        extraClass="ml-10"
        onClick={onOrderSubmitHandler}
      >
        Оформить заказ
      </Button>
      {isBurgerModalVisible && <OrderDetails orderId="034536" onClose={onCloseModal} />}
    </section>
  );
};
