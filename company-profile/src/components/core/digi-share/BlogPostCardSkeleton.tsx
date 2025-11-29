"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const BlogPostCardSkeleton = () => {
  return (
    <article className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>

          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />

          <Skeleton className="h-64 w-full rounded-lg mb-4" />

          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </article>
  );
};

