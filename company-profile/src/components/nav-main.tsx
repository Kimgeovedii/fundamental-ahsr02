"use client";

import { MdChevronRight } from "react-icons/md";
import type { IconType } from "react-icons";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"; // pastikan shadcn punya component Skeleton

export function NavMain({
  items,
  isLoading = false,
}: {
  items?: {
    title: string;
    url: string;
    icon?: IconType;
    isActive?: boolean;
  }[];
  isLoading?: boolean;
}) {
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton asChild className="w-full">
                  <div className="flex items-center gap-2 w-full">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24 ml-2 rounded" />
                    <Skeleton className="h-4 w-4 ml-auto rounded" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          : items?.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  onClick={() => router.push(item.url)}
                  className={`flex items-center gap-2 cursor-pointer ${
                    item.isActive ? "text-primary font-medium" : ""
                  }`}
                >
                  <div className="flex items-center w-full">
                    {item.icon && <item.icon size={18} />}
                    <span className="ml-2">{item.title}</span>
                    <MdChevronRight className="ml-auto opacity-60" size={18} />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
