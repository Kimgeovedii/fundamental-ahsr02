"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface IFAQSection {
  header: string;
  items: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}
const FaqSection = () => {
  const { lang, hydrated } = useHydratedLanguageStore();
  const [sectionData, setSectionData] = React.useState<IFAQSection | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    if (!hydrated) return;
    setIsLoading(true);
    getLocale(lang)
      .then((data: any) => data.faq && setSectionData(data.faq))
      .finally(() => setIsLoading(false));
  }, [lang, hydrated]);
  if (isLoading || !sectionData) {
    return (
      <div className="bg-white dark:bg-gray-900 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-1/2 mx-auto mb-12" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  const content = sectionData;

  if (!content) return <div>Error: Language content not found.</div>;

  const defaultValue = `item-${content.items[0]?.id}`;

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-gray-900 dark:text-white text-center"
        >
          {content.header}
        </motion.h2>

        <Accordion
          type="single"
          collapsible
          defaultValue={defaultValue}
          className="w-full"
        >
          {content.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full mb-4 sm:mb-5 md:mb-6 last:mb-0"
            >
              <AccordionItem
                value={`item-${item.id}`}
                className={`
                  rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 data-[state=open]:dark:bg-gray-900 data-[state=open]:dark:border-blue-600/30
                  data-[state=open]:bg-white data-[state=open]:border-blue-600/20
                  border-b-0
                `}
              >
                <AccordionTrigger
                  className="
                    py-3 sm:py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center text-left 
                    text-sm sm:text-base md:text-lg font-semibold 
                    text-gray-900 dark:text-white
                    data-[state=open]:border-b-0 border-b-transparent
                    hover:no-underline 
                  "
                >
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <span
                      className={`
                        text-xs sm:text-sm font-bold w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center
                        text-blue-600 dark:text-blue-500
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 pr-2 sm:pr-0">{item.question}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent
                  className={`
                    pb-4 sm:pb-6 pt-0 px-4 sm:px-6 md:px-8 
                    text-sm sm:text-base leading-relaxed 
                    text-gray-600 dark:text-gray-400
                    ${index === 0 ? "data-[state=open]:border-none" : ""}
                  `}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
