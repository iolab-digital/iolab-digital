import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize URL
    let fetchUrl = url.trim();
    if (!fetchUrl.startsWith("http")) {
      fetchUrl = `https://${fetchUrl}`;
    }

    const domain = extractDomain(fetchUrl);

    // Fetch the website HTML
    let html: string;
    try {
      const response = await fetch(fetchUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; iOLabBrandBot/1.0; +https://iolab.co)",
        },
        signal: AbortSignal.timeout(10000),
      });
      html = await response.text();
      // Get more HTML for better extraction — head + top of body
      html = html.substring(0, 20000);
    } catch {
      return NextResponse.json({
        businessName: extractDomainName(fetchUrl),
        primaryColor: "#2563eb",
        accentColor: "#f59e0b",
        logoUrl: null,
        fontStyle: "sans-serif",
        industry: "business",
      });
    }

    // Improved prompt for brand extraction
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: `You are a brand identity extraction expert. Analyze this website HTML and extract the brand identity.

INSTRUCTIONS:
1. **businessName**: Find the actual business/company name. Look in: <title> tag, <meta property="og:site_name">, <h1>, logo alt text, footer copyright text, or schema.org data. Remove taglines — just the business name.

2. **primaryColor**: Find the MAIN brand color. Look in:
   - CSS custom properties (--primary, --brand-color, --main-color)
   - Inline styles on the header, nav, or hero section
   - Button background colors
   - Link colors
   - <meta name="theme-color">
   - Common CSS classes (.btn-primary, .bg-primary)
   Return a hex color like "#1a2b3c". If the site is mostly red, return the specific red. If blue, the specific blue.

3. **accentColor**: Find a SECONDARY color used for highlights, CTAs, or accents. Should contrast with primaryColor.

4. **logoUrl**: Find the logo image. Look in:
   - <img> tags inside <header>, <nav>, or elements with class containing "logo", "brand", "header"
   - <link rel="icon"> or <link rel="apple-touch-icon"> (as fallback)
   - SVG inline logos
   - The src/href MUST be an absolute URL starting with http. If you find a relative path like /wp-content/uploads/logo.png, prepend "${domain}" to make it absolute.
   - For WordPress sites, logos are often in /wp-content/uploads/
   - Return null ONLY if truly no logo found.

5. **fontStyle**: Determine the primary font family: "sans-serif", "serif", or "rounded"

6. **industry**: One word: restaurant, plumbing, dental, legal, realestate, construction, salon, florist, hvac, automotive, pest-control, landscaping, ecommerce, saas, agency, fitness, education, healthcare, finance, or "business" as fallback.

Return ONLY valid JSON — no explanation, no markdown:
{"businessName":"...","primaryColor":"#...","accentColor":"#...","logoUrl":"...or null","fontStyle":"...","industry":"..."}

Website domain: ${domain}
Website HTML:
${html}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return NextResponse.json({
        businessName: extractDomainName(fetchUrl),
        primaryColor: "#2563eb",
        accentColor: "#f59e0b",
        logoUrl: null,
        fontStyle: "sans-serif",
        industry: "business",
      });
    }

    const raw = JSON.parse(jsonMatch[0]);

    // Fill in defaults for any null/missing fields
    const brandData = {
      businessName: raw.businessName || extractDomainName(fetchUrl),
      primaryColor: raw.primaryColor || "#2563eb",
      accentColor: raw.accentColor || "#f59e0b",
      logoUrl: raw.logoUrl || null,
      fontStyle: raw.fontStyle || "sans-serif",
      industry: raw.industry || "business",
    };

    // Validate logo URL — must be absolute
    if (brandData.logoUrl && !brandData.logoUrl.startsWith("http")) {
      brandData.logoUrl = `${domain}${brandData.logoUrl.startsWith("/") ? "" : "/"}${brandData.logoUrl}`;
    }

    return NextResponse.json(brandData);
  } catch (error) {
    console.error("Brand extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract brand" },
      { status: 500 }
    );
  }
}

function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}`;
  } catch {
    return url;
  }
}

function extractDomainName(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    const name = hostname
      .replace(/^www\./, "")
      .replace(/\.(com|net|org|co|io|biz)$/, "");
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return "Your Business";
  }
}
