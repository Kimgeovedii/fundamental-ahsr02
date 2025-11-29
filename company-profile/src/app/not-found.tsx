import { Metadata } from "next";
import NotFoundPageClient from "@/components/core/NotFoundPageClient";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Digiforma Tech Solution",
  description:
    "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda atau jelajahi layanan dan fitur yang tersedia di Digiforma Tech Solution.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "404 - Halaman Tidak Ditemukan",
    description: "Halaman yang Anda cari tidak ditemukan",
    type: "website",
  },
};

export default function NotFound() {
  return <NotFoundPageClient />;
}

