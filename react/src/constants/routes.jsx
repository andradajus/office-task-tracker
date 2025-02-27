import LoginPage from '@/pages/login/Login';
import Registration from '@/pages/registration/Registration';

export const ROUTES = [
  {
    path: '*',
    element: LoginPage,
  },
  {
    path: 'register',
    element: Registration,
  },
];
