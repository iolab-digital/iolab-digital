// Industry-specific mock data generators for the sandboxed admin demo mode.
// All data is deterministic per industry — same industry = same data every time.

const INDUSTRY_PROFILES: Record<string, {
  businesses: string[];
  names: string[];
  emails: string[];
  services: string[];
  questions: string[];
  blogTopics: string[];
}> = {
  restaurants: {
    businesses: ["Maria's Trattoria", "The Blue Crab Shack", "Sunrise Café", "Golden Wok Express", "Bella Notte Pizzeria", "Harvest Table Bistro", "Smoky Joe's BBQ", "Seaside Grill", "The Garden Fork", "Noodle House"],
    names: ["Maria Rossi", "James Chen", "Sarah Mitchell", "David Park", "Lisa Thompson", "Carlos Rivera", "Amy Walsh", "Tom Martinez", "Jennifer Lee", "Mike Santos"],
    emails: ["maria@marias-trattoria.com", "james@bluecrab.com", "sarah@sunrisecafe.com", "david@goldenwok.com", "lisa@bellanotte.com", "carlos@harvest-table.com", "amy@smokyjoes.com", "tom@seasidegrill.com", "jen@gardenfork.com", "mike@noodlehouse.com"],
    services: ["Online Ordering System", "Loyalty App", "Reservation Platform", "Menu Management", "Kitchen Display", "Review Automation"],
    questions: ["Can you build an online ordering system?", "How does the loyalty program work?", "Can it integrate with our POS?", "Do you support multiple locations?", "What about delivery tracking?"],
    blogTopics: ["Restaurant Marketing Trends 2026", "How AI Is Changing the Dining Experience", "Building Customer Loyalty in Food Service", "Digital Menu Optimization Strategies", "Online Ordering vs Third-Party Apps"],
  },
  contractors: {
    businesses: ["Summit Roofing LLC", "Precision Builders", "Elite Electrical Co", "Greenfield Paving", "Patriot Plumbing", "AllStar Home Renovations", "Atlas Construction", "ProTech Siding", "Heritage Masonry", "BlueLine Drywall"],
    names: ["Mike Wilson", "John Harris", "Steve Rodriguez", "Dave Mitchell", "Chris Taylor", "Rob Callahan", "Brian Foster", "Kevin O'Brien", "Paul Nguyen", "Tony Vasquez"],
    emails: ["mike@summitroofing.com", "john@precisionbuilders.com", "steve@eliteelectric.com", "dave@greenfieldpaving.com", "chris@patriotplumbing.com", "rob@allstarhome.com", "brian@atlasconstruct.com", "kevin@protechsiding.com", "paul@heritagemasonry.com", "tony@bluelinedrywall.com"],
    services: ["Estimate Builder", "Job Scheduling", "Crew Dispatch", "Invoice System", "Customer Portal", "Photo Documentation"],
    questions: ["Can I track jobs from start to finish?", "How does crew scheduling work?", "Can customers see project status?", "Does it integrate with QuickBooks?", "Can my crew use it on their phones?"],
    blogTopics: ["Contractor CRM Best Practices", "How to Win More Bids with Technology", "Field Service Automation Guide", "Reducing No-Shows with Smart Scheduling", "Digital Estimates That Close Faster"],
  },
  dental: {
    businesses: ["Bright Smile Dental", "Lakewood Family Dentistry", "Precision Dental Care", "Smile Design Studio", "Evergreen Dental Group", "Gentle Touch Orthodontics", "Premier Dental Associates", "Valley View Dentistry", "Suncoast Oral Health", "Mountain Peak Dental"],
    names: ["Dr. Sarah Kim", "Dr. James Morton", "Dr. Emily Chang", "Dr. Robert Patel", "Amanda Foster", "Lisa Chen", "Mark Hoffman", "Diana Reyes", "Tom Blackwell", "Nancy Walsh"],
    emails: ["sarah@brightsmile.com", "james@lakewooddental.com", "emily@precisiondental.com", "robert@smiledesign.com", "amanda@evergreendental.com", "lisa@gentletouch.com", "mark@premierdental.com", "diana@valleyviewdental.com", "tom@suncoastoral.com", "nancy@mtpeakdental.com"],
    services: ["Patient Portal", "Appointment Booking", "Treatment Plans", "Insurance Verification", "Review Automation", "Recall System"],
    questions: ["Is it HIPAA compliant?", "Can patients book online?", "How does the recall system work?", "Can it verify insurance automatically?", "Does it integrate with Dentrix?"],
    blogTopics: ["Patient Engagement Strategies for Dental Practices", "How AI Reduces No-Shows in Healthcare", "HIPAA Compliance in Custom Software", "Automating Insurance Verification", "Building a 5-Star Online Reputation"],
  },
  "home-services": {
    businesses: ["CleanPro Services", "Handyman Hub", "Fresh Start Cleaning", "Swift Move Co", "SparkleClean Maids", "AllFix Home Repair", "ProShine Carpet Care", "EasyMove Relocations", "TidyUp Services", "HomeBright Cleaning"],
    names: ["Karen Mitchell", "Steve Rodriguez", "Amy Foster", "David Park", "Lisa Nguyen", "Chris Taylor", "Jennifer Adams", "Tom Wilson", "Maria Gonzalez", "Rob Kim"],
    emails: ["karen@cleanpro.com", "steve@handymanhub.com", "amy@freshstart.com", "david@swiftmove.com", "lisa@sparkleclean.com", "chris@allfix.com", "jen@proshine.com", "tom@easymove.com", "maria@tidyup.com", "rob@homebright.com"],
    services: ["Booking System", "Route Optimization", "Customer Portal", "Recurring Plans", "Invoice Automation", "Review Requests"],
    questions: ["Can customers book online?", "How does recurring scheduling work?", "Can my team use it on their phones?", "Does it send automatic reminders?", "Can I track crew performance?"],
    blogTopics: ["Growing a Home Services Business with Technology", "Automated Scheduling for Service Companies", "How to Get More 5-Star Reviews", "Route Optimization for Field Teams", "Building Recurring Revenue in Home Services"],
  },
  "law-firms": {
    businesses: ["Morrison & Associates", "Sterling Legal Group", "Pinnacle Law Firm", "Blackstone Partners", "Harbor City Legal", "Crestview Law Office", "Summit Legal Advisors", "Bridgewater Attorneys", "Oakmont Legal Group", "Cornerstone Law"],
    names: ["Attorney Sarah Morrison", "Robert Sterling", "Emily Blackstone", "James Crestview", "Lisa Harbor", "David Bridgewater", "Amanda Oakmont", "Michael Pinnacle", "Jennifer Summit", "Thomas Cornerstone"],
    emails: ["sarah@morrisonlaw.com", "robert@sterlinglaw.com", "emily@pinnaclelaw.com", "james@blackstonepartners.com", "lisa@harborcitylegal.com", "david@crestviewlaw.com", "amanda@summitlegal.com", "michael@bridgewaterlaw.com", "jennifer@oakmontlegal.com", "thomas@cornerstonelaw.com"],
    services: ["Case Management", "Client Intake", "Document Automation", "Billing & Trust", "Client Portal", "Deadline Tracking"],
    questions: ["Is it secure for attorney-client privilege?", "Can clients check case status online?", "How does document automation work?", "Does it handle trust accounting?", "Can it integrate with court filing systems?"],
    blogTopics: ["Legal Technology Trends for Small Firms", "AI Document Drafting for Attorneys", "Client Portal Best Practices for Law Firms", "Automating Legal Billing and Trust Accounting", "IOLTA Compliance in Custom Software"],
  },
  salons: {
    businesses: ["Luxe Hair Studio", "Blush Beauty Bar", "The Style Loft", "Glow Skincare Spa", "Mane Street Salon", "Serenity Day Spa", "Curls & Co", "The Beauty Edit", "Polished Nail Lounge", "Velvet Touch Salon"],
    names: ["Jessica Moore", "Ashley Rivera", "Brittany Kim", "Tiffany Chen", "Megan Walsh", "Rachel Foster", "Danielle Park", "Samantha Lee", "Christina Adams", "Nicole Martinez"],
    emails: ["jessica@luxehair.com", "ashley@blushbeauty.com", "brittany@styleloft.com", "tiffany@glowspa.com", "megan@manestreet.com", "rachel@serenityspa.com", "danielle@curlsco.com", "sam@beautyedit.com", "christina@polishednails.com", "nicole@velvettouch.com"],
    services: ["Booking System", "Client Profiles", "Color Formulas", "Staff Scheduling", "Loyalty Program", "Retail Tracking"],
    questions: ["Can clients book their favorite stylist?", "How does the color formula tracker work?", "Can it manage multiple locations?", "Does it handle commissions?", "Can clients buy gift cards online?"],
    blogTopics: ["Salon Booking System Best Practices", "Building Client Loyalty in Beauty", "AI-Powered Product Recommendations", "Managing Stylist Schedules Efficiently", "Going Commission-Free with Custom Tools"],
  },
};

// Fallback for industries not in the profile map
const DEFAULT_PROFILE = {
  businesses: ["Acme Corp", "BlueStar LLC", "Pinnacle Group", "Summit Solutions", "Atlas Services", "Prime Industries", "Evergreen Co", "Sterling Group", "ProTech Services", "Elite Solutions"],
  names: ["John Smith", "Sarah Johnson", "Mike Torres", "Lisa Chen", "David Park", "Emily Davis", "Robert Kim", "Amanda Foster", "Chris Taylor", "Jennifer Adams"],
  emails: ["john@acmecorp.com", "sarah@bluestar.com", "mike@pinnacle.com", "lisa@summit.com", "david@atlas.com", "emily@prime.com", "robert@evergreen.com", "amanda@sterling.com", "chris@protech.com", "jen@elite.com"],
  services: ["CRM System", "Automation Platform", "Customer Portal", "Analytics Dashboard", "Booking System", "Invoice Management"],
  questions: ["What does it cost?", "How long to build?", "Can it replace our current tools?", "Do you offer support?", "Can we customize it?"],
  blogTopics: ["Custom Software vs SaaS", "AI Automation for Small Business", "Building a Customer Portal", "How to Replace Salesforce", "Digital Transformation Guide"],
};

function getProfile(industry: string) {
  return INDUSTRY_PROFILES[industry] || DEFAULT_PROFILE;
}

// ------- GENERATORS -------

export function generateDashboardStats(industry: string) {
  const multiplier = industry === "restaurants" ? 1.2 : industry === "dental" ? 0.9 : 1.0;
  return {
    totalLeads: Math.round(47 * multiplier),
    weekLeads: Math.round(8 * multiplier),
    monthLeads: Math.round(23 * multiplier),
    leadsWithEmail: Math.round(31 * multiplier),
    activeDrips: Math.round(12 * multiplier),
    totalContacts: Math.round(18 * multiplier),
    recentLeads: generateDemoLeads(industry).slice(0, 10),
  };
}

export function generateDemoLeads(industry: string) {
  const p = getProfile(industry);
  const demoTypes = ["crm", "customer-support", "ai-chatbot", "invoicing", "booking", "analytics"];
  const statuses = ["active", "completed", "active", "active", "completed"];

  return p.businesses.slice(0, 15).map((biz, i) => ({
    id: i + 1,
    websiteUrl: `https://${biz.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
    name: p.names[i % p.names.length],
    email: p.emails[i % p.emails.length],
    demoType: demoTypes[i % demoTypes.length],
    brandData: {
      businessName: biz,
      primaryColor: ["#2563eb", "#dc2626", "#16a34a", "#7c3aed", "#ea580c"][i % 5],
      accentColor: "#f59e0b",
      logoUrl: null,
      fontStyle: "sans-serif",
      industry,
    },
    createdAt: new Date(Date.now() - i * 86400000),
    drip: {
      total: 7,
      sent: Math.min(7, i + 1),
      stopped: i === 3,
    },
  }));
}

export function generateDripCampaigns(industry: string) {
  return {
    emailStats: [1, 2, 3, 4, 5, 6, 7].map((n) => ({
      emailNumber: n,
      total: 15,
      sent: Math.max(0, 15 - (n - 1) * 2),
      pending: Math.min(15, (n - 1) * 2),
      stopped: n > 4 ? 2 : 0,
    })),
    activeCampaigns: 8,
    completedCampaigns: 5,
  };
}

export function generateContacts(industry: string) {
  const p = getProfile(industry);
  const statuses = ["new", "contacted", "qualified", "new", "won", "new", "contacted"];

  return p.names.slice(0, 12).map((name, i) => ({
    id: i + 1,
    name,
    email: p.emails[i % p.emails.length],
    phone: `(555) ${String(200 + i).padStart(3, "0")}-${String(1000 + i * 111).slice(0, 4)}`,
    company: p.businesses[i % p.businesses.length],
    industry,
    serviceInterest: p.services[i % p.services.length],
    message: p.questions[i % p.questions.length],
    budgetRange: ["$5K-$15K", "$15K-$30K", "$30K-$50K", "$50K+"][i % 4],
    currentTools: ["Salesforce", "HubSpot", "Spreadsheets", "Zoho", "Monday.com"][i % 5],
    status: statuses[i % statuses.length],
    createdAt: new Date(Date.now() - i * 86400000),
    updatedAt: new Date(Date.now() - i * 43200000),
  }));
}

export function generateBlogPosts(industry: string) {
  const p = getProfile(industry);
  const industryName = industry.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return p.blogTopics.map((topic, i) => ({
    slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: topic,
    description: `Expert insights on ${topic.toLowerCase()} for ${industryName} businesses.`,
    author: "Rauf Tur",
    publishedAt: new Date(Date.now() - i * 259200000).toISOString().split("T")[0],
    tags: [industryName, "Custom Software", "AI", "Small Business", "Automation"].slice(0, 4),
    image: null,
    imagePrompt: null,
    status: i === 0 ? "draft" : "published",
    readingTime: 5 + (i % 4),
    content: `## Introduction\n\nThis is a sample blog post about ${topic.toLowerCase()}...\n\n## Key Points\n\n- Point one about ${industryName}\n- Point two about automation\n- Point three about ROI\n\n## Conclusion\n\nReady to learn more? [Book a free consultation](/contact).`,
  }));
}

export function generateChatSessions(industry: string) {
  const p = getProfile(industry);

  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    sessionId: `demo-chat-${industry}-${i}`,
    visitorIp: "192.168.1.x",
    visitorPage: ["/", "/services/custom-crm", "/demos/crm", "/pricing", "/industries/" + industry][i % 5],
    startedAt: new Date(Date.now() - i * 86400000).toISOString(),
    lastActiveAt: new Date(Date.now() - i * 86400000 + 600000).toISOString(),
    messageCount: 4 + (i % 6),
    userRating: i < 5 ? [5, 4, 5, 3, 5][i] : null,
    adminRating: i < 3 ? [5, 4, 5][i] : null,
    status: i < 6 ? "completed" : "active",
  }));
}

export function generateChatMessages(industry: string, sessionId: string) {
  const p = getProfile(industry);
  const idx = parseInt(sessionId.split("-").pop() || "0");
  const question = p.questions[idx % p.questions.length];
  const service = p.services[idx % p.services.length];
  const industryName = industry.replace(/-/g, " ");

  return [
    { id: 1, sessionId, role: "assistant", content: `Hi! 👋 I'm the iOLab AI assistant. I can help you learn about our custom software for ${industryName} businesses. What can I help you with?`, createdAt: new Date().toISOString() },
    { id: 2, sessionId, role: "user", content: question, createdAt: new Date().toISOString() },
    { id: 3, sessionId, role: "assistant", content: `Great question! For ${industryName} businesses, we typically build a custom ${service} that replaces expensive SaaS tools. It's built around YOUR workflow, branded to your business, and you own it forever. Would you like to know more about pricing or see a demo?`, createdAt: new Date().toISOString() },
    { id: 4, sessionId, role: "user", content: "How much does it cost?", createdAt: new Date().toISOString() },
    { id: 5, sessionId, role: "assistant", content: `Our ${service} typically ranges from **$15,000 - $35,000** one-time, depending on complexity. That includes design, development, AI automation, data migration, and 3 months of support. Compare that to $200-500/month forever for SaaS — you break even in under 3 years and own it forever after that. [Book a Free Consultation](/contact)`, createdAt: new Date().toISOString() },
    { id: 6, sessionId, role: "user", content: "That sounds interesting. Can I see a demo?", createdAt: new Date().toISOString() },
    { id: 7, sessionId, role: "assistant", content: `Absolutely! We have interactive demos you can try right now — they'll even brand themselves with your logo and colors. [Try the CRM Demo](/demos/crm) or [Try the AI Chatbot Demo](/demos/ai-chatbot). If you'd prefer a personalized walkthrough, [book a free call with Rauf](/contact).`, createdAt: new Date().toISOString() },
  ].slice(0, 4 + (idx % 4));
}

export function generateSettings(industry: string) {
  const industryName = industry.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    chatbot_enabled: "true",
    chatbot_prompt: `You are the AI assistant for a ${industryName} business. Help visitors learn about custom software solutions for ${industryName} companies. Be friendly, specific, and guide them toward booking a consultation.\n\nServices: Custom CRM, AI Automation, Mobile Apps, Web Development\nPricing: Starting at $15,000\nTimeline: 3-5 months\n\nAlways end with a call-to-action linking to /contact.`,
  };
}
