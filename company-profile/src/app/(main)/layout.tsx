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
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
