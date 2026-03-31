"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { SERVICES } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function ServiceCards() {
  return (
    <Section className="bg-gray-50">
      <div className="text-center mb-12">
        <Badge className="mb-4">What We Do</Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-display">
          Everything You Need. Nothing You Don&apos;t.
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.slug + service.title} variants={staggerItem}>
              <Link
                href={`/services/${service.slug}`}
                className="group block rounded-2xl bg-white border border-gray-200 p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
