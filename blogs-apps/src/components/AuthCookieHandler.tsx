"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import Cookies from "js-cookie";

export function AuthCookieHandler() {
  const { userToken } = useAuthStore();

  useEffect(() => {
    if (userToken) {
      Cookies.set("user-token", userToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      console.log("Token disimpan di cookie");
    } else {
      Cookies.remove("user-token", { path: "/" });
      console.log("Token Berhasil dihapus dari cookie.");
    }
  }, [userToken]);
  return null;
}
