import { Metadata } from "next";
import EditPostPage from "@/components/core/digi-share/EditPostPage";

export const metadata: Metadata = {
  title: "Edit Post - Digi-Share | Digiforma Tech Solution",
  description: "Edit your post on Digi-Share",
};

export default function EditPostPageRoute() {
  return <EditPostPage />;
}

