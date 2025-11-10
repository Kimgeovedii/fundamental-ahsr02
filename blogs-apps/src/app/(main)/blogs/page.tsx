"use client";
import * as React from "react";
import { useBlogStore } from "@/lib/blogStore";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import BlogDrawerUi from "@/components/core/BlogUi/BlogDrawer";
import BlogCard from "@/components/core/BlogUi/BlogCard";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IBlogsPageProps {}

const BlogsPage: React.FunctionComponent<IBlogsPageProps> = () => {
  const router = useRouter();
  const { userToken, _hasHydrated } = useAuthStore();

  const { fetchBlogs, blogs, isLoading, error, deleteBlog } = useBlogStore();

  const handleEdit = (blogId: string) => {
    console.log(`Edit blog ID: ${blogId}`);
    alert(`Edit blog ID: ${blogId}`);
  };

  const handleDelete = async (blogId: string) => {
    if (
      confirm("Apakah Anda yakin ingin menghapus blog ini secara permanen?")
    ) {
      const token = userToken ?? "";

      if (token) {
        const success = await deleteBlog(blogId, token);

        if (success) {
          toast.success("Blog berhasil dihapus!");
          await fetchBlogs(token);
        } else {
          toast.error("Gagal menghapus blog. Coba lagi.");
        }
      } else {
        toast.error("Sesi tidak valid. Mohon login ulang.");
      }
    }
  };

  React.useEffect(() => {
    if (_hasHydrated) {
      if (userToken) {
        fetchBlogs(userToken);
      } else {
        router.replace("/login");
      }
    }
  }, [_hasHydrated, userToken, fetchBlogs, router]);

  if (!_hasHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2">Memuat sesi...</p>
      </div>
    );
  }

  if (!userToken) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-green-500" />
        <p className="ml-2">Memuat data blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded">
        <p className="font-bold">Error Memuat Data:</p>
        <p>{error}</p>
        <Button onClick={() => fetchBlogs(userToken)}>Coba Muat Ulang</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📝 Semua Blogs</h1>

      <div className="mb-8">
        <BlogDrawerUi />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-10 border border-dashed rounded-lg">
            Belum ada blog yang tersedia. Ayo buat yang pertama!
          </p>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog.objectId}
              objectId={blog.objectId}
              title={blog.title}
              description={blog.description}
              authorName={blog.authorName}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
