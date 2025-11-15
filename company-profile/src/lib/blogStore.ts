import { supabase } from "./supabaseClient";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export interface Blog {
  id: string;
  title: string;
  description: string;
  image_url: string;
  author_id: string;
  author_name?: string;
  created_at: string;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  insertBlog: (payload: {
    title: string;
    description: string;
    image_url: string;
    author_id: string;
  }) => Promise<{ success: boolean; error?: string }>;
  fetchBlogs: (authorId?: string | "") => Promise<void>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  loading: false,
  insertBlog: async ({ title, description, image_url, author_id }) => {
    try {
      set({ loading: false });
      const { error } = await supabase.from("blogs").insert([
        {
          title,
          description,
          image_url,
          author_id,
        },
      ]);
      if (error) {
        set({ loading: false });
        return { success: false, error: error.message };
      }
      await get().fetchBlogs();
      return { success: true };
    } catch (err: any) {
      set({ loading: false });
      return { success: false, error: err.message };
    }
  },
  fetchBlogs: async (authorId) => {
    try {
      set({ loading: true });

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      set({ loading: false });
      if (error) return;

      const authStore = useAuthStore.getState();

      const blogsWithAuthor: Blog[] = (data as any[]).map((b) => ({
        ...b,
        author_name:
          authStore.user && b.author_id === authStore.user.id
            ? authStore.user.displayName ?? authStore.user.email
            : "Unknown",
      }));

      set({ blogs: blogsWithAuthor });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
