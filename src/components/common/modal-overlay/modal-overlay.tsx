import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose?: () => void;
  children: React.JSX.Element;
};

export const ModalOverlay = ({
  onClose,
  children: modal,
}: TModalOverlayProps): React.JSX.Element => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : 'scroll';
  }, [active]);

  const closeHandler = useCallback(() => {
    setActive(false);
    onClose?.();
  }, []);
  const closeByClick = useCallback(() => closeHandler(), []);
  const closeByEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return (): void => document.removeEventListener('keydown', closeByEsc);
  }, []);

  return active ? (
    createPortal(
      <div className={styles.modal_overlay} onClick={closeByClick}>
        {modal}
      </div>,
      document.body
    )
  ) : (
    <></>
  );
};
