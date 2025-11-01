"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Dashboard Monitoring Pendapatan & Aset Tetap",
    image: "https://placehold.co/400x200/4F46E5/white?text=FixAsset+Dashboard",
    description:
      "A comprehensive data visualization system for PT LPP Agro Nusantara, integrating revenue and asset information with Google Maps for geographic insights. Built to support strategic decision-making and optimize company asset management.",
  },
  {
    id: 2,
    title: "E-Slip Payroll Automation System",
    image: "https://placehold.co/400x200/10B981/white?text=E-Slip+Payroll",
    description:
      "Digital payroll slip system integrated with the company’s ERP SAP. Automatically processes monthly payroll data and securely delivers e-slips to employees via email and the company’s internal SuperApp. Significantly improved efficiency and data security.",
  },
  {
    id: 3,
    title: "Knowledge Management System (KMS)",
    image: "https://placehold.co/400x200/F97316/white?text=Knowledge+System",
    description:
      "An internal platform developed to store, manage, and share organizational knowledge efficiently. Helps employees collaborate, learn, and access valuable information to enhance decision-making and company-wide learning.",
  },
  {
    id: 4,
    title: "Aplikasi Peminjaman Barang & Ruangan",
    image: "https://placehold.co/400x200/9333EA/white?text=Borrowing+App",
    description:
      "A digital platform for managing the scheduling and borrowing of company assets and meeting rooms. Transformed manual processes into a centralized, real-time system with calendar integration for transparency and operational efficiency.",
  },
  {
    id: 5,
    title: "Dashboard Human Resource Development",
    image: "https://placehold.co/400x200/EC4899/white?text=HRD+Dashboard",
    description:
      "Interactive dashboard for HR data visualization — tracking employee training, competency growth, and performance indicators. Developed using Looker Studio and MySQL, enabling data-driven HR decisions for management teams.",
  },
];

const WorkSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const numProjects = mockProjects.length;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numProjects);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + numProjects) % numProjects);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentProject = mockProjects[currentIndex];

  return (
    <section
      id="work"
      className="min-h-screen py-24 bg-[#0a0a1a] text-white flex flex-col items-center px-6 md:px-20 lg:px-32 relative overflow-hidden"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-2">
          FEATURED WORK
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
          My Latest Projects
        </h2>
      </motion.div>

      {/* CAROUSEL CONTAINER */}
      <div className="relative w-full max-w-5xl h-[550px] md:h-[650px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <div className="flex flex-col lg:flex-row bg-[#1e1a2d] rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl h-auto lg:h-[450px] relative z-10 p-4 lg:p-0">
              <div className="lg:w-1/2 p-6 flex flex-col items-center justify-center relative">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-auto max-h-64 object-cover rounded-lg shadow-lg"
                />
              </div>

              <div className="lg:w-1/2 p-8 lg:py-16 flex flex-col justify-center">
                <h3 className="text-3xl font-extrabold mb-4 text-white">
                  {currentProject.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  {currentProject.description}
                </p>
                <a
                  href="#"
                  className="text-cyan-400 font-semibold flex items-center hover:text-cyan-300 transition-colors self-start"
                >
                  View more <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-0 md:-left-12 top-1/2 transform -translate-y-1/2 bg-purple-600 p-3 rounded-full shadow-lg z-20 hover:bg-purple-700 transition-colors focus:outline-none"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:-right-12 top-1/2 transform -translate-y-1/2 bg-purple-600 p-3 rounded-full shadow-lg z-20 hover:bg-purple-700 transition-colors focus:outline-none"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Indicator */}
      <div className="flex space-x-2 mt-8 z-10">
        {mockProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-purple-500 w-8" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
