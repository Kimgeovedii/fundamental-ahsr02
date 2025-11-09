"use client";

import MotionSection from "@/components/sections/MotionSection";
import SplashScreen from "@/components/core/SplashScreen";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import HeroSection from "@/components/sections/Herosection";
import AboutSection from "@/components/sections/AboutSection";
import SkillSection from "@/components/sections/SkillSection";
import Portofolio from "@/components/sections/Portofolio";
import WorkExperienceSection from "@/components/sections/WorkExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import TestimonialSection from "@/components/sections/TestimonialSection";

const PortfolioPage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "instant" });
    setShowSplash(false);
  };

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    }
  }, [showSplash]);

  return (
    <div className="min-h-screen font-inter scroll-smooth relative transition-colors duration-500 bg-[#0a0a1a] text-white dark:bg-gray-100 dark:text-gray-900">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            key="splash"
            onFinish={handleSplashFinish}
            duration={5.5}
          />
        )}
      </AnimatePresence>

      {!showSplash && (
        <main>
          <MotionSection id="hero">
            <HeroSection />
          </MotionSection>

          <MotionSection id="about">
            <AboutSection />
          </MotionSection>

          <MotionSection id="skills">
            <SkillSection />
          </MotionSection>

          <MotionSection id="portofolio">
            <Portofolio />
          </MotionSection>

          <MotionSection id="experience">
            <WorkExperienceSection />
          </MotionSection>

          <MotionSection id="testimonials">
            <TestimonialSection />
          </MotionSection>

          <MotionSection id="contact">
            <ContactSection />
          </MotionSection>
        </main>
      )}
    </div>
  );
};

export default PortfolioPage;
