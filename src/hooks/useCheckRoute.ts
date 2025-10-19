import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCheckRoute = (ok: boolean, redirect: string): void => {
  const navigate = useNavigate();

  useEffect(() => {
    if (ok) {
      return;
    }
    void navigate(redirect, { replace: true });
  }, []);
};
