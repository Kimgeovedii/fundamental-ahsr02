"use client";

import Image from "next/image";
import { Calendar, PenTool } from "lucide-react";
import { useBlogDetail } from "@/lib/hooks/useBlogDetail";
import { useParams } from "next/navigation";

export default function CmsBlogDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) return <div>Invalid Blog ID</div>;

  const blog = useBlogDetail(id);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (!blog)
    return (
      <main className="min-h-screen flex justify-center items-center text-gray-500">
        Loading...
      </main>
    );

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
            <Calendar className="w-4 h-4" />
            {formatDate(blog.created_at)}
          </div>

          <div className="flex items-center gap-1">
            <PenTool className="w-4 h-4" />
            {blog.author_name || "Unknown"}
          </div>
        </div>

        <div
          className="prose prose-sm sm:prose lg:prose-lg max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </main>
  );
}
