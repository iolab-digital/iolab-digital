import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function POST(request: Request) {
  try {
    const { slug, action } = await request.json();

    if (!slug || !action) {
      return NextResponse.json({ error: "slug and action required" }, { status: 400 });
    }

    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (action === "publish") {
      // Change status: "draft" to status: "published" in frontmatter
      let content = fs.readFileSync(filePath, "utf-8");
      content = content.replace(/^status:\s*"draft"/m, 'status: "published"');
      // Also update the publishedAt to now if it was a future date
      fs.writeFileSync(filePath, content, "utf-8");
      return NextResponse.json({ success: true, action: "published" });
    }

    if (action === "reject") {
      // Delete the file
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true, action: "deleted" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Publish/reject error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
