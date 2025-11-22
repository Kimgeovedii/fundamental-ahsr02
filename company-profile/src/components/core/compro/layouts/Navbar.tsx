"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/stores";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, token } = useAuthStore();
  console.log(token);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Portfolio", url: "/portfolio" },
    { name: "About Us", url: "/about" },
    { name: "Careers", url: "/careers" },
  ];

  const getInitials = (name?: string): string => {
    if (!name) return "GS";
    const parts = name.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  const isLoggedIn = !!token && !!user;

  return (
    <nav className="w-full fixed top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-white font-bold text-xl">Catalyst Analytics</div>
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-white/80 text-sm">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={link.url}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {isLoggedIn ? (
          <Button
            variant="ghost"
            onClick={() => router.push("/cms/dashboard")}
            className="rounded-full h-10 w-10 p-0 focus-visible:ring-offset-0 hover:bg-white/30 transition-colors"
            aria-label="User menu"
          >
            <Avatar className="h-9 w-9 border-2 border-white/80">
              <AvatarFallback className="bg-white text-blue-700 text-sm font-medium">
                {getInitials(user?.displayName ?? undefined)}
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Link
            href="/login"
            className="bg-[#1A73E8] hover:bg-[#155AC1] transition text-white text-sm px-5 py-2 rounded-xl shadow-lg"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
