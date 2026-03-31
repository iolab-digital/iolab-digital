"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { PROCESS_STEPS } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function HowItWorks() {
  return (
    <Section dark>
      <div className="text-center mb-16">
        <Badge variant="dark" className="mb-4">
          Our Process
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-display">
          From Idea to Launch in{" "}
          <span className="text-primary">4 Steps</span>
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {PROCESS_STEPS.map((step) => (
          <motion.div
            key={step.step}
            variants={staggerItem}
            className="relative"
          >
            <div className="text-6xl font-bold font-display text-primary/20 mb-4">
              {String(step.step).padStart(2, "0")}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
