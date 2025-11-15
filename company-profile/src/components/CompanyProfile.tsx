"use client";

import { FaDigitalOcean } from "react-icons/fa";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function CompanyProfile() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <FaDigitalOcean className="size-4" />
          </div>

          <div className="flex-1 text-left text-sm leading-tight flex items-center">
            <span className="truncate font-medium">Digiforma</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
