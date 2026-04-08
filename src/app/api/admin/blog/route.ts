import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDemoContext } from "@/lib/demo-context";
import { generateBlogPosts } from "@/lib/demo-mock-data";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

// Reads from BOTH filesystem (Git-committed posts) and database (runtime-generated posts)
export async function GET() {
  try {
    const demo = await getDemoContext();
    if (demo.isDemo) {
      const posts = generateBlogPosts(demo.industry!);
      return NextResponse.json({
        posts,
        drafts: posts.filter((p) => p.status === "draft"),
      });
    }

    // 1. Read filesystem posts (committed to Git)
    const fsPosts: Record<string, any> = {};
    try {
      if (fs.existsSync(BLOG_DIR)) {
        const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
        for (const file of files) {
          const slug = file.replace(/\.mdx$/, "");
          const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
          const { data, content } = matter(raw);
          fsPosts[slug] = {
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
            source: "filesystem",
          };
        }
      }
    } catch {
      // Filesystem read failed — continue with DB only
    }

    // 2. Read database posts (runtime-generated, persists across deploys)
    const dbPosts: Record<string, any> = {};
    try {
      const rows = await db
        .select()
        .from(blogPosts)
        .orderBy(desc(blogPosts.publishedAt));

      for (const row of rows) {
        dbPosts[row.slug] = {
          slug: row.slug,
          title: row.title,
          description: row.description || "",
          author: row.author || "Rauf Tur",
          publishedAt: row.publishedAt
            ? row.publishedAt.toISOString().split("T")[0]
            : "",
          tags: row.tags || [],
          image: row.featuredImage || null,
          imagePrompt: row.imagePrompt || null,
          status: row.status || (row.isPublished ? "published" : "draft"),
          readingTime: row.readTimeMinutes || (row.content ? calculateReadingTime(row.content) : 3),
          content: row.content || "",
          source: "database",
        };
      }
    } catch {
      // DB read failed — continue with filesystem only
    }

    // 3. Merge: DB posts override filesystem posts (DB is more up-to-date for runtime posts)
    // Filesystem posts take precedence for Git-committed posts (they're the source of truth for those)
    const merged = { ...dbPosts, ...fsPosts };

    // But for posts that exist in DB but NOT in filesystem (runtime-only), keep the DB version
    for (const slug of Object.keys(dbPosts)) {
      if (!fsPosts[slug]) {
        merged[slug] = dbPosts[slug];
      }
    }

    const posts = Object.values(merged).sort(
      (a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const drafts = posts.filter((p: any) => p.status === "draft");

    return NextResponse.json(
      { posts, drafts },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch (error) {
    console.error("Admin blog API error:", error);
    return NextResponse.json({ posts: [], drafts: [] }, { status: 500 });
  }
}
