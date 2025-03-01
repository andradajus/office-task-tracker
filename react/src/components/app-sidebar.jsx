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

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="cursor-pointer" />
    </Sidebar>
  );
}
