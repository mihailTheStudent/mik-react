import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  title: string;
  children: React.JSX.Element;
  onClose?: () => void;
  width?: number;
};

export const Modal = ({
  title,
  children: modalContent,
  onClose,
  width = 720,
}: TModalProps): React.JSX.Element => {
  const onCloseClickHandler = useCallback(() => close(), []);

  return (
    <ModalOverlay onClose={onClose}>
      <section className={styles.modal} style={{ width }}>
        <header className={`${styles.header} pt-10 pl-10 pr-10`}>
          <h3 className="text text_type_main-large">{title}</h3>
          <CloseIcon
            className={styles.close_icon}
            type="primary"
            onClick={onCloseClickHandler}
          />
        </header>
        <div className="pl-10 pr-10 pb-15">{modalContent}</div>
      </section>
    </ModalOverlay>
  );
};
