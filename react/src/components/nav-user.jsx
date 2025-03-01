import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  IoMdCheckmarkCircleOutline,
  IoMdRemoveCircleOutline,
} from 'react-icons/io';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { appendBackendBaseUrl } from '@/lib/utils';
import { API } from '@/api/api';

import Cookies from 'js-cookie';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setUser } = useContext(UserContext);

  const handleUpdateAvailability = async () => {
    try {
      const response = await API.updateUserAvailability();
      setUser((prevUser) => ({
        ...prevUser,
        is_available: response.data.is_available,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <Avatar className="h-7 w-7 rounded-full">
                <AvatarImage
                  src={appendBackendBaseUrl(user.profile_photo_path)}
                  alt={user.name}
                />
                <AvatarFallback className="rounded-lg">
                  {user.first_name ? user.first_name[0].toUpperCase() : '?'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight bg-white">
                <div className="flex items-center gap-1">
                  <span className="truncate font-semibold">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="relative flex size-2 mx-1">
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full ${user.is_available ? 'bg-green-400' : 'bg-orange-400'} opacity-75`}
                    ></span>
                    <span
                      className={`relative inline-flex size-2 rounded-full ${user.is_available ? 'bg-green-500' : 'bg-orange-500'}`}
                    ></span>
                  </span>
                </div>
                <span className="truncate text-xs">{user.id_number}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={appendBackendBaseUrl(user.profile_photo_path)}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.first_name ? user.first_name[0].toUpperCase() : '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="truncate font-semibold">
                      {user.first_name} {user.last_name}
                    </span>
                    <span className="relative flex size-2 mx-1">
                      <span
                        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${user.is_available ? 'bg-green-400' : 'bg-orange-400'} opacity-75`}
                      ></span>
                      <span
                        className={`relative inline-flex size-2 rounded-full ${user.is_available ? 'bg-green-500' : 'bg-orange-500'}`}
                      ></span>
                    </span>
                  </div>
                  <span className="truncate text-xs">{user.id_number}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            {user.role !== 'admin' && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleUpdateAvailability}
              >
                {user.is_available ? (
                  <IoMdRemoveCircleOutline />
                ) : (
                  <IoMdCheckmarkCircleOutline />
                )}
                {user.is_available ? 'Set as away' : 'Set as available'}
              </DropdownMenuItem>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                Cookies.remove('Authorization');
                window.location.href = '/login';
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
