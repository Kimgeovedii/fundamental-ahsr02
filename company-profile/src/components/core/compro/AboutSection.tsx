"use client";
import * as React from "react";
import { HardHat, FileText, BarChart3, LucideIcon } from "lucide-react";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";

// --- 1. PETA IKON: Menghubungkan string dari JSON dengan komponen Lucide ---
const IconMap: { [key: string]: LucideIcon } = {
  HardHat: HardHat,
  FileText: FileText,
  BarChart3: BarChart3,
};

interface Solution {
  icon: keyof typeof IconMap;
  title: string;
  description: string;
}

interface AboutData {
  tagline_pre: string;
  tagline_main: string;
  tagline_accent: string;
  description: string;
  solutions: Solution[];
}

const AboutSection: React.FunctionComponent = () => {
  // Ambil state bahasa dan status hidrasi
  const { lang, hydrated } = useHydratedLanguageStore();

  // State untuk data about
  const [aboutData, setAboutData] = React.useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoading(true);
      getLocale(lang)
        .then((data: any) => {
          // Asumsi data yang dikembalikan memiliki key "about"
          if (data && data.about) {
            setAboutData(data.about as AboutData);
          }
        })
        .catch((error) => {
          console.error("Failed to load about section locale data:", error);
          setAboutData(null); // Atur ke null jika gagal
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lang, hydrated]); // Re-run ketika bahasa atau status hidrasi berubah

  // Tampilkan loading state atau null jika data belum siap
  if (isLoading || !hydrated || !aboutData) {
    return (
      <div className="bg-[#0B0E14] text-white py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 animate-pulse">Loading content...</p>
        </div>
      </div>
    );
  }

  // Gunakan data yang sudah dimuat
  const data = aboutData;

  return (
    // Container Utama (Background gelap)
    <div className="bg-white text-gray-900 dark:bg-[#0B0E14] dark:text-white py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER SECTION (GRID 2 KOLOM) === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 mb-16">
          {/* KOLOM KIRI: Judul Utama dengan Tagline */}
          <div>
            <p
              className="
            text-xs sm:text-sm font-semibold 
            uppercase tracking-widest 
            text-gray-500 dark:text-gray-400 
            mb-3 py-1 px-3 
            border border-gray-300 dark:border-gray-700/50 rounded-full 
            inline-block
          "
            >
              {data.tagline_pre}
            </p>

            {/* IMPLEMENTASI TAGLINE MULTIBHASA */}
            <h2
              className="
            text-4xl md:text-5xl lg:text-6xl 
            font-extrabold 
            text-gray-900 dark:text-white 
            tracking-tight
            mb-3
          "
            >
              {data.tagline_main} <br />
              <span className="text-indigo-600 dark:text-indigo-500">
                {data.tagline_accent}
              </span>
            </h2>
          </div>

          {/* KOLOM KANAN: Deskripsi Singkat */}
          <div className="flex items-end pt-4 lg:pt-0">
            <p
              className="
            text-lg 
            text-gray-600 dark:text-gray-400 
            leading-relaxed 
            lg:max-w-md
          "
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* --- HR --- */}
        <hr className="border-gray-200 dark:border-gray-700 my-16" />

        {/* === PILAR LAYANAN (3 KOLOM) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.solutions.map((solution, index) => {
            const IconComponent = IconMap[solution.icon];

            // Pastikan ikon ada sebelum dirender
            if (!IconComponent) {
              console.warn(
                `Icon component not found for key: ${solution.icon}`
              );
              return null;
            }

            return (
              <div
                key={index}
                className="p-8 bg-gray-50 dark:bg-[#181C26] rounded-xl border border-gray-200 dark:border-gray-700/50 
            hover:shadow-indigo-500/20 hover:shadow-2xl transition duration-300"
              >
                {/* Ikon: Menggunakan komponen yang dipetakan dari string */}
                <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-600/10 rounded-lg mb-6 text-indigo-600 dark:text-indigo-500">
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Judul Layanan Multibahasa */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {solution.title}
                </h3>

                {/* Deskripsi Layanan Multibahasa */}
                <p className="text-base text-gray-600 dark:text-gray-400 leading-normal">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
