"use client";

import { motion } from "framer-motion";
import { CodeSquare, Zap, Server, LucideIcon } from "lucide-react";
import React from "react";

// --- Tipe Data dan Interface ---
interface SkillCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

interface Skill {
  Icon: LucideIcon;
  title: string;
  description: string;
}

// --- Komponen ---
const SkillCard: React.FC<SkillCardProps> = ({ Icon, title, description }) => {
  return (
    <div
      className="flex flex-col items-center p-8 
                 bg-[#1a1240] dark:bg-white 
                 rounded-xl shadow-2xl 
                 transition-all duration-300 
                 hover:scale-[1.03] 
                 border border-transparent 
                 hover:border-purple-600 
                 cursor-pointer h-full"
    >
      <div
        className="p-4 bg-gray-900 dark:bg-gray-100 
                   rounded-lg mb-6 
                   border border-purple-500 dark:border-purple-400"
      >
        <Icon className="w-8 h-8 text-cyan-400 dark:text-purple-600" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white dark:text-gray-900 text-center">
        {title}
      </h3>
      <p className="text-sm text-gray-400 dark:text-gray-600 text-center flex-grow">
        {description}
      </p>
    </div>
  );
};

const SkillSection: React.FC = () => {
  const skills: Skill[] = [
    {
      Icon: CodeSquare,
      title: "Frontend Mastery (React/Next.js)",
      description:
        "Building scalable and high-performance user interfaces using modern React concepts and Next.js for SSR/SSG capabilities, ensuring speed and SEO optimization.",
    },
    {
      Icon: Zap,
      title: "Backend Foundation (Laravel)",
      description:
        "Developing robust, secure, and maintainable backend APIs and services using the Laravel PHP framework, focusing on clean architecture and database efficiency.",
    },
    {
      Icon: Server,
      title: "Enterprise Architecture (COBIT/TOGAF)",
      description:
        "Applying IT Governance standards (COBIT 2019) and Enterprise Architecture frameworks (TOGAF) to align technical solutions with strategic business goals and quality standards.",
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen py-24 
                 bg-[#0a0a1a] dark:bg-gray-100 
                 text-white dark:text-gray-900 
                 flex items-center justify-center 
                 px-6 md:px-12 lg:px-24 
                 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest text-cyan-400 dark:text-purple-600 uppercase">
            MY SKILLS
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white dark:text-gray-900 mt-2">
            My Core Competencies
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SkillCard
                Icon={skill.Icon}
                title={skill.title}
                description={skill.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
