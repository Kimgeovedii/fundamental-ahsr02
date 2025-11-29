import { supabase } from "../supabase/client";
import { AuthUser } from "../types/auth";
import { authorService } from "./authorService";
import Cookies from "js-cookie";

export const authService = {
  async signup(email: string, password: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Failed to create user");

    return authData;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.session) throw new Error("Login invalid");

    Cookies.set("token", data.session.access_token, { 
      expires: 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });

    const author = await authorService.getByUserId(data.user.id);

    return {
      user: {
        id: data.user.id,
        email: data.user.email ?? "",
        displayName: author?.name ?? null,
        authorId: author?.id ?? null,
      },
      token: data.session.access_token,
    } satisfies {
      user: AuthUser;
      token: string;
    };
  },

  async logout() {
    await supabase.auth.signOut();
    Cookies.remove("token");
  },

  async checkSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (error || !session) {
        Cookies.remove("token");
        return null;
      }

      const author = await authorService.getByUserId(session.user.id);

      Cookies.set("token", session.access_token, { 
        expires: 7,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      });

      return {
        user: {
          id: session.user.id,
          email: session.user.email!,
          displayName: author?.name ?? null,
          authorId: author?.id ?? null,
        },
        token: session.access_token,
      };
    } catch (error) {
      console.error("Error checking session:", error);
      Cookies.remove("token");
      return null;
    }
  },
};
