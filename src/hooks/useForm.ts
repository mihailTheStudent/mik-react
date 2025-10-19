import { useState, useCallback } from 'react';

type TUseForm<T extends object> = {
  formData: T;
  isFormValid: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputValidation: (isValid: boolean, name: string) => void;
};

export const useForm = <T extends object>(formState: T): TUseForm<T> => {
  const [formData, setFormData] = useState(formState);
  const [formErrors, setFormErrors] = useState(
    Object.keys(formState).reduce(
      (formErrorsObj, key) => ({ ...formErrorsObj, [key]: false }),
      {}
    )
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }, []);
  const handleInputValidation = useCallback((isValid: boolean, name: string) => {
    setFormErrors({
      ...formErrors,
      [name]: !isValid,
    });
  }, []);

  const isFormValid = useCallback(() => {
    return !Object.values(formErrors).some((isErroneous) => isErroneous);
  }, [formData]);

  return {
    formData,
    isFormValid: isFormValid(),
    handleInputChange,
    handleInputValidation,
  };
};
