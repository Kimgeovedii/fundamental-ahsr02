import { Metadata } from "next";
import CreatePostPage from "@/components/core/digi-share/CreatePostPage";

export const metadata: Metadata = {
  title: "Buat Artikel Baru - Digi-Share | Digiforma Tech Solution",
  description:
    "Buat dan bagikan artikel baru Anda di platform Digi-Share. Berbagi pengetahuan, insights, dan pengalaman Anda tentang teknologi dengan komunitas.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Buat Artikel Baru - Digi-Share",
    description:
      "Bagikan artikel dan insights Anda dengan komunitas Digi-Share",
    type: "website",
  },
};

export default function CreatePostPageRoute() {
  return <CreatePostPage />;
}

