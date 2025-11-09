import { create } from "zustand";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthCredentials {
  name: string;
  email: string;
  password: string;
}

interface UserSession {
  userToken: string | null;
  userName: string | null;
  objectId?: string;
  userData?: Record<string, any>;
}

interface AuthState extends UserSession {
  isSigningUp: boolean;
  signUpError: string | null;
  isSignedUp: boolean;

  isSigningIn: boolean;
  signInError: string | null;

  _hasHydrated: boolean;

  resetState: () => void;
  signUp: (credentials: AuthCredentials) => Promise<void>;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userToken: null,
      userName: null,
      objectId: undefined,
      userData: undefined,

      isSigningUp: false,
      signUpError: null,
      isSignedUp: false,

      isSigningIn: false,
      signInError: null,

      _hasHydrated: false,
      resetState: () =>
        set({
          signUpError: null,
          signInError: null,
          isSignedUp: false,
        }),

      signUp: async (credentials) => {
        set({ isSigningUp: true, signUpError: null, isSignedUp: false });
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_URL}/data/Users`,
            {
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            }
          );

          console.log("Pendaftaran Berhasil:", response.data);
          set({ isSignedUp: true });
        } catch (error) {
          let errorMessage = "Pendaftaran gagal. Coba lagi.";
          if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data?.message || errorMessage;
          }
          set({ signUpError: errorMessage });
        } finally {
          set({ isSigningUp: false });
        }
      },

      signIn: async (credentials) => {
        set({ isSigningIn: true, signInError: null });
        try {
          const payload = {
            login: credentials.email,
            password: credentials.password,
          };

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_URL}/users/login`,
            payload
          );

          const data = response.data;
          const token = data["user-token"];

          Cookies.set("user-token", token, {
            expires: 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            path: "/",
          });

          console.log("Login Berhasil:", data);

          set({
            userToken: token,
            userName: data.name,
            signInError: null,
            objectId: data.objectId,
            userData: data,
          });
        } catch (error) {
          let errorMessage = "Login gagal. Cek kredensial Anda.";
          if (axios.isAxiosError(error) && error.response) {
            errorMessage =
              error.response.data?.message || "Email atau password salah.";
          }
          set({ signInError: errorMessage });
        } finally {
          set({ isSigningIn: false });
        }
      },

      signOut: () => {
        Cookies.remove("user-token", { path: "/" });

        set({
          userToken: null,
          userName: null,
          objectId: undefined,
          userData: undefined,
          isSigningIn: false,
          isSigningUp: false,
          signInError: null,
          signUpError: null,
        });
        console.log("Pengguna telah logout.");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userToken: state.userToken,
        userName: state.userName,
        objectId: state.objectId,
        userData: state.userData,
      }),

      onRehydrateStorage: () => (state) => {
        if (state) {
          (state as AuthState)._hasHydrated = true;
          console.log(
            "Zustand Hydrated:",
            (state as AuthState).userToken ? "Logged In" : "Logged Out"
          );
        }
      },
    }
  )
);
