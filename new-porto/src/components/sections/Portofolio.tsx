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
    title: "Fixasset: Digital Property Platform & Partnerships",
    image: "/assets/img/fixasset.png",
    description:
      "Fixasset is the end-to-end development of an integrated digital property platform for PT LPP Agro Nusantara, offering asset listing services, interactive map-based property search, and a connector module to match prospective collaboration or franchise partners",
  },
  {
    id: 2,
    title: "E-Slip Payroll Automation System",
    image: "/assets/img/eslip.png",
    description:
      "E-SLIP is a digital payroll automation system for HR departments that digitally generates payslips and automatically delivers them via email to employees immediately after salary disbursement",
  },
  {
    id: 3,
    title: "Knowledge Management System (KMS)",
    image: "/assets/img/kms.png",
    description:
      "An internal platform developed to store, manage, and share organizational knowledge efficiently. Helps employees collaborate, learn, and access valuable information to enhance decision-making and company-wide learning.",
  },
  {
    id: 4,
    title: "SBU Classifier",
    image: "/assets/img/SBU.png",
    description:
      "The SBU Classifier application is a Decision Support System (DSS) that automatically classifies and ranks the potential of Strategic Business Units (SBUs) based on set criteria using the Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS) method.",
  },
  {
    id: 5,
    title: "Dashboard Human Resource Development",
    image: "/assets/img/Dashboard.png",
    description:
      "Interactive dashboard for HR data visualization — tracking employee training, competency growth, and performance indicators. Developed using Looker Studio and MySQL, enabling data-driven HR decisions for management teams.",
  },
];

const Portofolio: React.FC = () => {
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
      className="min-h-screen py-24 
                 bg-[#0a0a1a] dark:bg-gray-100 
                 text-white dark:text-gray-900 
                 flex flex-col items-center 
                 px-6 md:px-20 lg:px-32 
                 relative overflow-hidden 
                 transition-colors duration-500"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest text-cyan-400 dark:text-purple-600 uppercase mb-2">
          MY PORTOFOLIO
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white dark:text-gray-900 mt-2">
          My Latest Projects
        </h2>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[550px] md:mt-1 mt-14  md:h-[650px] flex items-center justify-center">
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
            <div
              className="flex flex-col lg:flex-row 
                         bg-[#1e1a2d] dark:bg-white 
                         rounded-2xl shadow-2xl 
                         overflow-hidden w-full max-w-4xl 
                         h-auto lg:h-[450px] relative z-10 p-4 lg:p-0 
                         transition-colors duration-500"
            >
              <div className="lg:w-1/2 p-6 flex flex-col items-center justify-center relative ">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full  object-cover rounded-xl shadow-lg"
                />
              </div>

              <div className="lg:w-1/2 p-8 lg:py-16 flex flex-col justify-center">
                <h3 className="lg:text-3xl text-xl font-extrabold mb-4 text-white dark:text-gray-900">
                  {currentProject.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-600 lg:text-base text-sm leading-relaxed mb-6">
                  {currentProject.description}
                </p>
                <a
                  href="#"
                  className="text-cyan-400 dark:text-purple-600 font-semibold flex items-center hover:opacity-80 transition-colors self-start"
                >
                  View more <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handlePrev}
          className="absolute left-0 md:-left-12 top-1/2 transform -translate-y-1/2 
                     bg-purple-600 dark:bg-cyan-500 
                     p-3 rounded-full shadow-lg z-20 
                     hover:opacity-80 transition-all focus:outline-none"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6 text-white dark:text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:-right-12 top-1/2 transform -translate-y-1/2 
                     bg-purple-600 dark:bg-cyan-500 
                     p-3 rounded-full shadow-lg z-20 
                     hover:opacity-80 transition-all focus:outline-none"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6 text-white dark:text-white" />
        </button>
      </div>

      <div className="flex space-x-2 mt-16 lg:mt-0 z-10">
        {mockProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-purple-500 dark:bg-cyan-500 w-8"
                : "bg-gray-600 dark:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Portofolio;
