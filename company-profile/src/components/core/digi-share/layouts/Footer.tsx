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
  const [footerData, setFooterData] = React.useState<DigiShareFooterLocale | null>(null);
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
        .catch((error) => {
          console.error("Failed to load digi-share footer locale data:", error);
          setFooterData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lang, hydrated]);

  if (isLoading || !hydrated || !footerData) {
    return (
      <footer className="relative z-10 bg-gray-900 dark:bg-gray-900 pt-20 lg:pt-[100px]">
        <div className="container">
          <div className="py-8 text-center">
            <p className="text-gray-400 dark:text-gray-500 animate-pulse">
              Loading footer...
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative z-10 bg-gray-900 dark:bg-gray-900 pt-20 lg:pt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-4/12">
            <div className="mb-10 w-full">
              <Link href="/digi-share" className="mb-6 inline-block">
                <div className="text-white font-bold text-2xl">
                  Digi-Share
                </div>
              </Link>
              <p className="mb-8 max-w-[270px] text-base text-gray-400 dark:text-gray-300">
                {footerData.description}
              </p>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white dark:text-white">
                {footerData.quick_links.title}
              </h4>
              <ul>
                {footerData.quick_links.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="mb-3 inline-block text-base text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white dark:text-white">
                {footerData.company.title}
              </h4>
              <ul>
                {footerData.company.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="mb-3 inline-block text-base text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 dark:border-gray-700 border-opacity-40 dark:border-opacity-40 py-8 lg:mt-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400 dark:text-gray-300">
              {footerData.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DigiShareFooter;

