"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Sesuaikan path ini
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";

interface IFAQSection {
  header: string;
  items: Array<{
    id: string;
    question: number;
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
      <div className="bg-[#0B0E14] text-white py-24 px-4 sm:px-8 text-center">
        <Spinner />
      </div>
    );
  }
  const content = sectionData;

  if (!content) return <div>Error: Language content not found.</div>;

  // Nilai default untuk memastikan item pertama terbuka (sesuai desain)
  const defaultValue = `item-${content.items[0]?.id}`;

  return (
    // Container Utama: Latar belakang gelap seperti desain
    <section className="py-24 px-4 sm:px-8 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Judul Utama */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-white text-center">
          {content.header}
        </h2>

        {/* Accordion dari Shadcn UI */}
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultValue}
          className="w-full"
        >
          {content.items.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className={`
                // Container item
                mt-4 first:mt-0 
                rounded-xl shadow-lg transition-all duration-300 
                
                // Dark Mode: Latar belakang dan border eksklusif
                bg-gray-50 dark:bg-[#111111] 
                border border-gray-200 dark:border-gray-800 
                
                // Item aktif memiliki latar belakang dan border berbeda (sesuai desain)
                data-[state=open]:dark:bg-[#181818] data-[state=open]:dark:border-blue-600/30
                data-[state=open]:bg-white data-[state=open]:border-blue-600/20
              `}
            >
              <AccordionTrigger
                className="
                  // Padding dan Flex
                  py-4 px-6 md:px-8 flex justify-between items-center text-left 
                  
                  // Text Style & Warna
                  text-lg font-semibold 
                  text-gray-900 dark:text-white
                  
                  // Shadcn: Hapus border default
                  data-[state=open]:border-b-0 border-b-transparent
                  hover:no-underline 
                "
              >
                <div className="flex items-start gap-4">
                  {/* Nomor Pertanyaan (01, 02, dst.) */}
                  <span
                    className={`
                      text-sm font-bold w-6 h-6 flex-shrink-0
                      text-blue-600 dark:text-blue-500
                    `}
                  >
                    {/* Format angka menjadi 01, 02, ... */}
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Teks Pertanyaan */}
                  <span className="flex-1">{item.question}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent
                className={`
                  // Padding Konten
                  pb-6 pt-0 px-6 md:px-8 
                  
                  // Text Style & Warna
                  text-base leading-relaxed 
                  text-gray-600 dark:text-gray-400
                  
                  // Konten item pertama yang terbuka (sesuai desain)
                  ${index === 0 ? "data-[state=open]:border-none" : ""}
                `}
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
