"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/lib/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { checkSession } = useAuthStore();
  const [Loading, setLoading] = React.useState(true);
  const pathname = usePathname();
  useEffect(() => {
    async function verify() {
      await checkSession();
      const currentUser = useAuthStore.getState().user;

      if (!currentUser) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
    verify();
  }, []);
  if (Loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>loading...</p>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink onClick={() => router.push("/cms")}>
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {pathname !== "/cms" && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="capitalize">
                        {pathname.split("/").pop()?.replace(/-/g, " ")}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
