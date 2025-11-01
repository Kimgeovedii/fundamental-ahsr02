"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import imageUrl from "@/assets/img/my-3.png";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-24 bg-[#0a0a1a] text-white flex items-center justify-center px-6 md:px-20 lg:px-32"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-center relative">
        {/* === KIRI: Konten Teks === */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col space-y-4 order-1 lg:order-1"
        >
          <p className="text-sm font-semibold tracking-widest text-white uppercase opacity-70">
            ABOUT ME
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Software Engineer & Frontend Developer
          </h2>

          {/* Teks Paragraf */}
          <p className="text-base text-gray-300 leading-relaxed max-w-xl">
            I’m <strong>Mohamad Mustofa Hakim</strong>, a Software Engineer
            focused on building modern, responsive, and user-friendly
            applications using <strong>React.js</strong>,{" "}
            <strong>Next.js</strong>, and <strong>Tailwind CSS</strong>. I
            speciali in front-end development, while also having strong
            experience in <strong>full-stack development</strong> with Laravel
            and Node.js.
          </p>
          <p className="text-base text-gray-300 leading-relaxed max-w-xl">
            I’ve implemented <strong>DevOps practices</strong> such as CI/CD and
            Docker, managed server configurations, and led the migration of
            systems from spreadsheets to integrated{" "}
            <strong>API-based databases</strong>. I also developed data-driven
            dashboards using Looker Studio to support{" "}
            <strong>strategic decision-making</strong>.
          </p>
          <p className="text-base text-gray-300 leading-relaxed max-w-xl">
            Combining technical expertise with a strong sense of{" "}
            <strong>user experience</strong> and <strong>IT governance</strong>,
            I aim to deliver clean, efficient, and scalable solutions that
            support <strong>digital transformation</strong> and business growth.
          </p>
        </motion.div>

        {/* --- KANAN: Gambar & Efek --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative order-2 lg:order-2 flex justify-center lg:justify-start"
        >
          {/* Container utama (DIBUAT LEBIH TINGGI DAN TANPA OVERFLOW-HIDDEN) */}
          <div className="relative w-[300px] h-[350px] md:w-[350px] md:h-[400px] lg:w-[400px] lg:h-[450px]">
            {/* 1. KOTAK PUTIH di belakang gambar (Frame) */}
            {/* Posisi disesuaikan agar gambar menempati sebagian besar area putih */}
            <div
              className="absolute w-[100%] h-[90%] bg-white rounded-lg -rotate-3 transform translate-x-3 -translate-y-3 z-0 left-[2%] bottom-[0%]"
              style={{ boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)" }}
            />

            {/* 2. Gambar Utama Anda */}
            <Image
              src={imageUrl}
              alt="Mohamad Mustofa Hakim"
              // Diberi margin-top negatif untuk menarik ke atas, sehingga kepala keluar dari batas atas div frame putih
              // h-[100%] agar bagian bawah gambar tidak keluar dari container utama ini.
              className="absolute h-[100%] w-auto object-cover z-10 right-[-5%] top-[-20%]"
              width={500}
              height={550}
              priority
            />

            {/* 3. Shadow Putih di bagian Bawah Gambar (Fade) */}
            {/* Shadow ditarik ke Bawah (bottom-0) dan z-index dinaikkan */}
            <div className="absolute  bottom-10 right-[-5%]   h-[20%] w-[97%] bg-gradient-to-t from-white via-white/70 to-transparent rounded-b-lg z-20" />

            {/* 4. Dot/Titik Ungu (diposisikan relatif terhadap container utama) */}
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
