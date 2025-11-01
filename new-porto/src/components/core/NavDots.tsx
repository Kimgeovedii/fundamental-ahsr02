"use client";
import { motion, animate } from "framer-motion";
import React, { useEffect, useState } from "react";

// Menggunakan tipe React.FC untuk definisi komponen
const NavDots: React.FC = () => {
  const sections = ["hero", "about", "skills", "work", "contact"];
  const [activeSection, setActiveSection] = useState("hero");

  // Fungsi untuk mendapatkan nama yang diformat (misal: "hero" -> "Hero")
  const getSectionName = (id: string) => {
    // Kapitalisasi huruf pertama
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Dapatkan semua elemen section
      const sectionElements = sections
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      // Cari section yang paling dekat dengan bagian atas viewport (misal: 1/3 layar)
      const closestSection = sectionElements.find((el) => {
        const rect = el.getBoundingClientRect();
        // Cek apakah section dimulai di bagian atas layar atau sedikit di bawahnya
        return (
          rect.top <= window.innerHeight / 3 &&
          rect.bottom > window.innerHeight / 3
        );
      });

      if (closestSection?.id) {
        setActiveSection(closestSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    // Tambahkan delay kecil untuk memastikan semua elemen termuat saat inisialisasi
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // Scroll ke posisi target dikurangi sedikit offset untuk centering visual
    const y = target.offsetTop;
    animate(window.scrollY, y, {
      duration: 0.8,
      onUpdate: (val) => window.scrollTo(0, val),
    });
  };

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end space-y-6 z-50 text-white">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`} // Tetap gunakan a href untuk aksesibilitas dan fallback
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(id);
          }}
          className="relative flex items-center group cursor-pointer"
        >
          {/* TOOLTIP/LABEL SECTION */}
          <motion.span
            className="absolute right-full mr-4 px-3 py-1 bg-gray-700 text-white text-xs font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={{ x: 10 }} // Pindahkan sedikit ke kanan
            whileHover={{ x: 0 }} // Kembali ke posisi saat hover
            transition={{ duration: 0.2 }}
          >
            {getSectionName(id)}
          </motion.span>

          {/* DOT */}
          <motion.span
            className={`block w-3 h-3 rounded-full transition-all duration-300 ${
              id === activeSection
                ? "bg-purple-500 scale-125"
                : "border border-gray-500 hover:bg-gray-400"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </a>
      ))}
    </div>
  );
};
export default NavDots;
