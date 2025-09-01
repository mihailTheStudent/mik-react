import { Price } from '@/components/common/price/price';
import { Button } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './burger-order.module.css';

type TBurgerOrderProps = {
  ingredients: TIngredient[];
};

export const BurgerOrder = ({ ingredients }: TBurgerOrderProps): React.JSX.Element => {
  const totalPrice: number = ingredients.reduce(
    (sum, ingredient) => (sum += ingredient.price),
    0
  );

  return (
    <section className={`${styles.order} mt-10`}>
      <Price price={totalPrice} size="m" />
      <Button type="primary" htmlType="submit" extraClass="ml-10">
        Оформить заказ
      </Button>
    </section>
  );
};
