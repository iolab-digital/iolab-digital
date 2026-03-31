"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { CDN } from "@/lib/constants";

const FEATURED_PROJECTS = [
  {
    name: "Tappd",
    category: "Custom Mobile App",
    description:
      "Digital beverage menu platform for breweries and restaurants with real-time tap management, NFC coasters, and loyalty program.",
    image: `${CDN}/images/portfolio/tappd/business-landing.png`,
    alt: "Tappd Custom Mobile App — Digital Beverage Menu Platform with NFC Coasters by iOLab Digital",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Allenberry Resort",
    category: "Web Design & Development",
    description:
      "Complete resort website redesign with booking engine integration, event management, and hospitality-focused UX.",
    image: `${CDN}/images/portfolio/allenberry-resort.png`,
    alt: "Allenberry Resort Custom Website Design — Boutique Hotel & Event Venue by iOLab Digital",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Sand Hills Casino",
    category: "Web Design & Development",
    description:
      "Casino & resort website with gaming info, event calendars, and booking integration for Manitoba entertainment destination.",
    image: `${CDN}/images/portfolio/sandhills-casino.png`,
    alt: "Sand Hills Casino Website Development — Gaming & Entertainment Resort Site by iOLab Digital",
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "The Hen Houses",
    category: "Web Design & Photography",
    description:
      "Boutique vacation rental website with property showcases, booking integration, and professional photography.",
    image: `${CDN}/images/portfolio/hen-houses.png`,
    alt: "The Hen Houses Vacation Rental Website — Boutique Property Showcases by iOLab Digital",
    color: "from-rose-500 to-pink-600",
  },
];

export function PortfolioShowcase() {
  return (
    <Section className="bg-gray-50">
      <div className="text-center mb-12">
        <Badge className="mb-4">Our Work</Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Apps We&apos;ve <span className="text-primary">Built & Shipped</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real apps. Real businesses. Real results. These are custom solutions
          replacing expensive SaaS tools.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {FEATURED_PROJECTS.map((project) => (
          <motion.div
            key={project.name}
            variants={staggerItem}
            className="group relative rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="p-6">
              <Badge variant="accent" className="mb-3">
                {project.category}
              </Badge>
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-10">
        <Button href="/portfolio" variant="outline">
          View All Projects <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </Section>
  );
}
