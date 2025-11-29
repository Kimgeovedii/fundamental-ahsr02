"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Edit, Trash2, User, BadgeCheck } from "lucide-react";
import { blogService } from "@/lib/services/blogService";
import { Blog } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface BlogCardProps {
  post: Blog;
  onDeleted?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onDeleted }) => {
  const router = useRouter();
  const [loadingDelete, setLoadingDelete] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      onDeleted?.();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus blog!");
    } finally {
      setLoadingDelete(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div
      className="
        backdrop-blur-xl bg-white/60 
        border border-white/40 
        shadow-md hover:shadow-xl 
        transition-all rounded-2xl p-6 cursor-pointer
        hover:-translate-y-1
      "
      onClick={() => router.push(`/blog/${post.id}`)}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {post.title}
            </h3>

            {post.is_featured && (
              <div className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-yellow-100 text-yellow-800">
                <BadgeCheck className="w-3 h-3" />
                Featured
              </div>
            )}

            <div className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-800">
              {post.category?.name}
            </div>
          </div>

          <p className="text-gray-600 line-clamp-2 leading-relaxed">
            {post.description}
          </p>

          <div className="text-sm text-gray-500 flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author_name}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.created_at)}
            </span>
          </div>
        </div>

        <div
          className="flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-blue-50 hover:text-blue-700"
            onClick={() => router.push(`/blog/edit/${post.id}`)}
          >
            <Edit className="w-4 h-4" />
          </Button>

          <Button
            variant="destructive"
            size="sm"
            disabled={loadingDelete}
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            {loadingDelete ? <Spinner /> : <Trash2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
