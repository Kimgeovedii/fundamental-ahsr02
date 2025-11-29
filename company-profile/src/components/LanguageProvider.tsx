"use client";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import * as React from "react";

interface LanguageProviderProps {
  children: React.ReactNode;
}

let loadedTranslations: any = {};

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const lang = useLanguageStore((state) => state.lang);
  const [translations, setTranslations] = React.useState(
    loadedTranslations[lang]
  );

  React.useEffect(() => {
    const loadTranslations = async () => {
      if (!loadedTranslations[lang]) {
        const data = await getLocale(lang);
        loadedTranslations[lang] = data;
      }
      setTranslations(loadedTranslations[lang]);
    };

    loadTranslations();
  }, [lang]);

  return (
    <>{children}</>
  );
};

export default LanguageProvider;
