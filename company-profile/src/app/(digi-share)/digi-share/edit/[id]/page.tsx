import { Metadata } from "next";
import EditPostPage from "@/components/core/digi-share/EditPostPage";

export const metadata: Metadata = {
  title: "Edit Artikel - Digi-Share | Digiforma Tech Solution",
  description:
    "Edit artikel Anda di Digi-Share. Update konten, gambar, kategori, dan informasi lainnya.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EditPostPageRoute() {
  return <EditPostPage />;
}

