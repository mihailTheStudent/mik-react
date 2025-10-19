import { useCallback } from 'react';
import { NavLink, useNavigate, useRoutes } from 'react-router-dom';

import { OrdersListPage } from './pages/orders-list/orders-list';
import { ProfileDetailsPage } from './pages/profile-details/profile-details';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const navigate = useNavigate();

  const onExit = useCallback(() => {
    void navigate('/login');
  }, []);

  const navMessage = 'В этом разделе вы можете изменить свои персональные данные';

  const elements = useRoutes([
    { path: '/', element: <ProfileDetailsPage /> },
    { path: '/orders', element: <OrdersListPage /> },
  ]);

  return (
    <section className={styles.page}>
      <nav className={`mr-15 ${styles.nav}`}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? styles.active : ''} ${styles.nav_button}`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? styles.active : ''} ${styles.nav_button}`
          }
        >
          История заказов
        </NavLink>
        <p
          className={`text text_type_main-medium mb-20 ${styles.nav_button}`}
          onClick={onExit}
        >
          Выход
        </p>
        <p className="text text_type_main-default text_color_inactive">{navMessage}</p>
      </nav>
      {elements}
    </section>
  );
};
