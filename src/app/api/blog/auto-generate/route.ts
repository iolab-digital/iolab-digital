import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { getAllPostsIncludingDrafts } from "@/lib/blog";

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

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function GET(request: Request) {
  // Auth check — accept CRON_SECRET header OR admin session cookie
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || "cron-secret-default";
  const cookies = request.headers.get("cookie") || "";
  const hasAdminCookie = cookies.includes("iolab-admin-token=");

  if (authHeader !== `Bearer ${cronSecret}` && !hasAdminCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Get existing post titles to avoid duplicates
    const existingPosts = getAllPostsIncludingDrafts();
    const existingTitles = existingPosts.map((p) => p.title).join("\n");

    // Step 1: Research trending topics and write the post
    const today = new Date().toISOString().split("T")[0];

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `You are a content writer for iOLab Digital, a custom software development agency that builds CRM systems, AI automation, mobile apps, and digital marketing tools for small businesses. The business replaces expensive SaaS subscriptions with custom-built software.

Today's date: ${today}

These blog posts already exist (DO NOT duplicate these topics):
${existingTitles}

TASK: Write a NEW blog post about a trending topic in small business technology, AI, CRM, or custom software. The post should:

1. Be relevant to small business owners considering custom software
2. Target a searchable keyword phrase
3. Be 1500-2000 words
4. Include internal links using markdown: [text](/path) — link to at least 3 of these pages:
   - /services/custom-crm
   - /services/ai-automation
   - /services/mobile-apps
   - /services/web-design
   - /services/email-marketing
   - /industries/restaurants (or any industry: contractors, dental, law-firms, salons, etc.)
   - /contact
   - /demos/crm (or any demo: customer-support, ai-chatbot, invoicing, booking, analytics, loyalty, documents, project-management, client-portal)
   - /pricing
   - /why-custom
5. End with a CTA linking to /contact
6. Use ## for section headings (NOT #, the page template adds the h1)
7. Include helpful, specific advice — not generic fluff
8. Write in a conversational, authoritative tone

Return your response in EXACTLY this format (no extra text before or after):

---FRONTMATTER---
title: "Title Under 60 Characters"
description: "Meta description under 160 characters with primary keyword."
slug: "url-friendly-slug"
tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]
imagePrompt: "A detailed DALL-E prompt for a cover image related to this topic. Professional, modern, SaaS dashboard style with purple (#7B2FF7) accent. 16:10 ratio."
---END-FRONTMATTER---

---CONTENT---
The full markdown blog post content here...
---END-CONTENT---`,
        },
      ],
    });

    const responseText = response.content[0].type === "text" ? response.content[0].text : "";

    // Parse frontmatter
    const frontmatterMatch = responseText.match(/---FRONTMATTER---([\s\S]*?)---END-FRONTMATTER---/);
    const contentMatch = responseText.match(/---CONTENT---([\s\S]*?)---END-CONTENT---/);

    if (!frontmatterMatch || !contentMatch) {
      return NextResponse.json({ error: "Failed to parse Claude response" }, { status: 500 });
    }

    const frontmatterRaw = frontmatterMatch[1].trim();
    const blogContent = contentMatch[1].trim();

    // Extract frontmatter fields
    const titleMatch = frontmatterRaw.match(/title:\s*"(.+?)"/);
    const descMatch = frontmatterRaw.match(/description:\s*"(.+?)"/);
    const slugMatch = frontmatterRaw.match(/slug:\s*"(.+?)"/);
    const tagsMatch = frontmatterRaw.match(/tags:\s*\[(.+?)\]/);
    const imagePromptMatch = frontmatterRaw.match(/imagePrompt:\s*"(.+?)"/);

    const title = titleMatch?.[1] || "Untitled Post";
    const description = descMatch?.[1] || "";
    const slug = slugMatch?.[1] || `auto-${Date.now()}`;
    const tagsStr = tagsMatch?.[1] || '"AI", "Small Business"';
    const imagePrompt = imagePromptMatch?.[1] || "A modern SaaS dashboard with purple accent color. Professional tech style. 16:10 ratio.";

    // Check for duplicate slug
    if (existingPosts.some((p) => p.slug === slug)) {
      return NextResponse.json({ error: "Duplicate slug", slug }, { status: 409 });
    }

    // Step 2: Generate cover image
    let coverImageUrl = "";
    try {
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

      if (imgRes.ok) {
        const imgData = await imgRes.json();
        const b64 = imgData.data[0].b64_json;
        const buffer = Buffer.from(b64, "base64");
        const imgKey = `images/generated/blog/auto/${slug}-cover.png`;

        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.DO_SPACES_BUCKET || "iolab",
            Key: imgKey,
            Body: buffer,
            ContentType: "image/png",
            ACL: "public-read",
          })
        );

        coverImageUrl = `${CDN_URL}/${imgKey}`;
      }
    } catch (imgErr) {
      console.error("Image generation failed:", imgErr);
      // Continue without image — not a blocker
    }

    // Step 3: Write MDX file as draft
    const mdxContent = `---
title: "${title}"
description: "${description}"
author: "Rauf Tur"
publishedAt: "${today}"
tags: [${tagsStr}]
status: "draft"
${coverImageUrl ? `image: "${coverImageUrl}"` : ""}
imagePrompt: "${imagePrompt.replace(/"/g, '\\"')}"
---

${blogContent}
`;

    fs.writeFileSync(path.join(BLOG_DIR, `${slug}.mdx`), mdxContent, "utf-8");

    // Step 4: Send notification email
    try {
      await getResend().emails.send({
        from: "iOLab Digital <updates@updates.iolab.co>",
        to: "hello@iolab.co",
        subject: `📝 New Blog Draft Ready: ${title}`,
        html: `
          <div style="max-width:600px;margin:0 auto;font-family:sans-serif;">
            <h2 style="color:#7B2FF7;">New Blog Post Draft</h2>
            <p>A new blog post has been auto-generated and is ready for your review:</p>
            <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:16px 0;">
              <h3 style="margin:0 0 8px;">${title}</h3>
              <p style="margin:0 0 8px;color:#666;font-size:14px;">${description}</p>
              <p style="margin:0;font-size:12px;color:#999;">Tags: ${tagsStr.replace(/"/g, "")} · Slug: ${slug}</p>
            </div>
            ${coverImageUrl ? `<p>Cover image: <a href="${coverImageUrl}" style="color:#7B2FF7;">View image</a></p>` : "<p>No cover image generated (can be added manually)</p>"}
            <p>
              <a href="https://iolab.co/admin/blog" style="display:inline-block;background:#7B2FF7;color:white;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;">
                Review & Approve in Admin
              </a>
            </p>
            <p style="font-size:12px;color:#999;margin-top:16px;">
              Preview: <a href="https://iolab.co/blog/${slug}" style="color:#7B2FF7;">https://iolab.co/blog/${slug}</a>
              (visible only after approval)
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Notification email failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      slug,
      title,
      coverImage: coverImageUrl || null,
    });
  } catch (error) {
    console.error("Auto-generate error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
