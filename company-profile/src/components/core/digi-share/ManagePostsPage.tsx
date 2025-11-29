"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Calendar, Search, Star, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/lib/stores";
import { blogService } from "@/lib/services/blogService";
import { Blog } from "@/lib/types/blog";
import { toast } from "sonner";

const ManagePostsPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [featuredFilter, setFeaturedFilter] = React.useState<"all" | "featured" | "not_featured">("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [postToDelete, setPostToDelete] = React.useState<string | null>(null);

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

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    try {
      await blogService.delete(postToDelete);
      toast.success("Post deleted successfully");
      setDeleteDialogOpen(false);
      setPostToDelete(null);
      fetchUserBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete post");
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredBlogs = React.useMemo(() => {
    let filtered = blogs || [];

    if (featuredFilter === "featured") {
      filtered = filtered.filter((blog) => blog.is_featured === true);
    } else if (featuredFilter === "not_featured") {
      filtered = filtered.filter((blog) => blog.is_featured === false);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.description?.toLowerCase().includes(query)
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [blogs, searchQuery, featuredFilter]);

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

          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search posts by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:w-64">
              <select
                value={featuredFilter}
                onChange={(e) => setFeaturedFilter(e.target.value as "all" | "featured" | "not_featured")}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Posts</option>
                <option value="featured">Featured Only</option>
                <option value="not_featured">Not Featured</option>
              </select>
            </div>
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
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                No posts found matching your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFeaturedFilter("all");
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow hover:border-gray-300 dark:hover:border-gray-600"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                          {blog.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {blog.category && (
                          <Badge variant="outline" className="text-xs">
                            {blog.category.name}
                          </Badge>
                        )}
                        {blog.is_featured ? (
                          <Badge className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                            <EyeOff className="w-3 h-3 mr-1" />
                            Not Featured
                          </Badge>
                        )}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${blog.is_featured ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          {blog.is_featured ? "On Timeline" : "Hidden"}
                        </Badge>
                      </div>
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
                          onClick={() => handleDeleteClick(blog.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AlertDialog 
                open={deleteDialogOpen} 
                onOpenChange={(open) => {
                  setDeleteDialogOpen(open);
                  if (!open) {
                    setPostToDelete(null);
                  }
                }}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Post
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this post? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel 
                      onClick={() => {
                        setDeleteDialogOpen(false);
                        setPostToDelete(null);
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteConfirm}
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default ManagePostsPage;

