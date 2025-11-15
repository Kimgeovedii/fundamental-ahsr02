"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, PenTool } from "lucide-react";
import { Blog } from "@/lib/blogStore";

interface BlogCardProps {
  post: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const router = useRouter();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div
      onClick={() => router.push(`/cms/blogs/${post.id}`)}
      className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
    >
      {/* Image */}
      {post.image_url && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
        {post.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-gray-500 text-sm mt-auto">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {formatDate(post.created_at)}
        </div>
        <div className="flex items-center gap-1">
          <PenTool className="w-4 h-4" />
          {post.author_name || "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
