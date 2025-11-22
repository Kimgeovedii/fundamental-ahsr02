import { supabase } from "../supabase/client";
import { Blog } from "../types/blog";

export const blogService = {
  async getAll(): Promise<Blog[]> {
    const { data, error } = await supabase.from("blogs").select("*");
    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<Blog | null> {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
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
};
