import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/core/Providers";
import React from "react";

import SocialSidebar from "@/components/core/SocialSidebar";
import NavDots from "@/components/core/NavDots";
import ThemeToggle from "@/components/core/ThemeToggle";
export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="transition-colors duration-500 "
      >
        <SocialSidebar />
        <NavDots />
        <ThemeToggle />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
