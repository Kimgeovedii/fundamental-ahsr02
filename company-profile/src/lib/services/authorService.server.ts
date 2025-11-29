import { createClient } from "@supabase/supabase-js";
import { Author } from "../types/author";

export async function getAuthorByIdForMetadata(
  authorId: string
): Promise<Author | null> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from("author")
      .select("*")
      .eq("id", authorId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}
