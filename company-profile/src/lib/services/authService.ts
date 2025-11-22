import { supabase } from "../supabase/client";
import { AuthUser } from "../types/auth";
import Cookies from "js-cookie";

export const authService = {
  async signup(email: string, password: string, displayName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });

    if (error) throw error;
    return data;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.session) throw new Error("Login invalid");

    Cookies.set("token", data.session.access_token, { expires: 7 });

    return {
      user: {
        id: data.user.id,
        email: data.user.email ?? "",
        displayName: data.user.user_metadata?.display_name ?? null,
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
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) return null;

    return {
      user: {
        id: session.user.id,
        email: session.user.email!,
        displayName: session.user.user_metadata?.display_name ?? null,
      },
      token: session.access_token,
    };
  },
};
