"use client";

import { useEffect } from "react";
import { useBlogStore } from "../stores/blogStore";

export function useBlogs() {
  const { blogs, loading, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { blogs, loading, fetchBlogs };
}
