"use client";
import * as React from "react";
import { BlogForm } from "@/components/core/digi-share/BlogForm";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { blogService } from "@/lib/services/blogService";
import { Blog } from "@/lib/types/blog";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/lib/stores";
import { toast } from "sonner";

const EditPostPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [blog, setBlog] = React.useState<Blog | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!id) {
      router.push("/digi-share/manage");
      return;
    }

    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const blogData = await blogService.getById(id);
      if (!blogData) {
        toast.error("Blog not found");
        router.push("/digi-share/manage");
        return;
      }

      if (user?.authorId !== blogData.author_id) {
        toast.error("You don't have permission to edit this post");
        router.push("/digi-share/manage");
        return;
      }

      setBlog(blogData);
    } catch (error: any) {
      toast.error(error.message || "Failed to load blog");
      router.push("/digi-share/manage");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <Spinner />
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push("/digi-share/manage")}
            className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Manage Posts
          </Button>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Edit Post
            </h1>
            <BlogForm
              blogId={id}
              initialBlog={{
                title: blog.title,
                description: blog.description,
                image_url: blog.image_url,
                category_id: blog.category_id || "",
                is_featured: blog.is_featured,
              }}
              onSuccess={() => {
                router.push("/digi-share/manage");
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditPostPage;

