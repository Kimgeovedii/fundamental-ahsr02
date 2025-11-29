import { supabase } from "../supabase/client";
import { Blog } from "../types/blog";

export const blogService = {
  async getAll(): Promise<Blog[]> {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        `
        *,
        category:categories(*),
        author!blogs_author_id_fkey(id, name, avatar, bio)
      `
      )
      .order("created_at", { ascending: false });
    if (error) throw error;

    return data.map((blog: any) => ({
      ...blog,
      author_name: blog.author?.name || null,
      author_id: blog.author_id,
    }));
  },

  async getById(id: string): Promise<Blog | null> {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        `
        *,
        category:categories(*),
        author!blogs_author_id_fkey(id, name, avatar, bio)
      `
      )
      .eq("id", id)
      .single();
    if (error) throw error;

    return {
      ...data,
      author_name: data.author?.name || null,
      author_id: data.author_id,
    };
  },

  async create(payload: Partial<Blog>): Promise<Blog> {
    const { data, error } = await supabase
      .from("blogs")
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Blog;
  },

  async update(id: string, payload: Partial<Blog>): Promise<Blog> {
    const { data, error } = await supabase
      .from("blogs")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Blog;
  },

  async delete(id: string) {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw error;
    return true;
  },

  async getByAuthorId(authorId: string): Promise<Blog[]> {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        `
        *,
        category:categories(*),
        author!blogs_author_id_fkey(id, name, avatar, bio)
      `
      )
      .eq("author_id", authorId)
      .order("created_at", { ascending: false });
    if (error) throw error;

    return data.map((blog: any) => ({
      ...blog,
      author_name: blog.author?.name || null,
      author_id: blog.author_id,
    }));
  },
};
