import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/shared/JsonLd";
import { organizationSchema } from "@/lib/seo";
import { LiveChatWidget } from "@/components/shared/LiveChatWidget";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "iOLab Digital | Custom Apps & AI Automation for Small Business",
    template: "%s | iOLab Digital",
  },
  description:
    "Stop renting software. Start owning it. Custom CRM, mobile apps, AI automation & digital marketing — delivered for a fraction of the cost. Enterprise power at small business prices.",
  keywords: [
    "custom CRM",
    "AI automation",
    "custom mobile apps",
    "small business apps",
    "replace SaaS",
    "custom software development",
    "digital marketing",
    "web design",
    "SEO",
    "email marketing",
    "iOLab Digital",
    "Medford NJ",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "iOLab Digital",
    images: [{ url: "https://iolab.nyc3.digitaloceanspaces.com/images/logo/iolab-logo-black.png", width: 500, height: 240, alt: "iOLab Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "iOLab Digital | Custom Apps & AI Automation",
    description:
      "Custom CRM, mobile apps, AI automation & digital marketing for small businesses. Enterprise power at small business prices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JCN31084NK" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JCN31084NK');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        {children}
        <LiveChatWidget />
      </body>
    </html>
  );
}
