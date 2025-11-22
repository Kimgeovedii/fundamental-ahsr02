import { supabase } from "../supabase/client";
import { Category } from "../types";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload: Partial<Category>) {
    return await supabase.from("categories").insert(payload);
  },
  async delete(id: string) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
