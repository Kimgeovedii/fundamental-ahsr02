"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/lib/stores";
import { blogService } from "@/lib/services/blogService";
import { Blog } from "@/lib/types/blog";
import { toast } from "sonner";

const ManagePostsPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user?.authorId) {
      fetchUserBlogs();
    }
  }, [user]);

  const fetchUserBlogs = async () => {
    if (!user?.authorId) return;
    setLoading(true);
    try {
      const userBlogs = await blogService.getByAuthorId(user.authorId);
      setBlogs(userBlogs);
    } catch (error) {
      console.error("Failed to fetch user blogs:", error);
      toast.error("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await blogService.delete(id);
      toast.success("Post deleted successfully");
      fetchUserBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete post");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Manage Your Posts
            </h1>
            <Link href="/digi-share/create">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                You haven't created any posts yet.
              </p>
              <Link href="/digi-share/create">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                        {blog.title}
                      </h3>
                    </div>
                    {blog.category && (
                      <Badge variant="outline" className="text-xs">
                        {blog.category.name}
                      </Badge>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {blog.description?.replace(/<[^>]*>/g, "").substring(0, 100)}...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <Link href={`/digi-share/edit/${blog.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ManagePostsPage;

