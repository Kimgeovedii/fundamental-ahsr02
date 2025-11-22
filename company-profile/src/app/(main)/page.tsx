import AboutSection from "@/components/core/compro/AboutSection";
import FaqSection from "@/components/core/compro/FaqSection";
import HerSection from "@/components/core/compro/HeroSection";
import WhyChooseUsSection from "@/components/core/compro/WhyChooseUsSection";
import LogoMarquee from "@/components/LogoMarquee";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <HerSection />
      <AboutSection />
      <WhyChooseUsSection />
      <FaqSection />
    </main>
  );
}
