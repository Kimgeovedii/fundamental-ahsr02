import { Metadata } from "next";
import CreateAuthorPage from "@/components/core/digi-share/CreateAuthorPage";

export const metadata: Metadata = {
  title: "Create Author Profile - Digi-Share | Digiforma Tech Solution",
  description: "Create your author profile to start sharing on Digi-Share",
};

export default function CreateAuthorPageRoute() {
  return <CreateAuthorPage />;
}

