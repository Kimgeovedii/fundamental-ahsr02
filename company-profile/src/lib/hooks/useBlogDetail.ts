"use client";

import { useState, useEffect } from "react";
import { blogService } from "../services";
import { Blog } from "../types";

export function useBlogDetail(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    async function load() {
      const data = await blogService.getById(id);
      setBlog(data);
    }
    load();
  }, [id]);

  return blog;
}
