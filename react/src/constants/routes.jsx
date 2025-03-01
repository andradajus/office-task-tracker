import DashboardLayout from '@/layout/DashboardLayout';
import AdminSA from '@/pages/dashboard/admin/AdminSA';
import AdminStaff from '@/pages/dashboard/admin/AdminStaff';
import AdminTasks from '@/pages/dashboard/admin/AdminTasks';
import AdminDashboardHome from '@/pages/dashboard/AdminDashboardHome';
import UserTasksHistory from '@/pages/dashboard/user/UserTasksHistory';
import UserTasksMyTasks from '@/pages/dashboard/user/UserTasksMyTasks';
import UserTimeLogs from '@/pages/dashboard/user/UserTimeLogs';
import UserDashboardHome from '@/pages/dashboard/UserDashboardHome';
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
  {
    path: 'dashboard/*',
    element: DashboardLayout,
  },
];

export const DASHBOARD_ROUTES = [
  {
    path: '/*',
    element: UserDashboardHome,
  },
  {
    path: 'tasks/my-tasks',
    element: UserTasksMyTasks,
  },
  {
    path: 'tasks/history',
    element: UserTasksHistory,
  },
  {
    path: 'time/logs',
    element: UserTimeLogs,
  },
];

export const ADMIN_DASHBOARD_ROUTES = [
  {
    path: '/*',
    element: AdminDashboardHome,
  },
  {
    path: 'tasks',
    element: AdminTasks,
  },
  {
    path: 'staff',
    element: AdminStaff,
  },
  {
    path: 'sa',
    element: AdminSA,
  },
];
