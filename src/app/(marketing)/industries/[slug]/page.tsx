import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPageLayout } from "@/components/services/IndustryPageLayout";
import { pageMetadata } from "@/lib/seo";
import { getIndustryData, ALL_INDUSTRY_SLUGS } from "@/data/industries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ALL_INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getIndustryData(slug);
  if (!data) return {};

  return pageMetadata(
    data.metaTitle,
    data.metaDescription,
    `/industries/${data.slug}`,
    data.seoKeywords
  );
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const data = getIndustryData(slug);

  if (!data) {
    notFound();
  }

  return <IndustryPageLayout data={data} />;
}
