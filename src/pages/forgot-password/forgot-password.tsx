import { ErrorMessage } from '@/components/common/error-message/error-message';
import { useCheckRoute } from '@/hooks/useCheckRoute';
import { useForm } from '@/hooks/useForm';
import { useSafeLocation } from '@/hooks/useSafeLocation';
import { resetPassword } from '@/services/reset-password.service';
import { EmailInput, Button } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './forgot-password.module.css';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const { formData, isFormValid, handleInputChange, handleInputValidation } = useForm({
    email: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: '',
  });

  const navigate = useNavigate();

  const onResetPassword = useCallback(async () => {
    setErrorMessage({
      ...errorMessage,
      visible: false,
    });

    if (!isFormValid) {
      return;
    }

    const { success, message } = await resetPassword(formData);
    setErrorMessage({
      visible: !success,
      message: success ? '' : message,
    });

    if (success) {
      await navigate('/reset-password', {
        state: {
          ok: true,
        },
      });
    }
  }, [formData]);

  const { state } = useSafeLocation<{ ok: boolean }>();
  useCheckRoute(state?.ok, '/login');

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form className={styles.form}>
        <EmailInput
          name="email"
          onChange={handleInputChange}
          checkValid={(isValid) => handleInputValidation(isValid, 'email')}
          placeholder="Укажите e-mail"
          value={formData.email ?? ''}
          extraClass="mb-6"
        />
        <Button
          onClick={() => {
            void onResetPassword();
          }}
          type="primary"
          htmlType="submit"
          extraClass="mb-20"
          disabled={!isFormValid}
        >
          Восстановить
        </Button>
      </form>
      {errorMessage.visible ? <ErrorMessage message={errorMessage.message} /> : null}
      <p
        className={`text text_type_main-default text_color_inactive ${errorMessage.visible ? 'mt-4' : ''}`}
      >
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
};
