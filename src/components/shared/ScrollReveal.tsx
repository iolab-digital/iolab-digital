"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function ScrollReveal({
  children,
  variants = fadeUp,
  className,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
