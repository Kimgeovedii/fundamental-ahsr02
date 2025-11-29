"use client";
import * as React from "react";
import { useAuthStore } from "@/lib/stores";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkSession } = useAuthStore();
  const [hasChecked, setHasChecked] = React.useState(false);

  React.useEffect(() => {
    const initializeAuth = async () => {
      if (hasChecked) return;

      try {
        await checkSession();
      } catch (error) {
      } finally {
        setHasChecked(true);
      }
    };

    initializeAuth();
  }, [checkSession, hasChecked]);

  return <>{children}</>;
}
