import { Modal } from '@/components/common/modal/modal';
import { ReactSVG } from 'react-svg';

import successfullOrder from '../../../assets/images/successfull-order.svg';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  orderId: string;
  onClose: () => void;
};

export const OrderDetails = ({
  orderId,
  onClose,
}: TOrderDetailsProps): React.JSX.Element => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.modal}>
        <p className={`${styles.order} text text_type_digits-large`}>{orderId}</p>
        <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
        <ReactSVG src={successfullOrder} />
        <p className="text text_type_main-default mt-15 mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive mb-15">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};
