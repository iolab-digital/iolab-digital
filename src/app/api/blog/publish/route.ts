import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function POST(request: Request) {
  try {
    const { slug, action } = await request.json();

    if (!slug || !action) {
      return NextResponse.json({ error: "slug and action required" }, { status: 400 });
    }

    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileExists = fs.existsSync(filePath);

    // Check if post exists in DB
    let dbPostExists = false;
    try {
      const [row] = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
      dbPostExists = !!row;
    } catch { /* DB might not have the post */ }

    if (!fileExists && !dbPostExists) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (action === "publish") {
      // Update filesystem if file exists
      if (fileExists) {
        try {
          let content = fs.readFileSync(filePath, "utf-8");
          content = content.replace(/^status:\s*"draft"/m, 'status: "published"');
          fs.writeFileSync(filePath, content, "utf-8");
        } catch { /* Filesystem write may fail in production */ }
      }

      // Update database
      try {
        await db
          .update(blogPosts)
          .set({ status: "published", isPublished: true, updatedAt: new Date() })
          .where(eq(blogPosts.slug, slug));
      } catch { /* DB update may fail if post isn't in DB */ }

      // Try to revalidate cache — non-fatal
      try {
        const { revalidatePath } = await import("next/cache");
        revalidatePath("/admin/blog");
        revalidatePath("/blog");
        revalidatePath(`/blog/${slug}`);
      } catch { /* OK */ }

      return NextResponse.json({ success: true, action: "published" });
    }

    if (action === "reject") {
      // Delete from filesystem
      if (fileExists) {
        try { fs.unlinkSync(filePath); } catch { /* OK */ }
      }

      // Delete from database
      try {
        await db.delete(blogPosts).where(eq(blogPosts.slug, slug));
      } catch { /* OK */ }

      try {
        const { revalidatePath } = await import("next/cache");
        revalidatePath("/admin/blog");
        revalidatePath("/blog");
      } catch { /* OK */ }

      return NextResponse.json({ success: true, action: "deleted" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Publish/reject error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
