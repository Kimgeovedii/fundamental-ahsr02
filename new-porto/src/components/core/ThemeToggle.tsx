"use client";

import { MoonStar, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function ThemeToggle() {
  const { dark, toggleDark } = useDarkMode();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleDark}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
                 bg-gray-800 dark:bg-gray-700 
                 text-yellow-400 dark:text-gray-200 
                 shadow-lg transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {dark ? <Sun size={22} /> : <MoonStar size={22} />}
    </motion.button>
  );
}
