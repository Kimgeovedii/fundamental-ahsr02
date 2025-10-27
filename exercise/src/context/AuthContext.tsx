"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Backendless from "@/lib/backendless";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: Backendless.User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Backendless.User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = Backendless.UserService.loggedInUser();
    if (currentUser) {
      Backendless.UserService.getCurrentUser().then((data) => {
        setUser(data);
      });
    }
  }, []);

  async function login(email: string, password: string) {
    try {
      const loggedInUser = await Backendless.UserService.login(email, password);
      setUser(loggedInUser);
      router.push("/");
    } catch (error: any) {
      alert("Login failed : " + error.message);
    }
  }

  function logout() {
    Backendless.UserService.logout().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
