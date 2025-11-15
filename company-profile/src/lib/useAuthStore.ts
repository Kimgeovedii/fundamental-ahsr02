import { supabase } from "./supabaseClient";
import { create } from "zustand";
import Cookies from "js-cookie";
interface AuthUser {
  id: string;
  email: string;
  displayName?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signup: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkSession: () => Promise<void>;
}
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan. Coba lagi.";
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  signup: async (email, password, displayName) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });
      console.log("coba cek signup", error);
      if (error) throw error;

      set({ isLoading: false, error: error });
      return true;
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: getErrorMessage(error),
      });
      console.error("Signup error:", error);
      return false;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (!data || !data.session || !data.user)
        throw new Error("Data Login Tidak Valid");
      Cookies.set("token", data.session.access_token, {
        expires: 7,
      });
      set({
        user: {
          id: data.user.id,
          email: data.user.email ?? "",
          displayName: data.user.user_metadata?.display_name ?? null,
        },
        token: data.session.access_token,
        isLoading: false,
      });
      return true;
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: getErrorMessage(error),
      });
      console.error("Login Error", error);
      return false;
    }
  },
  logout: async () => {
    try {
      await supabase.auth.signOut();
      Cookies.remove("token");
      set({
        user: null,
        token: null,
        isLoading: false,
      });
      return true;
    } catch (error: unknown) {
      console.error("Logout Error: ", error);
      return false;
    }
  },
  checkSession: async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) {
      set({ user: null, token: null });
      Cookies.remove("token");
      return;
    }
    set({
      user: {
        id: session.user.id,
        email: session.user.email ?? "",
        displayName: session.user.user_metadata?.display_name ?? null,
      },
      token: session.access_token,
    });
  },
}));

supabase.auth.onAuthStateChange((_event, session) => {
  const store = useAuthStore.getState();
  if (!session) {
    Cookies.remove("token");
    store.logout;
    return;
  }
  Cookies.set("token", session.access_token);
  store.checkSession();
});
