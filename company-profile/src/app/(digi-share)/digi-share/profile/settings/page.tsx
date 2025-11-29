import { Metadata } from "next";
import ProfileSettingsPage from "@/components/core/digi-share/ProfileSettingsPage";

export const metadata: Metadata = {
  title: "Profile Settings - Digi-Share | Digiforma Tech Solution",
  description: "Manage your profile settings on Digi-Share",
};

export default function ProfileSettingsPageRoute() {
  return <ProfileSettingsPage />;
}

