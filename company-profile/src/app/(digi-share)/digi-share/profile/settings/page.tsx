import { Metadata } from "next";
import ProfileSettingsPage from "@/components/core/digi-share/ProfileSettingsPage";

export const metadata: Metadata = {
  title: "Pengaturan Profil - Digi-Share | Digiforma Tech Solution",
  description:
    "Kelola pengaturan profil Anda di Digi-Share. Update nama, bio, avatar, email, dan password Anda.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileSettingsPageRoute() {
  return <ProfileSettingsPage />;
}

