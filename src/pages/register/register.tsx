import { useCheckRoute } from '@/hooks/useCheckRoute';
import { useForm } from '@/hooks/useForm';
import { useSafeLocation } from '@/hooks/useSafeLocation';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import styles from './register.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const { formData, isFormValid, handleInputChange, handleInputValidation } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const register = useCallback(() => {
    if (!isFormValid) {
      return;
    }
  }, [formData]);

  const { state } = useSafeLocation<{ ok: boolean }>();
  useCheckRoute(state?.ok, '/login');

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form className={styles.form}>
        <Input
          name="name"
          onChange={handleInputChange}
          placeholder="Имя"
          value={formData.name ?? ''}
          type="text"
          extraClass="mb-6"
        />
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
        <Button onClick={register} type="primary" htmlType="submit" extraClass="mb-20">
          Зарегестрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегестрированы? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
};
