import { Metadata } from "next";
import CreatePostPage from "@/components/core/digi-share/CreatePostPage";

export const metadata: Metadata = {
  title: "Create Post - Digi-Share | Digiforma Tech Solution",
  description: "Create a new post on Digi-Share",
};

export default function CreatePostPageRoute() {
  return <CreatePostPage />;
}

