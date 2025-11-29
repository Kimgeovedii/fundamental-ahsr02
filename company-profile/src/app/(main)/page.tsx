import { Metadata } from "next";
import AboutSection from "@/components/core/compro/AboutSection";
import FaqSection from "@/components/core/compro/FaqSection";
import HerSection from "@/components/core/compro/HeroSection";
import WhyChooseUsSection from "@/components/core/compro/WhyChooseUsSection";

export const metadata: Metadata = {
  title: "Home - IT Consulting & Software House Terpercaya",
  description:
    "Digiforma Tech Solution adalah partner terpercaya untuk transformasi digital bisnis Anda. Menyediakan konsultasi IT Master Plan (ITMP), Enterprise Architecture, COBIT 2019, dan pengembangan aplikasi kustom berkualitas tinggi.",
  keywords: [
    "IT Consulting Indonesia",
    "Software House Terpercaya",
    "IT Master Plan",
    "Enterprise Architecture",
    "COBIT 2019",
    "Custom Software Development",
    "Digital Transformation",
    "IT Konsultasi",
    "Pengembangan Aplikasi",
    "Digiforma Tech Solution",
  ],
  openGraph: {
    title: "Digiforma Tech Solution | IT Consulting & Software House Terpercaya",
    description:
      "Partner terpercaya untuk transformasi digital bisnis Anda dengan solusi IT Master Plan, Enterprise Architecture, dan pengembangan aplikasi kustom.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digiforma Tech Solution | IT Consulting & Software House",
    description:
      "Partner terpercaya untuk transformasi digital bisnis Anda.",
  },
};

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
