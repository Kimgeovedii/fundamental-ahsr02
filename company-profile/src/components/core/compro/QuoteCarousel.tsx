const QUOTES_DATA = {
  en: [
    {
      quote:
        "That's when we knew there had to be a better way — a smarter, faster, more intuitive solution.",
      name: "John Doe",
      title: "Founder & CEO",
      buttonText: "Learn More",
    },
    {
      quote:
        "So we built a platform that empowers companies to transform raw data into real-time decisions using the power of AI.",
      name: "John Doe",
      title: "Founder & CEO",
      buttonText: "Learn More",
    },
    {
      quote:
        "We're here to make intelligent systems accessible, actionable, and aligned with real business goals.",
      name: "John Doe",
      title: "Founder & CEO",
      buttonText: "Learn More",
    },
  ],
  id: [
    {
      quote:
        "Saat itulah kami tahu harus ada cara yang lebih baik — solusi yang lebih cerdas, lebih cepat, dan lebih intuitif.",
      name: "John Doe",
      title: "Pendiri & CEO",
      buttonText: "Pelajari Lebih Lanjut",
    },
    {
      quote:
        "Jadi, kami membangun platform yang memberdayakan perusahaan untuk mengubah data mentah menjadi keputusan *real-time* menggunakan kekuatan AI.",
      name: "John Doe",
      title: "Pendiri & CEO",
      buttonText: "Pelajari Lebih Lanjut",
    },
    {
      quote:
        "Kami hadir untuk menjadikan sistem cerdas mudah diakses, dapat ditindaklanjuti, dan selaras dengan tujuan bisnis nyata.",
      name: "John Doe",
      title: "Pendiri & CEO",
      buttonText: "Pelajari Lebih Lanjut",
    },
  ],
};
type Language = keyof typeof QUOTES_DATA;

interface QuoteCarouselProps {
  lang: Language;
}

import { QuoteCarouselClient } from "./QuoteCarouselClient";
import { Button } from "@/components/ui/button";
export function QuoteCarousel({ lang }: QuoteCarouselProps) {
  const quotes = QUOTES_DATA[lang] || QUOTES_DATA.en;
  const headerText = lang === "en" ? "Why We Started" : "Mengapa Kami Memulai";

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          {headerText}
        </h2>
        <QuoteCarouselClient quotes={quotes} />

        <div className="mt-12 flex justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg">
            {quotes[0].buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
