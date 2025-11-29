"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Search,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useCategoryStore } from "@/lib/stores/categoryStore";
import { blogService } from "@/lib/services/blogService";
import { Blog } from "@/lib/types/blog";
import { toast } from "sonner";
import { ManagePostCardSkeleton } from "./BlogCardSkeleton";
import { Tag } from "lucide-react";

const POSTS_PER_PAGE = 10;

const ManagePostsPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState("");
  const [featuredFilter, setFeaturedFilter] = React.useState<
    "all" | "featured" | "not_featured"
  >("all");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [postToDelete, setPostToDelete] = React.useState<string | null>(null);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const {
    categories,
    loading: categoriesLoading,
    fetchCategory,
  } = useCategoryStore();

  React.useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  React.useEffect(() => {
    if (user?.authorId) {
      fetchInitialBlogs();
    }
  }, [user?.authorId, featuredFilter, selectedCategory, debouncedSearchQuery]);

  const fetchInitialBlogs = async () => {
    if (!user?.authorId) return;
    setLoading(true);
    setCurrentPage(0);
    setBlogs([]);

    try {
      const isFeaturedFilter =
        featuredFilter === "featured"
          ? true
          : featuredFilter === "not_featured"
          ? false
          : undefined;

      const result = await blogService.getByAuthorIdPaginated({
        authorId: user.authorId,
        limit: POSTS_PER_PAGE,
        offset: 0,
        isFeatured: isFeaturedFilter,
        categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
        searchQuery: debouncedSearchQuery.trim() || undefined,
      });

      setBlogs(result.data);
      setHasMore(result.hasMore);
    } catch (error) {
      toast.error("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setDeleteDialogOpen(true);
  };

  const loadMoreBlogs = React.useCallback(async () => {
    if (loadingMore || !hasMore || loading || !user?.authorId) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const isFeaturedFilter =
        featuredFilter === "featured"
          ? true
          : featuredFilter === "not_featured"
          ? false
          : undefined;

      const result = await blogService.getByAuthorIdPaginated({
        authorId: user.authorId,
        limit: POSTS_PER_PAGE,
        offset: nextPage * POSTS_PER_PAGE,
        isFeatured: isFeaturedFilter,
        categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
        searchQuery: debouncedSearchQuery.trim() || undefined,
      });
      setBlogs((prev) => {
        const existingIds = new Set(prev.map((b) => b.id));
        const newBlogs = result.data.filter((b) => !existingIds.has(b.id));
        return [...prev, ...newBlogs];
      });
      setHasMore(result.hasMore);
      setCurrentPage(nextPage);
    } catch (error) {
      toast.error("Failed to load more posts");
    } finally {
      setLoadingMore(false);
    }
  }, [
    currentPage,
    hasMore,
    loadingMore,
    loading,
    user?.authorId,
    featuredFilter,
    selectedCategory,
    debouncedSearchQuery,
  ]);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreBlogs();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loadingMore, loading, loadMoreBlogs]);

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    try {
      await blogService.delete(postToDelete);
      toast.success("Post deleted successfully");
      setDeleteDialogOpen(false);
      setPostToDelete(null);

      setBlogs((prev) => prev.filter((b) => b.id !== postToDelete));

      if (blogs.length === 1 && hasMore) {
        loadMoreBlogs();
      }
    } catch (error) {
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
              <div className="relative">
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                  disabled={categoriesLoading}
                >
                  <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white pl-10">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem
                      value="all"
                      className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700"
                    >
                      All Categories
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id)}
                        className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="md:w-64">
              <Select
                value={featuredFilter}
                onValueChange={(value) =>
                  setFeaturedFilter(
                    value as "all" | "featured" | "not_featured"
                  )
                }
              >
                <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="All Posts" />
                </SelectTrigger>
                <SelectContent className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem
                    value="all"
                    className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700"
                  >
                    All Posts
                  </SelectItem>
                  <SelectItem
                    value="featured"
                    className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700"
                  >
                    Featured Only
                  </SelectItem>
                  <SelectItem
                    value="not_featured"
                    className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700"
                  >
                    Not Featured
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading && blogs.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ManagePostCardSkeleton key={index} />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                {debouncedSearchQuery ||
                featuredFilter !== "all" ||
                selectedCategory !== "all"
                  ? "No posts found matching your search or filter criteria."
                  : "You haven't created any posts yet."}
              </p>
              {debouncedSearchQuery ||
              featuredFilter !== "all" ||
              selectedCategory !== "all" ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFeaturedFilter("all");
                    setSelectedCategory("all");
                  }}
                  className="mt-2"
                >
                  Clear Filters
                </Button>
              ) : (
                <Link href="/digi-share/create">
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Post
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
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
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          >
                            <EyeOff className="w-3 h-3 mr-1" />
                            Not Featured
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            blog.is_featured
                              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          {blog.is_featured ? "On Timeline" : "Hidden"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {blog.description
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 100)}
                        ...
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href={`/digi-share/edit/${blog.id}`}
                          className="flex-1"
                        >
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

              {loadingMore && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ManagePostCardSkeleton key={`skeleton-${index}`} />
                  ))}
                </div>
              )}
              {hasMore && !loadingMore && (
                <div ref={loadMoreRef} className="h-10 w-full" />
              )}

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
                    <AlertDialogTitle>Delete Post</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this post? This action
                      cannot be undone.
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
