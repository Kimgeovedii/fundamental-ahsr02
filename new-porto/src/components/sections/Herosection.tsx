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
      {/* === Background Spline === */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <Spline scene="https://prod.spline.design/ViTokwLBiTogDQj9/scene.splinecode" />
      </div>

      {/* === Konten Tengah === */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 md:px-0">
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Kim Geovedi
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-gray-300 dark:text-gray-700"
        >
          Software Engineer (3+ yrs) skilled in{" "}
          <span className="font-semibold text-white dark:text-gray-900">
            React, Next.js, Laravel,
          </span>{" "}
          and{" "}
          <span className="font-semibold text-white dark:text-gray-900">
            Vue.js
          </span>
          . Strong in{" "}
          <span className="font-semibold text-white dark:text-gray-900">
            COBIT 2019
          </span>{" "}
          &{" "}
          <span className="font-semibold text-white dark:text-gray-900">
            TOGAF
          </span>{" "}
          for aligning software with business and enterprise quality.
        </motion.p>

        <div className="relative mt-8 flex justify-center">
          <a
            href="/assets/cv/my-cv.pdf"
            download="Kim-Geovedi-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 px-8 py-3 rounded-full font-medium shadow-lg transition-all 
            bg-indigo-600 hover:bg-indigo-700 text-white 
            dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white"
          >
            Download My Resume
          </a>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 text-gray-400 dark:text-gray-700 text-3xl z-10 cursor-pointer select-none"
        onClick={handleScroll}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, color: "#a78bfa" }}
      >
        ↓
      </motion.div>
      {/* Penutup watermark Spline */}
      <div className="absolute bottom-0 right-0 w-48 h-16 bg-[#19113d] dark:bg-gray-100 z-20"></div>
    </section>
  );
};

export default HeroSection;
