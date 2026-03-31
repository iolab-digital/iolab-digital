"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

type FAQItem = { question: string; answer: string };

export function FAQ({
  items,
  title = "Frequently Asked Questions",
  badge = "FAQ",
  dark,
}: {
  items: FAQItem[];
  title?: string;
  badge?: string;
  dark?: boolean;
}) {
  return (
    <Section dark={dark}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant={dark ? "dark" : "primary"} className="mb-4">
            {badge}
          </Badge>
          <h2 className="text-3xl font-bold font-display">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <FAQAccordionItem key={item.question} item={item} dark={dark} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function FAQAccordionItem({ item, dark }: { item: FAQItem; dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border transition-colors",
        dark ? "border-dark-600 bg-dark-800" : "border-gray-200 bg-white",
        open && !dark && "border-primary/30"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <span className="font-semibold pr-4">{item.question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform",
            dark ? "text-gray-400" : "text-gray-500",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div
          className={cn(
            "px-5 pb-5 text-sm leading-relaxed",
            dark ? "text-gray-400" : "text-gray-600"
          )}
        >
          {item.answer}
        </div>
      )}
    </div>
  );
}
