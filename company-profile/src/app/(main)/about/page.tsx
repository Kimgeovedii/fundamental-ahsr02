import { Metadata } from "next";
import AboutPageClient from "@/components/core/compro/AboutPageClient";

export const metadata: Metadata = {
  title: "Tentang Kami - Digiforma Tech Solution | IT Consulting & Software House",
  description:
    "Pelajari lebih lanjut tentang Digiforma Tech Solution, perusahaan konsultasi TI dan software house terpercaya dengan tim ahli berpengalaman dalam IT Master Plan, Enterprise Architecture, dan COBIT 2019.",
  keywords: [
    "Tentang Digiforma",
    "IT Consulting",
    "Software House",
    "IT Master Plan",
    "Enterprise Architecture",
    "COBIT 2019",
    "Tim Ahli",
    "Digiforma Tech Solution",
  ],
  openGraph: {
    title: "Tentang Kami - Digiforma Tech Solution | IT Consulting & Software House",
    description:
      "Pelajari lebih lanjut tentang Digiforma Tech Solution, perusahaan konsultasi TI dan software house terpercaya dengan tim ahli berpengalaman.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Kami - Digiforma Tech Solution",
    description:
      "Pelajari lebih lanjut tentang perusahaan dan tim ahli kami",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}

