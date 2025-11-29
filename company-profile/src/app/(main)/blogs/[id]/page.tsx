import { Metadata } from "next";
import BlogDetailPageClient from "@/components/core/compro/BlogDetailPageClient";
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
        title: "Artikel Tidak Ditemukan - Digiforma Tech Solution",
        description: "Artikel yang Anda cari tidak ditemukan.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const cleanDescription = blog.description
      ?.replace(/<[^>]*>/g, "")
      .substring(0, 160) || "Baca artikel lengkap dari Digiforma Tech Solution";

    return {
      title: `${blog.title} - Blog Digiforma Tech Solution`,
      description: cleanDescription,
      keywords: [
        blog.title,
        blog.category?.name || "",
        "Blog IT",
        "Artikel Teknologi",
        "Digiforma Tech Solution",
        blog.author_name || "",
      ].filter(Boolean),
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
      title: "Blog Detail - Digiforma Tech Solution",
      description: "Baca artikel lengkap dari Digiforma Tech Solution",
    };
  }
}

export default function BlogDetailPage() {
  return <BlogDetailPageClient />;
}

