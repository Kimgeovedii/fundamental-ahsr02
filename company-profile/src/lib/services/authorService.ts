import { supabase } from "../supabase/client";
import { Author } from "../types/author";

export const authorService = {
  async getByUserId(userId: string): Promise<Author | null> {
    const { data, error } = await supabase
      .from("author")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return data;
  },

  async getById(authorId: string): Promise<Author | null> {
    const { data, error } = await supabase
      .from("author")
      .select("*")
      .eq("id", authorId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return data;
  },

  async create(payload: {
    user_id: string;
    name: string | null;
    avatar?: string | null;
    bio?: string | null;
  }): Promise<Author> {
    const { data, error } = await supabase
      .from("author")
      .insert({
        ...payload,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(authorId: string, payload: Partial<Author>): Promise<Author> {
    const { data, error } = await supabase
      .from("author")
      .update(payload)
      .eq("id", authorId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async uploadAvatar(file: File, userId: string): Promise<string> {
    const ext = file.name.split(".").pop();
    const fileName = `${userId}_${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("avatar")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from("avatar")
      .getPublicUrl(data.path);

    return publicData.publicUrl;
  },

  async deleteAvatar(avatarUrl: string): Promise<void> {
    if (!avatarUrl) return;

    const fileName = avatarUrl.split("/").pop();
    if (!fileName) return;

    await supabase.storage.from("avatar").remove([fileName]);
  },
};
