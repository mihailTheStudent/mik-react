import { ForgotPasswordPage } from '@/pages/forgot-password/forgot-password';
import { IngredientDetailsPage } from '@/pages/ingredient-details/ingredient-details';
import { LoginPage } from '@/pages/login/login';
import { MainPage } from '@/pages/main/main';
import { NotFoundPage } from '@/pages/not-found/not-found';
import { ProfilePage } from '@/pages/profile/profile';
import { RegisterPage } from '@/pages/register/register';
import { ResetPasswordPage } from '@/pages/reset-password/reset-password';
import { useRoutes } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';

export const App = (): React.JSX.Element => {
  const element = useRoutes([
    { path: '/', element: <MainPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/ingredients/:id', element: <IngredientDetailsPage /> },
    { path: '*', element: <NotFoundPage /> },
  ]);
  return (
    <>
      <AppHeader />
      <main>{element}</main>
    </>
  );
};

export default App;
