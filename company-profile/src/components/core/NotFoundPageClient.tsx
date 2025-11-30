"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";

interface NotFoundPageData {
  title: string;
  subtitle: string;
  description: string;
  back_home: string;
  go_back: string;
  suggestions: {
    title: string;
    items: string[];
  };
}

export default function NotFoundPageClient() {
  const router = useRouter();
  const { lang, hydrated } = useHydratedLanguageStore();
  const [pageData, setPageData] = React.useState<NotFoundPageData | null>(null);
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.not_found_page) {
            setPageData(data.not_found_page as NotFoundPageData);
          } else {
            setPageData({
              title: "404",
              subtitle: "Page Not Found",
              description:
                "The page you are looking for does not exist or has been moved.",
              back_home: "Back to Home",
              go_back: "Go Back",
              suggestions: {
                title: "Here are some helpful links:",
                items: [
                  "Check the URL for typos",
                  "Visit our homepage",
                  "Browse our services",
                  "Contact support if the problem persists",
                ],
              },
            });
          }
        })
        .catch(() => {
          setPageData({
            title: "404",
            subtitle: "Page Not Found",
            description:
              "The page you are looking for does not exist or has been moved.",
            back_home: "Back to Home",
            go_back: "Go Back",
            suggestions: {
              title: "Here are some helpful links:",
              items: [
                "Check the URL for typos",
                "Visit our homepage",
                "Browse our services",
                "Contact support if the problem persists",
              ],
            },
          });
        })
        .finally(() => {
          setIsLoadingLocale(false);
        });
    }
  }, [lang, hydrated]);

  if (isLoadingLocale || !hydrated || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  const data = pageData;

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-12">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-24 h-24 sm:w-32 sm:h-32 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6"
          >
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600 dark:text-red-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {data.title}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4"
          >
            {data.subtitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base"
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12"
          >
            <Link href="/">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {data.back_home}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {data.go_back}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 sm:p-8 text-left"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              {data.suggestions.title}
            </h3>
            <ul className="space-y-3">
              {data.suggestions.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base"
                >
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
