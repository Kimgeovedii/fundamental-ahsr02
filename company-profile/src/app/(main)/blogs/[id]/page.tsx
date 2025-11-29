import { Metadata } from "next";
import BlogDetailPageClient from "@/components/core/compro/BlogDetailPageClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: "Blog Detail - Digiforma Tech Solution",
    description: "Read the full article from Digiforma Tech Solution",
  };
}

export default function BlogDetailPage() {
  return <BlogDetailPageClient />;
}

