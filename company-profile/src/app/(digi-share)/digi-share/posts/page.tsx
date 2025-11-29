import { Metadata } from "next";
import DigiShareTimelinePage from "@/components/core/digi-share/DigiShareTimelinePage";

export const metadata: Metadata = {
  title: "Timeline - Digi-Share | Digiforma Tech Solution",
  description:
    "Jelajahi timeline artikel dan insights dari komunitas Digi-Share. Temukan konten menarik seputar teknologi, IT, dan transformasi digital.",
  keywords: [
    "Digi-Share Timeline",
    "Artikel Teknologi",
    "Community Posts",
    "IT Insights",
  ],
  openGraph: {
    title: "Timeline - Digi-Share | Artikel & Insights Komunitas",
    description:
      "Jelajahi timeline artikel dan insights dari komunitas Digi-Share. Temukan konten menarik seputar teknologi, IT, dan transformasi digital.",
    type: "website",
    url: "/digi-share/posts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timeline - Digi-Share",
    description: "Jelajahi timeline artikel dari komunitas Digi-Share",
  },
};

export default function DigiShareTimelinePageRoute() {
  return <DigiShareTimelinePage />;
}

