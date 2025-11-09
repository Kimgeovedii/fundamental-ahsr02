"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    else router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleNavigation}
      className={`text-lg font-medium transition-colors hover:text-fuchsia-700 ${
        className || ""
      }`}
    >
      {children}
    </a>
  );
};
