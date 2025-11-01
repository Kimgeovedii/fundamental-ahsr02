"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const SocialSidebar: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  // Pantau perubahan data-theme di <html>
  useEffect(() => {
    const updateTheme = () => {
      const htmlTheme =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";
      setTheme(htmlTheme);
    };

    // Jalankan di awal
    updateTheme();

    // Observe perubahan atribut data-theme
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // 🎨 Warna disesuaikan (dibalik)
  const lineColor = theme === "dark" ? "bg-gray-600" : "bg-gray-300";
  const iconColor = theme === "dark" ? "text-gray-700" : "text-gray-200";
  const hoverColor =
    theme === "dark" ? "hover:text-purple-400" : "hover:text-purple-600";

  return (
    <div className="fixed left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center space-y-6 z-50 transition-colors duration-300">
      {/* Garis atas */}
      <div
        className={`w-[1px] h-16 ${lineColor} transition-colors duration-300`}
      />

      {/* GITHUB */}
      <motion.a
        href="https://github.com/Kimgeovedii"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Github
          className={`w-5 h-5 ${iconColor} ${hoverColor} transition-colors duration-300`}
        />
      </motion.a>

      {/* LINKEDIN */}
      <motion.a
        href="https://www.linkedin.com/in/mohamad-mustofa-hakim/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        whileHover={{ scale: 1.2, rotate: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Linkedin
          className={`w-5 h-5 ${iconColor} ${hoverColor} transition-colors duration-300`}
        />
      </motion.a>

      {/* EMAIL */}
      <motion.a
        href="mailto:mohamadmustofahakim@gmail.com"
        aria-label="Email"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Mail
          className={`w-5 h-5 ${iconColor} ${hoverColor} transition-colors duration-300`}
        />
      </motion.a>

      {/* Garis bawah */}
      <div
        className={`w-[1px] h-16 ${lineColor} transition-colors duration-300`}
      />
    </div>
  );
};

export default SocialSidebar;
