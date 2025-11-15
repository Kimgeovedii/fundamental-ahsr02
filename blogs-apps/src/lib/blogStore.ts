import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

const getAuthHeader = (userToken: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (userToken) {
    headers["user-token"] = userToken;
  }
  return headers;
};

const endpoint = "/data/blogs";

interface BlogOwner {
  objectId: string;
  name: string;
}

export interface Blog {
  objectId: string;
  title: string;
  description: string | null;
  created: Date;
  updated: Date;

  owner: BlogOwner | null;

  ownerId: string;
  authorName: string;
}

interface BlogState {
  blogs: Blog[];
  blog: Blog | null;
  isLoading: boolean;
  error: string | null;
  fetchBlogs: (userToken: string) => Promise<void>;
  getDetailBlog: (userToken: string, blogId: string) => Promise<void>;

  createBlog: (
    title: string,
    description: string,
    userToken: string
  ) => Promise<{ success: boolean; message: string }>;

  updatedBlog: (
    blogId: string,
    title: string,
    description: string,
    userToken: string
  ) => Promise<boolean>;
  deleteBlog: (blogId: string, userToken: string) => Promise<boolean>;
}
export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  blog: null,
  isLoading: false,
  error: null,

  fetchBlogs: async (userToken) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}${endpoint}`,
        {
          headers: getAuthHeader(userToken),
          params: {
            sortBy: "-created",
          },
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          `Gagal mengambil data: ${response.statusText || response.status}`
        );
      }

      const initialData: any[] = response.data;
      const ownerIds = [
        ...new Set(initialData.map((blog) => blog.ownerId).filter((id) => id)),
      ];

      let authorMap: Record<string, string> = {};

      if (ownerIds.length > 0) {
        const whereClause = ownerIds
          .map((id) => `objectId='${id}'`)
          .join(" OR ");
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/data/Users`,
          {
            headers: getAuthHeader(userToken),
            params: {
              where: whereClause,
              property: ["objectId", "name"],
            },
          }
        );

        userResponse.data.forEach((user: BlogOwner) => {
          authorMap[user.objectId] = user.name;
        });
      }

      const formatedData: Blog[] = initialData.map((blog) => ({
        objectId: blog.objectId,
        title: blog.title,
        description: blog.description || null,
        created: new Date(blog.created),
        updated: new Date(blog.updated),

        owner: null,
        ownerId: blog.ownerId || "",
        authorName: authorMap[blog.ownerId] || "Anonim",
      }));

      set({ blogs: formatedData, isLoading: false });
    } catch (error) {
      const message =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        (error as Error).message ||
        "Gagal memuat blog. Cek koneksi.";

      set({ error: message, isLoading: false });
      console.error("Fetch Blogs Error:", error);
      toast.error(message);
    }
  },
  getDetailBlog: async (userToken, blogId) => {
    // Pastikan ID blog valid sebelum memulai proses
    if (!blogId) {
      set({ error: "ID Blog tidak valid.", isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}${endpoint}/${blogId}`,
        {
          headers: getAuthHeader(userToken),
          params: {
            where: `objectId='${blogId}'`,
          },
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          `Gagal mengambil data: ${response.statusText || response.status}`
        );
      }

      const rawBlogData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      if (!rawBlogData) {
        throw new Error(`Detail blog dengan ID ${blogId} tidak ditemukan.`);
      }

      const ownerId = rawBlogData.ownerId;
      let authorName = "Anonim";

      if (ownerId) {
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/data/Users`,
          {
            headers: getAuthHeader(userToken),
            params: {
              where: `objectId='${ownerId}'`,
              property: ["objectId", "name"],
            },
          }
        );

        // Cek apakah user ditemukan
        if (userResponse.data && userResponse.data.length > 0) {
          authorName = userResponse.data[0].name;
        }
      }

      // --- Langkah 4: Format Data ---
      const formatedData = {
        objectId: rawBlogData.objectId,
        title: rawBlogData.title,
        description: rawBlogData.description || null,
        created: new Date(rawBlogData.created),
        updated: new Date(rawBlogData.updated),
        owner: null, // Asumsi ini adalah field yang tidak diisi di sini
        ownerId: ownerId || "",
        authorName: authorName,
      };

      // Update state dengan detail blog tunggal
      set({ blog: formatedData, isLoading: false });
    } catch (error) {
      const message =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        (error as Error).message ||
        "Gagal memuat blog. Cek koneksi.";

      set({ error: message, isLoading: false });
      console.error("Fetch Blog Detail Error:", error);
      toast.error(message);
    }
  },

  createBlog: async (
    title,
    description,
    userToken
  ): Promise<{ success: boolean; message: string }> => {
    set({ isLoading: true, error: null });

    const newBlogData = {
      title,
      description,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}${endpoint}`,
        newBlogData,
        {
          headers: getAuthHeader(userToken),
        }
      );
      set({ isLoading: false });
      return { success: true, message: "Blog berhasil ditambahkan!" };
    } catch (error) {
      const message =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        (error as Error).message ||
        "Unknown error";

      set({ isLoading: false, error: message });
      console.error("Create Blog Error:", error);

      return { success: false, message: `Gagal membuat blog: ${message}` };
    }
  },

  updatedBlog: async (
    blogId,
    title,
    description,
    userToken
  ): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const updateData = { title, description };

      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}${endpoint}/${blogId}`,
        updateData,
        {
          headers: getAuthHeader(userToken),
        }
      );

      get().fetchBlogs(userToken);
      set({ isLoading: false });
      return true;
    } catch (error) {
      const message = (error as Error).message || "Unknown error";
      set({
        isLoading: false,
        error: message,
      });
      toast.error(`Gagal update blog: ${message}`);
      return false;
    }
  },

  deleteBlog: async (blogId, userToken): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}${endpoint}/${blogId}`,
        {
          headers: getAuthHeader(userToken),
        }
      );

      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.objectId !== blogId),
        isLoading: false,
      }));
      return true;
    } catch (error) {
      const message = (error as Error).message || "Unknown error";
      set({ isLoading: false, error: message });
      toast.error(`Gagal hapus blog: ${message}`);
      return false;
    }
  },
}));
