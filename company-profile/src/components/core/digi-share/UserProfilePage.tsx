"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, User, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/stores";
import { blogService } from "@/lib/services/blogService";
import { authorService } from "@/lib/services/authorService";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Blog } from "@/lib/types/blog";
import { Author } from "@/lib/types/author";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

const BlogCard = ({
  blog,
  index,
}: {
  blog: Blog;
  index: number;
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stripHtmlTags = (html: string): string => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getPreviewText = (html: string, maxLength: number = 120): string => {
    const text = stripHtmlTags(html);
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/digi-share/${blog.id}`}>
        <div className="cursor-pointer group">
          {blog.image_url && (
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          )}
          <div className="p-4">
            {blog.category && (
              <Badge
                variant="outline"
                className="mb-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                {blog.category.name}
              </Badge>
            )}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 text-sm">
              {getPreviewText(blog.description || "", 120)}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const POSTS_PER_PAGE = 10;

const UserProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuthStore();
  const authorId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [userBlogs, setUserBlogs] = React.useState<Blog[]>([]);
  const [author, setAuthor] = React.useState<Author | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchAuthor = async () => {
      if (!authorId) return;
      try {
        const authorData = await authorService.getById(authorId);
        if (authorData) {
          setAuthor(authorData);
        }
      } catch {
        setAuthor(null);
      }
    };

    fetchAuthor();
  }, [authorId]);

  // Fetch initial blogs
  React.useEffect(() => {
    const fetchInitialBlogs = async () => {
      if (!authorId) return;
      setLoading(true);
      setCurrentPage(0);
      setUserBlogs([]);
      
      try {
        const result = await blogService.getByAuthorIdPaginated({
          authorId,
          limit: POSTS_PER_PAGE,
          offset: 0,
          isFeatured: true, // Only show featured posts in profile
        });
        
        setUserBlogs(result.data);
        setHasMore(result.hasMore);
      } catch {
        setUserBlogs([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchInitialBlogs();
    }
  }, [authorId]);

  // Load more blogs function
  const loadMoreBlogs = React.useCallback(async () => {
    if (loadingMore || !hasMore || loading || !authorId) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const result = await blogService.getByAuthorIdPaginated({
        authorId,
        limit: POSTS_PER_PAGE,
        offset: nextPage * POSTS_PER_PAGE,
        isFeatured: true,
      });

      // Filter out duplicates
      setUserBlogs((prev) => {
        const existingIds = new Set(prev.map((b) => b.id));
        const newBlogs = result.data.filter((b) => !existingIds.has(b.id));
        return [...prev, ...newBlogs];
      });
      setHasMore(result.hasMore);
      setCurrentPage(nextPage);
    } catch {
      setUserBlogs((prev) => prev);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, hasMore, loadingMore, loading, authorId]);

  // Intersection Observer for infinite scroll
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

  const getInitials = (name?: string): string => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  const isOwnProfile = currentUser?.authorId === authorId;

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-16 md:py-20 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-8 w-48 mx-auto mb-2 bg-white/20" />
            <Skeleton className="h-4 w-32 mx-auto bg-white/20" />
          </div>
        </section>
        <section className="py-12 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-16 md:py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white dark:border-gray-700">
              {author?.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              ) : (
                <AvatarFallback className="bg-white text-blue-600 text-2xl md:text-3xl font-bold">
                  {getInitials(author?.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {author?.name || "User"}
                </h1>
                {isOwnProfile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/digi-share/profile/settings")}
                    className="bg-white/20 hover:bg-white/30 border-white text-white"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                )}
              </div>
              {author?.bio && (
                <p className="text-blue-100 dark:text-blue-200 mb-3 max-w-2xl">
                  {author.bio}
                </p>
              )}
              <div className="flex items-center gap-4 text-blue-100 dark:text-blue-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{userBlogs.length} {userBlogs.length === 1 ? 'Featured Post' : 'Featured Posts'}{hasMore && ' +'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {loading && userBlogs.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : userBlogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {isOwnProfile
                  ? "You haven't published any posts yet."
                  : "This user hasn't published any posts yet."}
              </p>
              {isOwnProfile && (
                <Link
                  href="/digi-share/create"
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  Write Your First Post
                </Link>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {isOwnProfile ? "Your Posts" : "Posts"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userBlogs.map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
                ))}
              </div>

              {/* Loading more indicator */}
              {loadingMore && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <BlogCardSkeleton key={`skeleton-${index}`} />
                  ))}
                </div>
              )}

              {/* Intersection Observer target */}
              {hasMore && !loadingMore && (
                <div ref={loadMoreRef} className="h-10 w-full" />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default UserProfilePage;

