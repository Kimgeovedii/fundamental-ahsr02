import { Metadata } from "next";
import BlogsPageClient from "@/components/core/compro/BlogsPageClient";

export const metadata: Metadata = {
  title: "Blog - Digiforma Tech Solution | Artikel & Insights Teknologi",
  description:
    "Baca artikel dan insights terbaru tentang IT Master Plan, Enterprise Architecture, COBIT 2019, dan pengembangan software dari tim ahli Digiforma Tech Solution.",
  keywords: [
    "Blog IT",
    "Artikel Teknologi",
    "IT Master Plan",
    "Enterprise Architecture",
    "COBIT 2019",
    "Software Development",
    "Digiforma Tech Solution",
  ],
  openGraph: {
    title: "Blog - Digiforma Tech Solution",
    description:
      "Artikel dan insights terbaru tentang teknologi dan transformasi digital",
    type: "website",
  },
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}
