"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = "default",
  ...props
}) => {
  let baseClasses = "px-4 py-2 rounded-md transition-all";

  if (variant === "destructive") {
    baseClasses += " bg-red-600 text-white hover:bg-red-700 cursor-pointer";
  } else if (variant === "outline") {
    baseClasses +=
      " bg-white border border-fuchsia-700 text-fuchsia-700 hover:bg-fuchsia-50 cursor-pointer";
  } else if (variant === "ghost") {
    baseClasses +=
      " bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer";
  } else if (variant === "link") {
    baseClasses +=
      "bg-transparent text-gray-700 hover:bg-gray-100 underline cursor-pointer";
  } else {
    baseClasses +=
      " bg-fuchsia-700 text-white hover:bg-fuchsia-800 cursor-pointer";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
