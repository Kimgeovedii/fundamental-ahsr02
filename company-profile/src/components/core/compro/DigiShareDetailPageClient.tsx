"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBlogDetail } from "@/lib/hooks/useBlogDetail";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface DigiShareDetailPageData {
  back_to_digi_share: string;
  share: string;
  reading_time: string;
  written_by: string;
  published_on: string;
}

const DigiShareDetailPageClient = () => {
  const params = useParams();
  const { lang, hydrated } = useHydratedLanguageStore();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const blog = useBlogDetail(id || "");
  const [pageData, setPageData] = React.useState<DigiShareDetailPageData | null>(
    null
  );
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.digi_share_detail_page) {
            setPageData(data.digi_share_detail_page as DigiShareDetailPageData);
          }
        })
        .catch((error) => {
          console.error("Failed to load digi-share detail page locale data:", error);
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

  const getInitials = (name?: string): string => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name[0].toUpperCase();
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
            <Link href="/digi-share/posts">
              <Button
                variant="ghost"
                className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {pageData.back_to_digi_share}
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <Link href={`/digi-share/profile/${blog.author_id}`}>
                <Avatar className="h-12 w-12 border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                  {blog.author_avatar ? (
                    <AvatarImage 
                      src={blog.author_avatar} 
                      alt={blog.author_name || "Author"}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    {getInitials(blog.author_name)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link href={`/digi-share/profile/${blog.author_id}`} className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  {blog.author_name || "Anonymous"}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    {pageData.published_on} {formatDate(blog.created_at)}
                  </span>
                  <span>•</span>
                  <span>{getTimeAgo(blog.created_at)}</span>
                </div>
              </Link>
              {blog.category && (
                <Badge
                  variant="outline"
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {blog.category.name}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {blog.title}
            </h1>
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
              className="text-gray-900 dark:text-gray-100 leading-relaxed"
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
              <Link href="/digi-share/posts">
                <Button
                  variant="outline"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {pageData.back_to_digi_share}
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

export default DigiShareDetailPageClient;

