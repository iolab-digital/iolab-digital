import { SITE } from "./constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://iolab.co";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "iOLab Digital",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo/iolab-logo-black.png`,
    description: SITE.description,
    foundingDate: "2014",
    founder: {
      "@type": "Person",
      name: "Rauf Tur",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medford",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-609-200-1127",
      contactType: "sales",
      email: "hello@iolab.co",
    },
    sameAs: [
      SITE.social.instagram,
      SITE.social.linkedin,
      SITE.social.youtube,
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "iOLab Digital",
    url: BASE_URL,
    telephone: "+1-609-200-1127",
    email: "hello@iolab.co",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medford",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    priceRange: "$$",
    image: `${BASE_URL}/images/logo/iolab-logo-black.png`,
  };
}

export function serviceSchema(name: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE_URL}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: "iOLab Digital",
      url: BASE_URL,
    },
    areaServed: { "@type": "Country", name: "US" },
    serviceType: name,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rauf Tur",
    jobTitle: "Founder & CEO",
    worksFor: { "@type": "Organization", name: "iOLab Digital" },
    url: SITE.social.linkedin,
    image: `${BASE_URL}/images/team/rauf-tur.jpg`,
  };
}

export function creativeWorkSchema(
  name: string,
  description: string,
  image: string,
  slug: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    image: `${BASE_URL}${image}`,
    url: `${BASE_URL}/portfolio/${slug}`,
    creator: { "@type": "Organization", name: "iOLab Digital" },
  };
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  keywords?: string[]
) {
  return {
    title,
    description,
    keywords: keywords || [],
    openGraph: {
      title: `${title} | iOLab Digital`,
      description,
      url: `${BASE_URL}${path}`,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | iOLab Digital`,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}${path}`,
    },
  };
}
