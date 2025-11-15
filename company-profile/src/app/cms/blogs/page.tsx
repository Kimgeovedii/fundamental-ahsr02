"use client";

import * as React from "react";
import { useBlogStore } from "@/lib/blogStore";
import { useAuthStore } from "@/lib/useAuthStore";
import BlogCard from "@/components/core/cms/blog/BlogCard";
import { useRouter } from "next/navigation";

const CmsBlogsPage: React.FC = () => {
  const router = useRouter();
  const { blogs, loading, fetchBlogs } = useBlogStore();
  const currentUser = useAuthStore((state) => state.user);

  React.useEffect(() => {
    if (currentUser) fetchBlogs();
  }, [currentUser, fetchBlogs]);

  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 border-b-4 border-blue-500 inline-block pb-1">
          Manajemen Postingan Saya
        </h1>

        {loading && (
          <div className="text-center text-blue-600 font-semibold py-10">
            Memuat data postingan...
          </div>
        )}

        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-xl mt-10 bg-white">
            <p className="text-xl text-gray-500">
              Belum ada postingan blog untuk akun Anda.
            </p>
            <button
              onClick={() => router.push("/cms/blogs/create")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Buat Postingan Baru
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CmsBlogsPage;
