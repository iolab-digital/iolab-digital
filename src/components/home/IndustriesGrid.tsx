"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { INDUSTRIES } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function IndustriesGrid() {
  return (
    <Section>
      <div className="text-center mb-12">
        <Badge className="mb-4">Industries</Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Built for <span className="text-primary">Any Business</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          From restaurants to law firms — if you run a business, we can build the
          custom tools you need to grow.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {INDUSTRIES.map((industry) => (
          <motion.div key={industry.name} variants={staggerItem}>
            <Link
              href={`/industries/${industry.slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-3xl">{industry.icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                {industry.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
