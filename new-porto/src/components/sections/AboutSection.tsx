"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import imageUrl from "@/assets/img/my-3.png";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-24 
             bg-[#0a0a1a] dark:bg-white
             text-white dark:text-gray-900
             flex items-center justify-center 
             px-6 md:px-20 lg:px-32 
             transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col space-y-4 order-1 lg:order-1"
        >
          <p className="text-sm font-semibold tracking-widest text-cyan-400 dark:text-purple-600 uppercase">
            ABOUT ME
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Software Engineer & Frontend Developer
          </h2>

          <p className="text-base text-gray-300 dark:text-gray-600 leading-relaxed max-w-xl">
            I’m <strong>Mohamad Mustofa Hakim</strong>, a Software Engineer
            focused on building modern, responsive, and user-friendly
            applications using <strong>React.js</strong>,{" "}
            <strong>Next.js</strong>, and <strong>Tailwind CSS</strong>. I
            specialize in front-end development, while also having strong
            experience in <strong>full-stack development</strong> with Laravel
            and Node.js.
          </p>
          <p className="text-base text-gray-300 dark:text-gray-600 leading-relaxed max-w-xl">
            I’ve implemented <strong>DevOps practices</strong> such as CI/CD and
            Docker, managed server configurations, and led the migration of
            systems from spreadsheets to integrated{" "}
            <strong>API-based databases</strong>. I also developed data-driven
            dashboards using Looker Studio to support{" "}
            <strong>strategic decision-making</strong>.
          </p>
          <p className="text-base text-gray-300 dark:text-gray-600 leading-relaxed max-w-xl">
            Combining technical expertise with a strong sense of{" "}
            <strong>user experience</strong> and <strong>IT governance</strong>,
            I aim to deliver clean, efficient, and scalable solutions that
            support <strong>digital transformation</strong> and business growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative order-2 lg:order-2 flex justify-center lg:justify-start"
        >
          <div className="relative w-[300px] h-[350px] md:w-[350px] md:h-[400px] lg:w-[400px] lg:h-[450px]">
            <div
              className="absolute w-full h-[90%] 
                         bg-white dark:bg-[#1e1e2f] 
                         rounded-lg -rotate-3 transform translate-x-3 -translate-y-3 z-0 left-[2%] bottom-[0%] 
                         shadow-[0_4px_10px_rgba(0,0,0,0.1)] 
                         dark:shadow-[0_4px_10px_rgba(255,255,255,0.1)] 
                         transition-colors duration-500"
            />

            <Image
              src={imageUrl}
              alt="Mohamad Mustofa Hakim"
              className="absolute lg:h-full h-[90%] w-auto object-cover z-10 lg:right-[-5%] right-[-5%] lg:top-[-20%] top-[-10%]"
              width={500}
              height={550}
              priority
            />

            <div
              className="absolute bottom-10 right-[-5%] h-[20%] w-[97%] 
                            bg-gradient-to-t from-white via-white/70 to-transparent 
                            dark:from-[#1e1e2f] dark:via-[#0a0a1a]/70 dark:to-transparent 
                            rounded-b-lg z-20 transition-all duration-500"
            />

            <div className="absolute bottom-4 right-4 w-16 h-16 bg-transparent z-30">
              <div className="grid grid-cols-4 gap-0.5">
                {[...Array(16)].map((_, i) => (
                  <span
                    key={i}
                    className="block w-2 h-2 bg-purple-600 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
