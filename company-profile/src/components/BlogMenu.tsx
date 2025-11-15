"use client";

import { useEffect, useState } from "react";
import { MdArticle } from "react-icons/md";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/lib/useAuthStore";
import { supabase } from "@/lib/supabaseClient";

interface BlogItem {
  id: string;
  title: string;
}

export function BlogMenu() {
  const { isMobile } = useSidebar();
  const { user } = useAuthStore();

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMyLatestBlogs() {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("blogs")
      .select("id, title")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error && data) {
      setBlogs(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMyLatestBlogs();
  }, [user]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Your Published Blogs</SidebarGroupLabel>

      <SidebarMenu>
        {loading && (
          <SidebarMenuItem>
            <SidebarMenuButton className="opacity-50">
              Loading...
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        {!loading && blogs.length === 0 && (
          <SidebarMenuItem>
            <SidebarMenuButton className="opacity-70">
              No blogs yet
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        {!loading &&
          blogs.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <a href={`/cms/blogs/${item.id}`}>
                  <MdArticle />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/cms/blogs">
              <MdArticle />
              <span>View All Blogs</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
