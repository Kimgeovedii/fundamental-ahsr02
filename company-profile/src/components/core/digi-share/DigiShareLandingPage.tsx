"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpen, PenTool, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";
import { Skeleton } from "@/components/ui/skeleton";

interface DigiShareLandingPageData {
  hero: {
    heading: string;
    subheading: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
  };
  features: {
    heading: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  cta_section: {
    heading: string;
    description: string;
    button_text: string;
  };
}

const DigiShareLandingPage = () => {
  const router = useRouter();
  const { lang, hydrated } = useHydratedLanguageStore();
  const { token, user } = useAuthStore();
  const [pageData, setPageData] =
    React.useState<DigiShareLandingPageData | null>(null);
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.digi_share_landing) {
            setPageData(data.digi_share_landing as DigiShareLandingPageData);
          }
        })
        .catch(() => {
          setPageData(null);
        })
        .finally(() => {
          setIsLoadingLocale(false);
        });
    }
  }, [lang, hydrated]);

  const isLoggedIn = !!token && !!user;

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Users: <Users className="w-6 h-6" />,
      BookOpen: <BookOpen className="w-6 h-6" />,
      PenTool: <PenTool className="w-6 h-6" />,
      Sparkles: <Sparkles className="w-6 h-6" />,
    };
    return iconMap[iconName] || <BookOpen className="w-6 h-6" />;
  };

  if (isLoadingLocale || !hydrated || !pageData) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-20 md:py-32 px-4 sm:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Skeleton className="h-16 w-3/4 mx-auto bg-white/20" />
              <Skeleton className="h-8 w-2/3 mx-auto bg-white/20" />
              <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
                <Skeleton className="h-12 w-48 mx-auto bg-white/20" />
                <Skeleton className="h-12 w-48 mx-auto bg-white/20" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-10 w-1/3 mx-auto mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  const data = pageData;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-20 md:py-32 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {data.hero.heading}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-8">
              {data.hero.subheading}
            </p>
            <p className="text-lg text-blue-200 dark:text-blue-300 mb-10 max-w-2xl mx-auto">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                onClick={() => router.push("/digi-share/posts")}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto"
              >
                {data.hero.cta_primary}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              {!isLoggedIn && (
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/10 hover:text-white dark:border-white dark:text-white dark:hover:bg-white/20 font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 bg-transparent w-full sm:w-auto"
                  >
                    {data.hero.cta_secondary}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {data.features.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.features.items.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {data.cta_section.heading}
            </h2>
            <p className="text-lg text-blue-100 dark:text-blue-200 mb-8">
              {data.cta_section.description}
            </p>
            {!isLoggedIn ? (
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-white dark:text-blue-600 dark:hover:bg-blue-50 font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto"
                >
                  {data.cta_section.button_text}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            ) : (
              <Button
                onClick={() => router.push("/digi-share/create")}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-white dark:text-blue-600 dark:hover:bg-blue-50 font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto"
              >
                {data.cta_section.button_text}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default DigiShareLandingPage;
