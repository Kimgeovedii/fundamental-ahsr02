import React from "react";
import { create } from "zustand";

type Language = "id" | "en";
const LANGUAGE_KEY = "digiforma-lang";

const getInitialLang = (): Language => {
  if (typeof window !== "undefined") {
    const storedLang = localStorage.getItem(LANGUAGE_KEY) as Language;
    if (storedLang && ["id", "en"].includes(storedLang)) {
      return storedLang;
    }
  }

  if (typeof navigator !== "undefined") {
    const browserLocale = navigator.language.toLowerCase();
    if (browserLocale.includes("id")) {
      return "id";
    }
  }

  return "en";
};

interface LanguageState {
  lang: Language;
  setLang: (newLang: Language) => void;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: getInitialLang(),

  setLang: (newLang) => {
    set({ lang: newLang });
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, newLang);
    }
  },

  toggleLang: () =>
    set((state) => {
      const newLang = state.lang === "id" ? "en" : "id";
      if (typeof window !== "undefined") {
        localStorage.setItem(LANGUAGE_KEY, newLang);
      }
      return { lang: newLang };
    }),
}));

export const useHydratedLanguageStore = () => {
  const store = useLanguageStore();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  return { ...store, hydrated };
};
