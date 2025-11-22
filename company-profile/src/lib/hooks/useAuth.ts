"use client";

import { useAuthStore } from "../stores";

export function useAuth() {
  const { user, token, login, signup, logout, checkSession, isLoading, error } =
    useAuthStore();

  return {
    user,
    token,
    login,
    signup,
    logout,
    checkSession,
    isLoading,
    error,
  };
}
