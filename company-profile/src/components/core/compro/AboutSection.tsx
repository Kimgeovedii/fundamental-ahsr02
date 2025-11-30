"use client";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface AboutData {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  button_text: string;
  experience: {
    years: string;
    label1: string;
    label2: string;
  };
}

const AboutSection: React.FunctionComponent = () => {
  const { lang, hydrated } = useHydratedLanguageStore();

  const [aboutData, setAboutData] = React.useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoading(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.about) {
            setAboutData(data.about as AboutData);
          }
        })
        .catch(() => {
          setAboutData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lang, hydrated]);

  if (isLoading || !hydrated || !aboutData) {
    return (
      <div className="bg-white dark:bg-gray-900 py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-5/6" />
            </div>
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const data = aboutData;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              {data.heading}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {data.paragraph1}
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {data.paragraph2}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md transition-colors"
                  size="lg"
                >
                  {data.button_text}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="row-span-2 relative w-full h-full min-h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700"
            >
              <Image
                src="/images/about/team-working-1.png"
                alt="Digiforma Tech Solution team working on IT consulting and software development"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700"
            >
              <Image
                src="/images/about/team-working-2.png"
                alt="Enterprise Architecture and IT Master Plan consulting collaboration"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 dark:bg-blue-500 rounded-lg p-6 md:p-8 shadow-xl flex items-center justify-center"
            >
              <div className="flex flex-col">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3"
                >
                  {data.experience.years}
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="space-y-0.5"
                >
                  <p className="text-white text-base md:text-lg font-medium">
                    {data.experience.label1}
                  </p>
                  <p className="text-white/90 text-sm md:text-base">
                    {data.experience.label2}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
