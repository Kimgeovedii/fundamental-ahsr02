"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps {
  id: string;
  children: ReactNode;
}

export default function MotionSection({ id, children }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{
        opacity:
          typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 0,
        y: typeof window !== "undefined" && window.innerWidth < 768 ? 0 : 60,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      className="min-h-screen flex flex-col justify-center"
    >
      {children}
    </motion.section>
  );
}
