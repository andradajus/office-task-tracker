import { MdDashboard } from 'react-icons/md';
import { FaTasks, FaRegClock } from 'react-icons/fa';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { PiUsersThree } from 'react-icons/pi';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: MdDashboard,
      isActive: true,
      items: [
        {
          title: 'Home',
          url: '/dashboard',
        },
      ],
    },
    {
      title: 'Tasks',
      url: '#',
      icon: FaTasks,
      items: [
        {
          title: 'My Tasks',
          url: '/dashboard/tasks/my-tasks',
        },
        {
          title: 'History',
          url: '/dashboard/tasks/history',
        },
      ],
    },
    {
      title: 'Time',
      url: '#',
      icon: FaRegClock,
      items: [
        {
          title: 'Logs',
          url: '/dashboard/time/logs',
        },
      ],
    },
  ],
};

const adminData = {
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: MdDashboard,
      isActive: true,
      items: [
        {
          title: 'Home',
          url: '/dashboard',
        },
      ],
    },
    {
      title: 'Tasks',
      url: '#',
      icon: FaTasks,
      items: [
        {
          title: 'All Tasks',
          url: '/dashboard/tasks',
        },
      ],
    },
    {
      title: 'Time',
      url: '#',
      icon: FaRegClock,
      items: [
        {
          title: 'Logs',
          url: '/dashboard/time/logs',
        },
      ],
    },
    {
      title: 'Users',
      url: '#',
      icon: PiUsersThree,
      items: [
        {
          title: 'Staff',
          url: '/dashboard/staff',
        },
        {
          title: 'SA',
          url: '/dashboard/sa',
        },
      ],
    },
  ],
};

export function AppSidebar(props) {
  const { user } = useContext(UserContext);

  const navData = user.role === 'admin' ? adminData : data;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="cursor-pointer" />
    </Sidebar>
  );
}
