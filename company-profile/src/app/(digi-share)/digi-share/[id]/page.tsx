import { Metadata } from "next";
import DigiShareDetailPageClient from "@/components/core/compro/DigiShareDetailPageClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: "Article - Digi-Share | Digiforma Tech Solution",
    description: "Read the full article from Digi-Share community",
  };
}

export default function DigiShareDetailPage() {
  return <DigiShareDetailPageClient />;
}

