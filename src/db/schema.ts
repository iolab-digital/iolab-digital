import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  json,
} from "drizzle-orm/pg-core";

export const demoTokens = pgTable("demo_tokens", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  industry: text("industry").notNull(),
  prospectName: text("prospect_name"),
  prospectEmail: text("prospect_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  lastAccessedAt: timestamp("last_accessed_at"),
  accessCount: integer("access_count").default(0).notNull(),
  totalDurationSeconds: integer("total_duration_seconds").default(0).notNull(),
  pagesViewed: integer("pages_viewed").default(0).notNull(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  visitorIp: text("visitor_ip"),
  visitorPage: text("visitor_page"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  lastActiveAt: timestamp("last_active_at").defaultNow().notNull(),
  messageCount: integer("message_count").default(0).notNull(),
  userRating: integer("user_rating"),
  adminRating: integer("admin_rating"),
  status: text("status").default("active").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  industry: text("industry"),
  serviceInterest: text("service_interest"),
  message: text("message").notNull(),
  budgetRange: text("budget_range"),
  currentTools: text("current_tools"),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  source: text("source").default("website"),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  clientName: text("client_name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  challenge: text("challenge"),
  solution: text("solution"),
  results: text("results"),
  techStack: json("tech_stack").$type<string[]>(),
  featuredImage: text("featured_image").notNull(),
  galleryImages: json("gallery_images").$type<string[]>(),
  appStoreUrl: text("app_store_url"),
  playStoreUrl: text("play_store_url"),
  websiteUrl: text("website_url"),
  servicesProvided: json("services_provided").$type<string[]>(),
  industry: text("industry"),
  testimonialQuote: text("testimonial_quote"),
  testimonialAuthor: text("testimonial_author"),
  isFeatured: boolean("is_featured").default(false),
  displayOrder: integer("display_order").default(0),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const demoLeads = pgTable("demo_leads", {
  id: serial("id").primaryKey(),
  websiteUrl: text("website_url").notNull(),
  name: text("name"),
  email: text("email"),
  demoType: text("demo_type").notNull(),
  brandData: json("brand_data").$type<{
    businessName: string;
    primaryColor: string;
    accentColor: string;
    logoUrl: string | null;
    fontStyle: string;
    industry: string;
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const demoDripEmails = pgTable("demo_drip_emails", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").notNull(),
  emailNumber: integer("email_number").notNull(),
  scheduledFor: timestamp("scheduled_for").notNull(),
  sentAt: timestamp("sent_at"),
  stopped: boolean("stopped").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  category: text("category"),
  tags: json("tags").$type<string[]>(),
  author: text("author").default("Rauf Tur"),
  readTimeMinutes: integer("read_time_minutes"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
