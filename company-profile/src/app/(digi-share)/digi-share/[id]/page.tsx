import { Metadata } from "next";
import DigiShareDetailPageClient from "@/components/core/compro/DigiShareDetailPageClient";
import { getBlogByIdForMetadata } from "@/lib/services/blogService.server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const blog = await getBlogByIdForMetadata(id);
    
    if (!blog) {
      return {
        title: "Article Not Found - Digi-Share | Digiforma Tech Solution",
        description: "The requested article could not be found on Digi-Share platform.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const cleanDescription = blog.description
      ?.replace(/<[^>]*>/g, "")
      .substring(0, 160) || "Read the full article from Digi-Share community";

    return {
      title: `${blog.title} - Digi-Share | Digiforma Tech Solution`,
      description: cleanDescription,
      keywords: [
        blog.title,
        blog.category?.name || "",
        "Digi-Share",
        "Artikel Teknologi",
        "IT Insights",
        blog.author_name || "",
        "Community Blog",
      ].filter(Boolean),
      authors: blog.author_name ? [{ name: blog.author_name }] : undefined,
      openGraph: {
        title: blog.title,
        description: cleanDescription,
        type: "article",
        publishedTime: blog.created_at,
        authors: blog.author_name ? [blog.author_name] : undefined,
        images: blog.image_url ? [
          {
            url: blog.image_url,
            width: 1200,
            height: 630,
            alt: blog.title,
          }
        ] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: cleanDescription,
        images: blog.image_url ? [blog.image_url] : [],
      },
    };
  } catch (error) {
    return {
      title: "Article - Digi-Share | Digiforma Tech Solution",
      description: "Read the full article from Digi-Share community",
    };
  }
}

export default function DigiShareDetailPage() {
  return <DigiShareDetailPageClient />;
}

