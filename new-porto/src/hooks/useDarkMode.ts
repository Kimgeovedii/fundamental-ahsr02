"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "theme"; // key di localStorage

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  // Cek localStorage saat komponen pertama kali jalan
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const isDark = savedTheme === "dark";

    // Set state dan update HTML data-theme
    setDark(isDark);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, []);

  // Toggle theme
  const toggleDark = () => {
    const newDark = !dark;
    setDark(newDark);

    // Update HTML dan simpan ke localStorage
    document.documentElement.setAttribute(
      "data-theme",
      newDark ? "dark" : "light"
    );
    localStorage.setItem(THEME_KEY, newDark ? "dark" : "light");
  };

  return { dark, toggleDark };
}
