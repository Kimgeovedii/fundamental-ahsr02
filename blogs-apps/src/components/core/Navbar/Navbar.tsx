"use client";
import React from "react";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { MobileMenu } from "./MobileMenu";

const Navbar: React.FC = () => {
  const { userName, userToken, signOut, isSigningIn } = useAuthStore();
  const router = useRouter();
  console.log(isSigningIn);
  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <NavLink href="/" className="text-fuchsia-700 hover:text-fuchsia-800">
            <span className="text-2xl font-extrabold tracking-tight">
              Bloggers Bro
            </span>
          </NavLink>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/dashboard">Home</NavLink>
          <NavLink href="/blogs">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4 ">
          {userToken ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 p-2 bg-gray-100 rounded-full border border-gray-200">
                <User className="w-5 h-5 text-fuchsia-700" />
                <span className="font-semibold text-gray-700">
                  {userName || "User"}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleSignOut}
                className="transition-transform duration-300 hover:scale-[1.02] flex justify-center items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <NavLink href="/login">
                <Button variant="outline">Login</Button>
              </NavLink>
              <NavLink href="/signup">
                <Button className="bg-fuchsia-700 hover:bg-fuchsia-800 transition-colors">
                  Sign Up
                </Button>
              </NavLink>
            </div>
          )}
        </div>
        <MobileMenu
          isLoggedIn={userToken ? true : false}
          userName={userName ?? "User"}
          onSignOut={handleSignOut}
        />
      </div>
    </header>
  );
};

export default Navbar;
