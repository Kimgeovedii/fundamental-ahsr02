"use client";

import { motion } from "framer-motion";
import React, { useCallback } from "react";
import Spline from "@splinetool/react-spline";

const HeroSection: React.FC = () => {
  const handleScroll = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center 
                   bg-gradient-to-b from-[#0a0a1a] to-[#1a1240] text-white 
                   dark:from-white dark:to-gray-100 dark:text-gray-900"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 relative w-full h-screen px-6 md:px-10 lg:px-26 2xl:px-46 py-10 md:py-0 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 z-10 w-full h-full opacity-60 lg:hidden"
        >
          <div className="w-full h-full">
            <Spline scene="https://prod.spline.design/ViTokwLBiTogDQj9/scene.splinecode" />
          </div>
        </motion.div>

        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center lg:items-start pt-10 md:pt-0">
          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left text-4xl 2xl:text-6xl md:text-3xl lg:text-4xl font-extrabold mb-4"
          >
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Kim Geovedi
            </span>
          </motion.h1>
          <div className="text-center lg:text-left mb-6  text-sm md:text-lg 2xl:text-2xl text-gray-400 dark:text-gray-600">
            <span className="font-bold text-white  dark:text-gray-900">
              Software Enggineer
            </span>{" "}
            & IT Governance Specialist
          </div>

          <motion.p
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-center lg:text-left text-sm md:text-md 2xl:text-md leading-relaxed max-w-lg text-gray-300 dark:text-gray-700 mb-8"
          >
            Software Engineer (3+ yrs) skilled in{" "}
            <span className="font-semibold text-white dark:text-gray-900">
              React, Next.js, Laravel, and Vue.js.
            </span>{" "}
            Strong in{" "}
            <span className="font-semibold text-white dark:text-gray-900">
              IT Governance & Enterprise Architecture
            </span>{" "}
            for aligning software with business and enterprise quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative mb-4 flex justify-center w-full lg:justify-start lg:w-auto">
              <a
                href="/assets/cv/my-cv.pdf"
                download="Kim-Geovedi-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full font-medium shadow-lg transition-all 
                        bg-indigo-600 hover:bg-indigo-700 text-white 
                        dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white"
              >
                Download My Resume
              </a>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex w-full h-full relative z-20 justify-center items-center">
          <div className="w-full h-full max-w-lg">
            <Spline scene="https://prod.spline.design/ViTokwLBiTogDQj9/scene.splinecode" />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-full h-16 bg-[#19113d] dark:bg-gray-100 z-30 "></div>
      </div>

      <motion.div
        className="absolute bottom-10 text-gray-400 dark:text-gray-700 text-3xl z-30 cursor-pointer select-none"
        onClick={handleScroll}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, color: "#a78bfa" }}
      >
        ↓
      </motion.div>
    </section>
  );
};

export default HeroSection;
