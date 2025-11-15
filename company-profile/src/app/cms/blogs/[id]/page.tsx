"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useBlogStore } from "@/lib/blogStore";
import Image from "next/image";
import { Calendar, PenTool } from "lucide-react";

interface CmsBlogDetailPageProps {
  params: { id: string };
}

const CmsBlogDetailPage: React.FC<CmsBlogDetailPageProps> = ({ params }) => {
  const { id } = params;
  const { blogs } = useBlogStore();
  const blog = blogs.find((b) => b.id === id);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (!blog) return <p className="p-8">Blog tidak ditemukan</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        {blog.image_url && (
          <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {formatDate(blog.created_at)}
          </div>
          <div className="flex items-center gap-1">
            <PenTool className="w-4 h-4" /> {blog.author_name || "Unknown"}
          </div>
        </div>

        <div
          className="prose prose-sm sm:prose lg:prose-lg max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </main>
  );
};

export default CmsBlogDetailPage;
