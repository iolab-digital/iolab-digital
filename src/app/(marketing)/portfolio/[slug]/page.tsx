import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const PROJECTS: Record<string, { name: string; category: string; image: string; description: string }> = {
  tappd: { name: "Tappd", category: "Custom Mobile App", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/tappd/business-landing.png", description: "Digital beverage menu platform for breweries and restaurants with real-time tap management, NFC coasters, and loyalty program." },
  "allenberry-resort": { name: "Allenberry Resort", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/allenberry-resort.png", description: "Complete resort website redesign with booking engine integration, event management, and hospitality-focused UX." },
  "sand-hills-casino": { name: "Sand Hills Casino", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/sandhills-casino.png", description: "Casino & resort website with gaming info, event calendars, and booking integration." },
  "hen-houses": { name: "The Hen Houses", category: "Web Design & Photography", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/hen-houses.png", description: "Boutique vacation rental website with property showcases, booking integration, and professional photography." },
  "johnny-ds": { name: "Johnny D's", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/johnny-ds.png", description: "Restaurant website with online ordering, menu management, and local SEO optimization." },
  "south-beach-casino": { name: "South Beach Casino", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/southbeach-casino.png", description: "Casino resort website with entertainment calendar and booking system." },
  homeland: { name: "Homeland Industrial", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/homeland.png", description: "Industrial supply company website with product catalog and quote system." },
  "the-milestone": { name: "The Milestone", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/milestone.png", description: "Harrisburg restaurant and event venue website with booking and events." },
  "villa-buena-onda": { name: "Villa Buena Onda", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/vbo.png", description: "Costa Rica micro-resort website with property showcases and booking." },
  "dilks-development": { name: "Dilks Development", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/dilks.png", description: "Real estate development company website with project showcases." },
  alpk: { name: "ALPK Restaurant", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/alpk.png", description: "Restaurant website with menu, online ordering, and reservation system." },
  "spark-meraki": { name: "Spark Meraki", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/spark-meraki.png", description: "Creative events company website with portfolio and booking." },
  "pro-pools": { name: "Pro Pools PGH", category: "Web Design", image: "https://iolab.nyc3.digitaloceanspaces.com/images/portfolio/pro-pools.png", description: "Pool services company website with service listings and quote requests." },
  maven: { name: "Maven", category: "Custom Business Platform", image: "https://iolab.nyc3.cdn.digitaloceanspaces.com/images/portfolio/maven-sj-crm.png", description: "Custom local business networking platform with member directory, event management, messaging, and community engagement tools." },
};

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) return { title: "Project Not Found" };
  return { title: project.name, description: project.description };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) notFound();

  return (
    <>
      <Section>
        <div className="max-w-4xl mx-auto">
          <Badge variant="accent" className="mb-4">{project.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">{project.name}</h1>
          <p className="text-gray-600 text-lg mb-8">{project.description}</p>

          <div className="rounded-2xl overflow-hidden border border-gray-200 mb-12">
            <Image src={project.image} alt={project.name} width={1200} height={675} className="w-full" />
          </div>

          <div className="text-center">
            <Button href="/portfolio" variant="outline" className="mr-4">Back to Portfolio</Button>
            <Button href="/contact">Start Your Project</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
