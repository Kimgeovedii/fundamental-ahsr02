import { Metadata } from "next";
import ManagePostsPage from "@/components/core/digi-share/ManagePostsPage";

export const metadata: Metadata = {
  title: "Kelola Artikel Saya - Digi-Share | Digiforma Tech Solution",
  description:
    "Kelola artikel Anda di Digi-Share. Edit, update, atau hapus artikel yang telah Anda publikasikan.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Kelola Artikel Saya - Digi-Share",
    description: "Kelola artikel yang telah Anda publikasikan di Digi-Share",
    type: "website",
  },
};

export default function ManagePostsPageRoute() {
  return <ManagePostsPage />;
}

