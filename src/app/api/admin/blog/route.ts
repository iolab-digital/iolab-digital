import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

// This API always reads fresh from the filesystem — no caching
export async function GET() {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      return NextResponse.json({ posts: [], drafts: [] });
    }

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

    const posts = files.map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        author: data.author || "Rauf Tur",
        publishedAt: data.publishedAt || "",
        tags: data.tags || [],
        image: data.image || null,
        imagePrompt: data.imagePrompt || null,
        status: data.status === "draft" ? "draft" : "published",
        readingTime: calculateReadingTime(content),
        content,
      };
    });

    posts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const drafts = posts.filter((p) => p.status === "draft");

    return NextResponse.json(
      { posts, drafts },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch (error) {
    console.error("Admin blog API error:", error);
    return NextResponse.json({ posts: [], drafts: [] }, { status: 500 });
  }
}
