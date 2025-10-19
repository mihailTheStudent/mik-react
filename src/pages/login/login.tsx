import { useCheckRoute } from '@/hooks/useCheckRoute';
import { useForm } from '@/hooks/useForm';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import styles from './login.module.css';

export const LoginPage = (): React.JSX.Element => {
  const { formData, isFormValid, handleInputChange, handleInputValidation } = useForm({
    email: '',
    password: '',
  });

  const login = useCallback(() => {
    if (!isFormValid) {
      return;
    }
  }, [formData]);

  useCheckRoute(true, '/');

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
        <Button onClick={login} type="primary" htmlType="submit" extraClass="mb-20">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
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
