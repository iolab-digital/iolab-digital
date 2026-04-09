import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { getPostBySlug, getAllSlugs, getRelatedPosts, getPostBySlugMerged } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { BlogContent } from "./BlogContent";
import { ShareButtons } from "@/components/shared/ShareButtons";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugMerged(slug);
  if (!post) return {};

  return {
    ...pageMetadata(post.title, post.description, `/blog/${slug}`, post.tags),
    openGraph: {
      title: `${post.title} | iOLab Digital`,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      ...(post.image ? { images: [{ url: post.image, width: 1200, height: 630, alt: post.title }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlugMerged(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(slug, post.tags);

  return (
    <>
      <JsonLd
        data={articleSchema(
          post.title,
          post.description,
          slug,
          post.publishedAt,
          post.updatedAt,
          post.image
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${slug}` },
        ])}
      />

      {/* Hero */}
      <section className="bg-dark text-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="dark">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            {post.title}
          </h1>

          <p className="text-gray-400 text-lg mb-8">{post.description}</p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.image && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
            <Image
              src={post.image}
              alt={`${post.title} — Blog article by iOLab Digital`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <Section>
        <article className="mx-auto max-w-3xl">
          <BlogContent content={post.content} />

          {/* Share buttons */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <ShareButtons url={`/blog/${slug}`} title={post.title} />
          </div>
        </article>
      </Section>

      {/* CTA */}
      <Section className="bg-primary/5 border-y border-primary/10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-display mb-4">
            Ready to Build Something Custom?
          </h2>
          <p className="text-gray-600 mb-6">
            Stop paying for software that doesn&apos;t fit. Let&apos;s talk about
            what a custom solution could do for your business.
          </p>
          <Button href="/contact" size="lg">
            Book a Free Consultation <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>

      {/* Related Posts */}
      {related.length > 0 && (
        <Section>
          <h2 className="text-2xl font-bold font-display mb-8 text-center">
            More from the Blog
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 hover:border-primary/30 hover:shadow-xl transition-all"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {r.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {r.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">{r.description}</p>
                <div className="mt-4 text-xs text-gray-400">
                  {formatDate(r.publishedAt)} &middot; {r.readingTime} min read
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
