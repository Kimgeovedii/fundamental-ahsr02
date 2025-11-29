"use client";

import React from "react";
import Spline from "@splinetool/react-spline";
import LogoMarquee from "@/components/LogoMarquee";
import { ArrowRight } from "lucide-react";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";

interface HeroTranslations {
  title_part1: string;
  title_part2: string;
  description: string;
  cta_start: string;
  cta_discover: string;
  social_proof: Array<{ value: string; label: string }>;
}

export default function HeroSection() {
  const { lang, hydrated } = useHydratedLanguageStore();
  const [heroData, setHeroData] = React.useState<HeroTranslations | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    setIsLoading(true);
    getLocale(lang)
      .then((data: any) => data?.hero && setHeroData(data.hero))
      .finally(() => setIsLoading(false));
  }, [lang, hydrated]);

  if (isLoading || !heroData) {
    return (
      <div className="bg-white dark:bg-gray-900 py-24 px-4 sm:px-8 text-center">
        <Spinner />
      </div>
    );
  }

  const t = heroData;

  return (
    <section className="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col py-10 sm:py-0 relative overflow-hidden">
      <div
        className={`
          max-w-7xl mx-auto px-6
          flex flex-col ${!isMobile ? "md:flex-row" : "md:flex-col"}  
          items-center sm:justify-between justify-center 
          gap-10 md:gap-16 
          min-h-[calc(100vh-120px)]
          w-full
        `}
      >
        <div className="text-center md:text-left max-w-lg space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
            {t.title_part1}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto md:mx-0 leading-relaxed">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30 dark:shadow-blue-500/30 flex items-center gap-2 transition">
              {t.cta_start} <ArrowRight className="w-4 h-4" />
            </button>

            <button className="px-6 py-3 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl flex items-center gap-2 transition">
              {t.cta_discover} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMobile && (
          <div className="flex justify-center pointer-events-auto">
            <div className="w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] opacity-95">
              <Spline scene="/scene2.splinecode" />
            </div>
          </div>
        )}
      </div>

      <LogoMarquee />
    </section>
  );
}
