import { motion } from "framer-motion";
import React from "react";

interface Experience {
  date: string;
  role: string;
  company: string;
  description: string;
}

const experiences: Experience[] = [
  {
    date: "October 2023 - Present",
    role: "IT Development Officer",
    company: "PT LPP Agro Nusantara, Yogyakarta",
    description:
      "Developed full-stack applications (Next.js, Laravel), implemented DevOps (CI/CD, Docker), and increased IT Maturity Assessment by 413% through COBIT 2019 standards.",
  },
  {
    date: "July 2023 - October 2023",
    role: "Ecommerce Specialist & Research & Development",
    company: "91 Venture, Sleman",
    description:
      "Managed e-commerce platforms, conducted market research, and analyzed data to provide strategic business insights.",
  },
  {
    date: "September 2021 - December 2021",
    role: "Information Technology Internship",
    company: "Dinkominfotik, Brebes Regency",
    description:
      "Developed the official BPBD website to support e-government and socialized e-government and One Data programs.",
  },
  {
    date: "September 2020 - December 2020",
    role: "Data Entry Operator Internship",
    company: "Badan Pertanahan Nasional, Sleman",
    description:
      "Inputted land book data into the ATR/BPN application (150 files/day) and conducted rigorous data quality checks.",
  },
  {
    date: "February 2020 - June 2020",
    role: "Digital Marketing Manager",
    company: "BBS Vape Store, Sleman",
    description:
      "Increased profit by 30% through market analysis and built a data-driven marketing system using Google Workspace.",
  },
  {
    date: "June 2019 - January 2020",
    role: "Digital Marketing Specialist",
    company: "BBS Vape Store, Sleman",
    description:
      "Optimized digital ads (Facebook/Instagram), increasing company revenue by 15%, and developed successful B2B campaigns.",
  },
];

const WorkExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      // Menggunakan background gelap keunguan (mirip gambar)
      className="min-h-screen py-24 bg-gray-900 text-white dark:bg-white dark:text-gray-900 flex flex-col items-center px-6 md:px-20 lg:px-32"
      style={{
        backgroundImage: "linear-gradient(180deg, #110038 0%, #0c021c 100%)", // Gradasi Ungu-Hitam
        color: "white", // Memastikan teks tetap putih
      }}
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          {/* Judul Utama (mirip "Our Testimonials") */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
            Professional <span className="text-purple-400">Experience</span>
          </h2>
          <p className="text-gray-400 mt-2">
            A comprehensive overview of my roles, responsibilities, and key
            achievements.
          </p>
        </motion.div>

        {/* EXPERIENCE CARDS GRID */}
        <div className="relative pt-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative gap-8">
            {experiences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                // Style Card Mirip Testimonials: Latar belakang gelap, rounded-2xl, hover effect
                className="relative p-6 rounded-2xl shadow-xl border border-transparent 
                           bg-[#1a0f3d] text-white
                           hover:border-purple-600 
                           transform transition duration-500 hover:scale-[1.03] 
                           cursor-pointer hover:shadow-[0_12px_40px_rgba(100,0,255,0.2)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)"
              >
                {/* Garis Vertikal (Timeline) untuk Mobile SAJA (Dipertahankan) */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-purple-700 md:hidden" />
                <span className="absolute left-[-6px] top-6 w-3 h-3 rounded-full bg-cyan-400 md:hidden" />

                <div className="mt-0 pl-0 md:pl-0">
                  {/* Tanggal: Warna lebih cerah untuk kontras */}
                  {/* text-left di mobile untuk timeline, center di desktop */}
                  <p className="text-md font-bold text-purple-400 mb-2 text-left md:text-center">
                    {item.date}
                  </p>

                  {/* Role: Judul utama card */}
                  <h3 className="text-xl font-extrabold text-cyan-400 mb-1 text-left md:text-center">
                    {item.role}
                  </h3>
                  {/* Perusahaan: Teks pendukung */}
                  <p className="text-md text-gray-300 mb-4 text-left md:text-center">
                    {item.company}
                  </p>

                  {/* Deskripsi: Rata Kanan-Kiri (text-justify) */}
                  <p className="text-base text-gray-400 leading-relaxed text-justify">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
