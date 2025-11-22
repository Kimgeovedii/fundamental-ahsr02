"use client";
import React from "react";
// Import tipe Variants
import { motion, Variants } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";

interface IWhyChooseUsSection {
  header: string;
  pillars: Array<{
    title: string;
    description: string;
  }>;
}

// 1. Terapkan tipe Variants pada containerVariants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Jeda antar animasi card
    },
  },
};

// 2. Terapkan tipe Variants pada itemVariants
const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      // TS sekarang tahu bahwa 'spring' adalah nilai yang valid untuk properti 'type'
      // karena Anda sudah mendefinisikan tipe Variants secara eksplisit.
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const WhyChooseUsSection = () => {
  const { lang, hydrated } = useHydratedLanguageStore();
  const [sectionData, setSectionData] =
    React.useState<IWhyChooseUsSection | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // (Bagian useEffect dan loading tetap sama)
  React.useEffect(() => {
    if (!hydrated) return;
    setIsLoading(true);
    getLocale(lang)
      .then((data: any) => data.whychooseus && setSectionData(data.whychooseus))
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

  const CIRCLE_SIZE_CLASS =
    "min-h-[350px] min-w-[350px] lg:min-h-[400px] lg:min-w-[400px]";
  const OVERLAP_CLASS = "lg:ml-[-80px]"; // Margin overlap

  return (
    <section className="py-24 px-4 sm:px-8 bg-gray-50 dark:bg-[#000000] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Judul Utama */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-white">
          {content.header}
        </h2>

        {/* Pilar (Gunakan motion.div untuk Container) */}
        <motion.div
          className="flex flex-col lg:flex-row justify-center items-center lg:items-start space-y-8 lg:space-y-0 lg:ml-[80px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animasi saat masuk viewport
          viewport={{ once: true, amount: 0.3 }} // Hanya animasi sekali
        >
          {content.pillars.map((pillar, index) => (
            // Card Pilar (Gunakan motion.div untuk Item)
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, zIndex: 20 }} // Efek hover dan z-index dinaikkan
              className={`
                // Ukuran & Overlap
                ${CIRCLE_SIZE_CLASS}
                ${index > 0 ? OVERLAP_CLASS : ""}
                ${index === content.pillars.length - 1 ? "z-10" : "z-0"} 

                // Bentuk & Flexbox
                rounded-full 
                flex flex-col items-center justify-center text-center

                // === BORDER HITAM 4PX & WARNA BACKGROUND BARU ===
                border-4 border-black dark:border-white
                bg-white/50 dark:bg-[#1A1A1A] 
                
                // Shadow
                shadow-2xl shadow-gray-300/50 dark:shadow-black/70
                
                // Padding & Transisi
                p-10 sm:p-12 transition-all duration-300
              `}
            >
              {/* Konten (Ikon, Judul, Deskripsi) - Sama */}
              <div
                className="w-16 h-16 mb-4 rounded-full flex items-center justify-center 
                  bg-black dark:bg-[#000000] ring-1 ring-inset ring-green-600/30 dark:ring-green-500/30"
              >
                <div className="text-green-600 dark:text-green-400">
                  <CheckCircle className="w-7 h-7 stroke-2 fill-green-600/10 dark:fill-green-400/10" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {pillar.title}
              </h3>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400 leading-relaxed max-w-[250px]">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
