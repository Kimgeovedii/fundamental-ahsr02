"use client";

import * as React from "react";
import { useAuthStore } from "@/lib/authStore";
import { useBlogStore } from "@/lib/blogStore";
import { CalendarDays, User } from "lucide-react";

interface IBlogDetailsProps {
  blogId: string;
}

const BlogDetails: React.FunctionComponent<IBlogDetailsProps> = ({
  blogId,
}) => {
  const { getDetailBlog, blog, isLoading } = useBlogStore();
  const { userToken } = useAuthStore();

  React.useEffect(() => {
    if (userToken) {
      getDetailBlog(userToken, blogId);
    }
  }, [userToken, blogId, getDetailBlog]);

  if (isLoading || !blog) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading blog details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-24 bg-white dark:bg-neutral-900 rounded-xl shadow-md p-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {blog.title}
      </h1>

      {/* Meta Info */}
      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{blog.authorName || "Unknown Author"}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <span>{new Date(blog.created).toLocaleDateString("id-ID")}</span>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        {blog.description ? (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {blog.description}
          </p>
        ) : (
          <p className="text-gray-400 italic">
            Belum ada deskripsi untuk blog ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
