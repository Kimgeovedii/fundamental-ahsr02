import { create } from "zustand";
import { blogService } from "../services";
import { Blog } from "../types";

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  fetchBlogs: () => Promise<void>;
  createBlog: (payload: Partial<Blog>) => Promise<Blog>;
  updateBlog: (id: string, payload: Partial<Blog>) => Promise<Blog>;
  deleteBlog: (id: string) => Promise<void>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  loading: false,

  fetchBlogs: async () => {
    set({ loading: true });
    const data = await blogService.getAll();
    set({ blogs: data, loading: false });
  },

  createBlog: async (payload) => {
    const newBlog = await blogService.create(payload);

    set((state) => ({
      blogs: [newBlog, ...state.blogs],
    }));

    return newBlog;
  },

  updateBlog: async (id, payload) => {
    const updated = await blogService.update(id, payload);

    set((state) => ({
      blogs: state.blogs.map((b) => (b.id === id ? updated : b)),
    }));

    return updated;
  },

  deleteBlog: async (id) => {
    await blogService.delete(id);

    set((state) => ({
      blogs: state.blogs.filter((b) => b.id !== id),
    }));
  },
}));
