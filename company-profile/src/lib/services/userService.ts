import { supabase } from "../supabase/client";

export interface UserProfile {
  id: string;
  author_id: string;
  author_name: string;
  email?: string;
  posts_count?: number;
}

export const userService = {
  async searchUsers(query: string): Promise<UserProfile[]> {
    if (!query.trim()) return [];

    const { data, error } = await supabase
      .from("author")
      .select("id, name")
      .ilike("name", `%${query.trim()}%`)
      .limit(20);

    if (error) throw error;

    const usersWithCounts = await Promise.all(
      (data || []).map(async (author) => {
        const { count } = await supabase
          .from("blogs")
          .select("*", { count: "exact", head: true })
          .eq("author_id", author.id);
        
        return {
          id: author.id,
          author_id: author.id,
          author_name: author.name,
          posts_count: count || 0,
        };
      })
    );

    return usersWithCounts;
  },

  async getAllUsers(): Promise<UserProfile[]> {
    const { data, error } = await supabase
      .from("author")
      .select("id, name")
      .limit(100);

    if (error) throw error;

    const usersWithCounts = await Promise.all(
      (data || []).map(async (author) => {
        const { count } = await supabase
          .from("blogs")
          .select("*", { count: "exact", head: true })
          .eq("author_id", author.id);
        
        return {
          id: author.id,
          author_id: author.id,
          author_name: author.name,
          posts_count: count || 0,
        };
      })
    );

    return usersWithCounts.sort((a, b) => (b.posts_count || 0) - (a.posts_count || 0));
  },
};

