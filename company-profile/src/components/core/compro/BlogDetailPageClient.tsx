"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogDetail } from "@/lib/hooks/useBlogDetail";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface BlogDetailPageData {
  back_to_blogs: string;
  share: string;
  reading_time: string;
}

const BlogDetailPageClient = () => {
  const params = useParams();
  const router = useRouter();
  const { lang, hydrated } = useHydratedLanguageStore();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const blog = useBlogDetail(id || "");
  const [pageData, setPageData] = React.useState<BlogDetailPageData | null>(
    null
  );
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.blog_detail_page) {
            setPageData(data.blog_detail_page as BlogDetailPageData);
          }
        })
        .catch(() => {
          setPageData(null);
        })
        .finally(() => {
          setIsLoadingLocale(false);
        });
    }
  }, [lang, hydrated]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (isLoadingLocale || !hydrated || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  const readingTime = blog.description
    ? calculateReadingTime(blog.description)
    : 1;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <article className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/blogs">
              <Button
                variant="ghost"
                className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {pageData.back_to_blogs}
              </Button>
            </Link>

            {blog.category && (
              <div className="mb-4">
                <Badge
                  variant="outline"
                  className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {blog.category.name}
                </Badge>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              {blog.author_name && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author_name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>•</span>
                <span>
                  {readingTime} {pageData.reading_time}
                </span>
              </div>
            </div>
          </motion.div>

          {blog.image_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden"
            >
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div
              className="prose-content text-gray-900 dark:text-gray-100 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <Link href="/blogs">
                <Button
                  variant="outline"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {pageData.back_to_blogs}
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.description,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {pageData.share}
              </Button>
            </div>
          </motion.div>
        </div>
      </article>
    </main>
  );
};

export default BlogDetailPageClient;

