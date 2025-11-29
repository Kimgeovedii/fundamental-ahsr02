"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, User, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useBlogs } from "@/lib/hooks/useBlogs";
import { useAuthStore } from "@/lib/stores";
import { blogService } from "@/lib/services/blogService";
import { authorService } from "@/lib/services/authorService";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Blog } from "@/lib/types/blog";
import { Author } from "@/lib/types/author";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

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
              {blog.description?.replace(/<[^>]*>/g, "").substring(0, 120)}...
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

const UserProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuthStore();
  const authorId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [userBlogs, setUserBlogs] = React.useState<Blog[]>([]);
  const [author, setAuthor] = React.useState<Author | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!authorId) return;
      setLoading(true);
      try {
        const [authorData, blogs] = await Promise.all([
          authorService.getById(authorId),
          blogService.getByAuthorId(authorId),
        ]);
        
        if (authorData) {
          setAuthor(authorData);
        }
        if (blogs) {
          setUserBlogs(blogs);
        }
      } catch (error: any) {
        console.error("Failed to fetch data:", error);
        console.error("Error details:", {
          message: error?.message,
          code: error?.code,
          details: error?.details,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authorId]);

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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <Spinner />
      </div>
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
                  <span>{userBlogs.length} Posts</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {userBlogs.length === 0 ? (
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
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default UserProfilePage;

