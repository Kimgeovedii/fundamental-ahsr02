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
      author_avatar: blog.author?.avatar || null,
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
      author_avatar: data.author?.avatar || null,
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
      author_avatar: blog.author?.avatar || null,
      author_id: blog.author_id,
    }));
  },

  async getByAuthorIdPaginated(options: {
    authorId: string;
    limit: number;
    offset: number;
    isFeatured?: boolean;
    categoryId?: string;
    searchQuery?: string;
  }): Promise<{ data: Blog[]; hasMore: boolean }> {
    let query = supabase
      .from("blogs")
      .select(
        `
        *,
        category:categories(*),
        author!blogs_author_id_fkey(id, name, avatar, bio)
      `,
        { count: "exact" }
      )
      .eq("author_id", options.authorId)
      .order("created_at", { ascending: false });

    if (options.isFeatured !== undefined) {
      query = query.eq("is_featured", options.isFeatured);
    }

    if (options.categoryId) {
      query = query.eq("category_id", options.categoryId);
    }

    const fetchLimit = options.searchQuery ? 1000 : options.limit;
    const fetchOffset = options.searchQuery ? 0 : options.offset;
    
    query = query.range(fetchOffset, fetchOffset + fetchLimit - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    let blogs = (data || []).map((blog: any) => ({
      ...blog,
      author_name: blog.author?.name || null,
      author_avatar: blog.author?.avatar || null,
      author_id: blog.author_id,
    }));

    if (options.searchQuery?.trim()) {
      const searchLower = options.searchQuery.toLowerCase();
      blogs = blogs.filter(
        (blog: Blog) =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.description?.toLowerCase().includes(searchLower)
      );
    }

    if (options.searchQuery) {
      const start = options.offset;
      const end = options.offset + options.limit;
      const paginatedBlogs = blogs.slice(start, end);
      const hasMore = end < blogs.length;

      return {
        data: paginatedBlogs,
        hasMore,
      };
    }
    const hasMore = count ? options.offset + options.limit < count : false;

    return {
      data: blogs,
      hasMore,
    };
  },

  async getAllPaginated(options: {
    limit: number;
    offset: number;
    categoryId?: string;
    searchQuery?: string;
  }): Promise<{ data: Blog[]; hasMore: boolean }> {
    let query = supabase
      .from("blogs")
      .select(
        `
        *,
        category:categories(*),
        author!blogs_author_id_fkey(id, name, avatar, bio)
      `,
        { count: "exact" }
      )
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    if (options.categoryId) {
      query = query.eq("category_id", options.categoryId);
    }

    const fetchLimit = options.searchQuery ? 1000 : options.limit;
    const fetchOffset = options.searchQuery ? 0 : options.offset;
    
    query = query.range(fetchOffset, fetchOffset + fetchLimit - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    let blogs = (data || []).map((blog: any) => ({
      ...blog,
      author_name: blog.author?.name || null,
      author_avatar: blog.author?.avatar || null,
      author_id: blog.author_id,
    }));

    if (options.searchQuery?.trim()) {
      const searchLower = options.searchQuery.toLowerCase();
      blogs = blogs.filter(
        (blog: Blog) =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.description?.toLowerCase().includes(searchLower) ||
          blog.author_name?.toLowerCase().includes(searchLower)
      );
    }

    if (options.searchQuery) {
      const start = options.offset;
      const end = options.offset + options.limit;
      const paginatedBlogs = blogs.slice(start, end);
      const hasMore = end < blogs.length;

      return {
        data: paginatedBlogs,
        hasMore,
      };
    }
    const hasMore = count ? options.offset + options.limit < count : false;

    return {
      data: blogs,
      hasMore,
    };
  },
};
