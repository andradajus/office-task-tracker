import { UserProvider } from '@/context/UserContext';
import DashboardRoleNavigator from './DashboardRoleNavigator';

const DashboardLayout = () => {
  return (
    <UserProvider>
      <DashboardRoleNavigator />
    </UserProvider>
  );
};

export default DashboardLayout;
