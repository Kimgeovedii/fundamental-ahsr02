"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import Link from "next/link";

import BlogCard from "@/components/core/cms/blog/BlogCard";
import { BlogForm } from "@/components/core/cms/blog/BlogForm";
import { useBlogs } from "@/lib/hooks/useBlogs";
import { blogService } from "@/lib/services";

export default function AdminDashboard() {
  const { blogs, loading, fetchBlogs } = useBlogs();
  const handleDelete = async (id: string) => {
    try {
      await blogService.delete(id);
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus blog!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Settings className="w-8 h-8 text-white" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage and publish school news and announcements
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <p className="text-sm text-blue-600 font-medium">
                  Total Articles
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {blogs.length}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <p className="text-sm text-green-600 font-medium">Featured</p>
                <p className="text-3xl font-bold text-green-900">
                  {blogs.filter((b) => b.is_featured).length}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <p className="text-sm text-purple-600 font-medium">
                  Categories
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {
                    new Set(blogs.map((b) => b.category?.name || "Unknown"))
                      .size
                  }
                </p>
              </div>
            </div>
          </div>

          {/* TABS */}
          <Tabs defaultValue="add-news" className="space-y-6">
            <TabsList className="bg-white shadow-md border border-gray-200 rounded-xl p-1 h-auto">
              <TabsTrigger
                value="add-news"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-6 py-3 font-medium transition-all"
              >
                ✏️ Add News
              </TabsTrigger>
              <TabsTrigger
                value="manage-news"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-6 py-3 font-medium transition-all"
              >
                📝 Manage News
              </TabsTrigger>
            </TabsList>

            <TabsContent value="add-news">
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full text-white">
                  <CardTitle className="text-xl text-white">
                    📝 Publish New Article
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Create and publish a new news article
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <BlogForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manage-news">
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <CardTitle className="text-xl text-white">
                    📚 Manage Articles
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    View and manage all published articles ({blogs.length}{" "}
                    total)
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8">
                  {loading ? (
                    <div className="text-center py-16 text-gray-600">
                      Loading...
                    </div>
                  ) : blogs.length > 0 ? (
                    <div className="space-y-6">
                      {blogs.map((article) => (
                        <BlogCard
                          key={article.id}
                          post={article}
                          onDeleted={() => {
                            handleDelete(article.id);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          No Articles Yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Create your first article to get started!
                        </p>
                        <Link
                          href="#insert"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Create First Article
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
