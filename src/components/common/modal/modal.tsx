import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal');

type TModalProps = {
  title?: string;
  children: React.JSX.Element;
  onClose: () => void;
};

export const Modal = ({
  title = '',
  children: modalContent,
  onClose,
}: TModalProps): React.JSX.Element => {
  const onCloseClickHandler = useCallback(() => onClose(), []);
  const onModalOverlayClick = useCallback(() => onClose(), []);
  const closeByEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeByEsc);
    return (): void => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  if (!modalRoot) {
    return <></>;
  }

  return createPortal(
    <ModalOverlay onClick={onModalOverlayClick}>
      <section className={styles.modal}>
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
    </ModalOverlay>,
    modalRoot
  );
};
