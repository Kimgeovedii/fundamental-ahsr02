"use client";

import { useState, useEffect } from "react";
import { blogService } from "../services";
import { Blog } from "../types";

interface UseFeaturedBlogsListOptions {
  enabled?: boolean;
  categoryId?: string;
  searchQuery?: string;
}

export function useFeaturedBlogsList(options: UseFeaturedBlogsListOptions = {}) {
  const { enabled = true, categoryId, searchQuery } = options;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    async function fetchFeaturedBlogs() {
      try {
        setLoading(true);
        const result = await blogService.getAllPaginated({
          limit: 1000,
          offset: 0,
          categoryId: categoryId === "all" ? undefined : categoryId,
          searchQuery: searchQuery?.trim() || undefined,
        });
        setBlogs(result.data);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedBlogs();
  }, [enabled, categoryId, searchQuery]);

  return { blogs, loading };
}

