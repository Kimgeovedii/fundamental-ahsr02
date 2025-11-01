"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "darkModeEnabled";

export function useDarkMode() {
  const [dark, setDark] = useState(Cookies.get(COOKIE_NAME) === "true");

  useEffect(() => {
    Cookies.set(COOKIE_NAME, String(dark), {
      expires: 365,
      sameSite: "Lax",
    });

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleDark = () => setDark((prev) => !prev);

  return { dark, toggleDark };
}
