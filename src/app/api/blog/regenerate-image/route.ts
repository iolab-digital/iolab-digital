import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const CDN_URL = process.env.DO_SPACES_CDN_URL || "https://iolab.nyc3.digitaloceanspaces.com";

const s3 = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: process.env.DO_SPACES_REGION || "nyc3",
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY || "",
    secretAccessKey: process.env.DO_SPACES_SECRET || "",
  },
  forcePathStyle: false,
});

export async function POST(request: Request) {
  try {
    const { slug, imagePrompt } = await request.json();

    if (!slug || !imagePrompt) {
      return NextResponse.json({ error: "slug and imagePrompt required" }, { status: 400 });
    }

    // Generate new image with DALL-E
    const imgRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1.5",
        prompt: imagePrompt,
        n: 1,
        size: "1536x1024",
        quality: "medium",
      }),
    });

    if (!imgRes.ok) {
      const err = await imgRes.text();
      return NextResponse.json({ error: `Image generation failed: ${err.slice(0, 200)}` }, { status: 500 });
    }

    const imgData = await imgRes.json();
    const b64 = imgData.data[0].b64_json;
    const buffer = Buffer.from(b64, "base64");
    const imgKey = `images/generated/blog/auto/${slug}-cover.png`;

    // Upload to DO Spaces CDN
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET || "iolab",
        Key: imgKey,
        Body: buffer,
        ContentType: "image/png",
        ACL: "public-read",
      })
    );

    const newImageUrl = `${CDN_URL}/${imgKey}?v=${Date.now()}`;

    // Update database (primary store)
    try {
      await db
        .update(blogPosts)
        .set({
          featuredImage: newImageUrl,
          imagePrompt,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.slug, slug));
    } catch {
      // DB update failed — log but don't block
    }

    // Update filesystem if file exists (secondary, for local dev)
    try {
      const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, "utf-8");
        if (content.match(/^image:\s*.+$/m)) {
          content = content.replace(/^image:\s*.+$/m, `image: "${newImageUrl}"`);
        }
        if (content.match(/^imagePrompt:\s*.+$/m)) {
          content = content.replace(/^imagePrompt:\s*.+$/m, `imagePrompt: "${imagePrompt.replace(/"/g, '\\"')}"`);
        }
        fs.writeFileSync(filePath, content, "utf-8");
      }
    } catch {
      // Filesystem update is optional
    }

    return NextResponse.json({ success: true, imageUrl: newImageUrl });
  } catch (error) {
    console.error("Regenerate image error:", error);
    return NextResponse.json({ error: "Failed to regenerate image" }, { status: 500 });
  }
}
