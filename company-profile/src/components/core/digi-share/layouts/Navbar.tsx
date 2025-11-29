"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Languages, PenTool, Home, User, LogOut, Settings, Search, Menu } from "lucide-react";
import { getLocale } from "@/lib/get-locale";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DigiShareNavbarLocale {
  home: string;
  timeline: string;
  search_users: string;
  write_post: string;
  login: string;
}

const DigiShareNavbar: React.FC = () => {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const { lang, toggleLang, hydrated } = useHydratedLanguageStore();

  const [localeData, setLocaleData] = React.useState<DigiShareNavbarLocale | null>(null);
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.digi_share_navbar) {
            setLocaleData(data.digi_share_navbar as DigiShareNavbarLocale);
          }
        })
        .catch(() => {
          // Silent fail - locale will use default
        })
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

  if (!hydrated || isLoadingLocale || !localeData) {
    return (
      <div className={navbarClasses}>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 md:py-4 px-4 sm:px-6">
          <div className="text-gray-900 dark:text-white font-bold text-lg sm:text-xl">
            Digi-Share
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 md:py-4 px-4 sm:px-6">
        <Link href="/digi-share" className="text-gray-900 dark:text-white font-bold text-lg sm:text-xl">
          Digi-Share
        </Link>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          <li>
            <Link
              href="/"
              className="text-gray-800 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              {localeData.home}
            </Link>
          </li>
          <li>
            <Link
              href="/digi-share/posts"
              className="text-gray-800 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {localeData.timeline}
            </Link>
          </li>
          <li>
            <Link
              href="/digi-share/search-users"
              className="text-gray-800 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Search className="w-4 h-4" />
              {localeData.search_users}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          {hydrated && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLang}
              className="hidden sm:flex text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-500 p-2 h-auto font-medium"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4 mr-1" />
              <span className="hidden lg:inline">{lang.toUpperCase()}</span>
            </Button>
          )}
          {isLoggedIn ? (
            <>
              <Button
                onClick={() => router.push("/digi-share/create")}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl shadow-lg hidden sm:flex items-center gap-2 whitespace-nowrap"
              >
                <PenTool className="w-4 h-4" />
                {localeData.write_post}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden sm:flex rounded-full h-10 w-10 p-0 focus-visible:ring-offset-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="User menu"
                  >
                    <Avatar className="h-9 w-9 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      {user?.avatar && (
                        <AvatarImage
                          src={user.avatar}
                          alt={user.displayName || "User"}
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="bg-gray-200 dark:bg-white text-blue-700 text-sm font-medium">
                        {getInitials(user?.displayName ?? undefined)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <DropdownMenuItem
                    onClick={() => router.push(`/digi-share/profile/${user?.authorId || ''}`)}
                    className="cursor-pointer text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/digi-share/manage")}
                    className="cursor-pointer text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/digi-share/profile/settings")}
                    className="cursor-pointer text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem
                    onClick={async () => {
                      await useAuthStore.getState().logout();
                      router.push("/digi-share");
                    }}
                    className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    variant="destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="sm:hidden text-gray-900 dark:text-white p-2"
                    aria-label="Open menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[300px] bg-white dark:bg-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-left text-gray-900 dark:text-white">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Home className="w-4 h-4" />
                        {localeData.home}
                      </Link>
                      <Link
                        href="/digi-share/posts"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        {localeData.timeline}
                      </Link>
                      <Link
                        href="/digi-share/search-users"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Search className="w-4 h-4" />
                        {localeData.search_users}
                      </Link>
                    </div>
                    {isLoggedIn && (
                      <div className="pt-4 px-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        <Button
                          onClick={() => {
                            router.push("/digi-share/create");
                            setMobileMenuOpen(false);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white justify-start py-2.5"
                        >
                          <PenTool className="w-4 h-4 mr-2" />
                          {localeData.write_post}
                        </Button>
                        <Link
                          href={`/digi-share/profile/${user?.authorId || ''}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <Link
                          href="/digi-share/manage"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Manage Post
                        </Link>
                        <Link
                          href="/digi-share/profile/settings"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                      </div>
                    )}
                    <div className="pt-4 px-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                      {hydrated && (
                        <Button
                          variant="ghost"
                          onClick={toggleLang}
                          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Languages className="w-4 h-4 mr-2" />
                          {lang.toUpperCase()}
                        </Button>
                      )}
                      {isLoggedIn ? (
                        <Button
                          variant="ghost"
                          onClick={async () => {
                            await useAuthStore.getState().logout();
                            setMobileMenuOpen(false);
                            router.push("/digi-share");
                          }}
                          className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      ) : (
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-colors mt-2"
                        >
                          {localeData.login}
                        </Link>
                      )}
                    </div>
                    {isLoggedIn && user && (
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="px-4 py-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-gray-300 dark:border-gray-600">
                              {user?.avatar && (
                                <AvatarImage
                                  src={user.avatar}
                                  alt={user.displayName || "User"}
                                  className="object-cover"
                                />
                              )}
                              <AvatarFallback className="bg-gray-200 dark:bg-white text-blue-700 text-sm font-medium">
                                {getInitials(user?.displayName ?? undefined)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user?.displayName || "User"}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition text-white text-xs sm:text-sm px-3 sm:px-5 py-2 rounded-xl shadow-lg whitespace-nowrap"
              >
                {localeData.login}
              </Link>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="sm:hidden text-gray-900 dark:text-white p-2"
                    aria-label="Open menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[300px] bg-white dark:bg-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-left text-gray-900 dark:text-white">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Home className="w-4 h-4" />
                        {localeData.home}
                      </Link>
                      <Link
                        href="/digi-share/posts"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        {localeData.timeline}
                      </Link>
                      <Link
                        href="/digi-share/search-users"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Search className="w-4 h-4" />
                        {localeData.search_users}
                      </Link>
                    </div>
                    <div className="pt-4 px-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                      {hydrated && (
                        <Button
                          variant="ghost"
                          onClick={toggleLang}
                          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Languages className="w-4 h-4 mr-2" />
                          {lang.toUpperCase()}
                        </Button>
                      )}
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-colors mt-2"
                      >
                        {localeData.login}
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DigiShareNavbar;

