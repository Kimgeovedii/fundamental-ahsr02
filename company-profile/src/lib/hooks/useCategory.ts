"use client";

import { useEffect } from "react";
import { useCategoryStore } from "../stores";

export function useBlogs() {
  const { categories, loading, fetchCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategory();
  }, []);

  return { categories, loading };
}
