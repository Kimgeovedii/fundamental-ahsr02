"use client";
import React from "react";

interface SheetContentProps {
  children: React.ReactNode;
  side?: "left" | "right";
  [key: string]: any;
}

export const SheetContent: React.FC<SheetContentProps> = ({
  children,
  side = "right",
  ...props
}) => (
  <div
    className={`p-4 bg-white shadow-xl h-full fixed top-0 ${
      side === "right" ? "right-0" : "left-0"
    } w-64 z-50`}
    {...props}
  >
    {children}
  </div>
);
