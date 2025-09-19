import { useAppSelector } from '@/hooks/store-hooks';
import { isError, isLoading, order } from '@/services/order.store';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { ReactSVG } from 'react-svg';

import successfullOrder from '../../../assets/images/successfull-order.svg';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const isOrderLoading = useAppSelector(isLoading);
  const isOrderError = useAppSelector(isError);
  const _order = useAppSelector(order);

  return isOrderLoading ? (
    <Preloader />
  ) : (
    <div className={styles.modal}>
      {isOrderError ? (
        <>
          <p className="text text_type_main-medium mt-8 mb-15">
            Извините, произошла ошибка. Попробуйте сделать заказ позже.
          </p>
        </>
      ) : (
        <>
          <p className={`${styles.order} text text_type_digits-large`}>
            {_order?.number ?? '000000'}
          </p>
          <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
          <ReactSVG src={successfullOrder} />
          <p className="text text_type_main-default mt-15 mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive mb-15">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};
