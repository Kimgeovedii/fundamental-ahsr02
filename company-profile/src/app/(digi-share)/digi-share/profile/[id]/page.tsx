import { Metadata } from "next";
import UserProfilePage from "@/components/core/digi-share/UserProfilePage";

export const metadata: Metadata = {
  title: "Profile - Digi-Share | Digiforma Tech Solution",
  description: "View user profile and posts on Digi-Share",
};

export default function ProfilePageRoute() {
  return <UserProfilePage />;
}

