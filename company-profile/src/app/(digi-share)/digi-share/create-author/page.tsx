import { Metadata } from "next";
import CreateAuthorPage from "@/components/core/digi-share/CreateAuthorPage";

export const metadata: Metadata = {
  title: "Buat Profil Penulis - Digi-Share | Digiforma Tech Solution",
  description:
    "Buat profil penulis Anda untuk mulai berbagi artikel dan insights di Digi-Share. Lengkapi informasi profil Anda sekarang.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreateAuthorPageRoute() {
  return <CreateAuthorPage />;
}

