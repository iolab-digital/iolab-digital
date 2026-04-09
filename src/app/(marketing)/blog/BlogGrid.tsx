"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  image: string | null;
};

const PAGE_SIZE = 12;

export function BlogGrid({ posts }: { posts: PostMeta[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all"
          >
            {post.image && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={`${post.title} — Blog article by iOLab Digital`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary/30 hover:text-primary hover:shadow-lg transition-all"
          >
            Load More Posts ({posts.length - visible} remaining)
          </button>
        </div>
      )}
    </>
  );
}
