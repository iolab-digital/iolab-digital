"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TypewriterText } from "@/components/shared/TypewriterText";
import { CDN } from "@/lib/constants";

const ROTATING_WORDS = [
  "Custom CRM",
  "AI Automation",
  "Mobile Apps",
  "Web Development",
  "Email Marketing",
];

export function HeroSection() {
  return (
    <section className="relative bg-dark text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={`${CDN}/images/backgrounds/navy-topographic.png`}
          alt=""
          fill
          className="object-cover opacity-50"
          aria-hidden="true"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/90 to-dark/70" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      </div>

      <Container>
        <div className="relative py-24 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary-light mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              $100K Apps — For a Fraction of the Price
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
              Stop Renting Software.
              <br />
              <span className="text-primary">Start Owning It.</span>
            </h1>

            {/* Typewriter */}
            <div className="text-xl md:text-2xl text-gray-400 mb-4">
              We build{" "}
              <TypewriterText
                words={ROTATING_WORDS}
                className="text-accent font-semibold"
              />{" "}
              <br className="hidden md:block" />
              for small businesses — custom, branded, AI-powered.
            </div>

            <p className="text-gray-500 text-lg mb-10 max-w-2xl">
              Enterprise-level apps delivered in months, not years. You own
              everything. No subscriptions. No limits.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/portfolio" size="lg">
                See Our Work <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                <Play className="h-5 w-5" /> Book a Call
              </Button>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-800 pt-10"
          >
            {[
              { label: "Apps Built", value: "50+" },
              { label: "Years Experience", value: "12+" },
              { label: "Clients Served", value: "100+" },
              { label: "Saved for Clients", value: "$500K+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold font-display text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
