"use client";
import React from "react";
import { LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/Sheet";
import { NavLink } from "./NavLink";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  isLoggedIn: boolean;
  userName?: string;
  onSignOut: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isLoggedIn,
  userName,
  onSignOut,
}) => {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-white text-black p-6 w-64">
        <div className="flex flex-col space-y-4 pt-6">
          <div className="border-b pb-4 mb-2">
            <span className="text-xl font-bold text-fuchsia-700">Menu</span>
          </div>
          <NavLink href="/dashboard" onClick={() => navigate("/dashboard")}>
            Home
          </NavLink>
          <NavLink href="/blogs" onClick={() => navigate("/blogs")}>
            Blog
          </NavLink>
          <NavLink href="/about" onClick={() => navigate("/about")}>
            About
          </NavLink>

          {isLoggedIn ? (
            <div className="pt-4 flex flex-col space-y-2 ">
              <span className="text-sm text-gray-500 flex items-center jus gap-1">
                <User className="w-4 h-4" /> Logged in as:
                <strong>{userName}</strong>
              </span>
              <Button
                onClick={onSignOut}
                variant="destructive"
                className="w-full flex justify-center items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col space-y-2">
              <Button
                onClick={() => navigate("/login")}
                className="w-full bg-fuchsia-700 hover:bg-fuchsia-800"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                variant="outline"
                className="w-full text-fuchsia-700 border-fuchsia-700 hover:bg-fuchsia-50"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
