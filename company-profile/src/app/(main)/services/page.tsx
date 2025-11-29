import { Metadata } from "next";
import ServicesPageClient from "@/components/core/compro/ServicesPageClient";

export const metadata: Metadata = {
  title: "Layanan Kami - Digiforma Tech Solution | IT Consulting & Software House",
  description:
    "Layanan konsultasi TI dan software house terpercaya untuk IT Master Plan (ITMP), Enterprise Architecture, COBIT 2019, dan pengembangan aplikasi kustom. Transformasi digital bisnis Anda dimulai di sini.",
  keywords: [
    "IT Master Plan",
    "ITMP",
    "Enterprise Architecture",
    "COBIT 2019",
    "Software House",
    "Konsultasi TI",
    "Custom Software Development",
    "Digiforma Tech Solution",
  ],
  openGraph: {
    title: "Layanan Kami - Digiforma Tech Solution | IT Consulting & Software House",
    description:
      "Layanan konsultasi TI dan software house terpercaya untuk IT Master Plan (ITMP), Enterprise Architecture, COBIT 2019, dan pengembangan aplikasi kustom.",
    type: "website",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan Kami - Digiforma Tech Solution",
    description:
      "Solusi teknologi lengkap untuk transformasi digital bisnis Anda",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}

