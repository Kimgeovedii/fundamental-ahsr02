import HerSection from "@/components/core/compro/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black">
      <main className="">
        <HerSection />
        <LogoMarquee />
      </main>
    </div>
  );
}
