"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/stores";
import { useRouter } from "next/navigation";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { Languages, LogOut, BookOpen } from "lucide-react";
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
      ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      : "bg-transparent border-b border-transparent"
  }
`;

  if (!hydrated || isLoadingLocale) {
    return (
      <div className={navbarClasses}>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-gray-900 dark:text-white font-bold text-xl">
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
          <div className="text-gray-900 dark:text-white font-bold text-xl">
            Digiforma Tech
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-400 text-sm">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={link.url}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          {hydrated && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLang}
                className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-500 p-2 h-auto"
                aria-label="Toggle language"
              >
                <Languages className="w-4 h-4 mr-1" />
                {lang.toUpperCase()}
              </Button>
            </div>
          )}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full h-10 w-10 p-0 focus-visible:ring-offset-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="User menu"
                >
                  <Avatar className="h-9 w-9 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                    <AvatarFallback className="bg-gray-200 dark:bg-white text-blue-700 text-sm font-medium">
                      {getInitials(user?.displayName ?? undefined)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DropdownMenuItem
                  onClick={() => router.push("/digi-share")}
                  className="cursor-pointer text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Digi-Share
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem
                  onClick={async () => {
                    await useAuthStore.getState().logout();
                    router.push("/");
                  }}
                  className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  variant="destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/digi-share"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition text-white text-sm px-5 py-2 rounded-xl shadow-lg"
            >
              {localeData?.login || "Digi-share"}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
