import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import UserDashboard from '@/pages/dashboard/UserDashboard';

const DashboardRoleNavigator = () => {
  const { user } = useContext(UserContext);

  return <>{user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}</>;
};

export default DashboardRoleNavigator;
