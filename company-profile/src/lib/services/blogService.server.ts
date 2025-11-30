import { createClient } from "@supabase/supabase-js";
import { Blog } from "../types/blog";

export async function getBlogByIdForMetadata(id: string): Promise<Blog | null> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
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

    if (error || !data) return null;

    return {
      ...data,
      author_name: data.author?.name || null,
      author_id: data.author_id,
    };
  } catch {
    return null;
  }
}

