import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClick: () => void;
  children: React.JSX.Element;
};

export const ModalOverlay = ({
  onClick,
  children: modal,
}: TModalOverlayProps): React.JSX.Element => {
  return (
    <div className={styles.modal_overlay} onClick={onClick}>
      {modal}
    </div>
  );
};
