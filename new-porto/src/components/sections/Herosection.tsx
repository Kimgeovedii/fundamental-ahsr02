import { motion } from "framer-motion";
import React, { useCallback } from "react";
// Peringatan: Pastikan package ini terinstal di lingkungan Anda
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
      className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#0a0a1a] to-[#1a1240] text-white overflow-hidden"
    >
      {/* === Spline Background (DIKEMBALIKAN) === */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <Spline
          scene="https://prod.spline.design/ViTokwLBiTogDQj9/scene.splinecode"
          // Opsional: className="hide-spline-watermark" jika Anda menggunakan Spline Pro
        />
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 md:px-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Kim Geovedi
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
        >
          Software Engineer (3+ yrs) skilled in{" "}
          <span className="font-semibold text-white">
            React, Next.js, Laravel,
          </span>{" "}
          and <span className="font-semibold text-white">Vue.js</span>. Strong
          in <span className="font-semibold text-white">COBIT 2019</span> &{" "}
          <span className="font-semibold text-white">TOGAF</span> for aligning
          software with business and enterprise quality.
        </motion.p>

        {/* Tombol View My Work */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative mt-8 flex justify-center"
        >
          <button className="relative z-20 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-medium transition-all shadow-lg">
            View My Work
          </button>
        </motion.div>
      </div>

      {/* DOWN ARROW */}
      <motion.div
        className="absolute bottom-10 text-gray-400 text-3xl z-10 cursor-pointer select-none"
        onClick={handleScroll}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, color: "#a78bfa" }}
      >
        ↓
      </motion.div>

      {/* DIV PENUTUP WATERMARK DI KANAN BAWAH */}
      <div className="absolute bottom-0 right-0 w-48 h-16 bg-[#1a1240] z-20"></div>
    </section>
  );
};

export default HeroSection;
