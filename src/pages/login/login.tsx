import { ErrorMessage } from '@/components/common/error-message/error-message';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useCheckUnauthorizedRoute } from '@/hooks/useCheckUnauthorizedRoute';
import { useForm } from '@/hooks/useForm';
import { useSafeLocation } from '@/hooks/useSafeLocation';
import { clean, isError, isLoading, login } from '@/services/store/user.store';
import {
  Button,
  EmailInput,
  PasswordInput,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './login.module.css';

export const LoginPage = (): React.JSX.Element => {
  const {
    formData,
    isFormValid,
    handleInputChange,
    handleInputValidation,
    setFormData,
  } = useForm({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: '',
  });

  const _isError = useAppSelector(isError);
  useLayoutEffect(() => {
    setErrorMessage({
      ...errorMessage,
      visible: _isError,
    });
  }, [_isError]);

  const dispatch = useAppDispatch();
  const _isLoading = useAppSelector(isLoading);

  const onLogin = useCallback(() => {
    dispatch(clean());

    if (!isFormValid) {
      return;
    }

    void dispatch(login(formData));
  }, [formData]);

  const { state } = useSafeLocation<{
    email: string;
    password: string;
    prevPath: string;
  }>();
  if (state) {
    const { email, password } = state;
    setFormData({
      ...formData,
      email,
      password,
    });
  }

  useCheckUnauthorizedRoute(state?.prevPath ?? '/');

  if (_isLoading) {
    return <Preloader />;
  }

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form className={styles.form}>
        <EmailInput
          name="email"
          onChange={handleInputChange}
          checkValid={(isValid) => handleInputValidation(isValid, 'email')}
          placeholder="E-mail"
          value={formData.email ?? ''}
          extraClass="mb-6"
        />
        <PasswordInput
          icon="ShowIcon"
          name="password"
          onChange={handleInputChange}
          checkValid={(isValid) => handleInputValidation(isValid, 'password')}
          placeholder="Пароль"
          value={formData.password ?? ''}
          extraClass="mb-6"
        />
        <Button
          onClick={onLogin}
          type="primary"
          htmlType="submit"
          extraClass="mb-20"
          disabled={!isFormValid}
        >
          Войти
        </Button>
      </form>
      {errorMessage.visible ? <ErrorMessage message={errorMessage.message} /> : null}
      <p
        className={`text text_type_main-default text_color_inactive mb-4 ${errorMessage.visible ? 'mt-4' : ''}`}
      >
        Вы новый пользователь?{' '}
        <Link to="/register" state={{ ok: true }}>
          Зарегестироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link to="/forgot-password" state={{ ok: true }}>
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
};
