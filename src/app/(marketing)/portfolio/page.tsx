import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "See the custom apps, websites, and marketing systems we've built for businesses across industries.",
};

const PROJECTS = [
  { name: "Tappd", category: "Custom Mobile App", image: "/images/portfolio/tappd/business-landing.png", slug: "tappd" },
  { name: "Allenberry Resort", category: "Web Design", image: "/images/portfolio/allenberry-resort.png", slug: "allenberry-resort" },
  { name: "Sand Hills Casino", category: "Web Design", image: "/images/portfolio/sandhills-casino.png", slug: "sand-hills-casino" },
  { name: "The Hen Houses", category: "Web Design & Photography", image: "/images/portfolio/hen-houses.png", slug: "hen-houses" },
  { name: "Johnny D's", category: "Web Design", image: "/images/portfolio/johnny-ds.png", slug: "johnny-ds" },
  { name: "South Beach Casino", category: "Web Design", image: "/images/portfolio/southbeach-casino.png", slug: "south-beach-casino" },
  { name: "Homeland Industrial", category: "Web Design", image: "/images/portfolio/homeland.png", slug: "homeland" },
  { name: "The Milestone", category: "Web Design", image: "/images/portfolio/milestone.png", slug: "the-milestone" },
  { name: "Villa Buena Onda", category: "Web Design", image: "/images/portfolio/vbo.png", slug: "villa-buena-onda" },
  { name: "Dilks Development", category: "Web Design", image: "/images/portfolio/dilks.png", slug: "dilks-development" },
  { name: "ALPK Restaurant", category: "Web Design", image: "/images/portfolio/alpk.png", slug: "alpk" },
  { name: "Spark Meraki", category: "Web Design", image: "/images/portfolio/spark-meraki.png", slug: "spark-meraki" },
  { name: "Pro Pools PGH", category: "Web Design", image: "/images/portfolio/pro-pools.png", slug: "pro-pools" },
];

export default function PortfolioPage() {
  return (
    <>
      <Section>
        <div className="text-center mb-12">
          <Badge className="mb-4">Our Work</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Apps & Sites We&apos;ve{" "}
            <span className="text-primary">Built & Shipped</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real projects. Real results. Custom solutions replacing expensive SaaS
            tools for businesses across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <Badge variant="accent" className="mb-2">{project.category}</Badge>
                <h3 className="font-semibold text-lg">{project.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Want to See Your Project Here?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Let&apos;s build something custom for your business — apps, websites,
            or marketing systems that you own.
          </p>
          <Button href="/contact" size="lg">Start Your Project</Button>
        </div>
      </Section>
    </>
  );
}
