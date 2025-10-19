import { useForm } from '@/hooks/useForm';
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './profile-details.module.css';

export const ProfileDetailsPage = (): React.JSX.Element => {
  const { formData, handleInputChange, handleInputValidation } = useForm({
    name: '',
    email: '',
    password: '',
  });

  return (
    <form className={styles.form}>
      <Input
        icon="EditIcon"
        name="name"
        onChange={handleInputChange}
        placeholder="Имя"
        value={formData.name ?? ''}
        type="text"
        extraClass="mb-6"
      />
      <EmailInput
        name="email"
        isIcon
        onChange={handleInputChange}
        checkValid={(isValid) => handleInputValidation(isValid, 'email')}
        placeholder="E-mail"
        value={formData.email ?? ''}
        extraClass="mb-6"
      />
      <PasswordInput
        icon="EditIcon"
        name="password"
        onChange={handleInputChange}
        checkValid={(isValid) => handleInputValidation(isValid, 'password')}
        placeholder="Пароль"
        value={formData.password ?? ''}
      />
    </form>
  );
};
