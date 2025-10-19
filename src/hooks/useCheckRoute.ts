import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCheckRoute = (
  ok: boolean | Promise<boolean>,
  redirect: string
): void => {
  const navigate = useNavigate();
  const checkAndNavigate = useCallback((pageIsOk: boolean) => {
    if (pageIsOk) {
      return;
    }
    void navigate(redirect, { replace: true });
  }, []);

  useEffect(() => {
    if (typeof ok === 'boolean') {
      checkAndNavigate(ok);
    } else {
      ok.then(checkAndNavigate).catch(() => checkAndNavigate(false));
    }
  }, []);
};
