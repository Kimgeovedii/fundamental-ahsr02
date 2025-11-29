"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "theme";

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const isDark = savedTheme === "dark";

    setDark(isDark);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, []);

  const toggleDark = () => {
    const newDark = !dark;
    setDark(newDark);

    document.documentElement.setAttribute(
      "data-theme",
      newDark ? "dark" : "light"
    );
    localStorage.setItem(THEME_KEY, newDark ? "dark" : "light");
  };

  return { dark, toggleDark };
}
