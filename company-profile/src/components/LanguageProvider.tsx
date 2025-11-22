// ./src/components/LanguageProvider.tsx

"use client";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale"; // Fungsi dari langkah sebelumnya
import * as React from "react";

// Definisikan tipe untuk komponen bahasa yang dimuat
interface LanguageProviderProps {
  children: React.ReactNode;
}

// Global object untuk menyimpan data bahasa yang dimuat
let loadedTranslations: any = {};

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const lang = useLanguageStore((state) => state.lang);
  const [translations, setTranslations] = React.useState(
    loadedTranslations[lang]
  );

  React.useEffect(() => {
    // Muat file bahasa (JSON) saat bahasa berubah
    const loadTranslations = async () => {
      if (!loadedTranslations[lang]) {
        // Asumsi getLocale adalah fungsi async yang mengambil data JSON
        const data = await getLocale(lang);
        loadedTranslations[lang] = data;
      }
      setTranslations(loadedTranslations[lang]);
    };

    loadTranslations();
  }, [lang]);

  // Sediakan context atau hanya render children dengan prop bahasa
  // Karena kita menggunakan Zustand, children sudah bisa mengakses 'lang'.
  // Disini kita bisa membuat Context baru agar komponen anak bisa mengakses data terjemahan (t) juga.

  // NOTE: Untuk simplisitas, anggap semua komponen anak akan menggunakan hook useLanguageStore()
  // dan menggunakan data terjemahan yang sama seperti simulasi di langkah sebelumnya.

  return (
    // Kita bisa menyediakan data terjemahan ke children melalui prop atau context,
    // tapi untuk saat ini, kita biarkan children menggunakan useLanguageStore()
    // dan memuat data terjemahan di level komponen masing-masing untuk efisiensi.
    <>{children}</>
  );
};

export default LanguageProvider;
