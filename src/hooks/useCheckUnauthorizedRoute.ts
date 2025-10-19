import { isAuthorized } from '@/services/store/user.store';

import { useAppSelector } from './store-hooks';
import { useCheckRoute } from './useCheckRoute';

export const useCheckUnauthorizedRoute = (redirect: string): void => {
  const _isAuthorized = useAppSelector(isAuthorized);
  useCheckRoute(!_isAuthorized, redirect);
};
