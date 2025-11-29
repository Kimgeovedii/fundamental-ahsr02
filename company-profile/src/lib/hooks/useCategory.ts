"use client";

import { useEffect } from "react";
import { useCategoryStore } from "../stores";

export function useCategory() {
  const { categories, loading, fetchCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return { categories, loading, fetchCategory };
}
