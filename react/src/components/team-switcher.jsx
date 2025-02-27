import { DropdownMenu } from '@/components/ui/dropdown-menu';

import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="p-4">
          <DropdownMenu>
            <div className="flex w-full size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
              <img src="/ublogo.png" alt="User logo" className="w-12" />
            </div>
            <div className="grid flex-1 text-center text-sm leading-tight mt-3">
              <span className="truncate font-semibold">
                Quality Assurance Office
              </span>
            </div>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
