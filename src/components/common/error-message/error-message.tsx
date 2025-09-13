import { InfoIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './error-message.module.css';

const DEFAULT_MESSAGE =
  'Извините, произошла ошибка. Попробуйте обновить страницу или зайти к нам немного позже.';

type TErrorMessageProps = {
  message?: string;
};

export const ErrorMessage = ({
  message = DEFAULT_MESSAGE,
}: TErrorMessageProps): React.JSX.Element => {
  return (
    <div className={`text text_type_main-default ${styles.message}`}>
      <InfoIcon type="error" />
      <p>{message}</p>
      <InfoIcon type="error" />
    </div>
  );
};
