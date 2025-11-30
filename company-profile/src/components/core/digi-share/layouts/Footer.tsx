"use client";
import * as React from "react";
import Link from "next/link";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
interface DigiShareFooterLocale {
  description: string;
  quick_links: {
    title: string;
    links: { label: string; url: string }[];
  };
  company: {
    title: string;
    links: { label: string; url: string }[];
  };
  copyright: string;
}

const DigiShareFooter = () => {
  const { lang, hydrated } = useHydratedLanguageStore();
  const [footerData, setFooterData] =
    React.useState<DigiShareFooterLocale | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoading(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.digi_share_footer) {
            setFooterData(data.digi_share_footer as DigiShareFooterLocale);
          }
        })
        .catch(() => {
          setFooterData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lang, hydrated]);

  if (isLoading || !hydrated || !footerData) {
    return (
      <footer className="relative z-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="py-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 animate-pulse">
              Loading footer...
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative z-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center">
            <Link
              href={"/"}
              className="text-base text-gray-600 dark:text-gray-300 hover:underline"
            >
              {footerData.copyright}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DigiShareFooter;
