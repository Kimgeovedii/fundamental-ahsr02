import { Metadata } from "next";
import SearchUsersPage from "@/components/core/digi-share/SearchUsersPage";

export const metadata: Metadata = {
  title: "Cari Pengguna - Digi-Share | Digiforma Tech Solution",
  description:
    "Cari dan temukan pengguna di Digi-Share. Jelajahi profil dan artikel-artikel menarik dari berbagai penulis di komunitas.",
  openGraph: {
    title: "Cari Pengguna - Digi-Share",
    description: "Cari dan temukan pengguna serta artikel mereka di Digi-Share",
    type: "website",
    url: "/digi-share/search-users",
  },
  twitter: {
    card: "summary",
    title: "Cari Pengguna - Digi-Share",
    description: "Temukan pengguna dan artikel menarik di Digi-Share",
  },
};

export default function SearchUsersPageRoute() {
  return <SearchUsersPage />;
}

