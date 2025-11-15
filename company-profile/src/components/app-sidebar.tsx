"use client";

import * as React from "react";
import { MdDashboard, MdSettings } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { NavMain } from "@/components/nav-main";
import { BlogMenu } from "@/components/BlogMenu";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CompanyProfile } from "./CompanyProfile";
import { useAuthStore } from "@/lib/useAuthStore";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/cms",
      icon: MdDashboard,
      isActive: false,
    },
    {
      title: "Blogs",
      url: "/cms/blogs",
      icon: FaBlogger,
      isActive: true,
    },
    {
      title: "Stats",
      url: "/cms/stats",
      icon: ImStatsDots,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/cms/settings",
      icon: MdSettings,
      isActive: false,
    },
  ],

  projects: [
    {
      name: "Manage Blog",
      url: "/cms/blogs",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  const userData = user;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyProfile />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <BlogMenu />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            displayName: userData?.displayName || "",
            email: userData?.email || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
