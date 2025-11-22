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
  // console.log(token); // Dinonaktifkan untuk output yang lebih bersih

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

  // --- LOGIKA SCROLL BARU ---
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Ubah status jika posisi scrollY melewati 50px
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    // Tambahkan event listener saat komponen dipasang (mount)
    window.addEventListener("scroll", handleScroll);

    // Hapus event listener saat komponen dilepas (unmount)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]); // Dependensi [isScrolled] memastikan efek berjalan jika status berubah

  // Tentukan kelas CSS berdasarkan status scroll
  const navbarClasses = `
    w-full fixed top-0 z-50 transition-all duration-300
    ${
      isScrolled
        ? "bg-black/80 backdrop-blur-md border-b border-white/10" // Saat di-scroll: buram, border, lebih gelap
        : "bg-transparent border-b border-transparent" // Default: transparan penuh, tanpa border
    }
  `;
  // --- END LOGIKA SCROLL BARU ---

  return (
    // Gunakan kelas yang ditentukan oleh state
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-white font-bold text-xl">Digiforma Tech</div>
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
            <Avatar className="h-9 w-9 border-2 border-white/80 hover:bg-white/30 cursor-pointer">
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
