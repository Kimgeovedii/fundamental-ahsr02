import { Metadata } from "next";
import ManagePostsPage from "@/components/core/digi-share/ManagePostsPage";

export const metadata: Metadata = {
  title: "Manage Posts - Digi-Share | Digiforma Tech Solution",
  description: "Manage your posts on Digi-Share",
};

export default function ManagePostsPageRoute() {
  return <ManagePostsPage />;
}

