"use client";
import * as React from "react";
import { BlogForm } from "@/components/core/cms/blog/BlogForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreatePostPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push("/digi-share/posts")}
            className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Timeline
          </Button>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Create New Post
            </h1>
            <BlogForm
              onSuccess={() => {
                router.push("/digi-share/manage");
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreatePostPage;

