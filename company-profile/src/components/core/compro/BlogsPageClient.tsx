"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Search, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogs } from "@/lib/hooks/useBlogs";
import { useCategoryStore } from "@/lib/stores/categoryStore";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/lib/types/blog";

interface BlogsPageData {
  page_title: string;
  page_description: string;
  hero: {
    heading: string;
    subheading: string;
  };
  search: {
    placeholder: string;
  };
  filter: {
    label: string;
    all: string;
  };
  no_results: string;
}

const BlogsPageClient = () => {
  const { lang, hydrated } = useHydratedLanguageStore();
  const { blogs, loading: blogsLoading } = useBlogs();
  const { categories, loading: categoriesLoading, fetchCategory } =
    useCategoryStore();
  const [pageData, setPageData] = React.useState<BlogsPageData | null>(null);
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.blogs_page) {
            setPageData(data.blogs_page as BlogsPageData);
          }
        })
        .catch(() => {
          // Silent fail - locale will use default
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
          blog.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [blogs, selectedCategory, searchQuery]);

  if (isLoadingLocale || !hydrated || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  const data = pageData;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-20 md:py-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            {data.hero.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 max-w-3xl mx-auto"
          >
            {data.hero.subheading}
          </motion.p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={data.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:w-64">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {blogsLoading || categoriesLoading ? (
            <div className="flex justify-center items-center py-12">
              <Spinner />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {data.no_results}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blogs/${blog.id}`}>
                    <Card className="h-full hover:shadow-xl transition-shadow duration-300 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 cursor-pointer group">
                      <div className="relative w-full h-48 overflow-hidden">
                        {blog.image_url ? (
                          <Image
                            src={blog.image_url}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-500">
                              No Image
                            </span>
                          </div>
                        )}
                        {blog.is_featured && (
                          <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                            Featured
                          </Badge>
                        )}
                        {blog.category && (
                          <Badge
                            variant="outline"
                            className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90"
                          >
                            {blog.category?.name || "Uncategorized"}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                          {blog.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {blog.created_at
                                ? new Date(blog.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : "N/A"}
                            </span>
                          </div>
                          {blog.author_name && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{blog.author_name}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogsPageClient;

