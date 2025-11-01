"use client";

import { motion, easeOut } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Laptop2 } from "lucide-react";

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({
  onFinish,
  duration = 6,
}: SplashScreenProps) {
  const [started, setStarted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  // Fungsi play sound
  const playSound = (url: string, volume = 0.6, delay = 0) => {
    setTimeout(() => {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.play().catch(() => {});
    }, delay * 1000);
  };

  // Jalankan animasi selesai
  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      onFinish();
    }, duration * 1000);
    return () => clearTimeout(timer);
  }, [started, duration, onFinish]);

  // Klik pertama untuk mulai animasi
  const handleStart = () => {
    if (started) return;
    setShowPrompt(false);
    setStarted(true);
    playSound("/sounds/Transition-woosh.mp3", 0.6, 0); // play langsung saat klik
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-[9999] cursor-pointer select-none"
      onClick={handleStart}
    >
      {/* Prompt awal */}
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="text-lg tracking-wider text-gray-300"
        >
          <span>Hai, There 🖐️</span>
          Click anywhere to continue
        </motion.div>
      )}

      {/* Setelah diklik */}
      {started && (
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Icon komputer */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [0, 1.2, 1],
            }}
            transition={{
              duration: 1.8,
              ease: easeOut,
              times: [0, 0.6, 1],
            }}
          >
            <Laptop2 className="w-24 h-24 text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text" />
          </motion.div>

          {/* Teks utama */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 1,
              ease: easeOut,
            }}
            className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Welcome to Kim Geovedi’s Portfolio
          </motion.h1>
        </motion.div>
      )}
    </div>
  );
}
