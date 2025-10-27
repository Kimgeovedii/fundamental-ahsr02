import React, { FunctionComponent } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = (props) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-pink-200">
      <span className="text-xl font-bold">DashAPP</span>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4 text-base">
          <Link href="/blogs">
            <Button variant="ghost" className="hover:bg-pink-300">
              Blogs
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="hover:bg-pink-300">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="hover:bg-pink-300">
              Contact
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Link href="/signin">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-md px-4 py-2">
            Signin
          </Button>
        </Link>

        <Link href="/signup">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-md px-4 py-2">
            Signup
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
