"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";
import bgParalax from "@/assets/img/bg-paralax.png";

interface IWhyChooseUsSection {
  heading: string;
  subheading: string;
  description: string;
  button_text: string;
}

const ParallaxContent = ({
  sectionRef,
  content,
}: {
  sectionRef: React.RefObject<HTMLDivElement>;
  content: IWhyChooseUsSection;
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  return (
    <>
      <div className="absolute inset-0 z-[1] bg-blue-600/70 dark:bg-blue-800/75 backdrop-blur-[1px]" />
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 border-2 border-blue-300/20 dark:border-blue-400/15 rounded-lg"
          style={{
            rotate: 45,
            x: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
            y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 border-2 border-blue-300/20 dark:border-blue-400/15 rounded-full"
          style={{
            x: useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]),
            y: useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]),
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-48 h-48 border-2 border-blue-300/20 dark:border-blue-400/15 rounded-lg"
          style={{
            rotate: -45,
            x: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]),
            y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 border-2 border-blue-300/20 dark:border-blue-400/15 rounded-full"
          style={{
            x: useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]),
            y: useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]),
          }}
        />
      </div>

      <motion.div
        className="relative z-[3] max-w-4xl mx-auto text-center"
        style={{ y: yText }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          {content.heading}
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold text-white/90 mb-6"
        >
          {content.subheading}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {content.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-xl text-lg transition-colors"
            size="lg"
          >
            {content.button_text}
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
};

const WhyChooseUsSection = () => {
  const { lang, hydrated } = useHydratedLanguageStore();
  const [sectionData, setSectionData] = useState<IWhyChooseUsSection | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [refReady, setRefReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setIsLoading(true);
    getLocale(lang)
      .then((data: any) => data.whychooseus && setSectionData(data.whychooseus))
      .finally(() => setIsLoading(false));
  }, [lang, hydrated]);

  const setRef = (node: HTMLDivElement | null) => {
    if (node) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      setTimeout(() => {
        setRefReady(true);
      }, 100);
    }
  };

  if (isLoading || !sectionData) {
    return (
      <div className="py-24 px-4 sm:px-8 text-center">
        <Spinner />
      </div>
    );
  }

  const content = sectionData;
  if (!content) return <div>Error: Language content not found.</div>;

  return (
    <section
      ref={setRef}
      className="relative py-24 md:py-32 px-4 sm:px-8 overflow-hidden min-h-[500px]"
    >
      {isMounted && refReady && ref.current ? (
        <ParallaxContent
          sectionRef={ref as React.RefObject<HTMLDivElement>}
          content={content}
        />
      ) : (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Modern office building"
              fill
              className="object-cover scale-110"
              priority
              unoptimized
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-blue-600/70 dark:bg-blue-800/75 backdrop-blur-[1px]" />
          <div className="relative z-[3] max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {content.heading}
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6">
              {content.subheading}
            </h3>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {content.description}
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-xl text-lg transition-colors"
              size="lg"
            >
              {content.button_text}
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default WhyChooseUsSection;
