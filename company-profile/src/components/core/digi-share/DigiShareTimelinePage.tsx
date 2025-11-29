"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Search, Tag, Plus, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBlogs } from "@/lib/hooks/useBlogs";
import { useCategoryStore } from "@/lib/stores/categoryStore";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { useAuthStore } from "@/lib/stores";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Blog } from "@/lib/types/blog";

interface DigiShareTimelinePageData {
  search: {
    placeholder: string;
  };
  filter: {
    label: string;
    all: string;
  };
  no_results: string;
  write_post: string;
  read_more: string;
  minutes_read: string;
  login_to_share: string;
}

const BlogPostCard = ({
  blog,
  index,
  minutesReadText = "min",
  readMoreText = "Read more",
}: {
  blog: Blog;
  index: number;
  minutesReadText?: string;
  readMoreText?: string;
}) => {
  const getInitials = (name?: string): string => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''}`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8 last:border-b-0 last:pb-0 last:mb-0"
    >
      <Link href={`/digi-share/${blog.id}`}>
        <div className="flex gap-6 cursor-pointer group">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Link 
                href={`/digi-share/profile/${blog.author_id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3"
              >
                <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                  {blog.author_avatar ? (
                    <AvatarImage 
                      src={blog.author_avatar} 
                      alt={blog.author_name || "Author"}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs">
                    {getInitials(blog.author_name)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link
                href={`/digi-share/profile/${blog.author_id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  {blog.author_name || "Anonymous"}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatDate(blog.created_at)}</span>
                  <span>•</span>
                  <span>{getTimeAgo(blog.created_at)}</span>
                </div>
              </Link>
              {blog.category && (
                <Badge
                  variant="outline"
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {blog.category.name}
                </Badge>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {blog.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {blog.description?.replace(/<[^>]*>/g, "").substring(0, 150)}...
            </p>

            {blog.image_url && (
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="hover:text-gray-900 dark:hover:text-white transition-colors">
                {readMoreText}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const DigiShareTimelinePage = () => {
  const router = useRouter();
  const { lang, hydrated } = useHydratedLanguageStore();
  const { user, token } = useAuthStore();
  const { blogs, loading: blogsLoading } = useBlogs();
  const { categories, loading: categoriesLoading, fetchCategory } =
    useCategoryStore();
  const [pageData, setPageData] = React.useState<DigiShareTimelinePageData | null>(
    null
  );
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.digi_share_page) {
            setPageData({
              search: data.digi_share_page.search,
              filter: data.digi_share_page.filter,
              no_results: data.digi_share_page.no_results,
              write_post: data.digi_share_page.write_post,
              read_more: data.digi_share_page.read_more,
              minutes_read: data.digi_share_page.minutes_read,
              login_to_share: data.digi_share_page.login_to_share,
            } as DigiShareTimelinePageData);
          }
        })
        .catch((error) => {
          console.error("Failed to load digi-share timeline page locale data:", error);
        })
        .finally(() => {
          setIsLoadingLocale(false);
        });
    }
  }, [lang, hydrated]);

  React.useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const filteredBlogs = React.useMemo(() => {
    let filtered = blogs || [];

    filtered = filtered.filter((blog) => blog.is_featured === true);

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (blog) => blog.category_id === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.description?.toLowerCase().includes(query) ||
          blog.author_name?.toLowerCase().includes(query)
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [blogs, selectedCategory, searchQuery]);

  const isLoggedIn = !!token && !!user;

  if (isLoadingLocale || !hydrated || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  const data = pageData;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-16 md:py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
                Timeline
              </h1>
            </div>
            {isLoggedIn && (
              <Button
                onClick={() => router.push("/digi-share/create")}
                className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 whitespace-nowrap"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{data.write_post}</span>
                <span className="sm:hidden">Write</span>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={data.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:w-64">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{data.filter.all}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {blogsLoading || categoriesLoading ? (
            <div className="flex justify-center items-center py-12">
              <Spinner />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {data.no_results}
              </p>
              {!isLoggedIn && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  <Link
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium"
                  >
                    Login
                  </Link>{" "}
                  {data.login_to_share}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-0">
              {filteredBlogs.map((blog, index) => (
                <BlogPostCard 
                  key={blog.id} 
                  blog={blog} 
                  index={index} 
                  minutesReadText={data.minutes_read}
                  readMoreText={data.read_more}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default DigiShareTimelinePage;

