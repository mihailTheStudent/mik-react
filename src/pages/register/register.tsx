import { ErrorMessage } from '@/components/common/error-message/error-message';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useCheckRoute } from '@/hooks/useCheckRoute';
import { useCheckUnauthorizedRoute } from '@/hooks/useCheckUnauthorizedRoute';
import { useForm } from '@/hooks/useForm';
import { useSafeLocation } from '@/hooks/useSafeLocation';
import { isLoading, isError, clean, register } from '@/services/store/user.store';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './register.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const { formData, formErrors, isFormValid, handleInputChange, handleInputValidation } =
    useForm({
      name: '',
      email: '',
      password: '',
    });

  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: '',
  });

  const dispatch = useAppDispatch();
  const _isLoading = useAppSelector(isLoading);
  const _isError = useAppSelector(isError);

  useLayoutEffect(() => {
    setErrorMessage({
      ...errorMessage,
      visible: _isError,
    });
  }, [_isError]);

  const onRegister = useCallback(() => {
    dispatch(clean());

    if (!isFormValid) {
      return;
    }

    void dispatch(register(formData));
  }, [formData]);

  const onNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleInputChange(e);
    handleInputValidation(!!e.target.value, 'name');
  };

  const { state } = useSafeLocation<{ ok: boolean }>();
  useCheckRoute(state?.ok, '/login');
  useCheckUnauthorizedRoute('/');

  if (_isLoading) {
    return <Preloader />;
  }

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form className={styles.form}>
        <Input
          name="name"
          onChange={(e) => onNameInput(e)}
          placeholder="Имя"
          value={formData.name ?? ''}
          type="text"
          error={formErrors.name}
          errorText="Поле должно быть непустым"
          extraClass="mb-6"
        />
        <EmailInput
          name="email"
          onChange={(e) => handleInputChange(e)}
          checkValid={(isValid) => handleInputValidation(isValid, 'email')}
          placeholder="E-mail"
          value={formData.email ?? ''}
          extraClass="mb-6"
        />
        <PasswordInput
          icon="ShowIcon"
          name="password"
          onChange={(e) => handleInputChange(e)}
          checkValid={(isValid) => handleInputValidation(isValid, 'password')}
          placeholder="Пароль"
          value={formData.password ?? ''}
          extraClass="mb-6"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            onRegister();
          }}
          type="primary"
          htmlType="submit"
          extraClass="mb-20"
          disabled={!isFormValid}
        >
          Зарегестрироваться
        </Button>
      </form>
      {errorMessage.visible ? <ErrorMessage message={errorMessage.message} /> : null}
      <p
        className={`text text_type_main-default text_color_inactive ${errorMessage.visible ? 'mt-4' : ''}`}
      >
        Уже зарегестрированы? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
};
