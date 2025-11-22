"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/stores";
import { useRouter } from "next/navigation";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { Languages } from "lucide-react";
import { getLocale } from "@/lib/get-locale";

interface NavLink {
  url: string;
  name: string;
}
interface LocaleData {
  navigation: NavLink[];
  login: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const { lang, toggleLang, hydrated } = useHydratedLanguageStore();

  const [localeData, setLocaleData] = React.useState<LocaleData | null>(null);
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          setLocaleData(data as LocaleData);
        })
        .catch(console.error)
        .finally(() => {
          setIsLoadingLocale(false);
        });
    }
  }, [lang, hydrated]);

  const getInitials = (name?: string): string => {
    if (!name) return "GS";
    const parts = name.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  const isLoggedIn = !!token && !!user;

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const navbarClasses = `
  w-full fixed top-0 z-50 transition-all duration-300
  ${
    isScrolled
      ? "bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-black/80 dark:backdrop-blur-md dark:border-b dark:border-white/10"
      : "bg-transparent border-b border-transparent"
  }
`;

  if (!hydrated || isLoadingLocale) {
    return (
      <div className={navbarClasses}>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className=" text-black dark:text-white font-bold text-xl">
            Digiforma Tech
          </div>
        </div>
      </div>
    );
  }

  const navLinks = localeData?.navigation || [];

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          {/* 1. Judul Brand */}
          <div className="text-gray-900 dark:text-white font-bold text-xl">
            Digiforma Tech
          </div>
        </div>

        {/* 2. Navigasi Utama */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700/80 dark:text-white/80 text-sm">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={link.url}
                // Warna hover disesuaikan untuk kedua mode
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 3. Aksi (Tombol Bahasa & Login) */}
        <div className="flex gap-4">
          {hydrated && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLang}
                // Warna teks default dan hover diubah agar terlihat di Light Mode
                className="text-gray-700/80 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors duration-500 p-2 h-auto"
                aria-label="Toggle language"
              >
                <Languages className="w-4 h-4 mr-1" />
                {lang.toUpperCase()}
              </Button>
            </div>
          )}
          {isLoggedIn ? (
            <Button
              variant="ghost"
              onClick={() => router.push("/cms/dashboard")}
              // Hover dan border disesuaikan
              className="rounded-full h-10 w-10 p-0 focus-visible:ring-offset-0 hover:bg-gray-200 dark:hover:bg-white/30 transition-colors"
              aria-label="User menu"
            >
              <Avatar className="h-9 w-9 border-2 border-gray-400 dark:border-white/80 hover:bg-gray-200 dark:hover:bg-white/30 cursor-pointer">
                <AvatarFallback className="bg-gray-200 dark:bg-white text-blue-700 text-sm font-medium">
                  {getInitials(user?.displayName ?? undefined)}
                </AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            // Tombol Login (Warna tetap, karena ini tombol aksi utama)
            <Link
              href="/login"
              className="bg-[#1A73E8] hover:bg-[#155AC1] transition text-white text-sm px-5 py-2 rounded-xl shadow-lg"
            >
              {localeData?.login || "Login"}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
