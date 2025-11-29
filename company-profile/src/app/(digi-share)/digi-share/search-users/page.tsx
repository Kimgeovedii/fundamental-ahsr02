import { Metadata } from "next";
import SearchUsersPage from "@/components/core/digi-share/SearchUsersPage";

export const metadata: Metadata = {
  title: "Search Users - Digi-Share | Digiforma Tech Solution",
  description: "Search for users and discover their posts on Digi-Share",
};

export default function SearchUsersPageRoute() {
  return <SearchUsersPage />;
}

