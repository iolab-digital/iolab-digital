import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  image?: string;
  status: "published" | "draft";
  content: string;
  readingTime: number;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

function parsePost(file: string): BlogPostMeta & { content: string } {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    author: data.author || "Rauf Tur",
    publishedAt: data.publishedAt || "",
    updatedAt: data.updatedAt,
    tags: data.tags || [],
    image: data.image,
    status: data.status === "draft" ? "draft" : "published",
    content,
    readingTime: calculateReadingTime(content),
  };
}

function sortByDate(posts: BlogPostMeta[]): BlogPostMeta[] {
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** Returns only published posts (for the public site) */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((f) => {
    const { content: _, ...meta } = parsePost(f);
    return meta;
  });
  return sortByDate(posts.filter((p) => p.status === "published"));
}

/** Returns ALL posts including drafts (for admin) */
export function getAllPostsIncludingDrafts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((f) => {
    const { content: _, ...meta } = parsePost(f);
    return meta;
  });
  return sortByDate(posts);
}

/** Returns only draft posts (for admin review queue) */
export function getDraftPosts(): BlogPostMeta[] {
  return getAllPostsIncludingDrafts().filter((p) => p.status === "draft");
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const { content, ...meta } = parsePost(`${slug}.mdx`);
  return { ...meta, content };
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug);
  const scored = all.map((post) => ({
    post,
    score: post.tags.filter((t) => tags.includes(t)).length,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function getAllSlugs(): string[] {
  // Only return published slugs for static generation
  return getAllPosts().map((p) => p.slug);
}
