import { Metadata } from "next";
import DigiShareLandingPage from "@/components/core/digi-share/DigiShareLandingPage";

export const metadata: Metadata = {
  title: "Digi-Share - Platform Berbagi Artikel & Insights | Digiforma Tech Solution",
  description:
    "Bergabunglah dengan komunitas Digi-Share untuk berbagi artikel, insights, dan pengetahuan tentang teknologi. Platform terbuka untuk semua orang berbagi dan belajar bersama.",
  keywords: [
    "Digi-Share",
    "Platform Berbagi Artikel",
    "Blog Community",
    "Teknologi",
    "IT Insights",
    "Digiforma Tech Solution",
  ],
  openGraph: {
    title: "Digi-Share - Platform Berbagi Artikel",
    description:
      "Bergabunglah dengan komunitas untuk berbagi artikel dan insights",
    type: "website",
  },
};

export default function DigiShareLandingPageRoute() {
  return <DigiShareLandingPage />;
}

