"use client";
import Navbar from "@/components/core/compro/layouts/Navbar";
import { useAuthStore } from "@/lib/stores";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { checkSession } = useAuthStore();
  const [Loading, setLoading] = React.useState(true);
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
    <div>
      <Navbar />
      {children}
    </div>
  );
}
