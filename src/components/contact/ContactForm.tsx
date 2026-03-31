"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const err = await res.json();
        setStatus("error");
        if (err.error) setErrors({ form: err.error });
      }
    } catch {
      setStatus("error");
      setErrors({ form: "Something went wrong. Please try again." });
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-gray-500">
          We&apos;ll get back to you within 24 hours. Check your inbox for a
          confirmation email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input name="name" label="Name *" placeholder="John Smith" required />
        <Input
          name="email"
          label="Email *"
          type="email"
          placeholder="john@company.com"
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input name="phone" label="Phone" placeholder="(555) 123-4567" />
        <Input name="company" label="Company" placeholder="Your Business" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Service Interest
          </label>
          <select
            name="serviceInterest"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            <option value="">Select a service</option>
            <option value="custom-crm">Custom CRM</option>
            <option value="mobile-apps">Mobile Apps (iOS/Android)</option>
            <option value="ai-automation">AI Automation</option>
            <option value="web-design">Web Design & Development</option>
            <option value="email-marketing">Email Marketing</option>
            <option value="seo">SEO & Content</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Budget Range
          </label>
          <select
            name="budgetRange"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            <option value="">Select budget</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k+">$50,000+</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          What tools/SaaS are you currently using?
        </label>
        <input
          name="currentTools"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-foreground placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          placeholder="e.g., Salesforce, Mailchimp, Square, etc."
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Message *
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-foreground placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
          placeholder="Tell us about your business and what you're looking to build..."
        />
      </div>

      {/* Honeypot */}
      <input
        name="honeypot"
        type="text"
        className="absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
      />

      {errors.form && (
        <p className="text-sm text-error">{errors.form}</p>
      )}

      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
