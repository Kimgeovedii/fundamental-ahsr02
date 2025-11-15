import * as React from "react";
import BlogDetails from "./BlogDetails";

interface IDetailBlogsPageProps {
  params: { id: string };
}

const DetailBlogsPage = async ({ params }: IDetailBlogsPageProps) => {
  const blogId = params.id;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Detail Blog
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Artikel #{blogId}
          </p>
        </div>

        {/* Blog Detail */}
        <BlogDetails blogId={blogId} />
      </div>
    </main>
  );
};

export default DetailBlogsPage;
