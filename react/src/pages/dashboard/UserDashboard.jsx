import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '@/constants/routes';
import { useEffect } from 'react';

const UserDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = DASHBOARD_ROUTES.find(route => route.path === location.pathname);
    console.log('Current Route:', location.pathname);
    console.log('Component to Render:', currentRoute ? currentRoute.element.name : 'Not Found');
  }, [location]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Routes>
          {DASHBOARD_ROUTES.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default UserDashboard;