import Footer from "@/components/core/compro/layouts/Footer";
import Navbar from "@/components/core/compro/layouts/Navbar";

import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
