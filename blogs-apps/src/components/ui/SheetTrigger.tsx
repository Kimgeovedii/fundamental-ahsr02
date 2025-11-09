// components/SheetTrigger.tsx

"use client";
import React from "react";

interface SheetTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  [key: string]: any;
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({
  children,
  asChild,
  ...props
}) => {
  if (asChild) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, props);
    }
    console.error(
      "SheetTrigger must have a single valid child when using asChild."
    );
    return null;
  }
  return <div {...props}>{children}</div>;
};
