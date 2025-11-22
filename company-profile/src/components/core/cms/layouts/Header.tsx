import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores";
import { LogOut, CodeXml, BookOpen, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onSettingsClick?: () => void;
}

export function Header({
  onLoginClick,
  onLogoutClick,
  onSettingsClick,
}: HeaderProps) {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    if (onLogoutClick) onLogoutClick();
    router.push("/login");
  };

  const handleLogin = () => {
    if (onLoginClick) onLoginClick();
    router.push("/login");
  };

  const getInitials = (name: string | undefined): string => {
    if (!name) return "GS";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };
  console.log(token);

  const AuthControl = () => {
    const isLoggedIn = !!token && !!user;

    if (isLoggedIn) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full h-10 w-10 p-0 focus-visible:ring-offset-0 hover:bg-white/30 transition-colors"
              aria-label="User menu"
            >
              <Avatar className="h-9 w-9 border-2 border-white/80">
                <AvatarFallback className="bg-white text-blue-700 text-sm font-medium">
                  {getInitials(user?.displayName ?? undefined)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">
                {user?.displayName || "Pengguna"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email || "Tidak ada email"}
              </p>
            </div>
            <DropdownMenuItem
              onClick={onSettingsClick}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button
        variant="secondary"
        onClick={handleLogin}
        className="flex items-center gap-2 bg-white text-blue-700 hover:bg-white/90"
      >
        <User className="w-4 h-4" />
        Login
      </Button>
    );
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm">
              <CodeXml className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">
                Digiforma Tech
              </h1>
              <p className="text-blue-100 text-sm">
                Excellence Digital Partner
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <Link
              href={"/"}
              className={`flex items-center gap-2 bg-white text-blue-700 hover:bg-white/90 h-9 px-4 py-2 has-[>svg]:px-3 rounded-lg font-semibold`}
            >
              <BookOpen className="w-4 h-4" />
              News & Updates
            </Link>

            <AuthControl />
          </nav>
        </div>
      </div>
    </header>
  );
}
