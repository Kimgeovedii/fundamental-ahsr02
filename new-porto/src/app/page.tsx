"use client";
import React from "react";

// Icons (kalau mau dipakai di Hero atau Sidebar)
import { BarChart2, Mail } from "lucide-react";

// Components
import SocialSidebar from "@/components/core/SocialSidebar";
import NavDots from "@/components/core/NavDots";
import MotionSection from "@/components/sections/MotionSection";

// Sections
import HeroSection from "@/components/sections/Herosection";
import AboutSection from "@/components/sections/AboutSection";
import SkillSection from "@/components/sections/SkillSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";

const PortfolioPage: React.FC = () => {
  return (
    <div className="bg-[#0a0a1a] min-h-screen font-inter scroll-smooth text-white relative">
      {/* Fixed Components */}
      <SocialSidebar />
      <NavDots />

      {/* Sections */}
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

        <MotionSection id="work">
          <WorkSection />
        </MotionSection>

        <MotionSection id="contact">
          <ContactSection />
        </MotionSection>
      </main>
    </div>
  );
};

export default PortfolioPage;
