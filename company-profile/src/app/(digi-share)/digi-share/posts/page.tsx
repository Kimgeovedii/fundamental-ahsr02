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
    title: "Timeline - Digi-Share",
    description: "Jelajahi timeline artikel dari komunitas Digi-Share",
    type: "website",
  },
};

export default function DigiShareTimelinePageRoute() {
  return <DigiShareTimelinePage />;
}

