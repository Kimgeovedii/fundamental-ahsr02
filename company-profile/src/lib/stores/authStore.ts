import { create } from "zustand";
import { authService } from "../services";
import { AuthUser } from "../types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  signup: (email: string, pw: string, displayName: string) => Promise<boolean>;
  login: (email: string, pw: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  signup: async (email, pw, displayName) => {
    set({ isLoading: true, error: null });
    try {
      await authService.signup(email, pw, displayName);
      set({ isLoading: false });
      return true;
    } catch (e: any) {
      set({ isLoading: false, error: e.message });
      return false;
    }
  },

  login: async (email, pw) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.login(email, pw);
      set({ user: res.user, token: res.token, isLoading: false });
      return true;
    } catch (e: any) {
      set({ isLoading: false, error: e.message });
      return false;
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, token: null });
    return true;
  },

  checkSession: async () => {
    const res = await authService.checkSession();
    set({
      user: res?.user ?? null,
      token: res?.token ?? null,
    });
  },
}));
