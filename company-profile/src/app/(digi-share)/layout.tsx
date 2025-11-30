"use client";
import DigiShareNavbar from "@/components/core/digi-share/layouts/Navbar";
import DigiShareFooter from "@/components/core/digi-share/layouts/Footer";
import { useAuthStore } from "@/lib/stores";
import { authorService } from "@/lib/services/authorService";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DigiShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    const checkAuthor = async () => {
      if (!token || !user) {
        setChecking(false);
        return;
      }

      const publicRoutes = [
        "/digi-share",
        "/digi-share/posts",
        "/digi-share/search-users",
        "/digi-share/create-author",
      ];

      const isDetailPage = pathname?.match(/^\/digi-share\/[a-f0-9-]{36}$/);
      const isProfilePage = pathname?.match(
        /^\/digi-share\/profile\/[a-f0-9-]+$/
      );

      if (
        publicRoutes.includes(pathname || "") ||
        isDetailPage ||
        isProfilePage
      ) {
        setChecking(false);
        return;
      }

      const routesRequiringAuthor = [
        "/digi-share/create",
        "/digi-share/manage",
        "/digi-share/profile/settings",
        "/digi-share/edit",
      ];

      const requiresAuthor = routesRequiringAuthor.some((route) =>
        pathname?.startsWith(route)
      );

      if (!requiresAuthor) {
        setChecking(false);
        return;
      }

      try {
        const author = await authorService.getByUserId(user.id);

        if (!author) {
          router.push("/digi-share/create-author");
          return;
        }
      } catch (error) {
      } finally {
        setChecking(false);
      }
    };

    checkAuthor();
  }, [user, token, pathname, router]);

  if (checking && token && user && pathname !== "/digi-share/create-author") {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Skeleton className="h-16 w-full" />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="space-y-4 w-full max-w-md px-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div>
      <DigiShareNavbar />
      {children}
      <DigiShareFooter />
    </div>
  );
}
