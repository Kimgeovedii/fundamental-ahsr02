"use client";

import * as React from "react";
import Head from "next/head";
import { BlogForm } from "@/components/core/cms/blog/BlogForm";

const BlogCreatePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create Blog | MyCMS</title>
        <meta name="description" content="Halaman Create Blog di CMS" />
      </Head>

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Create Blog</h1>
        <BlogForm />
      </div>
    </>
  );
};

export default BlogCreatePage;
