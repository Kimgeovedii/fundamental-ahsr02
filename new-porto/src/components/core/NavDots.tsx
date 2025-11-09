"use client";

import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { Menu, X } from "lucide-react";

const NavDots: React.FC = () => {
  const sections = [
    "hero",
    "about",
    "skills",
    "portofolio",
    "experience",
    "testimonials",
    "contact",
  ];
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  useEffect(() => {
    const updateTheme = () => {
      const htmlTheme =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";
      setTheme(htmlTheme);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const handleScroll = useCallback(() => {
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const closest = sectionElements.find((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight / 3 &&
        rect.bottom > window.innerHeight / 3
      );
    });

    if (closest?.id) setActiveSection(closest.id);
  }, [sections]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    setMenuOpen(false);
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as any } as Transition, // 👈 Perbaikan di sini
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isMobile ? (
        <motion.div
          key="mobile"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed top-4 right-4 z-50"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`p-2 rounded-lg shadow-md transition-colors duration-300 ${
              theme === "dark"
                ? "bg-white text-gray-800 border border-gray-200"
                : "bg-gray-800 text-gray-100"
            }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`absolute right-0 mt-3 w-44 rounded-xl shadow-lg p-2 flex flex-col gap-1 text-sm font-medium backdrop-blur-md
                  ${
                    theme === "dark"
                      ? "bg-gray-800/90 text-white border border-gray-700"
                      : "bg-white/90 text-gray-900 border border-gray-200"
                  }`}
              >
                {sections.map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      id === activeSection
                        ? "bg-purple-500 text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          key="desktop"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col items-end space-y-6 z-50"
        >
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className="relative flex items-center group cursor-pointer"
            >
              <motion.span
                className={`absolute right-full mr-4 px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                  ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                initial={{ x: 10 }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </motion.span>

              <motion.span
                className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                  id === activeSection
                    ? "bg-purple-500 scale-125"
                    : theme === "dark"
                    ? "border border-gray-500 hover:bg-gray-400"
                    : "border border-gray-300 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavDots;
