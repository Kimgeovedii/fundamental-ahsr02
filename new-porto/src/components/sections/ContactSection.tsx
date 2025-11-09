"use client";
import { motion } from "framer-motion";
import { Send, Linkedin, Globe, Mail } from "lucide-react";
import React, { useState, FormEvent } from "react";

interface FormData {
  email: string;
  subject: string;
  description: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    alert("Message sent successfully! (Simulation)");
    setFormData({ email: "", subject: "", description: "" });
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-24 flex items-center justify-center px-6 md:px-20 lg:px-32 relative overflow-hidden
      bg-[#0a0a1a] text-white transition-colors duration-500
      dark:bg-gray-50 dark:text-gray-900"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col space-y-6 lg:py-16 order-last lg:order-first"
        >
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase dark:text-cyan-600">
            Get in touch
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-white dark:text-gray-900">
            Let’s Build Something Great
          </h2>

          <p className="text-lg text-gray-400 dark:text-gray-600 leading-relaxed max-w-lg">
            I’m always open to new opportunities, collaborations, and
            discussions about technology, software engineering, and digital
            transformation. Feel free to reach out if you want to work together
            or just have a chat about building scalable and impactful digital
            solutions.
          </p>

          <div className="flex items-center space-x-6 pt-8">
            <div className="h-[1px] w-12 bg-gray-600 dark:bg-gray-300"></div>
            <a
              href="mailto:mohamadmustofahakim@gmail.com"
              aria-label="Email"
              className="text-gray-400 dark:text-gray-500 hover:text-cyan-400 dark:hover:text-cyan-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamad-mustofa-hakim/"
              target="_blank"
              aria-label="LinkedIn"
              className="text-gray-400 dark:text-gray-500 hover:text-cyan-400 dark:hover:text-cyan-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://kimgeovedi-porto.vercel.app"
              target="_blank"
              aria-label="Portfolio"
              className="text-gray-400 dark:text-gray-500 hover:text-cyan-400 dark:hover:text-cyan-600 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
            <div className="h-[1px] w-full bg-gray-600 dark:bg-gray-300"></div>
          </div>

          <div className="pt-4 text-gray-400 dark:text-gray-600 text-sm">
            <p>
              <strong>Location:</strong> Sleman, Yogyakarta, Indonesia
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="https://wa.me/+6287777281395"
                className="hover:text-cyan-400 dark:hover:text-cyan-600"
              >
                +62 8777-7281-395
              </a>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden
          bg-[#1e1a2d] text-white border border-[#2a2a4a]
          dark:bg-white dark:text-gray-900 dark:border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-2">Quick Contact</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
            Send me a message and I’ll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-600 dark:border-gray-300
                focus:border-cyan-400 dark:focus:border-cyan-600
                text-white dark:text-gray-900 pb-3 pt-5 focus:outline-none transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-0 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none transform origin-left 
                peer-placeholder-shown:translate-y-5 peer-placeholder-shown:text-base 
                peer-focus:text-sm peer-focus:translate-y-0"
              >
                Your Email
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-600 dark:border-gray-300
                focus:border-cyan-400 dark:focus:border-cyan-600
                text-white dark:text-gray-900 pb-3 pt-5 focus:outline-none transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="subject"
                className="absolute left-0 top-0 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none transform origin-left 
                peer-placeholder-shown:translate-y-5 peer-placeholder-shown:text-base 
                peer-focus:text-sm peer-focus:translate-y-0"
              >
                Subject
              </label>
            </div>

            <div className="relative pt-4">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-gray-600 dark:border-gray-300
                focus:border-cyan-400 dark:focus:border-cyan-600
                text-white dark:text-gray-900 pb-3 pt-5 focus:outline-none transition-colors resize-none peer"
                placeholder=" "
              ></textarea>
              <label
                htmlFor="description"
                className="absolute left-0 top-0 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none transform origin-left 
                peer-placeholder-shown:translate-y-5 peer-placeholder-shown:text-base 
                peer-focus:text-sm peer-focus:translate-y-0"
              >
                Message
              </label>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 
                rounded-lg text-white font-semibold transition-colors flex items-center justify-center shadow-lg"
              >
                Send Message
                <Send className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>

          <div className="absolute top-4 right-4 z-0">
            <div className="flex flex-col space-y-1 opacity-60 dark:opacity-30">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-1">
                  {[...Array(3)].map((_, j) => (
                    <span
                      key={j}
                      className="w-2 h-2 rounded-full bg-purple-500"
                    ></span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
