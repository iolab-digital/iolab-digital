# iOLab Digital — Project Rules

## CRITICAL: Blog Posts Live in the DATABASE, Images on DO Spaces CDN

**NEVER rely on the filesystem for blog post storage in production.** The Docker container is ephemeral — files written at runtime are lost on every deploy.

- **Blog post content** → stored in the `blog_posts` PostgreSQL table (Neon DB)
- **Cover images** → uploaded to DigitalOcean Spaces CDN, URL stored in `featured_image` column
- **Filesystem `.mdx` files** → only used for Git-committed posts (local dev convenience). Runtime-generated posts may also write to filesystem as a secondary copy, but the DB is the source of truth.
- **All blog reading functions** must check BOTH filesystem and database, merging results (DB-only posts show alongside Git posts)
- **Publish/reject/regenerate** must update BOTH the DB and filesystem (filesystem is optional/best-effort)

## CRITICAL: Fix Stale UI After Mutations in Next.js App Router

This project uses Next.js App Router. There is a known pattern where the UI does not update after API mutations (POST/PUT/DELETE). Apply these rules to EVERY admin/dashboard page:

### Rule 1: After any router.push(), always call router.refresh()
```
router.push("/destination");
router.refresh();
```

### Rule 2: After any API mutation, update local state immediately (optimistic update)
```
// 1. Update UI immediately
setItems(prev => prev.map(item => item.id === targetId ? { ...item, status: newStatus } : item));
// 2. Call API
await fetch("/api/endpoint", { method: "POST", body: ... });
// 3. Refetch to sync
await fetchData();
```

### Rule 3: Show loading + disabled state during async operations
Every button that triggers an API call must:
- Set a loading state before the call
- Be disabled while loading (prevent double-clicks)
- Show visual feedback (spinner, "Saving...", disabled opacity)
- Show confirmation after success ("Saved!", "Published!", checkmark)
- Auto-dismiss confirmation after 2-3 seconds

### Rule 4: Lift all editable state to the parent component
Never let form state live in a child that the parent's Save button can't reach.

### Rule 5: fetch() calls in useEffect for data loading should use cache: "no-store"
```
fetch("/api/data", { cache: "no-store" })
```

### Rule 6: Never rely on revalidatePath() alone in production
`revalidatePath()` is unreliable in standalone Docker builds. Always combine with client-side re-fetch:
```
// API route: try revalidatePath but don't fail if it throws
try { revalidatePath("/path"); } catch {}

// Client: always re-fetch after mutation
await fetch("/api/mutate", { method: "POST", body: ... });
await fetchData(); // re-fetch from API with cache: "no-store"
```

## Tech Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4 (CSS-first config in globals.css)
- Neon PostgreSQL + Drizzle ORM
- Resend for email
- Framer Motion for animations
- Docker deployment (standalone output)

## SEO Rules — MANDATORY for Every Page

Every new page MUST include ALL of the following before it is considered complete:

### 1. Metadata (generateMetadata or export const metadata)
- Use the `pageMetadata()` helper from `src/lib/seo.ts`
- REQUIRED fields: title, description, keywords array, openGraph, twitter card, canonical URL
- Title should be under 60 characters, description under 160 characters
- Include 5-8 relevant keywords per page
- Example:
```tsx
export const metadata: Metadata = pageMetadata(
  "Page Title",
  "Page description under 160 chars with primary keyword.",
  "/url-path",
  ["keyword1", "keyword2", "keyword3"]
);
```

### 2. JSON-LD Structured Data
- Use `<JsonLd data={...} />` component from `src/components/shared/JsonLd.tsx`
- Use schema helpers from `src/lib/seo.ts`
- REQUIRED schemas per page type:
  - **All pages**: `breadcrumbSchema()`
  - **Service pages**: `serviceSchema()` + `faqSchema()`
  - **Industry pages**: `faqSchema()` + `breadcrumbSchema()`
  - **Portfolio/case study**: `creativeWorkSchema()`
  - **About**: `personSchema()`
  - **Contact**: `localBusinessSchema()`
  - **Any page with FAQ**: `faqSchema()`
- Organization schema is already in the root layout — no need to add per page

### 3. Image Alt Tags
- NEVER use just the item name (e.g., `alt="Tappd"`)
- ALWAYS use descriptive alt text: `alt="Tappd Custom Mobile App — Digital Beverage Menu Platform by iOLab Digital"`
- Format: `[Project/Item Name] [What It Is] — [Brief Description] by iOLab Digital`
- For decorative images, use `aria-hidden="true"` and `alt=""`
- For icons, use `aria-hidden="true"`

### 4. FAQ Section
- Add a FAQ section to every service page, industry page, pricing page, and key landing pages
- Use the `<FAQ items={[...]} />` component from `src/components/shared/FAQ.tsx`
- Write 3-5 FAQs per page with genuine, helpful answers
- ALWAYS pair with `<JsonLd data={faqSchema(items)} />` for rich snippets
- FAQs should target common search queries for that page's topic

### 5. Internal Linking
- Every page MUST link to at least 2-3 other internal pages
- Service pages: include "Related Services" section linking to 2-3 other services
- Industry pages: link to relevant service pages
- Portfolio/case study: link to services used and back to portfolio hub
- All pages should link to /contact as a CTA
- Footer already provides site-wide internal links

### 6. Heading Hierarchy
- Exactly ONE `<h1>` per page
- Use `<h2>` for major sections, `<h3>` for subsections
- Never skip heading levels (h1 → h3 without h2)
- Headings should include relevant keywords naturally

### 7. Semantic HTML
- Use `<section>`, `<article>`, `<nav>`, `<main>`, `<footer>` appropriately
- Use `<ul>`/`<ol>` for lists (not just divs)
- Use `role` and `aria-label` attributes for icons and decorative elements

### 8. Sitemap
- When adding a new page, add its URL to `src/app/sitemap.ts`
- Set appropriate `priority` (0.5-1.0) and `changeFrequency`

## Component Patterns

### Reusable Layout Templates
- **Service pages**: Use `ServicePageLayout` from `src/components/services/ServicePageLayout.tsx`
  - Requires: badge, title, highlight, description, features, icon, slug, faqs, relatedServices
- **Industry pages**: Use `IndustryPageLayout` from `src/components/services/IndustryPageLayout.tsx`
  - Requires: icon, industry, slug, title, highlight, description, painPoints, solutions, faqs, relatedServices

### UI Components
- Buttons: `src/components/ui/Button.tsx` — variants: primary, secondary, outline, ghost
- Cards: `src/components/ui/Card.tsx`
- Sections: `src/components/ui/Section.tsx` — use `dark` prop for dark backgrounds
- Container: `src/components/ui/Container.tsx` — max-w-7xl centered wrapper
- Badge: `src/components/ui/Badge.tsx` — variants: primary, accent, dark
- Input: `src/components/ui/Input.tsx`

### Animation
- Use `ScrollReveal` wrapper for scroll-triggered animations
- Animation variants defined in `src/lib/animations.ts`
- Use Framer Motion `whileInView` with `viewport={{ once: true }}`

## File Organization
- Pages go in `src/app/(marketing)/` route group (gets Navbar + Footer automatically)
- Page-specific components go in `src/components/[section]/`
- Shared/reusable components go in `src/components/shared/`
- Constants, types, and helpers go in `src/lib/`

## Brand
- Primary color: #7B2FF7 (purple)
- Accent color: #FF6B35 (orange)
- Dark: #0A0A0B
- Fonts: DM Sans (body), Space Grotesk (display/headings)
- Business: iOLab Digital — Custom Apps, AI Automation, Digital Marketing
- Location: Medford, NJ
- Founder: Rauf Tur
