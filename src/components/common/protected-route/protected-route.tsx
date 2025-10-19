import { useAppSelector } from '@/hooks/store-hooks';
import { useCheckRoute } from '@/hooks/useCheckRoute';
import { isAuthorized } from '@/services/store/user.store';
import { useLocation } from 'react-router-dom';

type TProtectedRouteElement = {
  element: React.JSX.Element;
};

export const ProtectedRouteElement = ({
  element,
}: TProtectedRouteElement): React.JSX.Element | null => {
  const { pathname } = useLocation();
  const _isAuthorized = useAppSelector(isAuthorized);
  useCheckRoute(_isAuthorized, '/login', { prevPath: pathname });

  if (_isAuthorized) {
    return element;
  }

  return null;
};
