"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Mark Roberts",
    role: "Founder of GreenEarth Eco Store",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    text: "Working with Kim was a pleasure. His development skill and understanding of business needs helped us launch a platform that exceeded expectations.",
  },
  {
    name: "Lisa Williams",
    role: "Head of Product at HealthTech Innovations",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Kim built a fast, scalable, and maintainable app for us. His blend of technical and governance insight made the collaboration seamless.",
  },
  {
    name: "Michael Johnson",
    role: "Marketing Manager at GlobalTech",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    text: "Our digital transformation project ran smoothly thanks to Kim’s mastery in frameworks like COBIT and TOGAF, ensuring top-notch quality control.",
  },
];

export default function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-20 md:py-0 py-6 text-center transition-colors duration-300 
      bg-gradient-to-b from-[#0a0a1a] to-[#1a1240] dark:from-gray-50 dark:to-gray-100 
      text-gray-300 dark:text-gray-700"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gray-400 dark:text-gray-500">Our </span>
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h2>
        <p className="text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
          Hear what our clients say about working with me — collaboration that
          blends technology, governance, and business excellence.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6 border backdrop-blur-md text-left shadow-lg transition-all duration-300
            bg-[#141428]/60 border-[#2a2a4a] text-gray-300
            dark:bg-white dark:border-gray-200 dark:text-gray-700
            hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(100,0,255,0.2)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]"
          >
            <FaQuoteLeft className="text-purple-400 dark:text-purple-500 text-2xl mb-4" />
            <p className="leading-relaxed mb-6">{item.text}</p>

            <div className="flex items-center gap-4 mt-auto">
              <Image
                src={item.avatar}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-full border border-gray-700 dark:border-gray-300"
              />
              <div>
                <h4 className="font-semibold text-white dark:text-gray-900">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
