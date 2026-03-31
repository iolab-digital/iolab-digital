import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata(
  "Blog — AI & Automation Insights",
  "Tips, strategies, and case studies on how small businesses are replacing SaaS with custom solutions and AI automation.",
  "/blog",
  ["AI automation blog", "custom software insights", "small business technology", "SaaS alternatives"]
);

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="mb-4">Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            AI & Automation <span className="text-primary">Insights</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">New content coming soon.</p>
          <Button href="/contact">Get in Touch</Button>
        </div>
      </Section>
    );
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />

      {/* Hero */}
      <section className="bg-dark text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            AI & Automation <span className="text-primary">Insights</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tips, strategies, and real examples of how small businesses are replacing
            expensive SaaS tools with custom solutions.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <Section>
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid md:grid-cols-2 gap-8 items-center rounded-2xl border border-gray-200 bg-white p-6 md:p-8 hover:border-primary/30 hover:shadow-xl transition-all"
        >
          {featured.image && (
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
              <Image
                src={featured.image}
                alt={`${featured.title} — Blog article by iOLab Digital`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {featured.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="primary">{tag}</Badge>
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
              {featured.title}
            </h2>
            <p className="text-gray-500 mb-4 line-clamp-3">{featured.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{formatDate(featured.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {featured.readingTime} min read
              </span>
            </div>
          </div>
        </Link>
      </Section>

      {/* Post Grid */}
      {rest.length > 0 && (
        <Section className="bg-gray-50">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
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
        </Section>
      )}

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Want Custom Solutions for Your Business?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We build the tools these articles talk about. Let&apos;s discuss what&apos;s possible for your business.
          </p>
          <Button href="/contact" size="lg">
            Book a Free Consultation <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
