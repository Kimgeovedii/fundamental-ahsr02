"use client";

import { useState, useEffect } from "react";
import { blogService } from "../services";
import { Blog } from "../types";

interface UseBlogsListOptions {
  enabled?: boolean;
}

export function useBlogsList(options: UseBlogsListOptions = {}) {
  const { enabled = true } = options;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    async function fetchBlogs() {
      try {
        setLoading(true);
        const data = await blogService.getAll();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [enabled]);

  return { blogs, loading, refetch: () => blogService.getAll().then(setBlogs) };
}

