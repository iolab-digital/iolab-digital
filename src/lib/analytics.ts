// GA4 Event Tracking Helpers
// Usage: trackEvent("contact_form_submit", { service: "custom-crm" })

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Pre-defined events
export const EVENTS = {
  contactFormSubmit: (service?: string) =>
    trackEvent("contact_form_submit", { service: service || "general" }),

  demoGateComplete: (demoType: string, businessName?: string) =>
    trackEvent("demo_gate_complete", { demo_type: demoType, business: businessName || "" }),

  newsletterSignup: () =>
    trackEvent("newsletter_signup"),

  calculatorComplete: (monthlySpend: number, toolCount: number) =>
    trackEvent("calculator_complete", { monthly_spend: monthlySpend, tool_count: toolCount }),

  quizComplete: (score: number, tier: string, industry: string) =>
    trackEvent("quiz_complete", { score, tier, industry }),

  ctaClick: (location: string, destination: string) =>
    trackEvent("cta_click", { location, destination }),

  blogView: (slug: string) =>
    trackEvent("blog_view", { slug }),

  demoView: (demoType: string) =>
    trackEvent("demo_view", { demo_type: demoType }),

  exitIntentShown: () =>
    trackEvent("exit_intent_shown"),

  exitIntentSubmit: () =>
    trackEvent("exit_intent_submit"),
};
