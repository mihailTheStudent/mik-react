import { useState, useCallback } from 'react';

type FormErrors<T extends object> = {
  [key in keyof T]: boolean;
};

type TUseForm<T extends object> = {
  formData: T;
  formErrors: FormErrors<T>;
  isFormValid: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputValidation: (isValid: boolean, name: string) => void;
  setFormData: (data: T) => void;
};

export const useForm = <T extends object>(formState: T): TUseForm<T> => {
  const [formData, setFormData] = useState(formState);
  const [formErrors, setFormErrors] = useState<FormErrors<T>>(
    Object.keys(formState).reduce(
      (formErrorsObj, key) => ({ ...formErrorsObj, [key]: false }),
      {}
    ) as FormErrors<T>
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );
  const handleInputValidation = useCallback(
    (isValid: boolean, name: string) => {
      setFormErrors({
        ...formErrors,
        [name]: !isValid,
      });
    },
    [formData]
  );

  const isFormValid = (): boolean =>
    !Object.values(formErrors).some((isErroneous) => isErroneous);

  return {
    formData,
    formErrors,
    isFormValid: isFormValid(),
    handleInputChange,
    handleInputValidation,
    setFormData,
  };
};
