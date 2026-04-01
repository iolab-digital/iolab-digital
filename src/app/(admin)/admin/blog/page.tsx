"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  Tag,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Loader2,
  Trash2,
} from "lucide-react";

type Post = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: "published" | "draft";
  publishedAt: string;
  readingTime: number;
  image: string | null;
};

export default function AdminBlogPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blog", { cache: "no-store" });
      const data = await res.json();
      setAllPosts(data.posts || []);
      setDrafts(data.drafts || []);
    } catch {
      // silent
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleAction(slug: string, action: "publish" | "reject") {
    if (action === "reject" && !confirm("Delete this draft permanently?")) return;

    setActionLoading(slug);
    const res = await fetch("/api/blog/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action }),
    });

    if (res.ok) {
      // Re-fetch fresh data from API
      await fetchPosts();
    } else {
      alert(`Failed to ${action}. Please try again.`);
    }
    setActionLoading(null);
  }

  const published = allPosts.filter((p) => p.status === "published");

  const tagCounts: Record<string, number> = {};
  allPosts.forEach((p) =>
    p.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    })
  );
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  const avgReadingTime =
    allPosts.length > 0
      ? Math.round(allPosts.reduce((s, p) => s + p.readingTime, 0) / allPosts.length)
      : 0;

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <span className="text-sm text-gray-500">{allPosts.length} total</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{published.length}</div>
              <div className="text-xs text-gray-500">Published</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{drafts.length}</div>
              <div className="text-xs text-gray-500">Drafts Pending</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Tag className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{sortedTags.length}</div>
              <div className="text-xs text-gray-500">Tags Used</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{avgReadingTime} min</div>
              <div className="text-xs text-gray-500">Avg Reading Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Drafts pending review */}
      {drafts.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 mb-8">
          <div className="p-4 border-b border-amber-200 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <h2 className="font-bold text-amber-900">Drafts Pending Review ({drafts.length})</h2>
          </div>
          <div className="p-4 space-y-3">
            {drafts.map((draft) => (
              <div
                key={draft.slug}
                className="flex items-center gap-4 rounded-xl bg-white border border-amber-200 p-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{draft.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {draft.description}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    {draft.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        {tag}
                      </span>
                    ))}
                    <span className="text-[10px] text-gray-400">
                      {draft.readingTime} min read
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/blog/${draft.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" /> Preview
                  </Link>
                  <button
                    onClick={() => handleAction(draft.slug, "publish")}
                    disabled={actionLoading === draft.slug}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-600 text-white hover:bg-green-700 flex items-center gap-1 disabled:opacity-50"
                  >
                    {actionLoading === draft.slug ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(draft.slug, "reject")}
                    disabled={actionLoading === draft.slug}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-1 disabled:opacity-50"
                  >
                    {actionLoading === draft.slug ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All posts table */}
      <div className="rounded-xl bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold">All Posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Title</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Tags</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Date</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Read Time</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Image</th>
              </tr>
            </thead>
            <tbody>
              {allPosts.map((post) => (
                <tr key={post.slug} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <Link href={`/blog/${post.slug}`} target="_blank" className="hover:text-primary">
                      <div className="font-medium text-xs">{post.title}</div>
                      <div className="text-[10px] text-gray-400">/{post.slug}</div>
                    </Link>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-400">{post.publishedAt}</td>
                  <td className="p-3 text-xs text-gray-400">{post.readingTime} min</td>
                  <td className="p-3">
                    {post.image ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-300" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tag breakdown */}
      <div className="rounded-xl bg-white border border-gray-200 mt-8">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold">Tags</h2>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          {sortedTags.map(([tag, count]) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600"
            >
              {tag} ({count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
