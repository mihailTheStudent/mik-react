import { ErrorMessage } from '@/components/common/error-message/error-message';
import { useCheckRoute } from '@/hooks/useCheckRoute';
import { useForm } from '@/hooks/useForm';
import { useSafeLocation } from '@/hooks/useSafeLocation';
import { saveNewPassword } from '@/services/reset-password.service';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './reset-password.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const { formData, isFormValid, handleInputChange, handleInputValidation } = useForm({
    password: '',
    token: '',
  });

  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: '',
  });

  const onSaveNewPassword = useCallback(async () => {
    setErrorMessage({
      ...errorMessage,
      visible: false,
    });

    if (!isFormValid) {
      return;
    }

    const { success, message } = await saveNewPassword(formData);
    setErrorMessage({
      visible: !success,
      message: success ? '' : message,
    });

    if (success) {
      await navigate('/login', {
        state: {
          email,
          password: formData.password,
        },
      });
    }
  }, [formData]);

  const { state } = useSafeLocation<{ ok: boolean; email: string }>();
  useCheckRoute(state?.ok, '/login');
  setEmail(email);

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form className={styles.form}>
        <PasswordInput
          icon="ShowIcon"
          name="password"
          onChange={handleInputChange}
          checkValid={(isValid) => handleInputValidation(isValid, 'password')}
          placeholder="Введите новый пароль"
          value={formData.password ?? ''}
          extraClass="mb-6"
        />
        <Input
          name="name"
          onChange={handleInputChange}
          placeholder="Введите код из письма"
          value={formData.token ?? ''}
          type="text"
          extraClass="mb-6"
        />
        <Button
          onClick={() => {
            void onSaveNewPassword();
          }}
          type="primary"
          htmlType="submit"
          extraClass="mb-20"
          disabled={!isFormValid}
        >
          Сохранить
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
